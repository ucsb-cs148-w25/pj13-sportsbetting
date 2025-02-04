import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import API_BASE_URL from "../API_BASE_URL.js";
// import { new_bet_winner_pairs} from './update_bets.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables from the .env file for local development
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

const BACKEND_SERVER_URL = API_BASE_URL;
const BACKEND_SERVER_TOKEN = process.env.BACKEND_SERVER_TOKEN;
const headers = {
    Authorization: `${BACKEND_SERVER_TOKEN}`
};


// 1. Get all bets that have been updated
// 2. Get all users that have bet on these bets
// 3. Award the users that have won their bets

async function get_users_on_bet(bet_id) {
    // Returns a list of users that have bet on a specific bet id
    console.log('Getting users on bet...');
    try {
        const response = await axios.get(`${BACKEND_SERVER_URL}/api/userbets/bet_id/${bet_id}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error getting users on bet:', error);
    }
}

async function get_bet_info(bet_id) {
    try {
        const response = await axios.get(`${BACKEND_SERVER_URL}/api/bets/${bet_id}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error getting bet info:', error);
    }
}

async function award_users_on_bet(users_list, winner, bet_id) {
    console.log('Awarding users on bet...');
    const bet_info = await get_bet_info(bet_id);
    const team1_price = bet_info.team1_price;
    const team2_price = bet_info.team2_price;

    for (const user of users_list) {
        const user_id = user.user_id;
        const amount = user.amount;
        const team = user.team;
        const userBetId = user.id;
        let award = 0;
        if (team === winner) {
            if (winner === bet_info.team1) {
                award = amount * team1_price;
            } else {
                award = amount * team2_price;
            }
        }
        await award_user(user_id, award, userBetId);
    }

}

async function award_user(user_id, amount, userBetId) {
    // TODO
    console.log('Awarding users...');
    try {
        // Need endpoint to update totalWinnings and balance
        const body = { amount: amount, userBetId: userBetId };
        const response = await axios.patch(`${BACKEND_SERVER_URL}/api/users/${user_id}/balance`, body, { headers });
        return response.data;
    } catch (error) {
        console.error('Error awarding users:', error);
    }
}

async function script() {
    console.log('Awarding users...');
    for (const pair of new_bet_winner_pairs) {
        const bet_id = pair.bet_id;
        const winner = pair.winner;
        const users_list = await get_users_on_bet(bet_id);
        await award_users_on_bet(users_list, winner, bet_id);
    }
}