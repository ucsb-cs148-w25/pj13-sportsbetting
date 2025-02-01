import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { auth } from '../../firebase';
import './Profile.css';

const Profile = () => {
  const { currentUser } = useContext(AuthContext); // Access currentUser from context
  const navigate = useNavigate(); // For navigation after sign-out

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await auth.signOut(); // Firebase sign out method
      navigate('/'); // Redirect to sign-in page after successful logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!currentUser) {
    navigate('/');
    return null;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p>{currentUser.email}</p>
      <button onClick={handleSignOut} className="sign-out-button">
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
