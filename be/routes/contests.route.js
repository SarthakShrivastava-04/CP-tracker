import express from "express";
import {codechefPastContests} from "../controllers/codchef.controller.js";
import {codeforcesPastContests} from "../controllers/codeforces.controller.js";
import { leetcodePastContests } from "../controllers/leetcode.controller.js";
import { upcomingContests } from "../controllers/upcomingContests.js";

const router = express.Router();

router.get("/upcoming", upcomingContests);
router.get("/past/cf/:handle", codeforcesPastContests);
router.get("/past/lc/:handle", leetcodePastContests);
router.get("/past/cc/:handle", codechefPastContests);

export default router;