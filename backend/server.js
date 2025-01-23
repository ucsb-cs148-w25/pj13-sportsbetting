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

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});