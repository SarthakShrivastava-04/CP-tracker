import express from "express";
import { fetchUpcomingContests } from "../controllers/upcomingContests.js";
import { fetchAllAttendedContests } from "../controllers/attendedContests.controller.js";

const router = express.Router();

router.get("/upcoming", fetchUpcomingContests);
router.post("/past", fetchAllAttendedContests);

export default router;