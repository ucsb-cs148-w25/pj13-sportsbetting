import React from "react"

const FeaturedBets = () => (
  <section className="py-16">
    <div className="container mx-auto">
      <h3 className="text-2xl font-bold mb-8 text-center">Featured Bets</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-4">Match {item}</h4>
            <p className="text-gray-600 mb-4">Team A vs Team B</p>
            <button className="flex items-center text-blue-600 hover:text-blue-800">View Odds &gt;</button>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default FeaturedBets

