// functions/scrapeInjuries.js
import * as functions from 'firebase-functions';
import axios from 'axios';
import cheerio from 'cheerio';
import { connectDB } from '../backend/db.js'; // using your existing db connection

exports.scrapeNBAInjuries = functions.pubsub.schedule('every 6 hours').onRun(async (context) => {
  try {
    const db = await connectDB();
    
    const url = "https://www.espn.com/nba/injuries";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    const injuries = [];
    
    $(".Wrapper .ResponsiveTable").each((_, element) => {
      const teamName = $(element).find(".Table__Title").text().trim();
      const players = [];
      
      $(element).find("tbody > tr").each((_, row) => {
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

    await db.collection('nba-injuries').doc('latest').set({
      injuries,
      lastUpdated: new Date()
    });

    console.log('NBA injuries data updated successfully');
    return null;
  } catch (error) {
    console.error('Error scraping NBA injuries:', error);
    throw error;
  }
});