import React from "react";


function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
      <div className="min-h-screen flex flex-col bg-gray-100">
          {/* Header */}
          <header className="bg-blue-600 text-white p-4">
              <div className="container mx-auto flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                      <button
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                          className="text-white focus:outline-none"
                      >
                          {isMenuOpen ? 'X' : '☰'}
                      </button>
                      <h1 className="text-2xl font-bold">BetBuddies</h1>
                  </div>
                  <nav className="hidden md:flex space-x-4">
                      <a href="#" className="hover:text-blue-200">Sports</a>
                      <a href="#" className="hover:text-blue-200">Live</a>
                      <a href="#" className="hover:text-blue-200">Promotions</a>
                  </nav>
              </div>
          </header>

          {/* Mobile Menu */}
          {isMenuOpen && (
              <div className="md:hidden bg-blue-500 text-white p-4">
                  <nav className="flex flex-col space-y-2">
                      <a href="#" className="hover:text-blue-200">Sports</a>
                      <a href="#" className="hover:text-blue-200">Live</a>
                      <a href="#" className="hover:text-blue-200">Promotions</a>
                  </nav>
              </div>
          )}

          {/* Main Content */}
          <main className="flex-grow">
              {/* Hero Section */}
              <section className="bg-blue-700 text-white py-20">
                  <div className="container mx-auto text-center">
                      <h2 className="text-4xl font-bold mb-4">Welcome to BetBuddies</h2>
                      <p className="text-xl mb-8">Experience the thrill of sports betting like never before!</p>
                      <button className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300">
                          Sign In
                      </button>
                  </div>
              </section>

              {/* Featured Bets */}
              <section className="py-16">
                  <div className="container mx-auto">
                      <h3 className="text-2xl font-bold mb-8 text-center">Featured Bets</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {[1, 2, 3].map((item) => (
                              <div key={item} className="bg-white rounded-lg shadow-md p-6">
                                  <h4 className="text-xl font-semibold mb-4">Match {item}</h4>
                                  <p className="text-gray-600 mb-4">Team A vs Team B</p>
                                  <button className="flex items-center text-blue-600 hover:text-blue-800">
                                      View Odds &gt;
                                  </button>
                              </div>
                          ))}
                      </div>
                  </div>
              </section>

              {/* Call to Action */}
              <section className="bg-gray-200 py-16">
                  <div className="container mx-auto text-center">
                      <h3 className="text-3xl font-bold mb-4">Ready to Join?</h3>
                      <p className="text-xl mb-8">Sign up now and get a 100% bonus on your first deposit!</p>
                      <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
                          Sign Up
                      </button>
                  </div>
              </section>
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-8">
              <div className="container mx-auto text-center">
                  <p>&copy; 2023 BetBuddies. All rights reserved.</p>
                  <div className="mt-4">
                      <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
                      <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
                      <a href="#" className="text-gray-400 hover:text-white mx-2">Contact Us</a>
                  </div>
              </div>
          </footer>
      </div>
  );
}

export default LandingPage;