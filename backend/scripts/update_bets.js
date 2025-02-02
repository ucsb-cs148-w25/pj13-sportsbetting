import axios from 'axios';
import dotenv from 'dotenv';
import path, { parse } from 'path';
import { fileURLToPath } from 'url';
import API_BASE_URL from "../API_BASE_URL.js";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ODDS_API_URL_NBA = 'https://api.the-odds-api.com/v4/sports/basketball_nba/scores/'
const ODDS_API_KEY = process.env.ODDS_API_KEY;
const odds_api_bet_query_params = new URLSearchParams({
    apiKey: ODDS_API_KEY, // Use the API key from the environment variables
    daysFrom: 3
});

const BACKEND_SERVER_URL = `${API_BASE_URL}/api/bets`;
const BACKEND_SERVER_TOKEN = process.env.BACKEND_SERVER_TOKEN;

// Get NBA scores
async function fetchScores() {
    console.log('Fetching scores...');
    try {
        const fullURL = `${ODDS_API_URL_NBA}?${odds_api_bet_query_params.toString()}`;
        const response = await axios.get(fullURL);
        console.log('Sucessfully fetched ', response.data.length, ' scores');
        return response.data;
    } catch (error) {
        console.error('Error fetching scores:', error);
    }
}

async function update_winner(bet_id, winner) {
    try {
        const headers = {
            Authorization: `${BACKEND_SERVER_TOKEN}`
        };
        const url_with_id = `${BACKEND_SERVER_URL}/${bet_id}`;
        // prepare updated data
        const data = { 'winner' : winner, 'betStatus' : 'closed' };
        const response = await axios.put(url_with_id, data, { headers });
        console.log(response.data);
        return 1;
    }
    catch (error) {
        console.error('Error updated bet:', error);
        return 0;
    }

}

async function parse_api_response(scores) {
    console.log('Parsing scores...');
    // For each game, compare scores and extract id and winner. Store these pairs in a list

    const new_bet_winner_pairs = [];
    for (const score of scores) {
        if (score.completed) {
            const bet_id = score.id;
            const home_score = parseInt(score.scores[0].score);
            const away_score = parseInt(score.scores[1].score);
            let winner = null;
            if (home_score > away_score) {
                winner = score.scores[0].name;
            } else {
                winner = score.scores[1].name;
            }
            new_bet_winner_pairs.push({ bet_id, winner });
        }
    }
    console.log('Parsed ', new_bet_winner_pairs.length, ' scores');
    return new_bet_winner_pairs;
}

async function script() {
    const scores = await fetchScores();
    const new_bet_winner_pairs = await parse_api_response(scores);

    console.log("Number of fetched bets: ", new_bet_winner_pairs.length);
    console.log(new_bet_winner_pairs);

    const results = await Promise.allSettled(
        new_bet_winner_pairs.map(pair => update_winner(pair.bet_id, pair.winner))
    );

    const total_updated = results.filter(result => result.status === "fulfilled" && result.value === 1).length;

    console.log('Updated', total_updated, 'bets');
}

script();