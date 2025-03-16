import express from "express";
import { fetchUserStats } from "../controllers/stats.controller.js";

const router = express.Router();
router.post("/", fetchUserStats);

export default router;