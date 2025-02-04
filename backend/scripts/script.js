import { updateBets } from './update_bets.js';
import { award } from './award_users.js';

export async function script() {
    const bet_pairs = await updateBets();
    await award(bet_pairs);
}

script();