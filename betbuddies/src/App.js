import React from 'react';
import LandingPage from './components/landing_page/LandingPage';
import SignIn from "./components/SignIn/SignIn";
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupPage from "./components/GroupPage/GroupPage";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/group" element={<GroupPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;
