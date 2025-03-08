import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import API_BASE_URL from "../API_BASE_URL.js";

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
    // Returns a list of userbets that have bet on a specific bet id
    // Format: {userId, betId, teamChosen, amount, potentialWinnings, status}
    try {
        const response = await axios.get(`${BACKEND_SERVER_URL}/api/userbets/bet_id/${bet_id}`, { headers });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error getting users on bet:', error.response.status);
        } else {
            console.error('Error getting users on bet');
        }
    }
}

async function get_bet_info(bet_id) {
    try {
        const response = await axios.get(`${BACKEND_SERVER_URL}/api/bets/${bet_id}`, { headers });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error getting bet info:', error.response.status);
        } else {
            console.error('Error getting bet info');
        }
    }
}

async function award_users_on_bet(users_list, winner, bet_id) {
    // Award users that have bet on a specific bet
    const bet_info = (await get_bet_info(bet_id)).data;
    const team1_price = bet_info.team1_price;
    const team2_price = bet_info.team2_price;
    console.log('Awarding ', users_list.data.length, 'users on bet: ', bet_id, ' ', winner);
    const awardPromises = users_list.data.map(async (user) => {
        const user_id = user.userId;
        const amount = user.amount;
        const team = user.teamChosen;
        const userBetId = user.id;
        let award = 0;
        if (team === winner) {
            const odds = (team === bet_info.team1) ? team1_price : team2_price;
            award = (odds < 0) 
                ? amount * (1 + 100 / Math.abs(odds))
                : amount * (1 + odds / 100);
        }
        await award_user(user_id, award, userBetId);
    });

    await Promise.allSettled(awardPromises);
}

async function award_user(user_id, amount, userBetId) {
    // TODO
    console.log('Awarding user: ', user_id, ' amount: ', amount, ' userBetId: ', userBetId);
    try {
        // Need endpoint to update totalWinnings and balance
        const body = { amount: amount, userBetId: userBetId };
        const response = await axios.patch(`${BACKEND_SERVER_URL}/api/users/${user_id}/balance`, body, { headers });
        return response.data;
    } catch (error) {
        console.error('Error awarding users:', error);
    }
}

async function award(bet_pairs) {
    // Takes in a list of bet pairs: {bet_id, winner} and awards the users that have bet on these bets
    const awardPromises = bet_pairs.map(async (pair) => {
        const bet_id = pair.bet_id;
        const winner = pair.winner;
        const users_list = await get_users_on_bet(bet_id);
        return award_users_on_bet(users_list, winner, bet_id);
    });

    await Promise.allSettled(awardPromises);
}

export { award };