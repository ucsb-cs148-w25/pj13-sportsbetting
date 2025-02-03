import React, { useState } from 'react';
import './SignIn.css';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FRONTEND_API_BASE_URL from '../../API_BASE_URL';
import { FcGoogle } from 'react-icons/fc';

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

    const headers = {
      Authorization: `${process.env.REACT_APP_BACKEND_SERVER_TOKEN}`
    };

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userExists = await axios.get(`${FRONTEND_API_BASE_URL}/api/users/${user.uid}`, { headers })
      .then(response => response.status === 200)
      .catch(error => {
        if (error.response && error.response.status === 404) {
          return false;
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

        await axios.post(`${FRONTEND_API_BASE_URL}/api/users/${user.uid}`, userData, { headers });
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
      <div className="signin-box">
        <h1 className="signin-title">BetBuddies</h1>
  
        <div className="signin-form">
          {error && <p className="error-message">{error}</p>}
  
          <form onSubmit={handleEmailLogin}>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleInputChange} required />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleInputChange} required />
            <button type="submit" className="signin-button">Log In</button>
          </form>

          {/* Divider Line */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Google Sign-In Button */}
          <button onClick={handleGoogleLogin} className="google-signin-button">
            <FcGoogle className="google-icon" /> Sign in with Google
          </button>
  
          <p className="signup-prompt">
            Don't have an account? <button onClick={handleCreateAccount} className="create-account-button">Create Account</button>
          </p>
        </div>
      </div>
    </div>
  );  
}

export default SignIn;