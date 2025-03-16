import express from "express";
import { fetchUpcomingContests } from "../controllers/upcomingContests.js";
import { fetchAllAttendedContests } from "../controllers/attendedContests.controller.js";
import { bookmarkContest, getBookmarkedContests } from "../controllers/bookmark.controller.js";

const router = express.Router();

router.get("/upcoming", fetchUpcomingContests);
router.post("/past", fetchAllAttendedContests);
router.get("/bookmarks", getBookmarkedContests);
router.post("/bookmarks", bookmarkContest);


export default router;