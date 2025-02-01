import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import API_BASE_URL from "../API_BASE_URL.js";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 'https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=${PUT-KEY-HERE}&regions=us&markets=h2h'
const ODDS_API_URL_NBA = 'https://api.the-odds-api.com/v4/sports/basketball_nba/odds/'
const ODDS_API_KEY = process.env.ODDS_API_KEY;
const odds_api_bet_query_params = new URLSearchParams({
    apiKey: ODDS_API_KEY, // Use the API key from the environment variables
    regions: 'us',
    markets: 'h2h',
});

const BACKEND_SERVER_URL = `${API_BASE_URL}/api/bets`;
const BACKEND_SERVER_TOKEN = process.env.BACKEND_SERVER_TOKEN;


// Get NBA bets
async function fetchBets() {
    console.log('Fetching bets...');
    try {
        const fullURL = `${ODDS_API_URL_NBA}?${odds_api_bet_query_params.toString()}`;
        const response = await axios.get(fullURL);
        console.log('Sucessfully fetched ', response.data.length, ' bets');
        return response.data;
    } catch (error) {
        console.error('Error fetching bets:', error);
    }
}

async function parse_api_response(bets) {
    // Parse the API response into format that can be used with our backend server
    console.log('Parsing bets...');

    // for each game, get first bookmaker and first market
    const new_bets = [];
    for (const bet of bets) {
        try {
            const bet_id = bet.id;
            const bookmaker = bet.bookmakers[0];
            const market = bookmaker.markets[0];
            const outcomes = market.outcomes;
            const team1 = outcomes[0].name;
            const team2 = outcomes[1].name;
            const startTime = bet.commence_time;
            const endTime = bet.commence_time;
            const winner = null;
            const betStatus = 'open';
            const team1_price = outcomes[0].price;
            const team2_price = outcomes[1].price;

            const new_bet = {
                bet_id,
                team1,
                team2,
                startTime,
                endTime,
                winner,
                betStatus,
                team1_price,
                team2_price,
            };

            new_bets.push(new_bet);
        } catch (error) {
            console.error('Error parsing bet:', error);
        }
    }
    console.log('Parsed ', new_bets.length, ' bets');
    return new_bets;
}

async function add_new_bet(bet) {
    try {
        const headers = {
            Authorization: `${BACKEND_SERVER_TOKEN}`
        };
        const response = await axios.post(BACKEND_SERVER_URL, bet, { headers });
        console.log(response.data);
        return 1;
    }
    catch (error) {
        console.error('Error adding new bet:', error);
        return 0;
    }
}

async function script() {
    const bets = await fetchBets();
    const new_bets = await parse_api_response(bets);
    console.log(new_bets);
    let total_added = 0;
    for (const bet of new_bets) {
        total_added += await add_new_bet(bet);
    }
    console.log('Added ', total_added, ' new bets');
}

script();