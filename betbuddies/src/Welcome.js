import React from 'react';
import './Welcome.css'; // Optional, if you create a CSS file for this component

const Welcome = () => {
    return (
        <div className="welcome-container">
            <h1>Welcome to Our Sports Betting Website</h1>
            <p>Start your journey and compete with friends to see who is the best sports bettor!</p>
            <button onClick={() => alert('Getting Started!')}>Get Started</button>
        </div>
    );
};

export default Welcome;
