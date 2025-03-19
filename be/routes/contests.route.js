import express from "express";
import { fetchUpcomingContests } from "../controllers/upcomingContests.js";
import { fetchAllAttendedContests } from "../controllers/attendedContests.controller.js";
import {
  bookmarkContest,
  getBookmarkedContests,
} from "../controllers/bookmark.controller.js";
import { auth } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/upcoming", fetchUpcomingContests);
router.post("/past", auth, fetchAllAttendedContests);
router.get("/bookmarks", auth, getBookmarkedContests);
router.post("/bookmarks", auth, bookmarkContest);

export default router;
