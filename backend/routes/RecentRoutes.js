import express from "express";
import { getRecentProjects } from "../controllers/RecentController.js";
const router = express.Router();

// 🔐 Route to get recent projects of the logged-in user
router.get("/:userId", getRecentProjects);

console.log("Recent routes mounted at /api/recent");

export default router;
