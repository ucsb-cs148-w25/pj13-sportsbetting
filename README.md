# BetBuddies

### Project Description
**BetBuddies** is a competitive sports betting app where users compete against friends using *fake money* to see who’s the best sports bettor. This app simulates real-world sports betting scenarios while keeping it fun and risk-free. The goal is to create an engaging platform where friends can enjoy sports events and friendly competition without financial stakes.

---
### Web App Tech Stack

React, Node.js, Firebase

---
### User Roles

Our app will only have 2 kinds of user, sports bettors and admins to oversee the individual groups that people will compete in. Admins can invite people to groups or kick them out, as well as set all the rules for that group such as start and end time, starting money, etc.

---

### Documentation

[Link](https://docs.google.com/document/d/11tE5cdFQMYGccgxjDcKdH57ia8Lq5kfZL-AACeqZlQw/edit?usp=sharing)

---

### Team Members

| Name            | GitHub ID       |
|-----------------|-----------------|
| Daniel Hwang    | dhwang154   |
| Colin Baylis | colinbaylis   |
| Jonathan Zhang | jonathanzhang2027   |
| Andy Jin | andyjin1   |
| Thomas So | Tommygithubaccount123   |
| Bryce Wang | brycewangg   |
| Ryan Vo | ryanvo504   |

# Set up

1. Set up a `.env` file in the both the backend and the frontend(\betbuddies) directories of the project. Do this by:
    - `cp .env-template backend/.env`
    - `cp .env-frontend-template betbuddies/.env`
    - Fill in the values in the `.env` file
    - [ODDS_API_KEY](https://ucsb-cs148-w25.slack.com/archives/C088RQFCDLY/p1737585688948609)
    - BACKEND_SERVER_PORT is for the backend server.
    - For the frontend .env file, make sure that variable names are prefixed with `REACT_APP_` for example `REACT_APP_BACKEND_SERVER_PORT=5001`
  
2. Follow README in backend folder to set up Firebase
  
3. `npm run dev` for back-end server
4. `cd betbuddies`
5. `npm install`
6. `npm start`
