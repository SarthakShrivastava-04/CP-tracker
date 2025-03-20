// import prisma from "../lib/prisma.js";

// // Bookmark or unbookmark a contest
// export const bookmarkContest = async (req, res) => {
//   try {
//     const {
//       userId,
//       contestName,
//       rating,
//       rank,
//       platform,
//       contestDate,
//       contestTime,
//     } = req.body;

//     // Validate required fields
//     if (!userId || !contestName || !platform || !contestDate || !contestTime) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Check if the contest is already bookmarked by the user
//     const existingBookmark = await prisma.savedContests.findFirst({
//       where: {
//         userId,
//         contestName,
//       },
//     });

//     let savedContest;

//     if (existingBookmark) {
//       // If the contest is already bookmarked, delete it (unbookmark)
//       savedContest = await prisma.savedContests.delete({
//         where: {
//           id: existingBookmark.id,
//         },
//       });

//       res.status(200).json({
//         status: "success",
//         message: "Contest unbookmarked successfully",
//         data: savedContest,
//       });
//     } else {
//       // If the contest is not bookmarked, save it (bookmark)
//       savedContest = await prisma.savedContests.create({
//         data: {
//           userId,
//           contestName,
//           rating,
//           rank,
//           platform,
//           contestDate,
//           contestTime,
//         },
//       });

//       res.status(201).json({
//         status: "success",
//         message: "Contest bookmarked successfully",
//         data: savedContest,
//       });
//     }
//   } catch (error) {
//     console.error("Error toggling bookmark:", error.message);
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

// // Get all bookmarked contests for a user
// export const getBookmarkedContests = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Fetch all bookmarked contests for the user
//     const bookmarkedContests = await prisma.savedContests.findMany({
//       where: { userId },
//       orderBy: { createdAt: "desc" }, // Sort by creation date (latest first)
//     });

//     res.json({
//       status: "success",
//       data: bookmarkedContests,
//     });
//   } catch (error) {
//     console.error("Error fetching bookmarked contests:", error.message);
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

import prisma from "../lib/prisma.js";

// Bookmark or unbookmark a contest
export const bookmarkContest = async (req, res) => {
  try {
    const {
      userId,
      contestName,
      rating,
      rank,
      platform,
      contestDate,
      contestTime,
    } = req.body;

    // Validate required fields
    if (!userId || !contestName || !platform || !contestDate || !contestTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the contest is already bookmarked by the user
    const existingBookmark = await prisma.savedContests.findFirst({
      where: {
        userId,
        contestName,
      },
    });

    let savedContest;

    if (existingBookmark) {
      // If the contest is already bookmarked, delete it (unbookmark)
      savedContest = await prisma.savedContests.delete({
        where: {
          id: existingBookmark.id,
        },
      });

      res.status(200).json({
        status: "success",
        message: "Contest unbookmarked successfully",
        data: savedContest,
      });
    } else {
      // If the contest is not bookmarked, save it (bookmark)
      savedContest = await prisma.savedContests.create({
        data: {
          userId,
          contestName,
          rating,
          rank,
          platform,
          contestDate,
          contestTime,
        },
      });
      
      res.status(201).json({
        savedContest,
      });
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get all bookmarked contests for a user
export const getBookmarkedContests = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch all bookmarked contests for the user
    const bookmarkedContests = await prisma.savedContests.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // Sort by creation date (latest first)
    });

    res.status(200).json(bookmarkedContests);
  } catch (error) {
    console.error("Error fetching bookmarked contests:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
