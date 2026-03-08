import express from 'express';
import * as fileController from '../controllers/fileController.js';

const router = express.Router();

router.get('/:projectId/folder/:folderId' , fileController.getAllFilesByFolder);

router.get('/:projectId/folder/:folderId/:name' , fileController.getFileByName);

router.delete('/:projectId/folder/:folderId/:name' , fileController.deleteFile);

export default router;
