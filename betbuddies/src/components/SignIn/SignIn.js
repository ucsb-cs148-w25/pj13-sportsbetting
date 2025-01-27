import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

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
    navigate('/signup'); // Navigate to signup page
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">BetBuddies</h1>
      <p className="welcome-description">
        Compete with your friends to see who's the ultimate sports bettor!
      </p>
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

export default SignIn;
