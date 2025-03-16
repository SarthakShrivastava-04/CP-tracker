import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { fetchCodeChefPastContests, fetchLeetCodePastContests } from "../controllers/attendedContests.controller.js";

// Helper function to calculate max and current rating from past contests
const calculateRatingsFromContests = (pastContests) => {
    if (!pastContests || pastContests.length === 0) {
      return { currentRating: 0, maxRating: 0 };
    }
  
    // Extract all ratings from past contests
    const ratings = pastContests.map((contest) => contest.newRating);
  
    // Calculate max rating
    const maxRating = Math.max(...ratings);
  
    // Current rating is the rating of the most recent contest
    const currentRating = ratings[ratings.length - 1];
  
    return { currentRating, maxRating };
  };

// Helper function to fetch CodeChef stats
const fetchCodeChefStats = async (username) => {
  try {
    const response = await fetch(`https://www.codechef.com/users/${username}`);
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract rating and stars
    const ratingElement = document.querySelector(".rating-number");
    const currentRating = parseInt(ratingElement?.textContent) || 0;

    const starsElement = document.querySelector(".rating");

    const stars = starsElement?.textContent.trim() || "unrated";

    const problemsSolved = "NA";

    const maxRating = "NA";

    return {
      platform: "CodeChef",
      username,
      currentRating,
      maxRating,
      problemsSolved,
      reputation: stars,
    };
  } catch (error) {
    console.error("Error fetching CodeChef stats:", error.message);
    return {
      platform: "CodeChef",
      username,
      currentRating: 0,
      maxRating: 0,
      problemsSolved: 0,
      reputation: "unrated",
    };
  }
};

// Helper function to fetch Codeforces stats
const fetchCodeforcesStats = async (username) => {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.info?handles=${username}`
    );
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error("Failed to fetch Codeforces stats");
    }

    const user = data.result[0];

    // Extract rating and rank
    const currentRating = user.rating || 0;
    const maxRating = user.maxRating || 0;

    // Extract problems solved
    const problemsSolvedResponse = await fetch(
      `https://codeforces.com/api/user.status?handle=${username}`
    );
    const problemsSolvedData = await problemsSolvedResponse.json();

    const problemsSolved =
      problemsSolvedData.status === "OK"
        ? problemsSolvedData.result.filter(
            (submission) => submission.verdict === "OK"
          ).length
        : 0;

    // Determine reputation (rank)
    const reputation = user.rank || "unrated";

    return {
      platform: "Codeforces",
      username,
      currentRating,
      maxRating,
      problemsSolved,
      reputation,
    };
  } catch (error) {
    console.error("Error fetching Codeforces stats:", error.message);
    return {
      platform: "Codeforces",
      username,
      currentRating: 0,
      maxRating: 0,
      problemsSolved: 0,
      reputation: "unrated",
    };
  }
};

// Helper function to fetch LeetCode stats
const fetchLeetcodeStats = async (username) => {
  try {
    const query = {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              ranking
              reputation
            }
            submitStats {
              acSubmissionNum {
                count
              }
            }
          }
        }
      `,
      variables: { username },
    };

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    const data = await response.json();

    if (!data.data || !data.data.matchedUser) {
      throw new Error("Failed to fetch LeetCode stats");
    }

    const user = data.data.matchedUser;

    // Extract problems solved
    const problemsSolved =
      user.submitStats?.acSubmissionNum?.[0]?.count || 0;

    // Extract reputation (ranking)
    const reputation = "NA";

    // LeetCode does not provide a direct rating, so we use ranking as a proxy
    const currentRating = "NA";
    const maxRating = "NA"; // LeetCode does not provide max rating

    return {
      platform: "LeetCode",
      username,
      currentRating,
      maxRating,
      problemsSolved,
      reputation,
    };
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error.message);
    return {
      platform: "LeetCode",
      username,
      currentRating: 0,
      maxRating: 0,
      problemsSolved: 0,
      reputation: "unrated",
    };
  }
};

// Main function to fetch all stats
export const fetchUserStats = async (req, res) => {
    try {
      const { lcId, ccId, cfId } = req.body;
  
      // Fetch stats from all platforms
      const [codechefStats, codeforcesStats, leetcodeStats, lcContests, ccContests] = await Promise.all([
        fetchCodeChefStats(ccId),
        fetchCodeforcesStats(cfId),
        fetchLeetcodeStats(lcId),
        fetchLeetCodePastContests(lcId),
        fetchCodeChefPastContests(ccId),
      ]);
  
      // Calculate max and current ratings for LeetCode and CodeChef using exported arrays
      const leetcodeRatings = calculateRatingsFromContests(lcContests);
      const codechefRatings = calculateRatingsFromContests(ccContests);
  
      // Update LeetCode stats with calculated ratings
      leetcodeStats.currentRating = leetcodeRatings.currentRating;
      leetcodeStats.maxRating = leetcodeRatings.maxRating;
  
      // Update CodeChef stats with calculated ratings
      codechefStats.maxRating = codechefRatings.maxRating;
  
      res.json({
        status: "success",
        data: [codechefStats, codeforcesStats, leetcodeStats],
      });
    } catch (error) {
      console.error("Error fetching user stats:", error.message);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  