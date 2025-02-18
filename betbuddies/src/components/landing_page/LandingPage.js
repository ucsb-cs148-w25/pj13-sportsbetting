import React, { useContext } from 'react';
import HeroSection from './HeroSection';
import FeaturedBets from './FeaturedBets';
import CallToAction from './CallToAction';
import Footer from './Footer';
import AuthContext from '../../contexts/AuthContext';

const LandingPage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Main Content */}
      <main className="flex-grow">
        <HeroSection />
        <FeaturedBets />
        {!currentUser && <CallToAction />}
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;