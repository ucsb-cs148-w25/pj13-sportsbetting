import React from 'react';
import LandingPage from './components/landing_page/LandingPage';
import SignIn from "./components/SignIn/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupPage from "./components/GroupPage/GroupPage";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/group" element={<GroupPage />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </Router>
    );
}

export default App;
