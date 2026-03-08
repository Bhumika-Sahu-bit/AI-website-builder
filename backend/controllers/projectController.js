// controllers/downloadController.js

import fs from 'fs';
import path from 'path';
import os from 'os';
import archiver from 'archiver';
import File from '../models/File.js';
import Folder from '../models/FolderModel.js';

// Helper to create folder structure & zip
export const downloadProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) return res.status(400).json({ error: "Project ID is required" });

    // 🗂 Get all folders and files in this project
    const folders = await Folder.find({ projectId });
    const files = await File.find({ projectId });

    if (files.length === 0) return res.status(404).json({ error: "No files found for this project" });

    const tempDir = path.join(os.tmpdir(), `project_${projectId}`);
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    // 📂 Rebuild the folder and file structure in /tmp
    for (const file of files) {
      const filePath = path.join(tempDir, file.name);
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(filePath, file.content);
    }

    const zipPath = path.join(os.tmpdir(), `project_${projectId}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`📦 Zipped project (${archive.pointer()} bytes)`);

      // Send zip file to client
      res.download(zipPath, `project_${projectId}.zip`, (err) => {
        if (err) console.error("❌ Download error:", err);

        // ✅ Clean up files after download
        fs.rmSync(tempDir, { recursive: true, force: true });
        fs.unlinkSync(zipPath);
      });
    });

    archive.on('error', err => {
      throw err;
    });

    archive.pipe(output);
    archive.directory(tempDir, false); // zip folder content only, not root
    archive.finalize();

  } catch (err) {
    console.error("❌ ZIP Download Failed:", err);
    res.status(500).json({ error: "Failed to download project" });
  }
};
