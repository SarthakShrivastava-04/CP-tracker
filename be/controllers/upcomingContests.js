import fetch from "node-fetch";
import { formatDateTime } from "../lib/dateFormatter.js";

// Helper function to calculate time remaining
const calculateTimeRemaining = (startTimeUnix) => {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const timeRemainingSeconds = startTimeUnix - now;

  if (timeRemainingSeconds <= 0) return "Contest has started";

  const days = Math.floor(timeRemainingSeconds / (24 * 3600));
  const hours = Math.floor((timeRemainingSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((timeRemainingSeconds % 3600) / 60);

  return `${days} days ${hours} hours ${minutes} minutes`;
};

// Fetch upcoming Codeforces contests
const fetchCodeforcesUpcoming = async () => {
  try {
    const response = await fetch("https://codeforces.com/api/contest.list");
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error("Failed to fetch Codeforces contests");
    }

    // Filter only active contests (phase === "BEFORE")
    const activeContests = data.result
      .filter((contest) => contest.phase === "BEFORE")
      .map((contest) => {
        const { formattedDate, formattedTime } = formatDateTime(
          contest.startTimeSeconds * 1000
        );

        return {
          platform: "Codeforces",
          name: contest.name,
          startTimeUnix: contest.startTimeSeconds,
          startDate: formattedDate,
          startTime: formattedTime,
          durationSeconds: contest.durationSeconds,
          duration: `${Math.floor(contest.durationSeconds / 3600)} hours ${(contest.durationSeconds % 3600) / 60} minutes`,
          timeRemaining: calculateTimeRemaining(contest.startTimeSeconds),
          url: `https://codeforces.com/contests/${contest.id}`,
        };
      });

    return activeContests;
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error.message);
    return [];
  }
};

// Fetch upcoming LeetCode contests
const fetchLeetcodeUpcoming = async () => {
  try {
    const query = `
      query contestList {
        allContests {
          title
          startTime
          duration
          titleSlug
        }
      }
    `;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (!data.data || !data.data.allContests) {
      throw new Error("Failed to fetch LeetCode contests");
    }

    const now = Math.floor(Date.now() / 1000); // Current time in seconds

    // Filter only active contests (start time is in the future)
    const activeContests = data.data.allContests
      .filter((contest) => contest.startTime > now)
      .map((contest) => {
        const { formattedDate, formattedTime } = formatDateTime(
          contest.startTime * 1000
        );

        return {
          platform: "LeetCode",
          name: contest.title,
          startTimeUnix: contest.startTime,
          startDate: formattedDate,
          startTime: formattedTime,
          durationSeconds: contest.duration,
          duration: `${Math.floor(contest.duration / 3600)} hours ${(contest.duration % 3600) / 60} minutes`,
          timeRemaining: calculateTimeRemaining(contest.startTime),
          url: `https://leetcode.com/contest/${contest.titleSlug}`,
        };
      });

    return activeContests;
  } catch (error) {
    console.error("Error fetching LeetCode contests:", error.message);
    return [];
  }
};

// Fetch upcoming CodeChef contests
const fetchCodechefUpcoming = async () => {
  try {
    const response = await fetch("https://www.codechef.com/api/list/contests/all");
    const data = await response.json();

    if (!data.future_contests) {
      throw new Error("Failed to fetch CodeChef contests");
    }

    const activeContests = data.future_contests.map((contest) => {
      const startTimeUnix = Math.floor(
        new Date(contest.contest_start_date).getTime() / 1000
      );
      const { formattedDate, formattedTime } = formatDateTime(
        new Date(contest.contest_start_date).getTime()
      );

      return {
        platform: "CodeChef",
        name: contest.contest_name,
        startTimeUnix,
        startDate: formattedDate,
        startTime: formattedTime,
        durationSeconds: Math.floor(
          (new Date(contest.contest_end_date) - new Date(contest.contest_start_date)) / 1000
        ),
        duration: `${Math.floor(
          (new Date(contest.contest_end_date) - new Date(contest.contest_start_date)) / (1000 * 3600)
        )} hours ${Math.floor(
          ((new Date(contest.contest_end_date) - new Date(contest.contest_start_date)) % (1000 * 3600) / (1000 * 60))
        )} minutes`,
        timeRemaining: calculateTimeRemaining(startTimeUnix),
        url: `www.codechef.com/${contest.contest_code}`,
      };
    });

    return activeContests;
  } catch (error) {
    console.error("Error fetching CodeChef contests:", error.message);
    return [];
  }
};

// Main function to fetch all upcoming contests
export const fetchUpcomingContests = async (req, res) => {
  try {
    const [codeforcesContests, leetcodeContests, codechefContests] =
      await Promise.all([
        fetchCodeforcesUpcoming(),
        fetchLeetcodeUpcoming(),
        fetchCodechefUpcoming(),
      ]);

    // Combine all contests into one array
    const allContests = [
      ...codeforcesContests,
      ...leetcodeContests,
      ...codechefContests,
    ];

    // Sort contests by start time (earliest first)
    allContests.sort((a, b) => a.startTimeUnix - b.startTimeUnix);

    res.json({
      status: "success",
      count: allContests.length,
      data: allContests,
    });
  } catch (error) {
    console.error("Error fetching upcoming contests:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};