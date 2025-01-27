import React, { useState } from 'react';
import './SignUp.css';

function SignUp() {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert(`Account created for ${form.username}!`);
    // Add signup logic here (e.g., API call)
  };

  return (
    <div className="signup-container">
      <h1>Sign Up for BetBuddies</h1>
      <form onSubmit={handleSignUp}>
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="signup-button">Create Account</button>
      </form>
    </div>
  );
}

export default SignUp;
