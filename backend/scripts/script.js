import { updateBets } from './update_bets.js';
import { award } from './award_users.js';
import { add } from './add_new_bets.js';

export async function script() {
    await add();
    const bet_pairs = await updateBets();
    await award(bet_pairs);
}

script();