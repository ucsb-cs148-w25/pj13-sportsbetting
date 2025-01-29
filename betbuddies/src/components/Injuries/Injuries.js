import React, { useEffect, useState } from "react";
import "./Injuries.css";

const Injuries = () => {
  const [injuries, setInjuries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Placeholder for API call
    const fetchInjuries = async () => {
      try {
        // Replace with actual API call
        const response = await fetch("YOUR_API_ENDPOINT_HERE");
        const data = await response.json();
        setInjuries(data);
      } catch (err) {
        setError("Failed to load injury data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInjuries();
  }, []);

  if (loading) return <p>Loading injuries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="injuries-container">
      <h2>Injuries Report</h2>
      <ul>
        {injuries.length > 0 ? (
          injuries.map((player, index) => (
            <li key={index} className="injury-item">
              <strong>{player.name}</strong> - {player.team} ({player.status})
            </li>
          ))
        ) : (
          <p>No injuries reported.</p>
        )}
      </ul>
    </div>
  );
};

export default Injuries;
