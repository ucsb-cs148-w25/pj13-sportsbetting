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
    if (!amount || amount <= 0) {
      alert("Please enter a valid bet amount.");
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
        // check if status=true
        if (!response1.data.success) {
          alert(response1.data.message);
          return;
        }
        
        console.log(auth.currentUser.uid);
        const url = `${FRONTEND_API_BASE_URL}/api/userbets/${auth.currentUser.uid}`;
        const response = await axios.post(
          url,
          {
            userId: auth.currentUser.uid,
            betId: bet.bet_id,
            teamChosen: outcome,
            amount: parseFloat(amount),
            potentialWinnings: 0, // This field is not used, fine to leave it as 0
            status: "pending"
          },
          {
            headers: { Authorization: `${process.env.REACT_APP_BACKEND_SERVER_TOKEN}` },
          }

        );

      alert(`Bet placed successfully! ${response.data.message}`);
    } catch (err) {
      console.error("Error placing bet:", err);
      alert(err.response?.data?.message || "Failed to place bet");
    }
  };

  if (loading) {
    return <div>Loading bets...</div>;
  }
//   console.log(bets);
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (bets.length === 0) {
    return <div>No bets available at the moment.</div>;
  }

  // If user is not logged in, show a message
  if (!currentUser) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <main className="flex flex-col items-center justify-center p-6">
                <h2 className="nav-link2">Betting</h2>
                <p className="text-gray-600 mt-4">Please log in to make your bets.</p>
            </main>
        </div>
    );
  }

  return (
    <div style={{ 
      padding: "20px",
      backgroundColor: "#1a237e", // Dark blue background
      minHeight: "100vh",
      color: "white"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2.5rem" }}>
        Place Your Bets
      </h1>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {bets.map((bet) => (
          bet.betStatus === "closed" ? null : (
            <div
              key={bet.id}
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                color: "#333"
              }}
            >
              <h2 style={{ 
                margin: "0 0 15px 0",
                fontSize: "1.4rem",
                color: "#1a237e"
              }}>
                {bet.team1} vs {bet.team2}
              </h2>
              
              <div style={{ 
                marginBottom: "15px",
                fontSize: "0.9rem",
                color: "#666"
              }}>
                <div>{bet.team1}: {bet.team1_price > 0 ? `+${bet.team1_price}` : bet.team1_price}</div>
                <div>{bet.team2}: {bet.team2_price > 0 ? `+${bet.team2_price}` : bet.team2_price}</div>
                <div>End Time: {new Date(bet.endTime).toLocaleString()}</div>
              </div>

              <input
                type="number"
                placeholder="Bet amount ($)"
                value={betAmounts[bet.id] || ""}
                onChange={(e) => handleBetAmountChange(bet.id, e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px",
                  border: "2px solid #ddd",
                  borderRadius: "5px"
                }}
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handlePlaceBet(bet, bet.team1)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "#1976d2",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {bet.team1}
                </button>
                <button
                  onClick={() => handlePlaceBet(bet, bet.team2)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "#ff6f00",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {bet.team2}
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default BettingPage;
