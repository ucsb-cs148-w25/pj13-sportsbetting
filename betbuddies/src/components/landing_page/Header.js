import React, { useState } from "react";
import MobileMenu from "./MobileMenu";
import "./styles/headerStyle.css";
import { Link } from "react-router-dom";

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
            <h1>BetBuddies</h1>
          </div>
          <nav className={`navbar ${!isMenuOpen ? "md-visible" : ""}`}>
            <Link to="/sportsbook" className="nav-link">
              NBA
            </Link>
            <Link to="/live" className="nav-link">
              Group
            </Link>
            <Link to="/leaderboard" className="nav-link">
              Leaderboard
            </Link>
            <Link
              to="/signin"
              className="sign-in-button"
            >
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
