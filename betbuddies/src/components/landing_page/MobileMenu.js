import React from "react"

const MobileMenu = () => (
  <div className="md:hidden bg-blue-500 text-white p-4">
    <nav className="flex flex-col space-y-2">
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
)

export default MobileMenu

