"use client";
import React, { useContext } from "react";
import axios from "axios";
import { auth } from './../firebase';
import FRONTEND_API_BASE_URL from '../API_BASE_URL'
import AuthContext from '../contexts/AuthContext';

const BettingPage = () => {
  const [bets, setBets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [betAmounts, setBetAmounts] = React.useState({});
  const { currentUser } = useContext(AuthContext);

  React.useEffect(() => {
    const fetchBets = async () => {
      try {
        const url = `${FRONTEND_API_BASE_URL}/api/bets`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `${process.env.REACT_APP_BACKEND_SERVER_TOKEN}`,
          },
        });

        const betsArray = response.data.data.filter(bet => new Date(bet.endTime) > new Date());
        setBets(betsArray);
      } catch (err) {
        console.error("Error fetching bets:", err);
        setError(err.response?.data?.message || "Failed to fetch bets");
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, []);

  const handleBetAmountChange = (betId, value) => {
    setBetAmounts((prev) => ({
      ...prev,
      [betId]: value,
    }));
  };

  const handlePlaceBet = async (bet, outcome) => {
    const amount = betAmounts[bet.id];
    if (!amount || amount <= 0 || isNaN(amount)) {
      const notification = document.createElement('div');
      notification.className = 'toast-notification error';
      notification.textContent = "Please enter a valid bet amount.";
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add('show');
      }, 100);

      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
      return;
    }

    try {
      const url1 = `${FRONTEND_API_BASE_URL}/api/users/${auth.currentUser.uid}/bet`;
      const response1 = await axios.patch(
        url1,
        { betAmount: parseFloat(amount) },
        {
          headers: { Authorization: `${process.env.REACT_APP_BACKEND_SERVER_TOKEN}` },
        }
      );

      if (!response1.data.success) {
        alert(response1.data.message);
        return;
      }

      console.log(auth.currentUser.uid);
      const url = `${FRONTEND_API_BASE_URL}/api/userbets/${auth.currentUser.uid}`;
      await axios.post(
        url,
        {
          userId: auth.currentUser.uid,
          betId: bet.bet_id,
          teamChosen: outcome,
          amount: parseFloat(amount),
          potentialWinnings: 0,
          status: "pending"
        },
        {
          headers: { Authorization: `${process.env.REACT_APP_BACKEND_SERVER_TOKEN}` },
        }
      );

      // Toast notification instead of alert
      const notification = document.createElement('div');
      notification.className = 'toast-notification success';
      notification.textContent = `Bet placed successfully!`;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add('show');
      }, 100);

      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);

    } catch (err) {
      console.error("Error placing bet:", err);

      // Error toast notification
      const notification = document.createElement('div');
      notification.className = 'toast-notification error';
      notification.textContent = err.response?.data?.message || "Failed to place bet";
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add('show');
      }, 100);

      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-xl font-medium text-gray-800">Loading available bets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white max-w-md w-full p-6 rounded-lg border border-red-200 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Error</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-500 transition-colors text-white px-4 py-2 rounded-md font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white max-w-md w-full p-8 rounded-lg border border-gray-200 shadow-md text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Sports Betting</h2>
          <p className="text-gray-600 text-lg mb-6">Please log in to access the betting platform.</p>
          <button 
            onClick={() => window.location.href = '/signin'}
            className="bg-blue-600 hover:bg-blue-500 transition-colors text-white px-6 py-3 rounded-md font-semibold"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (bets.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white max-w-md w-full p-8 rounded-lg border border-gray-200 shadow-md text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">No Active Bets</h2>
          <p className="text-gray-600 text-lg mb-6">There are no available bets at the moment. Please check back later.</p>
          <div className="flex justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-500 transition-colors text-white px-6 py-3 rounded-md font-semibold"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <style jsx global>{`
        .toast-notification {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          padding: 12px 24px;
          border-radius: 8px;
          color: white;
          font-weight: 500;
          z-index: 1000;
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          max-width: 90%;
          text-align: center;
        }

        .toast-notification.show {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }

        .toast-notification.success {
          background-color: rgba(16, 185, 129, 0.9);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .toast-notification.error {
          background-color: rgba(239, 68, 68, 0.9);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .bet-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .bet-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .bet-button {
          transition: all 0.2s ease;
          min-height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 8px;
          line-height: 1.2;
        }

        .bet-button:hover {
          transform: translateY(-2px);
        }

        .bet-button:active {
          transform: translateY(1px);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">
            Sports Betting
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Place your bets on upcoming matches and test your prediction skills
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bets.map((bet) => (
            bet.betStatus === "closed" ? null : (
              <div
                key={bet.id}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md bet-card"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      {bet.team1} vs {bet.team2}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-5 border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-800">{bet.team1}</span>
                      <span className={`text-sm font-semibold ${bet.team1_price > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {bet.team1_price > 0 ? `+${bet.team1_price}` : bet.team1_price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-800">{bet.team2}</span>
                      <span className={`text-sm font-semibold ${bet.team2_price > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {bet.team2_price > 0 ? `+${bet.team2_price}` : bet.team2_price}
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                        </svg>
                        Ends: {new Date(bet.endTime).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="relative mb-4">
                    <div className="flex items-center border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                      <div className="flex items-center justify-center pl-4 pr-2 text-gray-500">
                        $
                      </div>
                      <input
                        placeholder="Bet amount"
                        value={betAmounts[bet.id] || ""}
                        onChange={(e) => handleBetAmountChange(bet.id, e.target.value)}
                        className="w-full py-3 pr-3 bg-transparent border-0 focus:outline-none text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 mt-2">
                    <button
                      onClick={() => handlePlaceBet(bet, bet.team1)}
                      className="bet-button flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      {bet.team1}
                    </button>
                    <button
                      onClick={() => handlePlaceBet(bet, bet.team2)}
                      className="bet-button flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      {bet.team2}
                    </button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default BettingPage;