import axios from 'axios';
import FRONTEND_API_BASE_URL from '../API_BASE_URL';

// Get bet history for a specific user
export const getUserBetsByUserId = async (userId, token) => {
  try {
    const response = await axios.get(`${FRONTEND_API_BASE_URL}/api/userBets/user_id/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user bets:', error);
    throw error;
  }
};
