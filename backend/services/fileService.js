import mongoose from 'mongoose';
import File from '../models/File.js';
import Project from '../models/Project.js';  // If you have a separate Project model
import Folder from "../models/FolderModel.js";

// Service for getting all files by project ID
export const getAllFilesByFolder = async (projectId , folderId) => {
    try {
        
        return await File.find({ projectId : new mongoose.Types.ObjectId(projectId) , folderId });
    } catch (error) {
        console.error('Error getting files by projectId:', error.message);
        return [];
    }
}

// Service for getting a single file by projectId and file name
export const getFileByName = async (projectId , folderId , name ) => {
    try {
            const file = await File.findOne({ projectId:new mongoose.Types.ObjectId(projectId) , folderId , name});
        if (!file) throw new Error('File not found');
        return file;
    } catch (error) {
        console.error('Error getting file by ID:', error.message);
        return null;
    }
};


// Service for deleting a file by projectId and file name
export const deleteFile = async (projectId , folderId , name ) => {
    try {
       
        const deletedFile = await File.findOneAndDelete({ projectId:new mongoose.Types.ObjectId(projectId) , folderId  , name});
        if (!deletedFile) throw new Error('File not found for deletion');
        return deletedFile;
    } catch (error) {
        console.error('Error deleting file:', error.message);
        return null;
    }
};
