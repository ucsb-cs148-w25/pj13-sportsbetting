import React from 'react';
import LandingPage from './components/landing_page/LandingPage';
import SignIn from "./components/SignIn/SignIn";
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupPage from "./components/GroupPage/GroupPage";
import NBA from "./pages/NBA";
import Sportsbook from "./pages/SportsBook";
import Header from "./components/landing_page/Header";
import BettingPage from "./pages/BettingPage";
import Leaderboard from "./pages/Leaderboard";
import MobileMenu from "./components/landing_page/MobileMenu";

function App() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <Router>
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <MobileMenu isMenuOpen={isMenuOpen} />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/group" element={<GroupPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/nba" element={<NBA />} />
                <Route path="/sportsbook" element={<Sportsbook />} />
                <Route path="/betting" element={<BettingPage />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </Router>
    );
}

export default App;
