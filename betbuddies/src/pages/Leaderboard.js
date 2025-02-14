import React, { useEffect, useState } from "react";
import axios from "axios";
import FRONTEND_API_BASE_URL from '../API_BASE_URL'
import './Leaderboard.css';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  const headers = {
    Authorization: `${process.env.REACT_APP_BACKEND_SERVER_TOKEN}`
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${FRONTEND_API_BASE_URL}/api/users`, { headers });
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      {users.map((user, index) => (
        <div key={user.id} className="leaderboard-card">
          <div className="rank">{index + 1}</div>
          <div className="name">{user.username}</div>
          <div className="balance">{user.balance}</div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;