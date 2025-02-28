### 1. **User Authentication**  
   This group handles the user login and sign-up process. The user provides credentials, which are sent to the backend server for authentication. If the user doesn't exist, a new account is created in Firebase.

### 2. **Leaderboard Retrieval**  
   When the user visits the leaderboard page, the frontend sends a request to the backend server to retrieve leaderboard data from Firebase and display it to the user.

### 3. **Bet Placement**  
   The user places a bet through the frontend, which sends a request to the backend server to store the bet details in Firebase for tracking purposes.

### 4. **Betting Page**  
   When the user visits the betting page, the frontend fetches the available bets from Firebase through the backend server to display them for the user to select from.

### 5. **Injury Scraper**  
   When the user visits the injury page, the frontend triggers the injury scraper. The backend scrapes ESPN for injury data, which is then stored in Firebase.

### 6. **Cron Job Updates (DAILY)**  
   This group represents the **CronJob**, which runs daily. It fetches the latest odds from the **OddsAPI**, stores them in Firebase, and updates user bets. It also ensures that the awarded bets are updated daily.


![alt text](image.png)


Use plant uml to generate the diagram.