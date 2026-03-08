// import { startReactPreviewServer } from '../services/previewService.js';

// export const handleReactPreview = async (req, res) => {
//     const { projectId, folderId } = req.params;

//     try {
//         console.log(`Handling React Preview for project ${projectId} and folder ${folderId}`);
//         const { port } = await startReactPreviewServer(projectId, folderId);
//         const previewUrl = `http://127.0.0.1:${port}`;

//         res.status(200).json({ previewUrl });
//     } catch (error) {
//         console.error("🔥 Error in React preview:", error.message);
//         res.status(500).json({ error: "Failed to start React preview", message: error.message });
//     }
// };


import { startReactPreviewServer } from "../services/previewService.js";
import os from "os";

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

export const handleReactPreview = async (req, res) => {
  const { projectId, folderId } = req.params;

  try {
    console.log(`Handling React Preview for project ${projectId} and folder ${folderId}`);
    const { port } = await startReactPreviewServer(projectId, folderId);
    const previewUrl = `http://${getLocalIP()}:${port}`;
    res.status(200).json({ previewUrl });
  } catch (error) {
    console.error("🔥 Error in React preview:", error.message);
    res.status(500).json({ error: "Failed to start React preview", message: error.message });
  }
};
