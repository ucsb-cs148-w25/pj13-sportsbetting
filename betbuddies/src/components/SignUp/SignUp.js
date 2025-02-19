import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FRONTEND_API_BASE_URL from '../../API_BASE_URL';

function SignUp() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
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

  // Get readable error message
  const getReadableErrorMessage = (errorCode) => {
    switch(errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already in use. Try signing in instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password is too weak. Use at least 6 characters with letters and numbers.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection and try again.';
      default:
        return 'An error occurred during sign up. Please try again.';
    }
  };

  // Handle Sign-Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      const userData = {
        username: user.email.split('@')[0],
        email: user.email,
        balance: 1000,
        totalWinnings: 0,
        groupIds: [],
      };

      await axios.post(`${FRONTEND_API_BASE_URL}/api/users/${user.uid}`, userData, { headers });

      navigate('/');
    } catch (error) {
      setError(getReadableErrorMessage(error.code));
    }
  };

  // Navigate to sign in page
  const handleGoToSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Sign-Up Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">          
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Account</h2>
            
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium transition-colors"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
        
        {/* Sign In Prompt */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={handleGoToSignIn}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;