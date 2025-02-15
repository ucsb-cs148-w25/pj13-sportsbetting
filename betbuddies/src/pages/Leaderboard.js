import React, { useEffect, useState } from "react";
import { Trophy, Medal } from "lucide-react";
import axios from "axios";
import FRONTEND_API_BASE_URL from '../API_BASE_URL';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `${process.env.REACT_APP_BACKEND_SERVER_TOKEN}`
    };
    
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

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 1:
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 2:
        return <Medal className="h-8 w-8 text-amber-600" />;
      default:
        return (
          <div className="h-8 w-8 flex items-center justify-center text-blue-600 font-semibold text-lg">
            #{index + 1}
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-center text-gray-900">
            Leaderboard
        </h2>
      </div>

      <div className="space-y-3">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`grid grid-cols-10 items-center p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300 ${
              index === 0 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200' : ''
            }`}
          >
            {/* Rank Icon */}
            <div className="col-span-1 flex justify-center">
              {getRankIcon(index)}
            </div>

            {/* Username */}
            <div className="col-span-6 text-left">
              <h3 className={`font-semibold text-lg ${
                index === 0 ? 'text-yellow-900' : 'text-gray-900'
              }`}>
                {user.username}
              </h3>
            </div>

            {/* Balance */}
            <div className="col-span-3 text-right">
              <span className={`text-lg font-semibold ${
                index === 0 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                ${user.balance.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;