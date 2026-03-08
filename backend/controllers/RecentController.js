import mongoose from "mongoose";
import RecentProject from "../models/RecentProject.js";
import File from "../models/File.js"; // Make sure this path is correct

export const getRecentProjects = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Step 1: Get recent projects and populate project and folder
    const recentProjects = await RecentProject.find({ userId })
      .populate("projectId")
      .populate("folderId")
      .exec();

    if (recentProjects.length === 0) {
      return res.status(404).json({ message: "No recent projects found" });
    }

    // Step 2: For each folder, fetch its files and attach them
    const recentProjectsWithFiles = await Promise.all(
      recentProjects.map(async (project) => {
        const files = await File.find({ folderId: project.folderId._id });
        return {
          ...project.toObject(),
          folderId: {
            ...project.folderId.toObject(),
            files, // Add the files array here
          },
        };
      })
    );

    res.status(200).json(recentProjectsWithFiles);
  } catch (error) {
    console.error("Error fetching recent projects:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch recent projects", error: error.message });
  }
};
