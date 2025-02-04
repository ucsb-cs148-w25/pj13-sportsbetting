# Scripts for fire-base database

- Make sure `.env` is created and set up

### How to run

- `node script.js`

Each run costs 3 tokens

#### `add_new_bets.js`

- Adds new bets to the database by querying odds-api for bets, then adds to our firebase.
- Run `node add_new_bets.js` to add new bets to the database.

Should be run (everyday?) to update the database with new bets.

#### `update_bets.js`

- Updates the bets in firebase with the correct winner.

#### `award_users.js`

- Awards users with points based on the bets they have won.