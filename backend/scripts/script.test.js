async function parse_api_response(bets) {
    // Parse the API response into format that can be used with our backend server
    console.log('Parsing bets...');

    // for each game, get first bookmaker and first market
    const new_bets = [];
    for (const bet of bets) {
        try {
            const bet_id = bet.id;
            const bookmaker = bet.bookmakers[0];
            const market = bookmaker.markets[0];
            const outcomes = market.outcomes;
            const team1 = outcomes[0].name;
            const team2 = outcomes[1].name;
            const startTime = bet.commence_time;
            const endTime = bet.commence_time;
            const winner = null;
            const betStatus = 'open';
            const team1_price = outcomes[0].price;
            const team2_price = outcomes[1].price;

            const new_bet = {
                bet_id,
                team1,
                team2,
                startTime,
                endTime,
                winner,
                betStatus,
                team1_price,
                team2_price,
            };

            new_bets.push(new_bet);
        } catch (error) {
            console.error('Error parsing bet:', error);
        }
    }
    console.log('Parsed ', new_bets.length, ' bets');
    return new_bets;
}

const test_api_response = [
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
];

const expected_parse_api_response_output = [
    {
      bet_id: '97e5e5a500721cf73564a83aefe8c6c2',
      team1: 'Denver Nuggets',
      team2: 'Sacramento Kings',
      startTime: '2025-01-24T02:10:00Z',
      endTime: '2025-01-24T02:10:00Z',
      winner: null,
      betStatus: 'open',
      team1_price: 1.01,
      team2_price: 23
    },
    {
      bet_id: '8191aa1958da0dfe9d961f0a231c370a',
      team1: 'Chicago Bulls',
      team2: 'Golden State Warriors',
      startTime: '2025-01-24T03:10:43Z',
      endTime: '2025-01-24T03:10:43Z',
      winner: null,
      betStatus: 'open',
      team1_price: 1.91,
      team2_price: 1.83
    },
    {
      bet_id: 'ab895e8aab81cbbf4c7605782f2f806b',
      team1: 'Boston Celtics',
      team2: 'Los Angeles Lakers',
      startTime: '2025-01-24T03:15:58Z',
      endTime: '2025-01-24T03:15:58Z',
      winner: null,
      betStatus: 'open',
      team1_price: 2.22,
      team2_price: 1.64
    },
    {
      bet_id: '5065223058735f9ebb26715d41d722f0',
      team1: 'Los Angeles Clippers',
      team2: 'Washington Wizards',
      startTime: '2025-01-24T03:40:21Z',
      endTime: '2025-01-24T03:40:21Z',
      winner: null,
      betStatus: 'open',
      team1_price: 1.05,
      team2_price: 10
    },
    {
      bet_id: '6a6e08cde4593b3632d191e657eb09b4',
      team1: 'Charlotte Hornets',
      team2: 'Portland Trail Blazers',
      startTime: '2025-01-25T00:10:00Z',
      endTime: '2025-01-25T00:10:00Z',
      winner: null,
      betStatus: 'open',
      team1_price: 1.5,
      team2_price: 2.68
    },
    {
      bet_id: '8be88b659b096322958a52c9b586c399',
      team1: 'Cleveland Cavaliers',
      team2: 'Philadelphia 76ers',
      startTime: '2025-01-25T00:10:00Z',
      endTime: '2025-01-25T00:10:00Z',
      winner: null,
      betStatus: 'open',
      team1_price: 1.22,
      team2_price: 4.6
    },
    {
      bet_id: '0ef3b7159add5b92a32545bb6fecf138',
      team1: 'Memphis Grizzlies',
      team2: 'New Orleans Pelicans',
      startTime: '2025-01-25T01:10:00Z',
      endTime: '2025-01-25T01:10:00Z',
      winner: null,
      betStatus: 'open',
      team1_price: 1.15,
      team2_price: 5.8
    }
];

test('parse_api_response', async () => {
    const result = await parse_api_response(test_api_response);
    expect(result).toEqual(expected_parse_api_response_output);
});