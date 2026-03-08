
import {
  generateCodeWithGemini,
  updateFileWithPrompt,
} from "../services/aiService.js";
import mongoose from "mongoose";
import File from "../models/File.js";
import Project from "../models/Project.js";
import Folder from "../models/FolderModel.js";
import RecentProject from "../models/RecentProject.js";

// 🔹 Generate code and save files in DB
export const generateCode = async (req, res) => {
  const { prompt, userId } = req.body;

  if (!prompt || !userId) {
    return res.status(400).json({ message: "Prompt and userId is required" });
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);

  try {
    // 🔥 Generate code from AI
    const result = await generateCodeWithGemini(prompt);

    let parsedFiles = [];

    // 🧠 Detect format: JSON array or plain code
    if (Array.isArray(result)) {
      parsedFiles = result; // already valid array of files
    } else if (typeof result === "string") {
      try {
        const cleaned = result.replace(/```[a-z]*\n?/gi, "").replace(/```/g, "").trim();
        parsedFiles = JSON.parse(cleaned);
      } catch (parseError) {
        // If parsing fails, assume plain code for main.jsx
        console.warn("⚠️ AI returned plain code, not JSON. Wrapping in default file.");
        parsedFiles = [
          {
            name: "frontend/src/main.jsx",
            content: result,
            type: "js",
          },
        ];
      }
    } else {
      console.error("❌ Unexpected AI response type:", typeof result);
      return res.status(500).json({ message: "Invalid response from AI" });
    }

    // 🧾 Create new project
    const newProject = new Project({
      name: `Project-${Date.now()}`,
      prompt,
      userId: userObjectId,
    });
    const savedProject = await newProject.save();

    const newFolder = new Folder({
      name: "root",
      projectId: savedProject._id,
    });
    const savedFolder = await newFolder.save();

    const recentProject = new RecentProject({
      userId: userObjectId,
      projectId: savedProject._id,
      folderId: savedFolder._id,
    });
    await recentProject.save();

    // 🔍 Filter invalid files
    const validFiles = parsedFiles.filter((file) => file.name && file.content && file.type);
    const invalidFiles = parsedFiles.filter((file) => !file.name || !file.content || !file.type);
    if (invalidFiles.length > 0) console.warn("⚠️ Skipping invalid files:", invalidFiles);

    const filesToSave = validFiles.map((file) => ({
      projectId: savedProject._id,
      folderId: savedFolder._id,
      name: file.name,
      content: file.content,
      type: file.type,
    }));

    const savedFiles = await File.insertMany(filesToSave);

    res.status(200).json({
      message: "Code generated and saved successfully",
      files: savedFiles,
      projectId: savedProject._id,
      folderId: savedFolder._id,
    });
  } catch (error) {
    console.error("❌ Error in generateCode:", error.message);
    res.status(500).json({
      message: "Failed to generate and save code",
      error: error.message,
    });
  }
};

// 🔹 Get original prompt
export const getProjectPrompt = async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) return res.status(400).json({ message: "Project ID is required" });

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ prompt: project.prompt || "No prompt found" });
  } catch (error) {
    console.error("❌ Error fetching project prompt:", error.message);
    res.status(500).json({ message: "Failed to fetch project prompt" });
  }
};

// 🔄 Update project files using new prompt
export const updateProject = async (req, res) => {
  const { prompt, filename } = req.body;
  const { projectId } = req.params;

  if (!prompt) return res.status(400).json({ error: "Prompt is required" });
  if (!mongoose.Types.ObjectId.isValid(projectId))
    return res.status(400).json({ message: "Invalid project ID format" });

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    let files = filename
      ? await File.find({ projectId, name: filename })
      : await File.find({ projectId });

    if (!files || files.length === 0)
      return res.status(404).json({ message: "No files found to update" });

    const updatedFiles = await Promise.all(
      files.map(async (file) => {
        try {
          const updatedContent = await updateFileWithPrompt(file.name, file.content, prompt);
          if (typeof updatedContent !== "string")
            throw new Error("Invalid AI response format");

          file.content = updatedContent;
          await file.save();
          return { name: file.name, content: file.content };
        } catch (error) {
          console.error(`❌ Error updating file ${file.name}:`, error.message);
          return { name: file.name, error: error.message };
        }
      })
    );

    res.status(200).json({
      message: "Project updated successfully",
      files: updatedFiles,
    });
  } catch (error) {
    console.error("❌ Error in updateProject:", error.message);
    res.status(500).json({
      message: "Failed to update project",
      error: error.message,
    });
  }
};
