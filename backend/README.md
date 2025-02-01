# Routes

Host: localhost:{PORT SET IN .env}/api/

## Routes follow this format:

User: /users/
- Get all users: GET /users/
- Get user by id: GET /users/:id
- Create user: POST /users/:id
- Update user: PUT /users/:id
- Delete user: DELETE /users/:id

Note: bets urls use bet_id instead of id


Ex: call http://localhost:3000/api/users/ to get all users


## How to run the backend server

1. Follow README in config folder. MAKE SURE ENVIRONMENT VARIABLES ARE SET

1. `npm install`

2. `node server.js` or `npm run dev` in root folder to run server

### Token Authentication

- Requests now require an 'authorization' header with a valid token

Ex:

```javascript
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
```
