import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import './Injury.css';

const Injury = () => {
  const { currentUser } = useAuth();
  const [injuries, setInjuries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  const triggerScrape = async () => {
    try {
        setLoading(true);
        const response = await fetch('http://localhost:4000/api/injuries/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server responded with status: ${response.status}, ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Scrape response:', data);
        
        // Optionally, refresh the injuries data after scraping
        // You might want to call your GET injuries method here
    } catch (error) {
        console.error('Error triggering scrape:', error);
        setError('Failed to refresh injury data');
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
    let unsubscribe;
    
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'nba-injuries', 'latest');
        
        unsubscribe = onSnapshot(docRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            console.log('Received Firestore data:', data);
            
            // Handle injuries array
            if (data?.injuries) {
              setInjuries(data.injuries);
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
          } else {
            setInjuries([]);
            setLastUpdated(null);
          }
          setLoading(false);
        });
      } catch (error) {
        console.error('Setup error:', error);
        setError('Failed to set up data connection');
        setLoading(false);
      }
    };
  
    fetchData();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
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