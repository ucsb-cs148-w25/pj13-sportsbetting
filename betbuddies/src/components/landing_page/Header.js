import React, { useState } from "react";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";
import "./styles/headerStyle.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <>
        <header className="header">
          <div className="header-container">
            <div className="header-title">
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="menu-button"
              >
                {isMenuOpen ? "X" : "☰"}
              </button>
              <Link to="/" className="nav-link">
                <h1>BetBuddies</h1>
              </Link>
            </div>
            <nav className={`navbar ${!isMenuOpen ? "md-visible" : ""}`}>
              <Link to="/sportsbook" className="nav-link">
                Sportsbook
              </Link>
              <Link to="/live" className="nav-link">
                Live
              </Link>
              <Link to="/leaderboard" className="nav-link">
                Leaderboard
              </Link>
              <Link to="/group" className="nav-link">
                FriendGroup
              </Link>
              <Link to="/signin" className="sign-in-button">
                Sign In
              </Link>
            </nav>
          </div>
        </header>
        {isMenuOpen && <MobileMenu />}
      </>
  );
};

export default Header;