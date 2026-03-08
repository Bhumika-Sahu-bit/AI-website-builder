import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {strict: true, timestamps: true});

export default mongoose.model('File', fileSchema);