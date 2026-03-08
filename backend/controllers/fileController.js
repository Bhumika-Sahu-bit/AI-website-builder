import mongoose from 'mongoose';
import * as fileService from '../services/fileService.js';
import Project from '../models/Project.js';
import Folder from "../models/FolderModel.js";


//get all files for a specific folder within a project
export const getAllFilesByFolder = async (req , res) => {
    const {projectId , folderId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(folderId)) {
        return res.status(400).json({ message: "Invalid Project ID or Folder ID format" });
    }

    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });
        
        const folder = await Folder.findById(folderId);
        if (!folder) return res.status(404).json({ message: "Folder not found" });

        const files = await fileService.getAllFilesByFolder(projectId, folderId);

        if(!files || files.length === 0) {
            return res.status(404).json({ message: "No files found in this folder" });
        }

        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch files", error: error.message });
    }
}

//get a file by name within a specific folder
export const getFileByName = async (req , res) => {
    const { projectId , folderId , name} = req.params;

    if (!projectId || !folderId || !name) {
        return res.status(400).json({ message: "Project ID, Folder ID, and File name are required" });
    }

    // 🔴 Validate IDs
    if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(folderId)) {
        return res.status(400).json({ message: "Invalid Project ID or Folder ID format" });
    }

    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        // ✅ Check if the folder exists
        const folder = await Folder.findById(folderId);
        if (!folder) return res.status(404).json({ message: "Folder not found" });

        

        const file = await fileService.getFileByName(projectId, folderId, name);


        if (!file) {
            return res.status(404).json({ message: "File not found in this folder" });
        }

        res.status(200).json(file);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch file", error: error.message });
    }
}

//delete a file by name within a specific folder
export const deleteFile = async (req , res) => {
    const { projectId , folderId , name} = req.params;

    if (!projectId || !folderId || !name) {
        return res.status(400).json({ message: "Project ID, Folder ID, and File name are required" });
    }

    // 🔴 Validate IDs
    if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(folderId)) {
        return res.status(400).json({ message: "Invalid Project ID or Folder ID format" });
    }

    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        // ✅ Check if the folder exists
        const folder = await Folder.findById(folderId);
        if (!folder) return res.status(404).json({ message: "Folder not found" });

        // ✅ Delete the file
        const deletedFile = await fileService.deleteFile(projectId, folderId, name);

        if (!deletedFile) {
            return res.status(404).json({ message: "File not found in this folder" });
        }

        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete file", error: error.message });
    }
}
