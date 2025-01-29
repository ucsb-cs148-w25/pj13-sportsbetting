import React, { useState } from "react";
import Header from '../landing_page/Header';
import MobileMenu from "../landing_page/MobileMenu";
import "../landing_page/styles/headerStyle.css";
import heroSection from "../landing_page/HeroSection";
const GroupPage = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <MobileMenu isMenuOpen={isMenuOpen} />
            <main>
                <div className="heroSection">

                </div>
            </main>
        </div>
    )
}

export default GroupPage;
