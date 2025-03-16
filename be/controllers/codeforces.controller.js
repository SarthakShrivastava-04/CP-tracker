import fetch from "node-fetch";
import { formatDateTime } from "../lib/dateFormatter.js";

// Controller for Codeforces past contests
export const codeforcesPastContests = async (req, res) => {
  try {
    const { handle } = req.params;
    const response = await fetch(
      `https://codeforces.com/api/user.rating?handle=${handle}`
    );
    const data = await response.json();

    if (data.status !== "OK") {
      return res.status(400).json({
        message: "Invalid Codeforces handle or no contest data found.",
      });
    }

    // Extract required fields
    const pastContests = data.result.map((contest) => {
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

    pastContests.reverse();

    res.json(pastContests);
  } catch (error) {
    console.error("Error fetching past Codeforces contests:", error);
    res.status(500).json({ message: "Server error" });
  }
}