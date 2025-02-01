import React, { useState } from 'react';
import './SignIn.css';
import { auth } from '../../firebase'; 
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle Email/Password Sign-In
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const backendUrl = `${process.env.REACT_APP_BACKEND_SERVER_HOST}:${process.env.REACT_APP_BACKEND_SERVER_PORT}`;

      const userExists = await axios.get(`${backendUrl}/api/users/${user.uid}`)
      .then(response => response.status === 200)
      .catch(error => {
        if (error.response && error.response.status === 404) {
          return false; // User does not exist
        }
        throw error;
      });

      if (!userExists) {
        const userData = {
          username: user.displayName || "Anonymous",
          email: user.email,
          balance: 0,
          totalWinnings: 0,
          groupIds: [],
        };
  
        await axios.post(`${backendUrl}/api/users/${user.uid}`, userData);
        console.log("New user created.");
      } else {
        console.log("User already exists. Proceeding with sign-in.");
      }
  
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  // Redirect to Sign-Up Page
  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <div className="signin-container">
      <h1 className="signin-title">BetBuddies</h1>
      <p className="signin-description">
        Compete with your friends to see who's the ultimate sports bettor! Place bets with virtual money and climb the leaderboard.
      </p>

      <div className="signin-form">
        <h2>Sign In</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="signin-button">Log In</button>
        </form>

        <button onClick={handleGoogleLogin} className="google-signin-button">
          Sign In with Google
        </button>

        <p className="signup-prompt">
          Don't have an account?{' '}
          <button onClick={handleCreateAccount} className="create-account-button">
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
