import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles/headerStyle.css";
import AuthContext from "../../contexts/AuthContext";

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  return (
      <header className="header">
        <div className="header-container">
          <div className="header-title">
            <Link to="/" className="nav-link">
              <h1>BetBuddies</h1>
            </Link>
          </div>
          <nav className="navbar md-visible">
            <Link to="/betting" className="nav-link">
              Betting
            </Link>
            <Link to="/leaderboard" className="nav-link">
              Leaderboard
            </Link>
            <Link to="/injuries" className="nav-link">
              Injuries
              </Link>
            <Link to="/group" className="nav-link">
              FriendGroup
            </Link>
            {currentUser ? (
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            ) : (
              <Link to="/signin" className="sign-in-button">
                Sign In
              </Link>
            )}
          </nav>
      </div>
    </header>
  );
};

export default Header;