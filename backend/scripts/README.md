# Scripts for fire-base database

## Setup
- Make sure `.env` is created and set up


### `add_new_bets.js`

- Adds new bets to the database by querying odds-api for bets, then adds to our firebase.
- Run `node add_new_bets.js` to add new bets to the database.

Should be run (everyday?) to update the database with new bets.