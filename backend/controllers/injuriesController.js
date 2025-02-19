import { connectDB } from "../config/db.js";
import { checkToken } from '../services/tokenAuth.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getNBAInjuries(req, res) {
    console.log("Get NBA Injuries Function");
    try {
        const db = await connectDB();
        const injuriesRef = db.collection("nba-injuries");
        const doc = await injuriesRef.doc('latest').get();

        if (!doc.exists) {
            return res.status(200).json({ 
                success: true, 
                data: [], 
                message: "No injury data found" 
            });
        }

        const injuriesData = doc.data();

        res.status(200).json({ 
            success: true, 
            data: injuriesData.injuries || [], 
            lastUpdated: injuriesData.lastUpdated 
        });
    } catch (error) {
        console.log("Error getting NBA injuries: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const postNBAInjuries = async (req, res) => {
    console.log('Scrape injuries endpoint hit');
    try {
        // Log the database connection attempt
        console.log('Attempting to connect to database...');
        const db = await connectDB();
        console.log('Database connection successful');

        const url = "https://www.espn.com/nba/injuries";
        console.log('Fetching injuries from URL:', url);
        
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const injuries = [];

        // Log the scraping process
        console.log('Starting to scrape injuries...');
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

        console.log(`Scraped ${injuries.length} teams with injuries`);

        // Log before Firestore upload
        console.log('Preparing to upload to Firestore...');
        const docRef = db.collection('nba-injuries').doc('latest');
        
        try {
            await docRef.set({
                injuries,
                lastUpdated: new Date()
            });
            console.log('Successfully uploaded to Firestore');
        } catch (uploadError) {
            console.error('Firestore upload error:', uploadError);
            throw uploadError;
        }

        console.log("Scrape successful, teams with injuries:", injuries.length);

        res.status(201).json({ 
            success: true, 
            message: 'Injuries data updated successfully',
            data: {
                injuries,
                lastUpdated: new Date()
            }
        });
    } catch (error) {
        console.error("Full error details:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: error.toString(),
            errorDetails: error.message,
            stack: error.stack
        });
    }
};
