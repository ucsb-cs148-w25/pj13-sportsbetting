import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Calling this endpoint:
// 'https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=${PUT-KEY-HERE}&regions=us&markets=h2h'
const ODDS_API_URL_NBA = 'https://api.the-odds-api.com/v4/sports/basketball_nba/odds/'
const ODDS_API_KEY = process.env.ODDS_API_KEY;
const odds_api_bet_query_params = new URLSearchParams({
    apiKey: ODDS_API_KEY, // Use the API key from the environment variables
    regions: 'us',
    markets: 'h2h',
});

async function fetchBets() {
    try {
        const fullURL = `${ODDS_API_URL_NBA}?${odds_api_bet_query_params.toString()}`;
        console.log('Full URL:', fullURL);
        const response = await axios.get(fullURL);
        return response.data;
    } catch (error) {
        console.error('Error fetching bets:', error);
    }
}

// fetchBets();

async function add_new_bet(bet) {
    try {
        const response = await axios.post('http://localhost:5000/api/bets', bet);
        console.log(response.data);
    }
    catch (error) {
        console.error('Error adding new bet:', error);
    }
}