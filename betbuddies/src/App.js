import React from 'react';
import LandingPage from './components/landing_page/LandingPage';
import SignIn from "./components/SignIn/SignIn";
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupPage from "./components/GroupPage/GroupPage";
import NBA from "./pages/NBA"; // Use the correct path for NBA.js

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/group" element={<GroupPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/nba" element={<NBA />} />
                <Route path="/sportsbook" element={<Sportsbook />} />
            </Routes>
        </Router>
    );
}

export default App;
