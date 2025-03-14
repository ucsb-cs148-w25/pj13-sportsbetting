import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import { Trophy, CheckCircle, XCircle, Hourglass } from "lucide-react";
import { getUserBetsByUserId } from "../../api/userBets";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [betHistory, setBetHistory] = useState([]);

  // Fetch bet history only when necessary
  const fetchBetHistory = useCallback(async () => {
    if (!auth.currentUser) {
      console.log("No user is signed in.");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
        const token = await auth.currentUser.getIdToken();
        console.log("Firebase Token:", token); // Check if token is valid

        const data = await getUserBetsByUserId(auth.currentUser.uid, token);
        console.log("API Response:", data); // Log API response

        if (!data || !Array.isArray(data)) {
            throw new Error("Unexpected API response format");
        }

        // Sort bets by date (most recent first)
        const sortedBets = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setBetHistory(sortedBets);
    } catch (err) {
        console.error("Error fetching bet history:", err);
        setError(`Failed to load bet history: ${err.message}`);
    } finally {
        setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    const fetchBetHistory = async () => {
        if (!auth.currentUser) {
            console.log("❌ No user is signed in.");
            return;
        }

        console.log("🟢 Fetching bet history for user:", auth.currentUser.uid);

        setIsLoading(true);
        setError('');

        try {
            const token = await auth.currentUser.getIdToken();
            console.log("🟢 Firebase Token Retrieved:", token);

            console.log("🟢 Calling API...");
            const data = await getUserBetsByUserId(auth.currentUser.uid, token);

            console.log("✅ API Response Data:", data);

            if (!data || !Array.isArray(data)) {
                throw new Error("Unexpected API response format");
            }

            setBetHistory(data);
        } catch (err) {
            console.error("🔥 Error fetching bet history:", err);
            setError(`Failed to load bet history: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    fetchBetHistory();
}, []);



  // Handle user sign-out
  const handleSignOut = async () => {
    setIsLoading(true);
    setError('');
    try {
      await auth.signOut();
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
      setError('Failed to sign out. Please try again.');
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
          Bet History
        </h2>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {isLoading ? (
        <p className="text-center">Loading bet history...</p>
      ) : betHistory.length > 0 ? (
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
                <p className="text-sm text-gray-600">Odds: {bet.odds}</p>
                <p className="text-sm text-gray-600">
                  Potential Winnings: ${bet.potentialWinnings}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(bet.date).toLocaleString()}
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
      ) : (
        <p className="text-center">No bets placed yet.</p>
      )}
    </div>
  );
};

export default Profile;
