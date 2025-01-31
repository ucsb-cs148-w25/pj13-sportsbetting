import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing_page/LandingPage";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import NBA from "./pages/NBA"; // Use the correct path for NBA.js
import Sportsbook from "./pages/Sportsbook"; // Ensure this file exists
=======
import GroupPage from "./components/GroupPage/GroupPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/group" element={<GroupPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/nba" element={<NBA />} /> {/* Route for NBA */}
                <Route path="/sportsbook" element={<Sportsbook />} /> {/* Route for Sportsbook */}
            </Routes>
        </Router>
    );
}

export default App;
