import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/featuredbetsStyle.css";
import hawksLogo from "../resources/nba_teams/hawks.png";
import celticsLogo from "../resources/nba_teams/celtics.png";
import netsLogo from "../resources/nba_teams/nets.png";
import hornetsLogo from "../resources/nba_teams/hornets.png";
import bullsLogo from "../resources/nba_teams/bulls.png";
import cavaliersLogo from "../resources/nba_teams/cavaliers.png";
import mavericksLogo from "../resources/nba_teams/mavericks.png";
import nuggetsLogo from "../resources/nba_teams/nuggets.png";
import pistonsLogo from "../resources/nba_teams/pistons.png";
import warriorsLogo from "../resources/nba_teams/warriors.png";
import rocketsLogo from "../resources/nba_teams/rockets.png";
import pacersLogo from "../resources/nba_teams/pacers.png";
import clippersLogo from "../resources/nba_teams/clippers.png";
import lakersLogo from "../resources/nba_teams/lakers.png";
import grizzliesLogo from "../resources/nba_teams/grizzlies.png";
import heatLogo from "../resources/nba_teams/heat.png";
import bucksLogo from "../resources/nba_teams/bucks.png";
import timberwolvesLogo from "../resources/nba_teams/timberwolves.png";
import pelicansLogo from "../resources/nba_teams/pelicans.png";
import knicksLogo from "../resources/nba_teams/knicks.png";
import thunderLogo from "../resources/nba_teams/thunder.png";
import magicLogo from "../resources/nba_teams/magic.png";
import sixersLogo from "../resources/nba_teams/sixers.png";
import sunsLogo from "../resources/nba_teams/suns.png";
import blazersLogo from "../resources/nba_teams/blazers.png";
import kingsLogo from "../resources/nba_teams/kings.png";
import spursLogo from "../resources/nba_teams/spurs.png";
import raptorsLogo from "../resources/nba_teams/raptors.png";
import jazzLogo from "../resources/nba_teams/jazz.png";
import wizardsLogo from "../resources/nba_teams/wizards.png";

const teamLogos = {
    hawks: hawksLogo,
    celtics: celticsLogo,
    nets: netsLogo,
    hornets: hornetsLogo,
    bulls: bullsLogo,
    cavaliers: cavaliersLogo,
    mavericks: mavericksLogo,
    nuggets: nuggetsLogo,
    pistons: pistonsLogo,
    warriors: warriorsLogo,
    rockets: rocketsLogo,
    pacers: pacersLogo,
    clippers: clippersLogo,
    lakers: lakersLogo,
    grizzlies: grizzliesLogo,
    heat: heatLogo,
    bucks: bucksLogo,
    timberwolves: timberwolvesLogo,
    pelicans: pelicansLogo,
    knicks: knicksLogo,
    thunder: thunderLogo,
    magic: magicLogo,
    sixers: sixersLogo,
    suns: sunsLogo,
    blazers: blazersLogo,
    kings: kingsLogo,
    spurs: spursLogo,
    raptors: raptorsLogo,
    jazz: jazzLogo,
    wizards: wizardsLogo,
};

const matches = [
    {
        id: 1,
        teamA: {
            name: "Boston Celtics",
            logo: celticsLogo, // Replace with the correct path or import
        },
        teamB: {
            name: "Milwaukee Bucks",
            logo: bucksLogo,
        },
    },
    {
        id: 2,
        teamA: {
            name: "Dallas Mavericks",
            logo: mavericksLogo,
        },
        teamB: {
            name: "Brooklyn Nets",
            logo: netsLogo,
        },
    },
    {
        id: 3,
        teamA: {
            name: "Indiana Pacers",
            logo: pacersLogo,
        },
        teamB: {
            name: "San Antonio Spurs",
            logo: spursLogo,
        },
    },
];

const getTeamLogoPath = (teamFullName) => {
    //extracts the last word of the team, ie Cleveland Cavaliers, pulls out cavaliers to lowercase
    let teamName = teamFullName.split(" ").pop().toLowerCase();

    //this team is stupid
    //you have to switch the name cuz it extracts 76ers
    //only hard coded
    if (teamName === "76ers") {
        teamName = "sixers";
    }

    return teamLogos[teamName] || "";
};

const formatOdds = (oddsValue) => (oddsValue > 0 ? `+${oddsValue}` : oddsValue);

const FeaturedBets = () => {
    const [matches, setMatches] = useState([]);
    const API_KEY = "a860df327311794525cec5ef64a3215e";

    useEffect(() => {
        const fetchOdds = async () => {
            try {
                const response = await axios.get(
                    "https://api.the-odds-api.com/v4/sports/basketball_nba/odds",
                    {
                        params: {
                            api_key: API_KEY,
                            regions: "us",
                            markets: "h2h",
                            oddsFormat: "american",
                        },
                    }
                );

                if (response.data && response.data.length > 0) {
                    const randomMatches = response.data
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 3)
                        .map((match) => ({
                            id: match.id,
                            teamA: {
                                name: match.home_team,
                                logo: getTeamLogoPath(match.home_team),
                            },
                            teamB: {
                                name: match.away_team,
                                logo: getTeamLogoPath(match.away_team),
                            },
                            odds: match.bookmakers[0]?.markets[0]?.outcomes || [],
                        }));

                    setMatches(randomMatches);
                }
            } catch (error) {
                console.error("Error fetching odds:", error);
            }
        };

        fetchOdds();
    }, []);

    return (
        <section className="featured-bets-section">
            <div className="featured-bets-container">
                <h3 className="featured-bets-title">🤑TRENDING BETS🤑</h3>
                <div className="featured-grid">
                    {matches.map((match) => (
                        <div key={match.id} className="featured-card">
                            <h4 className="card-title">
                                {match.teamA.name} vs {match.teamB.name}
                            </h4>
                            <div className="team-logos-and-odds">
                                <div className="team-container">
                                    <div className="team-row">
                                        <img
                                            className="team-logo"
                                            src={match.teamA.logo}
                                            alt={`${match.teamA.name} Logo`}
                                        />
                                        <p className="team-name">{match.teamA.name}</p>
                                    </div>
                                    <div className="team-row">
                                        <img
                                            className="team-logo"
                                            src={match.teamB.logo}
                                            alt={`${match.teamB.name} Logo`}
                                        />
                                        <p className="team-name">{match.teamB.name}</p>
                                    </div>
                                </div>
                                <div className="odds-boxes">
                                    {match.odds.map((outcome, index) => (
                                        <div key={index} className="odds-box">
                                            <p className="odds-value">
                                                {outcome.name}: {formatOdds(outcome.price)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="view-odds-button">Place Bet &gt;</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedBets;