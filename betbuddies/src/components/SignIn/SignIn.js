import React, { useState } from 'react';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FRONTEND_API_BASE_URL from '../../API_BASE_URL';

function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getReadableErrorMessage = (errorCode) => {
    switch(errorCode) {
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please try again.';
      case 'auth/user-not-found':
        return 'No account found with this email. Need to create an account?';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again or reset your password.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful login attempts. Please try again later or reset your password.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection and try again.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      default:
        return 'An error occurred during sign in. Please try again.';
    }
  };

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
      setError(getReadableErrorMessage(error.code));
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
          balance: 1000,
          totalWinnings: 0,
          groupIds: [],
        };

        await axios.post(`${FRONTEND_API_BASE_URL}/api/users/${user.uid}`, userData, { headers });
      }

      navigate('/');
    } catch (error) {
      setError(getReadableErrorMessage(error.code));
    }
  };

  // Redirect to Sign-Up Page
  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Sign-In Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">          
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back</h2>
            
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleEmailLogin} className="space-y-5">
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
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </button>
                </div>
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
              
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium transition-colors"
              >
                Sign In
              </button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
              
              <button
                onClick={handleGoogleLogin}
                className="mt-4 w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors font-medium"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" 
                    fill="#4285F4"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
        
        {/* Sign Up Prompt */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button 
            onClick={handleCreateAccount}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignIn;