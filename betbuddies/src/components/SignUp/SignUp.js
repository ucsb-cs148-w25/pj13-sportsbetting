import React, { useState } from 'react';
import './SignUp.css';
import { auth } from '../../firebase'; // assuming you have firebase set up
import { createUserWithEmailAndPassword } from 'firebase/auth'; // for sign-up
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FRONTEND_API_BASE_URL from '../../API_BASE_URL'

function SignUp() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const headers = {
    Authorization: `${process.env.REACT_APP_BACKEND_SERVER_TOKEN}`
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle Sign-Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      const userData = {
        username: user.email,
        email: user.email,
        balance: 1000,
        totalWinnings: 0,
        groupIds: [],
      };

      await axios.post(`${FRONTEND_API_BASE_URL}/api/users/${user.uid}`, userData, { headers });

      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create Account</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSignUp} className="signup-form">
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
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
