import express from 'express';
import dotenv from 'dotenv';
import Routes from './routes/routes.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();
// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use( cors({
    origin: "http://localhost:5173", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // HTTP methods to allow
  }));

app.use(express.json());

app.use("/api", Routes);

app.listen(process.env.BACKEND_SERVER_PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${process.env.BACKEND_SERVER_PORT}`);
});