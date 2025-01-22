import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Welcome, ${form.username}!`);
    // Add login logic here
  };

  const handleCreateAccount = () => {
    alert('Redirecting to account creation...');
    // Add account creation logic here
  };

  return (
    <div className="welcome-container">
      {/* Welcome Title */}
      <h1 className="welcome-title">BetBuddies</h1>

      {/* Description */}
      <p className="welcome-description">
        Compete with your friends to see who's the ultimate sports bettor! Place bets with virtual money and climb the leaderboard to prove your skills.
      </p>

      {/* Login Form */}
      <div className="login-form">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
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
          <button type="submit" className="login-button">Log In</button>
        </form>

        {/* Create Account Button */}
        <p>
          Don't have an account?{' '}
          <button onClick={handleCreateAccount} className="create-account-button">
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
}

export default App;
