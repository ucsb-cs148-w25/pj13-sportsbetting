import React from 'react';
import LandingPage from './components/landing_page/LandingPage';
import SignIn from "./components/SignIn/SignIn";
import Injuries from './components/Injuries/Injuries';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/Injuries" element={<Injuries />} />
            </Routes>
        </Router>
    );
}

export default App;
