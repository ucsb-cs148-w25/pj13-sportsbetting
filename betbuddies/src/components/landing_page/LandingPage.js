import React from 'react';
import Header from './Header';
import MobileMenu from './MobileMenu';
import HeroSection from './HeroSection';
import FeaturedBets from './FeaturedBets';
import CallToAction from './CallToAction';
import Footer from './Footer';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> */}
          <MobileMenu isMenuOpen={isMenuOpen} />
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