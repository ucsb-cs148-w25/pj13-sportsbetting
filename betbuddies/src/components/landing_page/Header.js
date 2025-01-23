import React, { useState } from "react"
import MobileMenu from "./MobileMenu"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              {isMenuOpen ? "X" : "☰"}
            </button>
            <h1 className="text-2xl font-bold">PrizeBets</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <a href="/#" className="hover:text-blue-200">
              Sports
            </a>
            <a href="/#" className="hover:text-blue-200">
              Live
            </a>
            <a href="/#" className="hover:text-blue-200">
              Promotions
            </a>
          </nav>
        </div>
      </header>
      {isMenuOpen && <MobileMenu />}
    </>
  )
}

export default Header

