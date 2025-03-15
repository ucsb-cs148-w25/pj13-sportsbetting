import React, { useEffect, useState } from 'react';
import getTeamLogoPath from '../../utils/getTeamLogoPath';
import FRONTEND_API_BASE_URL from '../../API_BASE_URL';
import './Injury.css';

const Injury = () => {
  const [injuries, setInjuries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${FRONTEND_API_BASE_URL}/api/injuries/`);
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();

      // Handle injuries array
      if (data?.data) {
        setInjuries(data.data);
      } else {
        setInjuries([]);
      }

      // Handle lastUpdated with better type checking
      if (data?.lastUpdated) {
        if (typeof data.lastUpdated.toDate === 'function') {
          setLastUpdated(data.lastUpdated.toDate());
        } else if (data.lastUpdated instanceof Date) {
          setLastUpdated(data.lastUpdated);
        } else {
          setLastUpdated(new Date(data.lastUpdated));
        }
      } else {
        setLastUpdated(null);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch injury data');
    } finally {
      setLoading(false);
    }
  };

  const triggerScrape = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${FRONTEND_API_BASE_URL}/api/injuries/scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with status: ${response.status}, ${errorText}`);
      }

      // Refresh the injuries data after scraping
      await fetchData();
    } catch (error) {
      console.error('Error triggering scrape:', error);
      setError('Failed to refresh injury data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button 
          onClick={triggerScrape}
          className="refresh-button"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (!injuries || injuries.length === 0) {
    return (
      <div className="injuries-container">
        <h2 className="injuries-title">NBA Injuries Report</h2>
        <div className="no-data">
          <p>No injury data available.</p>
          <button 
            onClick={triggerScrape}
            className="refresh-button"
          >
            Load Injury Data
          </button>
        </div>
      </div>
    );
  }

  // Main render with data
  return (
    <div className="injuries-container">
      <div className="injuries-header">
        <h2 className="injuries-title">NBA Injuries Report</h2>
        {lastUpdated && (
          <p className="last-updated">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        )}
        <button 
          onClick={triggerScrape}
          className="refresh-button"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className="team-select-container">
        <label htmlFor="team-select" className="team-select-label">
          Select a Team:
        </label>
        <select
          id="team-select"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="team-select"
        >
          <option value="">All Teams</option>
          {injuries.map(injury => injury.teamName).filter((team, index, self) => 
            self.indexOf(team) === index
          ).map(team => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
      </div>

      <div className="injuries-list">
        {injuries
          .filter(injury => !selectedTeam || injury.teamName === selectedTeam)
          .map((injury, index) => (
            <div key={index} className="team-card">
              <img 
                  src={getTeamLogoPath(injury.teamName)} 
                  alt={`${injury.teamName} logo`} 
                  className="team-logo"
                />
              <h3 className="team-name">{injury.teamName}</h3>
              <div className="players-list">
                {injury.players?.map((player, playerIndex) => (
                  <div key={playerIndex} className="player-card">
                    <div className="player-header">
                      <div className="player-info">
                        <p className="player-name">{player.playerName}</p>
                        <p className="player-position">{player.position}</p>
                      </div>
                      <span className="injury-status">
                        {player.injuryStatus}
                      </span>
                    </div>
                    <p className="injury-details">{player.injuryDetails}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Injury;