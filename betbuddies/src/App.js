import React from 'react';
import LandingPage from './components/landing_page/LandingPage';
import SignIn from "./components/SignIn/SignIn";
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupPage from "./components/GroupPage/GroupPage";
import GroupDetailPage from './pages/GroupDetailPage';
import Header from "./components/landing_page/Header";
import BettingPage from "./pages/BettingPage";
import Injury from './components/Injuries/Injury';
import Leaderboard from "./pages/Leaderboard";

function App() {
    return (
        <Router>
        <Header />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/group" element={<GroupPage />} />
                <Route path="/group/:id" element={<GroupDetailPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/betting" element={<BettingPage />} />
                <Route path="/Injuries" element={<Injury />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </Router>
    );
}

export default App;
