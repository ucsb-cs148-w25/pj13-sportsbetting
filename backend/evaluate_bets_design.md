# Context

Need a script to update our bet results in firebase. Bets currently are set to null, but we need to update them to the correct team.

## Design plan

1. Query odds-api to get the results of past games.

2. Update the bets in firebase with the correct winner.
    - will need to match results with the correct game bet.
    - Will match queried id with bet_id in firebase. Then update the bet with the correct winner.

### API Call

`https://api.the-odds-api.com/v4/sports/basketball_nba/scores/?daysFrom=3&apiKey={API_KEY}`

- The game id field in the scores response matches the game id field in the odds response

- CAN ONLY GET 3 DAYS OF DATA

- team1 is away team, team2 is home team

<details>
    <summary>Click to expand</summary>

```json
[
    {
        "id": "de708b9536df1f308b67b97274fb58aa",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-28T00:10:00Z",
        "completed": true,
        "home_team": "Charlotte Hornets",
        "away_team": "Los Angeles Lakers",
        "scores": [
            {
                "name": "Charlotte Hornets",
                "score": "107"
            },
            {
                "name": "Los Angeles Lakers",
                "score": "112"
            }
        ],
        "last_update": "2025-01-28T10:17:09Z"
    },
    {
        "id": "ec53aa3f3f58e9c8f692cb7cf363f5df",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-28T00:10:00Z",
        "completed": true,
        "home_team": "Cleveland Cavaliers",
        "away_team": "Detroit Pistons",
        "scores": [
            {
                "name": "Cleveland Cavaliers",
                "score": "110"
            },
            {
                "name": "Detroit Pistons",
                "score": "91"
            }
        ],
        "last_update": "2025-01-28T10:17:09Z"
    },
    {
        "id": "49b423bea0e7b1eb1d1ff72b7cd5a917",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-28T00:40:00Z",
        "completed": true,
        "home_team": "Brooklyn Nets",
        "away_team": "Sacramento Kings",
        "scores": [
            {
                "name": "Brooklyn Nets",
                "score": "96"
            },
            {
                "name": "Sacramento Kings",
                "score": "110"
            }
        ],
        "last_update": "2025-01-28T10:17:09Z"
    },
    {
        "id": "fb2efb2987f18418760dcc3d3a8f9df1",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-28T00:40:32Z",
        "completed": true,
        "home_team": "Boston Celtics",
        "away_team": "Houston Rockets",
        "scores": [
            {
                "name": "Boston Celtics",
                "score": "112"
            },
            {
                "name": "Houston Rockets",
                "score": "114"
            }
        ],
        "last_update": "2025-01-28T10:17:09Z"
    },
    {
        "id": "900efdbd5d2eaa2267d6f09ddd74e6e3",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-28T00:41:54Z",
        "completed": true,
        "home_team": "New York Knicks",
        "away_team": "Memphis Grizzlies",
        "scores": [
            {
                "name": "New York Knicks",
                "score": "143"
            },
            {
                "name": "Memphis Grizzlies",
                "score": "106"
            }
        ],
        "last_update": "2025-01-28T10:17:09Z"
    },
    {
        "id": "427f94e9f94131f02fb70667fcee4ab4",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-28T00:42:00Z",
        "completed": true,
        "home_team": "Toronto Raptors",
        "away_team": "New Orleans Pelicans",
        "scores": [
            {
                "name": "Toronto Raptors",
                "score": "113"
            },
            {
                "name": "New Orleans Pelicans",
                "score": "104"
            }
        ],
        "last_update": "2025-01-28T10:17:09Z"
    },
    {
        "id": "1274e69cacf9310f766bd0fe93aeb340",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-28T00:42:23Z",
        "completed": true,
        "home_team": "Miami Heat",
        "away_team": "Orlando Magic",
        "scores": [
            {
                "name": "Miami Heat",
                "score": "125"
            },
            {
                "name": "Orlando Magic",
                "score": "119"
            }
        ],
        "last_update": "2025-01-28T10:17:09Z"
    },
    {
        "id": "20ee3189264bd00157ea8dcf54579892",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-28T01:10:00Z",
        "completed": true,
        "home_team": "Minnesota Timberwolves",
        "away_team": "Atlanta Hawks",
        "scores": [
            {
                "name": "Minnesota Timberwolves",
                "score": "100"
            },
            {
                "name": "Atlanta Hawks",
                "score": "92"
            }
        ],
        "last_update": "2025-01-28T10:17:09Z"
    },
    {
        "id": "c8f48703497fd9de26c9ce93d5057fe7",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-28T01:10:23Z",
        "completed": true,
        "home_team": "Chicago Bulls",
        "away_team": "Denver Nuggets",
        "scores": [
            {
                "name": "Chicago Bulls",
                "score": "129"
            },
            {
                "name": "Denver Nuggets",
                "score": "121"
            }
        ],
        "last_update": "2025-01-28T10:17:09Z"
    },
    {
        "id": "220e63f7f8bdc7c58d814a46259c67a2",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-28T01:40:00Z",
        "completed": true,
        "home_team": "Dallas Mavericks",
        "away_team": "Washington Wizards",
        "scores": [
            {
                "name": "Dallas Mavericks",
                "score": "130"
            },
            {
                "name": "Washington Wizards",
                "score": "108"
            }
        ],
        "last_update": "2025-01-28T10:17:09Z"
    },
    {
        "id": "4c7063d42a874f80a9c17b9774a945f9",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-28T02:10:00Z",
        "completed": true,
        "home_team": "Utah Jazz",
        "away_team": "Milwaukee Bucks",
        "scores": [
            {
                "name": "Utah Jazz",
                "score": "110"
            },
            {
                "name": "Milwaukee Bucks",
                "score": "125"
            }
        ],
        "last_update": "2025-01-28T10:17:09Z"
    },
    {
        "id": "aecc41fbcb21eac7198d1a04bddb07a0",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-28T02:40:45Z",
        "completed": true,
        "home_team": "Phoenix Suns",
        "away_team": "Los Angeles Clippers",
        "scores": [
            {
                "name": "Phoenix Suns",
                "score": "111"
            },
            {
                "name": "Los Angeles Clippers",
                "score": "109"
            }
        ],
        "last_update": "2025-01-28T10:17:09Z"
    },
    {
        "id": "0ab77208feec99c7bb5f8990cb81739d",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-29T00:35:00Z",
        "completed": true,
        "home_team": "Philadelphia 76ers",
        "away_team": "Los Angeles Lakers",
        "scores": [
            {
                "name": "Philadelphia 76ers",
                "score": "118"
            },
            {
                "name": "Los Angeles Lakers",
                "score": "104"
            }
        ],
        "last_update": "2025-01-29T10:52:37Z"
    },
    {
        "id": "699f111aa87fc2cea90b0362b93b928e",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-29T00:40:26Z",
        "completed": true,
        "home_team": "Atlanta Hawks",
        "away_team": "Houston Rockets",
        "scores": [
            {
                "name": "Atlanta Hawks",
                "score": "96"
            },
            {
                "name": "Houston Rockets",
                "score": "100"
            }
        ],
        "last_update": "2025-01-29T10:52:37Z"
    },
    {
        "id": "02a0097a3e442dbca988e6145e43b9c2",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-29T03:06:54Z",
        "completed": true,
        "home_team": "Portland Trail Blazers",
        "away_team": "Milwaukee Bucks",
        "scores": [
            {
                "name": "Portland Trail Blazers",
                "score": "125"
            },
            {
                "name": "Milwaukee Bucks",
                "score": "112"
            }
        ],
        "last_update": "2025-01-29T10:52:37Z"
    },
    {
        "id": "cd1d3bb2519f27ba9d884e0dbbcd55bd",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-29T03:10:00Z",
        "completed": true,
        "home_team": "Golden State Warriors",
        "away_team": "Utah Jazz",
        "scores": [
            {
                "name": "Golden State Warriors",
                "score": "114"
            },
            {
                "name": "Utah Jazz",
                "score": "103"
            }
        ],
        "last_update": "2025-01-29T10:52:37Z"
    },
    {
        "id": "82e230aff36c60de7fcd3bdd6e573b5f",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-30T00:10:00Z",
        "completed": false,
        "home_team": "Charlotte Hornets",
        "away_team": "Brooklyn Nets",
        "scores": null,
        "last_update": null
    },
    {
        "id": "a75904869ceb53ced4baae29638d4907",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-30T00:10:00Z",
        "completed": false,
        "home_team": "Indiana Pacers",
        "away_team": "Detroit Pistons",
        "scores": null,
        "last_update": null
    },
    {
        "id": "fd9e9a29c8840b05ec47ce69bb66285f",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-30T00:10:00Z",
        "completed": false,
        "home_team": "Washington Wizards",
        "away_team": "Toronto Raptors",
        "scores": null,
        "last_update": null
    },
    {
        "id": "c1377c3655be5a0f236e58af35ed96ed",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-30T00:40:00Z",
        "completed": false,
        "home_team": "Boston Celtics",
        "away_team": "Chicago Bulls",
        "scores": null,
        "last_update": null
    },
    {
        "id": "b96f1ef936ee9645716d3ccfe6a827ab",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-30T00:40:00Z",
        "completed": false,
        "home_team": "Miami Heat",
        "away_team": "Cleveland Cavaliers",
        "scores": null,
        "last_update": null
    },
    {
        "id": "9b4f16875683c0e509cba63b8f82bb7a",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-30T00:40:00Z",
        "completed": false,
        "home_team": "New York Knicks",
        "away_team": "Denver Nuggets",
        "scores": null,
        "last_update": null
    },
    {
        "id": "afcd8441571d6c30ca662e7481ac17a3",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-30T00:40:00Z",
        "completed": false,
        "home_team": "Philadelphia 76ers",
        "away_team": "Sacramento Kings",
        "scores": null,
        "last_update": null
    },
    {
        "id": "53ca6361b55c5a6ef7e15853621f0ed8",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-30T01:10:00Z",
        "completed": false,
        "home_team": "New Orleans Pelicans",
        "away_team": "Dallas Mavericks",
        "scores": null,
        "last_update": null
    },
    {
        "id": "3f3767f9da127ac9f8b7afa138e3fcea",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-30T01:10:00Z",
        "completed": false,
        "home_team": "San Antonio Spurs",
        "away_team": "Los Angeles Clippers",
        "scores": null,
        "last_update": null
    },
    {
        "id": "0f5edeaa71dbfb18b0bb9b61b672c728",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-30T02:10:00Z",
        "completed": false,
        "home_team": "Phoenix Suns",
        "away_team": "Minnesota Timberwolves",
        "scores": null,
        "last_update": null
    },
    {
        "id": "1ec913e38af7a7f0e101ec0c7125bef3",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-30T03:10:00Z",
        "completed": false,
        "home_team": "Golden State Warriors",
        "away_team": "Oklahoma City Thunder",
        "scores": null,
        "last_update": null
    },
    {
        "id": "a4d3c19bca78a6727a00d6c96e80f573",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-31T00:00:00Z",
        "completed": false,
        "home_team": "Cleveland Cavaliers",
        "away_team": "Atlanta Hawks",
        "scores": null,
        "last_update": null
    },
    {
        "id": "b7f9752c63e2b5f1ef22d3d5d060f593",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-31T00:00:00Z",
        "completed": false,
        "home_team": "Washington Wizards",
        "away_team": "Los Angeles Lakers",
        "scores": null,
        "last_update": null
    },
    {
        "id": "836eae09b37fdf8dc41f7ed3c3a1e41c",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-31T02:30:00Z",
        "completed": false,
        "home_team": "Memphis Grizzlies",
        "away_team": "Houston Rockets",
        "scores": null,
        "last_update": null
    }
]
```
</details>

## Next steps (for next script)
Need to create a script that will update the user's winnings based on the results of the bet.
