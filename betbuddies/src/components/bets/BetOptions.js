import React from "react";
import "./bets.css";

const BetOptions = ({ outcomes }) => {
    return (
        <div className="bet-options">
            {outcomes?.map((market, index) => (
                <div key={index} className="bet-market">
                    <strong>{market.key.toUpperCase()}</strong>
                    {market.outcomes.map((outcome, idx) => (
                        <button key={idx} className="bet-button">
                            {outcome.name}: {outcome.price > 0 ? `+${outcome.price}` : outcome.price}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default BetOptions;
