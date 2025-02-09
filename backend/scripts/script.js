import { updateBets } from './update_bets.js';
import { award } from './award_users.js';
import { add } from './add_new_bets.js';
import cron from 'node-cron';

export async function script() {
    await add();
    const bet_pairs = await updateBets();
    await award(bet_pairs);
}


const args = process.argv.slice(2);

if (args.length === 0) {
    script().catch(error => {
        console.error('Error running script:', error);
    });
} else if (args[0] === 'run') {
    // Every morning at 6am
    console.log('Scheduling script to run every morning at 6am...');
    cron.schedule('0 6 * * *', async () => {
        try {
            console.log('Running script...');
            await script();
        } catch (error) {
            console.error('Error running script:', error);
        }
    });
} else {
    console.error('Invalid argument provided.');
}