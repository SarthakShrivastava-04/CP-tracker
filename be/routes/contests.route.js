import express from "express";
import { codeforcesPastContests } from "../controllers/contests.controller.js";
import { codeforcesUpcomingContests } from "../controllers/contests.controller.js";

const router = express.Router();

router.get("/upcoming", codeforcesUpcomingContests);
router.get("/past/cf/:handle", codeforcesPastContests);
router.get("/past/cc/:handle", codeforcesPastContests);
router.get("/past/lc/:handle", codeforcesPastContests);

export default router;
