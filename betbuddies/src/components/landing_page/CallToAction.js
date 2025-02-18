import React from "react"
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <section className="bg-gray-200 py-16">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Join?</h3>
        <p className="text-xl mb-8">Sign up now and get a 100% bonus on your first deposit!</p>
        <button onClick={handleSignUpClick} className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
          Sign Up
        </button>
      </div>
    </section>
  );
}

export default CallToAction

