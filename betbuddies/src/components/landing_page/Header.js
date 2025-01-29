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
              <Link to="/" className="logo">
                <h1>BetBuddies</h1>
              </Link>
            </div>
            <nav className={`navbar ${!isMenuOpen ? "md-visible" : ""}`}>
              <Link to="/sportsbook" className="logo">
                Sportsbook
              </Link>
              <Link to="/live" className="logo">
                Live
              </Link>
              <Link to="/leaderboard" className="logo">
                Leaderboard
              </Link>
              <Link to="/group" className="logo">
                FriendGroup
              </Link>
              <Link to="/signin" className="logo">
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