import express from 'express';
import dotenv from 'dotenv';
import Routes from './routes/routes.js';
import { connectDB } from './config/db.js';
import cors from 'cors';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use( cors({
    origin: ["http://localhost:5173","http://localhost:3000"],// Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // HTTP methods to allow
  }));

app.use(express.json());

app.use("/api", Routes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});