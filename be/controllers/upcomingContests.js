import fetch from "node-fetch";
import { formatDateTime } from "../lib/dateFormatter.js";

// Fetch upcoming Codeforces contests
const fetchCodeforcesUpcoming = async () => {
  const response = await fetch("https://codeforces.com/api/contest.list");
  const data = await response.json();

  if (data.status !== "OK") {
    return [];
  }

  return data.result
    .filter((contest) => contest.phase === "BEFORE")
    .map((contest) => {
      const { formattedDate, formattedTime } = formatDateTime(
        contest.startTimeSeconds * 1000
      );

      return {
        contestName: contest.name,
        startDate: formattedDate,
        startTime: formattedTime,
        platform: "Codeforces",
      };
    });
};

// Fetch upcoming LeetCode contests
const fetchLeetcodeUpcoming = async () => {
  const query = `
    query contestList {
      allContests {
        title
        startTime
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
    return [];
  }

  return data.data.allContests
    .filter((contest) => new Date(contest.startTime * 1000) > new Date()) // Filter upcoming contests
    .map((contest) => {
      const { formattedDate, formattedTime } = formatDateTime(
        contest.startTime * 1000
      );

      return {
        contestName: contest.title,
        startDate: formattedDate,
        startTime: formattedTime,
        platform: "LeetCode",
      };
    });
};

// Controller for upcoming contests
export const upcomingContests = async (req, res) => {
  try {
    const [codeforcesContests, leetcodeContests] = await Promise.all([
      fetchCodeforcesUpcoming(),
      fetchLeetcodeUpcoming(),
    ]);

    const allContests = [...codeforcesContests, ...leetcodeContests];

    // Sort contests by start time
    allContests.sort(
      (a, b) =>
        new Date(`${a.startDate} ${a.startTime}`) -
        new Date(`${b.startDate} ${b.startTime}`)
    );

    res.json(allContests);
  } catch (error) {
    console.error("Error fetching upcoming contests:", error);
    res.status(500).json({ message: "Server error" });
  }
};
