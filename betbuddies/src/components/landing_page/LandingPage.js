import React from 'react';
import HeroSection from './HeroSection';
import FeaturedBets from './FeaturedBets';
import CallToAction from './CallToAction';
import Footer from './Footer';

const LandingPage = () => {

  return (
      <div className="min-h-screen flex flex-col bg-gray-100">
          {/* Main Content */}
          <main className="flex-grow">
            <HeroSection />
            <FeaturedBets />
              <CallToAction />
          </main>
          <Footer />
      </div>
  );
}

export default LandingPage;