import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import aiRoutes from './routes/aiRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import previewRoutes from './routes/previewRoutes.js';
import downloadRoute from "./routes/projectRoute.js";
import authRoutes from './routes/authRoutes.js';
import RecentRoutes from "./routes/RecentRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve the React app after it is built
app.use(express.static('build'));

app.use('/api/ai', aiRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/preview', previewRoutes);
app.use('/api' , downloadRoute);
app.use('/api/auth', authRoutes);
app.use('/api/recent', RecentRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})