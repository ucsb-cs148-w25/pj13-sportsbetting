import express from 'express';
import dotenv from 'dotenv';
import Routes from './routes/routes.js';
import { connectDB } from './config/db.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use( cors({
    origin: "http://localhost:5173", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // HTTP methods to allow
  }));

app.use(express.json());

app.use("/api", Routes);
const PORT = process.env.PORT || 5000; // Default to port 5000 if not defined
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});