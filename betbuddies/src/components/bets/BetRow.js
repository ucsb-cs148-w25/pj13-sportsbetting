import React from "react";
import "./bets.css";

const BetRow = ({ game }) => {
    const moneyLineMarket = game.bookmakers[0]?.markets.find((market) => market.key === "h2h");
    const spreadsMarket = game.bookmakers[0]?.markets.find((market) => market.key === "spreads");
    const totalsMarket = game.bookmakers[0]?.markets.find((market) => market.key === "totals");

    return (
        <div className="bet-row">
            {/* Left Side: Team Info */}
            <div className="team-info">
                <div className="team team-left">
                    <img
                        src={game.teamA.logo}
                        alt={game.teamA.name}
                        className="team-logo"
                    />
                    <span className="team-name">{game.teamA.name}</span>
                </div>
                <span className="vs-text">vs</span>
                <div className="team team-right">
                    <img
                        src={game.teamB.logo}
                        alt={game.teamB.name}
                        className="team-logo"
                    />
                    <span className="team-name">{game.teamB.name}</span>
                </div>
            </div>

            {/* Right Side: Betting Options */}
            <div className="bet-options">
                <div className="market">
                    <strong>MONEY LINE</strong>
                    <div className="market-options">
                        {moneyLineMarket?.outcomes.map((outcome, idx) => (
                            <button key={idx} className="bet-button">
                                {outcome.price > 0 ? `+${outcome.price}` : outcome.price}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="market">
                    <strong>SPREADS</strong>
                    <div className="market-options">
                        {spreadsMarket?.outcomes.map((outcome, idx) => (
                            <button key={idx} className="bet-button">
                                {outcome.point > 0 ? `+${outcome.point}` : outcome.point} <br />
                                {outcome.price > 0 ? `+${outcome.price}` : outcome.price}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="market">
                    <strong>Total Points</strong>
                    <div className="market-options">
                        {totalsMarket?.outcomes.map((outcome, idx) => (
                            <button key={idx} className="bet-button">
                                {outcome.name === "Over" ? "O" : "U"} {outcome.point} <br />
                                {outcome.price > 0 ? `+${outcome.price}` : outcome.price}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BetRow;
