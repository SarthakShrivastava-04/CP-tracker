import fetch from "node-fetch";
import { formatDateTime } from "../lib/dateFormatter.js";

// Fetcher function to get user data from CodeChef website
const fecher = async (handle) => {
  try {
    const resdata = await fetch(`https://www.codechef.com/users/${handle}`);
    if (resdata.status == 200) {
      let d = await resdata.text();
      let data = { data: d };
    
      let allRating =
        data.data.search("var all_rating = ") + "var all_rating = ".length;
      let allRating2 = data.data.search("var current_user_rating =") - 6;
      let ratingData = JSON.parse(data.data.substring(allRating, allRating2));

      return {
        success: true,
        status: resdata.status,
        ratingData,
      };
    } else {
      return { success: false, status: resdata.status };
    }
  } catch (e) {
    console.log(e);
    return { success: false, status: 404 };
  }
};

// Controller for CodeChef past contests
export const codechefPastContests = async (req, res) => {
  try {
    const { handle } = req.params;

    // Fetch user data from CodeChef website
    const data = await fecher(handle);

    if (!data.success) {
      return res.status(400).json({ message: "Invalid CodeChef handle or no contest data found." });
    }

    // Extract and format ratingData (past contests)
    const pastContests = data.ratingData.map((contest) => {
      // Parse the contest end date and time
      const contestEndDate = new Date(contest.end_date);
      const { formattedDate, formattedTime } = formatDateTime(contestEndDate.getTime());

      return {
        contestName: contest.name,
        rank: parseInt(contest.rank),
        newRating: parseInt(contest.rating),
        contestDate: formattedDate,
        contestTime: formattedTime,
        platform: "CodeChef",
      };
    });

    pastContests.reverse();

    res.json(pastContests);
  } catch (error) {
    console.error("Error fetching past CodeChef contests:", error);
    res.status(500).json({ message: "Server error" });
  }
};