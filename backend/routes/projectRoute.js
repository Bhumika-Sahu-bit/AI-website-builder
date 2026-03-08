import express from "express";

const router = express.Router();

import { downloadProject } from "../controllers/projectController.js";

router.get("/projects/:projectId/download", downloadProject);

export default router;
