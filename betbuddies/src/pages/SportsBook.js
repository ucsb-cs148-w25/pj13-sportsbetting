import React, { useEffect, useState } from "react";
import axios from "axios";
import BetRow from "../components/bets/BetRow";
import "../components/landing_page/styles/sportsbook.css";
import getTeamLogoPath from "../utils/getTeamLogoPath";

const Sportsbook = () => {
    const [games, setGames] = useState([]);
    const API_KEY = "a860df327311794525cec5ef64a3215e";

    useEffect(() => {
        const fetchNBAOdds = async () => {
            try {
                const response = await axios.get(
                    "https://api.the-odds-api.com/v4/sports/basketball_nba/odds",
                    {
                        params: {
                            api_key: API_KEY,
                            regions: "us",
                            markets: "h2h,spreads,totals",
                            oddsFormat: "american",
                        },
                    }
                );

                const formattedGames = response.data.map((game) => ({
                    id: game.id,
                    teamA: {
                        name: game.home_team,
                        logo: getTeamLogoPath(game.home_team),
                    },
                    teamB: {
                        name: game.away_team,
                        logo: getTeamLogoPath(game.away_team),
                    },
                    bookmakers: game.bookmakers || [],
                }));

                setGames(formattedGames);
            } catch (error) {
                console.error("Error fetching NBA odds:", error);
            }
        };

        fetchNBAOdds();
    }, []);

    return (
        <div className="sportsbook">
            <h2>NBA Odds</h2>
            {games.map((game) => (
                <BetRow key={game.id} game={game} />
            ))}
        </div>
    );
};

export default Sportsbook;