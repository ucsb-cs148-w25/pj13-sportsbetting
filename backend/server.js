import express from 'express';
import dotenv from 'dotenv';
import Routes from './routes/routes.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

dotenv.config({ path: './backend/.env' });

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.BACKEND_SERVER_HOST || "http://localhost";

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3001",
        "http://localhost:3000",  // Add this line if not already present
        "https://pj13-sportsbetting-1-frontend.onrender.com",
        "pj13-sportsbetting-tommy-scripts.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]  // Add this line
}));

app.use(express.json());

// Scraper function
const scrapeNBAInjuries = async () => {
    try {
        const url = "https://www.espn.com/nba/injuries";
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const injuries = [];

        $(".Wrapper .ResponsiveTable").each((_, element) => {
            const teamName = $(element).find(".Table__Title").text().trim();
            const players = [];

            $(element)
                .find("tbody > tr")
                .each((_, row) => {
                    const playerName = $(row).find("td:nth-child(1)").text().trim();
                    const position = $(row).find("td:nth-child(2)").text().trim();
                    const injuryStatus = $(row).find("td:nth-child(3)").text().trim();
                    const injuryDetails = $(row).find("td:nth-child(4)").text().trim();

                    players.push({
                        playerName,
                        position,
                        injuryStatus,
                        injuryDetails,
                    });
                });

            if (players.length > 0) {
                injuries.push({ teamName, players });
            }
        });

        return injuries;
    } catch (error) {
        console.error("Error scraping NBA injuries:", error);
        throw error;
    }
};



app.use("/api", Routes);

app.listen(PORT, () => {
    connectDB();
    console.log(`🚀 Server is running on ${HOST}:${PORT}`);
});