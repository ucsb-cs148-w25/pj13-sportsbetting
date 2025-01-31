# Routes

Host: localhost:{PORT SET IN .env}/api/

## Routes follow this format:

User: /users/
- Get all users: GET /users/
- Get user by id: GET /users/:id
- Create user: POST /users/:id
- Update user: PUT /users/:id
- Delete user: DELETE /users/:id


Ex: call http://localhost:3000/api/users/ to get all users


## How to run the backend server

1. Follow README in config folder

1. `npm install`

2. `node server.js` or `npm run dev` in root folder to run server
