import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import { CheckCircle, XCircle, Hourglass } from "lucide-react";
import axios from "axios";
import FRONTEND_API_BASE_URL from '../../API_BASE_URL';
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [betHistory, setBetHistory] = useState([]);
  // {status: "pending", amount: 0, betData: {team1: "", team2: ""}}
  
  useEffect(() => {
    const fetchBetHistory = async () => {
      try {
        const response = await axios.get(`${FRONTEND_API_BASE_URL}/api/userBets/user_id/${currentUser.uid}`, {
          headers: {
            Authorization: process.env.REACT_APP_BACKEND_SERVER_TOKEN,
          },
        });

        let sortedBetHistory = Object.values(response.data.data)
          .sort((a, b) => new Date(b.betData.startTime) - new Date(a.betData.startTime));
        setBetHistory(sortedBetHistory);
        
        // setBetHistory(Object.values(response.data.data)); 
      } catch (error) {
        console.error("🔥 Error fetching bet history:", error);
      }
    };

    fetchBetHistory();
  }, [currentUser]); 

  useEffect(() => {
    console.log("🟢 Bet History Updated:", betHistory);
    // console.log("PRINTING HERE")
    // console.log("ODDDDDDS:", betHistory[0].betData.team1_price);
  }, [betHistory]); 

  // Handle user sign-out
  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await auth.signOut();
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    navigate('/');
    return null;
  }

  // Get appropriate status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "won":
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case "lost":
        return <XCircle className="h-8 w-8 text-red-600" />;
      case "pending":
      default:
        return <Hourglass className="h-8 w-8 text-yellow-600" />;
    }
  };

  const getPotentialWinnings = (amount, odds) => {
    if (!amount || !odds) return 0; // Prevent NaN if values are missing
  
    if (Number.isInteger(odds)) {
      return odds > 0 
        ? (amount * 100) / (odds + 100) 
        : (amount * Math.abs(odds)) / (Math.abs(odds) + 100);
    }
    return amount * odds; // For decimal odds
  };
  

  const roundToTwo = (num) => Math.round(num * 100) / 100;

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          {currentUser?.displayName || "User"}'s Profile
        </h2>
        <p className="text-lg text-gray-600">{currentUser?.email}</p>
        <button
          onClick={handleSignOut}
          className="sign-out-button"
          aria-label="Sign Out"
          disabled={isLoading}
        >
          {isLoading ? 'Signing Out...' : 'Sign Out'}
        </button>
      </div>

      {/* BET HISTORY */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          You have made {betHistory.length} bets!
        </h2>
      </div>

      {isLoading ? (
        <p className="text-center">Loading bet history...</p>
      ) : (
        betHistory.length > 0 && (
          <div className="space-y-3">
            {betHistory.map((bet) => (
              <div
                key={bet.id}
                className="grid grid-cols-10 items-center p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
              >
                {/* Status Icon */}
                <div className="col-span-1 flex justify-center">
                  {getStatusIcon(bet.status)}
                </div>

                {/* Bet Details */}
                <div className="col-span-6 text-left">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Bet on {bet.teamChosen}
                  </h3>
                  <p className="text-sm text-gray-600">Amount: ${bet.amount}</p>
                  <p className="text-sm text-gray-600">Odds: {bet.teamChosen === bet.betData.team1 ? bet.betData.team1_price : bet.betData.team2_price}</p>
                  <p className="text-sm text-gray-600">
                    Potential Winnings: 
                    ${Math.abs(roundToTwo(
                      getPotentialWinnings(
                        bet.amount, 
                        bet.teamChosen === bet.betData?.team1 ? bet.betData?.team1_price : bet.betData?.team2_price
                      )
                    ))}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {bet.betData?.startTime ? new Date(bet.betData.startTime).toLocaleString() : "N/A"}
                  </p>
                </div>

                {/* Status */}
                <div className="col-span-3 text-right">
                  <span
                    className={`text-lg font-semibold ${
                      bet.status === "won"
                        ? "text-green-600"
                        : bet.status === "lost"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {bet.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
