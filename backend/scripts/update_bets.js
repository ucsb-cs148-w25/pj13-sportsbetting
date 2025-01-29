import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const ODDS_API_URL_NBA = 'https://api.the-odds-api.com/v4/sports/basketball_nba/scores/'
const ODDS_API_KEY = process.env.ODDS_API_KEY;
const odds_api_bet_query_params = new URLSearchParams({
    apiKey: ODDS_API_KEY, // Use the API key from the environment variables
    daysFrom: 3
});

// TODO