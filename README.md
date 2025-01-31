# BetBuddies

### Project Description

**BetBuddies** is a competitive sports betting app where users compete against friends using _fake money_ to see who’s the best sports bettor. This app simulates real-world sports betting scenarios while keeping it fun and risk-free. The goal is to create an engaging platform where friends can enjoy sports events and friendly competition without financial stakes.

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

| Name           | GitHub ID             |
| -------------- | --------------------- |
| Daniel Hwang   | dhwang154             |
| Colin Baylis   | colinbaylis           |
| Jonathan Zhang | jonathanzhang2027     |
| Andy Jin       | andyjin1              |
| Thomas So      | Tommygithubaccount123 |
| Bryce Wang     | brycewangg            |
| Ryan Vo        | ryanvo504             |

# 📌 **Setup Guide**

# Project Setup Instructions

- **Install Dependencies**

  - **Git**
    - **Check Installation:**
      - Run: `git --version`
    - **If Git is not installed:**
      - **macOS (using Homebrew):**
        - Run: `brew install git`
      - **Ubuntu/Debian:**
        - Run: `sudo apt update && sudo apt install git -y`
      - **Windows:**
        - Download and install from: [Git Downloads](https://git-scm.com/downloads)
  - **Node.js and npm**
    - **Option 1: Install via Package Manager**
      - **Check Installation:**
        - Run: `node --version`
        - Run: `npm --version`
      - **If Node.js is not installed:**
        - **macOS (using Homebrew):**
          - Run: `brew install node`
        - **Ubuntu/Debian:**
          - Run:
            - `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -`
            - Then: `sudo apt install -y nodejs`
        - **Windows:**
          - Download and install from: [Node.js Downloads](https://nodejs.org/)
    - **Option 2: Install via nvm (Node Version Manager)**
      - **Install nvm:**
        - **macOS/Linux:**
          - Run: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
          - Then, restart your terminal or run: `source ~/.nvm/nvm.sh`
        - **Windows:**
          - Download and install nvm-windows from: [nvm-windows Releases](https://github.com/coreybutler/nvm-windows/releases)
      - **Install the Latest Node.js Version Using nvm:**
        - Run: `nvm install node`
      - **Use the Installed Node.js Version:**
        - Run: `nvm use node`

- **Clone the Repository**

  - Run: `git clone https://github.com/ucsb-cs148-w25/pj13-sportsbetting.git`

- **Navigate to Project Directory**

  - Run: `cd pj13-sportsbetting`

- **Set Up Environment Variables**

  - Copy env templates:
    - `cp .env-template backend/.env`
    - `cp .env-frontend-template betbuddies/.env`
    - `cd backend/config/db.js`
    - comment out line 19 to `credential: admin.credential.cert('/backend/config/serviceAccountKey.json')`(for local dev)
    - Fill in the values in the `.env` file
    - [ODDS_API_KEY](https://ucsb-cs148-w25.slack.com/archives/C088RQFCDLY/p1737585688948609)
    - PORT is for the backend server.
    - For the frontend .env file, make sure that variable names are prefixed with `REACT_APP_` for example `REACT_APP_BACKEND_SERVER_PORT=5001`

- **Follow README in backend folder to set up Firebase**

- **Navigate to the Frontend Directory**

  - Run: `cd betbuddies`

- **Install Frontend Dependencies**

  - Run: `npm install`

- **Start the Development Server**
  - Run: `npm start`

## Database Setup

- Follow the instructions provided in the README located in the `backend/config` folder.

## Functionality

This sportsbetting web app provides a user-friendly interface to view, analyze, and place bets on various NBA games. Below is a walkthrough of the main features:

1. **Homepage Overview**
   - Upon launching the app, you'll be greeted with a homepage listing current sports events.
   - Each event card displays basic details such as teams, start time, and preliminary odds.

2. **User Authentication**
   - Users can sign up and login to the app.
   - Users can also login via Google Auth.

3. **Placing a Bet**
   - Select your desired bet and input the stake amount.
   - Once confirmed, your bet is processed and stored in the database.

5. **Navigation & Filters**
   - Use the navigation menu to use the sportsbook, live betting, or the leaderboard.
   - Filter options allow you to quickly narrow down what you are looking for.

## Known Problems

- **User Authentication**
  - *Issue:* All pages are accessible to unauthenticated users.
  - *Steps to Reproduce:* Navigate to any page and monitor the odds for 5-10 seconds.
  - *Potential Location:* In our component files, we do not check if the user is authenticated before allowing them to access the page.

## Contributing

- **Fork the repository**
- **Create your feature branch:**
  - Run: `git checkout -b my-new-feature`
- **Commit your changes:**
  - Run: `git commit -am 'Add some feature'`
- **Push to your branch:**
  - Run: `git push origin my-new-feature`
- **Submit a pull request**