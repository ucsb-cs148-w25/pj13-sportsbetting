import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Set up listener for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Store user information in state
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        // No user is signed in
        setCurrentUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create and export the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;