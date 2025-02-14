import React, { useEffect, useState } from "react";
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

  const getRankColor = (index) => {
    switch (index) {
      case 0:
        return "bg-yellow-400";
      case 1:
        return "bg-gray-300";
      case 2:
        return "bg-amber-600";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="w-[90%] max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      {users.map((user, index) => (
        <div 
          key={user.id} 
          className="flex items-center mb-4 p-4 bg-white rounded-lg border border-gray-100 
                     hover:border-blue-500 hover:shadow-md transition-all duration-200 
                     hover:translate-x-1"
        >
          <div className={`${getRankColor(index)} w-8 h-8 flex items-center justify-center 
                          rounded-full text-white font-semibold text-sm shrink-0`}>
            {index + 1}
          </div>
          
          <div className="flex-1 px-4">
            <span className="font-medium text-gray-800">{user.username}</span>
          </div>
          
          <div className="text-right">
            <span className="text-green-600 font-semibold">
              ${Number(user.balance).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;