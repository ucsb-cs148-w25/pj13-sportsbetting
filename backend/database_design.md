# Firebase Database Schema for Sports Betting Website

## 1. Users
Stores user information.

- `users/{userId}`
  - `username`: string
  - `email`: string
  - `balance`: number (e.g., wallet balance)
  - `totalWinnings`: number (e.g., cumulative winnings)
  - `groupIds`: array of strings (IDs of groups the user is part of)

---

## 2. Groups
Stores information about groups users can join.

- `groups/{groupId}`
  - `groupName`: string
  - `creatorId`: string (userId of group creator)
  - `memberIds`: array of strings (userIds of group members)
  - `leaderboard`: array of objects
    - Each object:
      - `userId`: string
      - `groupWinnings`: number (total winnings in this group)

---

## 3. Bets
Tracks betting events between two teams.

- `bets/{betId}`
  - `team1`: string (e.g., name of team 1)
  - `team2`: string (e.g., name of team 2)
  - `startTime`: timestamp
  - `endTime`: timestamp
  - `winner`: string (either `team1`, `team2`, or `null` if undecided)
  - `betStatus`: string (`open`, `closed`, `completed`)
  - `team1_price`: number (odds for team 1)
  - `team2_price`: number (odds for team 2)

---

## 4. User Bets
Tracks bets placed by users.

- `userBets/{userBetId}`
  - `userId`: string
  - `betId`: string (ID of the associated bet)
  - `teamChosen`: string (either `team1` or `team2`)
  - `amount`: number (amount bet by the user)
  - `potentialWinnings`: number (calculated winnings if the bet is correct)
  - `status`: string (`pending`, `won`, `lost`)

---

## 5. Leaderboard (Global)
Tracks global winnings for all users.

- `leaderboard/global`
  - `rankings`: array of objects
    - Each object:
      - `userId`: string
      - `totalWinnings`: number

---

## Rules and Indexes (for Optimization)
### Firebase Rules:
- Users can only access their own data (`users/{userId}` and `userBets/{userBetId}`).
- Group data can only be accessed by group members.
- Bets data can be public, but user-specific bets should be restricted.

### Indexes:
- `userBets` indexed by `userId` and `betId`.
- `groups` indexed by `memberIds`.
- `bets` indexed by `betStatus`.

---

## Additional Notes
- Consider using Firebase Cloud Functions for automating processes like closing bets, updating group and global leaderboards, and settling winnings.
- Use Firestore collections if the data will be dynamic and grow, as it supports scalability and querying well.
