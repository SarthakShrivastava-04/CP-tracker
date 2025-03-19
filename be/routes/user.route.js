import express from "express";
import {
  updateUsernames,
  fetchUserStats,
} from "../controllers/user.controller.js";
import { auth } from "../middleware/verifyToken.js";

const router = express.Router();
router.post("/stats", auth, fetchUserStats);
router.post("/update", auth, updateUsernames);

export default router;
