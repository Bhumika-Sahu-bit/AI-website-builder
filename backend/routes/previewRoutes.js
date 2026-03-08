import express from 'express';
import { handleReactPreview } from '../controllers/previewController.js';

const router = express.Router();

router.post('/:projectId/:folderId', handleReactPreview);

export default router;
