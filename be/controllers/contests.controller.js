import fetch from "node-fetch";

export const codeforcesPastContests = async (req, res) => {
  try {
    const { handle } = req.params;
    const response = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
    const data = await response.json();

    if (data.status !== "OK") {
      return res.status(400).json({ message: "Invalid Codeforces handle or no contest data found." });
    }

    // Extract required fields
    const pastContests = data.result.map((contest) => ({
      contestName: contest.contestName,
      rank: contest.rank,
      newRating: contest.newRating,
      contestTime: new Date(contest.ratingUpdateTimeSeconds * 1000).toISOString(),
    }));

    res.json(pastContests);
  } catch (error) {
    console.error("Error fetching past Codeforces contests:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const codeforcesUpcomingContests = async (req, res) => {
    try {
      const response = await fetch("https://codeforces.com/api/contest.list");
      const data = await response.json();
  
      if (data.status !== "OK") {
        return res.status(400).json({ message: "Failed to fetch contests." });
      }
  
      // Filter only upcoming contests (phase: "BEFORE")
      const upcomingContests = data.result
        .filter((contest) => contest.phase === "BEFORE")
        .map((contest) => {
          const date = new Date(contest.startTimeSeconds * 1000);
          
          // Format date: dd/mm/yyyy
          const formattedDate = date.toLocaleDateString("en-GB");
  
          // Format time: hh:mm:ss
          const formattedTime = date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // 24-hour format
          });
  
          return {
            contestName: contest.name,
            startDate: formattedDate,  // dd/mm/yyyy
            startTime: formattedTime,  // hh:mm:ss
            durationMinutes: contest.durationSeconds / 60,
          };
        });
  
      res.json(upcomingContests);
    } catch (error) {
      console.error("Error fetching upcoming Codeforces contests:", error);
      res.status(500).json({ message: "Server error" });
    }
  };