import React from "react"
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="bg-blue-700 text-white py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Welcome to BetBuddies</h2>
                    <p className="text-xl mb-8">Experience the thrill of sports betting like never before!</p>
                    <Link
                        to="/signin"
                        className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300"
                    >
                        Sign In
                    </Link>
                </div>
            </section>
)

export default HeroSection

