import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import { CheckCircle, XCircle, Hourglass, LogOut, User, Wallet, History } from "lucide-react";
import axios from "axios";
import FRONTEND_API_BASE_URL from '../../API_BASE_URL';
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({balance: 0});
  const [betHistory, setBetHistory] = useState([]);
  
  useEffect(() => {
    const fetchBetHistory = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${FRONTEND_API_BASE_URL}/api/userBets/user_id/${currentUser.uid}`, {
          headers: {
            Authorization: process.env.REACT_APP_BACKEND_SERVER_TOKEN,
          },
        });

        let sortedBetHistory = Object.values(response.data.data)
          .sort((a, b) => new Date(b.betData.startTime) - new Date(a.betData.startTime));
        setBetHistory(sortedBetHistory);
        
        const userReponse = await axios.get(`${FRONTEND_API_BASE_URL}/api/users/${currentUser.uid}`, {
          headers: {
            Authorization: process.env.REACT_APP_BACKEND_SERVER_TOKEN,
          },
        });
        setUser(userReponse.data.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser) {
      fetchBetHistory();
    }
  }, [currentUser]); 

  // Handle user sign-out
  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await auth.signOut();
      navigate('/');
    } catch (err) {
      console.error("Error signing out:", err);
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
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "lost":
        return <XCircle className="h-6 w-6 text-red-600" />;
      case "pending":
      default:
        return <Hourglass className="h-6 w-6 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "won":
        return "bg-green-100 text-green-800 border-green-200";
      case "lost":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getPotentialWinnings = (amount, odds) => {
    if (!amount || !odds) return 0;
  
    if (Number.isInteger(odds)) {
      if (odds > 0) {
        return amount * (odds / 100) + amount;
      } else {
        return (amount / Math.abs(odds)) * 100 + amount;
      }
    }
    return amount * odds;
  };

  const roundToTwo = (num) => Math.round(num * 100) / 100;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 min-h-screen">
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8 border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 rounded-full p-4">
              <User className="h-12 w-12 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {currentUser?.displayName || "User"}
              </h2>
              <p className="text-gray-600">{currentUser?.email}</p>
            </div>
          </div>

          {/* Balance Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100 flex items-center gap-3 min-w-48">
            <Wallet className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600 font-medium">Current Balance</p>
              <p className="text-2xl font-bold text-green-600">${user.balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            </div>
          </div>
        </div>
        
        {/* Sign Out Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition-all shadow-sm"
            disabled={isLoading}
          >
            <LogOut className="h-4 w-4" />
            {isLoading ? 'Signing Out...' : 'Sign Out'}
          </button>
        </div>
      </div>

      {/* Bet History Section */}
      <div className="bg-white rounded-xl shadow-md p-8 border">
        <div className="flex items-center gap-3 mb-6">
          <History className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Betting History</h2>
        </div>
        
        {/* Bet Count and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-sm text-gray-600">Total Bets</p>
            <p className="text-2xl font-bold text-blue-600">{betHistory.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <p className="text-sm text-gray-600">Won</p>
            <p className="text-2xl font-bold text-green-600">{betHistory.filter(bet => bet.status === "won").length}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <p className="text-sm text-gray-600">Lost</p>
            <p className="text-2xl font-bold text-red-600">{betHistory.filter(bet => bet.status === "lost").length}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : betHistory.length > 0 ? (
          <div className="space-y-4">
            {betHistory.map((bet) => (
              <div
                key={bet.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all"
              >
                {/* Match Info Header */}
                <div className="bg-gray-50 p-3 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">
                      <span className="font-bold">{bet.teamChosen}</span> vs.{" "}
                      {bet.betData?.team1 === bet.teamChosen ? bet.betData?.team2 : bet.betData?.team1}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(bet.status)}`}
                    >
                      {bet.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {bet.betData?.startTime ? new Date(bet.betData.startTime).toLocaleString() : "N/A"}
                  </p>
                </div>

                {/* Bet Details */}
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Amount Bet</p>
                      <p className="text-lg font-semibold">${bet.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Odds</p>
                      <p className="text-lg font-semibold">
                        {bet.teamChosen === bet.betData.team1 ? bet.betData.team1_price : bet.betData.team2_price}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Potential Payout</p>
                      <p className="text-lg font-semibold text-green-600">
                        ${Math.abs(roundToTwo(
                          getPotentialWinnings(
                            bet.amount, 
                            bet.teamChosen === bet.betData?.team1 ? bet.betData?.team1_price : bet.betData?.team2_price
                          )
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No betting history available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;