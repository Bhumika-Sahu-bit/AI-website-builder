import mongoose from "mongoose";

const recentProjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
        required: true,
    },
}, { timestamps: true });

const RecentProject = mongoose.model("RecentProject", recentProjectSchema);
export default RecentProject;