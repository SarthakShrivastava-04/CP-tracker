import fetch from "node-fetch";
import { formatDateTime } from "../lib/dateFormatter.js";

// Fetch LeetCode past contests
export const fetchLeetCodePastContests = async (lcId) => {
  try {
    // GraphQL query to fetch user contest history
    const query = `
      query getUserContestRankingHistory($username: String!) {
        userContestRankingHistory(username: $username) {
          attended
          rating
          ranking
          contest {
            title
            startTime
          }
        }
      }
    `;

    // Send the request to the LeetCode GraphQL API
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: lcId },
      }),
    });

    const data = await response.json();

    // Check if the data is valid
    if (!data.data || !data.data.userContestRankingHistory) {
      throw new Error("No contest history found for this user");
    }

    // Format the response
    return data.data.userContestRankingHistory
      .filter((contest) => contest.attended) // Filter only attended contests
      .map((contest) => {
        const { formattedDate, formattedTime } = formatDateTime(
          contest.contest.startTime * 1000
        );

        return {
          contestName: contest.contest.title,
          rank: contest.ranking,
          newRating: contest.rating,
          contestDate: formattedDate,
          contestTime: formattedTime,
          platform: "LeetCode",
        };
      });
  } catch (error) {
    console.error("Error fetching past LeetCode contests:", error);
    return [];
  }
};

// Fetch Codeforces past contests
export const fetchCodeforcesPastContests = async (cfId) => {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.rating?handle=${cfId}`
    );
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error("Invalid Codeforces handle or no contest data found.");
    }

    // Extract required fields
    return data.result.map((contest) => {
      const { formattedDate, formattedTime } = formatDateTime(
        contest.ratingUpdateTimeSeconds * 1000
      );

      return {
        contestName: contest.contestName,
        rank: contest.rank,
        newRating: contest.newRating,
        contestDate: formattedDate,
        contestTime: formattedTime,
        platform: "Codeforces",
      };
    });
  } catch (error) {
    console.error("Error fetching past Codeforces contests:", error);
    return [];
  }
};

// Fetch CodeChef past contests
export const fetchCodeChefPastContests = async (ccId) => {
  try {
    const response = await fetch(`https://www.codechef.com/users/${ccId}`);
    if (response.status === 200) {
      const html = await response.text();

      // Extract rating data
      const allRating =
        html.search("var all_rating = ") + "var all_rating = ".length;
      const allRating2 = html.search("var current_user_rating =") - 6;
      const ratingData = JSON.parse(html.substring(allRating, allRating2));

      // Format the response
      return ratingData.map((contest) => {
        const contestEndDate = new Date(contest.end_date);
        const { formattedDate, formattedTime } = formatDateTime(
          contestEndDate.getTime()
        );

        return {
          contestName: contest.name,
          rank: parseInt(contest.rank),
          newRating: parseInt(contest.rating),
          contestDate: formattedDate,
          contestTime: formattedTime,
          platform: "CodeChef",
        };
      });
    } else {
      throw new Error("Invalid CodeChef handle or no contest data found.");
    }
  } catch (error) {
    console.error("Error fetching past CodeChef contests:", error);
    return [];
  }
};

// Merge all past contests data
export const fetchAllAttendedContests = async (req, res) => {
  const { lcId, ccId, cfId } = req.body;
  console.log(req.body);

  try {
    // Fetch data from all platforms
    const [lcContests, ccContests, cfContests] = await Promise.all([
      fetchLeetCodePastContests(lcId),
      fetchCodeChefPastContests(ccId),
      fetchCodeforcesPastContests(cfId),
    ]);

    const allPastContests = [...lcContests, ...ccContests, ...cfContests];

    // Function to parse date and time into a comparable format
    const parseDateTime = (dateStr, timeStr) => {
      const [day, month, year] = dateStr.split("/");
      const [hours, minutes, seconds] = timeStr.split(":");
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    // Sort contests by date and time (latest first)
    allPastContests.sort((a, b) => {
      const dateTimeA = parseDateTime(a.contestDate, a.contestTime);
      const dateTimeB = parseDateTime(b.contestDate, b.contestTime);
      return dateTimeB.localeCompare(dateTimeA);
    });
    // console.log(allPastContests);
    res.json(allPastContests);
  } catch (error) {
    console.error("Error fetching all past contests:", error);
    res.status(500).json({ message: "Server error" });
  }
};
