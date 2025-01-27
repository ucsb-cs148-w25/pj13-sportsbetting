# Backend bets storage design

We should store bets on Firebase to avoid repeating API calls. Need scheduled job (daily?) to query odds-api to update db. Our webapp can then query our Firebase db. Also need a job to evaluate and update bet results.

This endpoint ([doc](https://the-odds-api.com/liveapi/guides/v4/#get-odds), [swaggerdoc](https://app.swaggerhub.com/apis-docs/the-odds-api/odds-api/4#/current%20events/get_v4_sports__sport__odds)) queries NBA head2head bets:

`https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey={PUT KEY HERE}&regions=us&markets=h2h`

Example output:

<details>
    <summary>Click to expand</summary>

```json
[
    {
        "id": "b96a284bb2f278f67d33e9481698d03c",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-24T01:30:38Z",
        "home_team": "Milwaukee Bucks",
        "away_team": "Miami Heat",
        "bookmakers": []
    },
    {
        "id": "97e5e5a500721cf73564a83aefe8c6c2",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-24T02:10:00Z",
        "home_team": "Denver Nuggets",
        "away_team": "Sacramento Kings",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2025-01-24T03:45:07Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:07Z",
                        "outcomes": [
                            {
                                "name": "Denver Nuggets",
                                "price": 1.01
                            },
                            {
                                "name": "Sacramento Kings",
                                "price": 23.0
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2025-01-24T03:42:42Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:42:42Z",
                        "outcomes": [
                            {
                                "name": "Denver Nuggets",
                                "price": 1.01
                            },
                            {
                                "name": "Sacramento Kings",
                                "price": 17.0
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "8191aa1958da0dfe9d961f0a231c370a",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-24T03:10:43Z",
        "home_team": "Golden State Warriors",
        "away_team": "Chicago Bulls",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2025-01-24T03:45:07Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:07Z",
                        "outcomes": [
                            {
                                "name": "Chicago Bulls",
                                "price": 1.91
                            },
                            {
                                "name": "Golden State Warriors",
                                "price": 1.83
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2025-01-24T03:45:08Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:08Z",
                        "outcomes": [
                            {
                                "name": "Chicago Bulls",
                                "price": 1.96
                            },
                            {
                                "name": "Golden State Warriors",
                                "price": 1.82
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2025-01-24T03:45:08Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:08Z",
                        "outcomes": [
                            {
                                "name": "Chicago Bulls",
                                "price": 1.83
                            },
                            {
                                "name": "Golden State Warriors",
                                "price": 1.88
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2025-01-24T03:42:42Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:42:42Z",
                        "outcomes": [
                            {
                                "name": "Chicago Bulls",
                                "price": 2.18
                            },
                            {
                                "name": "Golden State Warriors",
                                "price": 1.67
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2025-01-24T03:45:10Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:10Z",
                        "outcomes": [
                            {
                                "name": "Chicago Bulls",
                                "price": 1.91
                            },
                            {
                                "name": "Golden State Warriors",
                                "price": 1.83
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "ab895e8aab81cbbf4c7605782f2f806b",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-24T03:15:58Z",
        "home_team": "Los Angeles Lakers",
        "away_team": "Boston Celtics",
        "bookmakers": [
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2025-01-24T03:45:08Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:08Z",
                        "outcomes": [
                            {
                                "name": "Boston Celtics",
                                "price": 2.22
                            },
                            {
                                "name": "Los Angeles Lakers",
                                "price": 1.64
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2025-01-24T03:45:07Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:07Z",
                        "outcomes": [
                            {
                                "name": "Boston Celtics",
                                "price": 1.83
                            },
                            {
                                "name": "Los Angeles Lakers",
                                "price": 1.91
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2025-01-24T03:45:08Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:08Z",
                        "outcomes": [
                            {
                                "name": "Boston Celtics",
                                "price": 1.85
                            },
                            {
                                "name": "Los Angeles Lakers",
                                "price": 1.85
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2025-01-24T03:42:42Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:42:42Z",
                        "outcomes": [
                            {
                                "name": "Boston Celtics",
                                "price": 2.0
                            },
                            {
                                "name": "Los Angeles Lakers",
                                "price": 1.8
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2025-01-24T03:45:10Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:10Z",
                        "outcomes": [
                            {
                                "name": "Boston Celtics",
                                "price": 1.87
                            },
                            {
                                "name": "Los Angeles Lakers",
                                "price": 1.87
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "5065223058735f9ebb26715d41d722f0",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-24T03:40:21Z",
        "home_team": "Los Angeles Clippers",
        "away_team": "Washington Wizards",
        "bookmakers": [
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2025-01-24T03:45:07Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:07Z",
                        "outcomes": [
                            {
                                "name": "Los Angeles Clippers",
                                "price": 1.05
                            },
                            {
                                "name": "Washington Wizards",
                                "price": 10.0
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2025-01-24T03:45:08Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:08Z",
                        "outcomes": [
                            {
                                "name": "Los Angeles Clippers",
                                "price": 1.08
                            },
                            {
                                "name": "Washington Wizards",
                                "price": 7.3
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betrivers",
                "title": "BetRivers",
                "last_update": "2025-01-24T03:45:08Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:08Z",
                        "outcomes": [
                            {
                                "name": "Los Angeles Clippers",
                                "price": 1.04
                            },
                            {
                                "name": "Washington Wizards",
                                "price": 8.0
                            }
                        ]
                    }
                ]
            },
            {
                "key": "lowvig",
                "title": "LowVig.ag",
                "last_update": "2025-01-24T03:40:09Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:40:09Z",
                        "outcomes": [
                            {
                                "name": "Los Angeles Clippers",
                                "price": 1.08
                            },
                            {
                                "name": "Washington Wizards",
                                "price": 8.5
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2025-01-24T03:40:09Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:40:09Z",
                        "outcomes": [
                            {
                                "name": "Los Angeles Clippers",
                                "price": 1.08
                            },
                            {
                                "name": "Washington Wizards",
                                "price": 8.5
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2025-01-24T03:42:42Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:42:42Z",
                        "outcomes": [
                            {
                                "name": "Los Angeles Clippers",
                                "price": 1.08
                            },
                            {
                                "name": "Washington Wizards",
                                "price": 7.75
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2025-01-24T03:45:10Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:10Z",
                        "outcomes": [
                            {
                                "name": "Los Angeles Clippers",
                                "price": 1.05
                            },
                            {
                                "name": "Washington Wizards",
                                "price": 10.0
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betus",
                "title": "BetUS",
                "last_update": "2025-01-24T03:38:58Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:38:58Z",
                        "outcomes": [
                            {
                                "name": "Los Angeles Clippers",
                                "price": 1.08
                            },
                            {
                                "name": "Washington Wizards",
                                "price": 8.5
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "6a6e08cde4593b3632d191e657eb09b4",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-25T00:10:00Z",
        "home_team": "Charlotte Hornets",
        "away_team": "Portland Trail Blazers",
        "bookmakers": [
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2025-01-24T03:45:08Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:08Z",
                        "outcomes": [
                            {
                                "name": "Charlotte Hornets",
                                "price": 1.5
                            },
                            {
                                "name": "Portland Trail Blazers",
                                "price": 2.68
                            }
                        ]
                    }
                ]
            },
            {
                "key": "mybookieag",
                "title": "MyBookie.ag",
                "last_update": "2025-01-24T03:45:07Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:07Z",
                        "outcomes": [
                            {
                                "name": "Charlotte Hornets",
                                "price": 1.51
                            },
                            {
                                "name": "Portland Trail Blazers",
                                "price": 2.59
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2025-01-24T03:45:07Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:07Z",
                        "outcomes": [
                            {
                                "name": "Charlotte Hornets",
                                "price": 1.54
                            },
                            {
                                "name": "Portland Trail Blazers",
                                "price": 2.54
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2025-01-24T03:45:07Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:07Z",
                        "outcomes": [
                            {
                                "name": "Charlotte Hornets",
                                "price": 1.51
                            },
                            {
                                "name": "Portland Trail Blazers",
                                "price": 2.7
                            }
                        ]
                    }
                ]
            },
            {
                "key": "lowvig",
                "title": "LowVig.ag",
                "last_update": "2025-01-24T03:45:08Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:08Z",
                        "outcomes": [
                            {
                                "name": "Charlotte Hornets",
                                "price": 1.51
                            },
                            {
                                "name": "Portland Trail Blazers",
                                "price": 2.7
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2025-01-24T03:42:42Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:42:42Z",
                        "outcomes": [
                            {
                                "name": "Charlotte Hornets",
                                "price": 1.5
                            },
                            {
                                "name": "Portland Trail Blazers",
                                "price": 2.65
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2025-01-24T03:45:10Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:10Z",
                        "outcomes": [
                            {
                                "name": "Charlotte Hornets",
                                "price": 1.5
                            },
                            {
                                "name": "Portland Trail Blazers",
                                "price": 2.7
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "8be88b659b096322958a52c9b586c399",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-25T00:10:00Z",
        "home_team": "Philadelphia 76ers",
        "away_team": "Cleveland Cavaliers",
        "bookmakers": [
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2025-01-24T03:45:07Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:07Z",
                        "outcomes": [
                            {
                                "name": "Cleveland Cavaliers",
                                "price": 1.22
                            },
                            {
                                "name": "Philadelphia 76ers",
                                "price": 4.6
                            }
                        ]
                    }
                ]
            },
            {
                "key": "lowvig",
                "title": "LowVig.ag",
                "last_update": "2025-01-24T03:45:08Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:08Z",
                        "outcomes": [
                            {
                                "name": "Cleveland Cavaliers",
                                "price": 1.22
                            },
                            {
                                "name": "Philadelphia 76ers",
                                "price": 4.6
                            }
                        ]
                    }
                ]
            },
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2025-01-24T03:45:08Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:08Z",
                        "outcomes": [
                            {
                                "name": "Cleveland Cavaliers",
                                "price": 1.21
                            },
                            {
                                "name": "Philadelphia 76ers",
                                "price": 4.7
                            }
                        ]
                    }
                ]
            },
            {
                "key": "mybookieag",
                "title": "MyBookie.ag",
                "last_update": "2025-01-24T03:45:07Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:07Z",
                        "outcomes": [
                            {
                                "name": "Cleveland Cavaliers",
                                "price": 1.22
                            },
                            {
                                "name": "Philadelphia 76ers",
                                "price": 4.39
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2025-01-24T03:45:07Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:07Z",
                        "outcomes": [
                            {
                                "name": "Cleveland Cavaliers",
                                "price": 1.24
                            },
                            {
                                "name": "Philadelphia 76ers",
                                "price": 4.3
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2025-01-24T03:42:42Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:42:42Z",
                        "outcomes": [
                            {
                                "name": "Cleveland Cavaliers",
                                "price": 1.24
                            },
                            {
                                "name": "Philadelphia 76ers",
                                "price": 4.25
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2025-01-24T03:45:10Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:10Z",
                        "outcomes": [
                            {
                                "name": "Cleveland Cavaliers",
                                "price": 1.22
                            },
                            {
                                "name": "Philadelphia 76ers",
                                "price": 4.35
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "0ef3b7159add5b92a32545bb6fecf138",
        "sport_key": "basketball_nba",
        "sport_title": "NBA",
        "commence_time": "2025-01-25T01:10:00Z",
        "home_team": "Memphis Grizzlies",
        "away_team": "New Orleans Pelicans",
        "bookmakers": [
            {
                "key": "fanduel",
                "title": "FanDuel",
                "last_update": "2025-01-24T03:45:08Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:08Z",
                        "outcomes": [
                            {
                                "name": "Memphis Grizzlies",
                                "price": 1.15
                            },
                            {
                                "name": "New Orleans Pelicans",
                                "price": 5.8
                            }
                        ]
                    }
                ]
            },
            {
                "key": "mybookieag",
                "title": "MyBookie.ag",
                "last_update": "2025-01-24T03:45:07Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:07Z",
                        "outcomes": [
                            {
                                "name": "Memphis Grizzlies",
                                "price": 1.16
                            },
                            {
                                "name": "New Orleans Pelicans",
                                "price": 5.34
                            }
                        ]
                    }
                ]
            },
            {
                "key": "draftkings",
                "title": "DraftKings",
                "last_update": "2025-01-24T03:45:07Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:07Z",
                        "outcomes": [
                            {
                                "name": "Memphis Grizzlies",
                                "price": 1.15
                            },
                            {
                                "name": "New Orleans Pelicans",
                                "price": 5.7
                            }
                        ]
                    }
                ]
            },
            {
                "key": "lowvig",
                "title": "LowVig.ag",
                "last_update": "2025-01-24T03:45:08Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:08Z",
                        "outcomes": [
                            {
                                "name": "Memphis Grizzlies",
                                "price": 1.15
                            },
                            {
                                "name": "New Orleans Pelicans",
                                "price": 6.0
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betonlineag",
                "title": "BetOnline.ag",
                "last_update": "2025-01-24T03:45:07Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:07Z",
                        "outcomes": [
                            {
                                "name": "Memphis Grizzlies",
                                "price": 1.15
                            },
                            {
                                "name": "New Orleans Pelicans",
                                "price": 6.0
                            }
                        ]
                    }
                ]
            },
            {
                "key": "betmgm",
                "title": "BetMGM",
                "last_update": "2025-01-24T03:42:42Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:42:42Z",
                        "outcomes": [
                            {
                                "name": "Memphis Grizzlies",
                                "price": 1.15
                            },
                            {
                                "name": "New Orleans Pelicans",
                                "price": 5.75
                            }
                        ]
                    }
                ]
            },
            {
                "key": "bovada",
                "title": "Bovada",
                "last_update": "2025-01-24T03:45:10Z",
                "markets": [
                    {
                        "key": "h2h",
                        "last_update": "2025-01-24T03:45:10Z",
                        "outcomes": [
                            {
                                "name": "Memphis Grizzlies",
                                "price": 1.15
                            },
                            {
                                "name": "New Orleans Pelicans",
                                "price": 5.5
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
```
</details>


## Example Workflow

### Fetch New Bets:

Query the API for bets scheduled for today or the next few days.
Use the API's filters (if available) to avoid fetching unnecessary data.

### Update Firebase:

Loop through the fetched bets and check if they already exist in the bets collection (using their unique betId or similar).
If new, add the bet. If existing, update its details (e.g., winner or betStatus).

### Handle Completed Bets:

Check for bets with endTime in the past and update their status to completed if not already done.
Update the winner field if the API provides the result.

### Log and Monitor:

Log successful updates to ensure smooth operation.
Add error handling for issues like API failures or database conflicts.