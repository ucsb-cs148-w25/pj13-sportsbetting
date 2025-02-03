import React, { useEffect, useState } from "react";
import "./Injuries.css";

const Injuries = () => {
  const [injuries, setInjuries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    const fetchInjuries = async () => {
      try {
        const response = await fetch("/nba_injuries.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Fetched JSON Data:", data);  // Debugging log
        setInjuries(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load injury data.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchInjuries();
  }, []);
  

  const teams = [...new Set(injuries.map((injury) => injury.team))];

  if (loading) return <p>Loading injuries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="injuries-container">
      <h2>NBA Injuries Report</h2>
      <label htmlFor="team-select">Select a Team:</label>
      <select
        id="team-select"
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
      >
        <option value="">All Teams</option>
        {teams.map((team, index) => (
          <option key={index} value={team}>{team}</option>
        ))}
      </select>
      <ul>
        {injuries
          .filter((injury) => !selectedTeam || injury.team === selectedTeam)
          .map((player, index) => (
            <li key={index} className="injury-item">
              <strong>{player.name}</strong> - {player.position}, <span className="team-name">{player.team}</span> ({player.status})
              <p>{player.details}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Injuries;