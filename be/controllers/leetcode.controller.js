import fetch from "node-fetch";
import { formatDateTime } from "../lib/dateFormatter.js";

// Controller for LeetCode past contests
export const leetcodePastContests = async (req, res) => {
  try {
    const { handle } = req.params;

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
        variables: { username: handle },
      }),
    });

    const data = await response.json();

    // Check if the data is valid
    if (!data.data || !data.data.userContestRankingHistory) {
      return res
        .status(404)
        .json({ error: "No contest history found for this user" });
    }

    // Format the response
    const pastContests = data.data.userContestRankingHistory
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

    pastContests.reverse();

    res.json(pastContests);
  } catch (error) {
    console.error("Error fetching past LeetCode contests:", error);
    res.status(500).json({ message: "Server error" });
  }
};
