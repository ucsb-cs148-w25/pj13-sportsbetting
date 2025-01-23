import React from "react";
import celticsLogo from "../resources/nba_teams/celtics.png";
import bucksLogo from "../resources/nba_teams/bucks.png";
import mavericksLogo from "../resources/nba_teams/mavericks.png";
import netsLogo from "../resources/nba_teams/nets.png";
import spursLogo from "../resources/nba_teams/spurs.png";
import pacersLogo from "../resources/nba_teams/pacers.png";
import "./styles/featuredbetsStyle.css";

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

const FeaturedBets = () => (
    <section className="featured-bets-section">
        <div className="featured-bets-container">
            <h3 className="featured-bets-title">🤑TRENDING BETS🤑
            </h3>
            <div className="featured-grid">
                {matches.map((match) => (
                    <div key={match.id} className="featured-card">
                        <h4 className="card-title">
                            {match.teamA.name} vs {match.teamB.name}
                        </h4>
                        <div className="team-logos-and-odds">
                            {/* Team Logos and Names in a Row */}
                            <div className="team-container">
                                {/* Team A (Logo on Left, Name on Right) */}
                                <div className="team-row">
                                    <img
                                        className="team-logo"
                                        src={match.teamA.logo}
                                        alt={`${match.teamA.name} Logo`}
                                    />
                                    <p className="team-name">{match.teamA.name}</p>
                                </div>

                                {/* Team B (Logo on Left, Name on Right) */}
                                <div className="team-row">
                                    <img
                                        className="team-logo"
                                        src={match.teamB.logo}
                                        alt={`${match.teamB.name} Logo`}
                                    />
                                    <p className="team-name">{match.teamB.name}</p>
                                </div>
                            </div>

                            {/* Odds Section */}
                            <div className="odds-boxes">
                                <div className="odds-box">
                                    <p className="odds-value">+150</p>
                                </div>
                                <div className="odds-box">
                                    <p className="odds-value">-120</p>
                                </div>
                            </div>
                        </div>

                        <button className="view-odds-button">Place Bet &gt;</button>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default FeaturedBets;