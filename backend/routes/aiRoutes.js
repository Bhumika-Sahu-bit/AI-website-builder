import express from 'express';
import { generateCode , updateProject , getProjectPrompt } from '../controllers/aiController.js';

const router = express.Router();

router.post('/generate' , generateCode);

router.get("/:projectId" , getProjectPrompt);
router.post('/update/:projectId' , updateProject);

export default router;