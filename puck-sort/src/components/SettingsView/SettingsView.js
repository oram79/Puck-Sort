import React, { useState } from 'react';
import { useTeamContext } from '../../context/TeamContext';
import { useTheme } from '../../context/ThemeContext';

const SettingsView = () => {
  const { showNotification, players, team1, team2 } = useTeamContext();
  
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  
  // Calculate stats for the summary section
  const totalTeams = 2;
  const totalPlayers = players.length;
  const assignedPlayers = team1.length + team2.length;
  
  // Handle reset all data
  const handleResetData = () => {
    if (showConfirmReset) {
      // Clear localStorage
      localStorage.removeItem('puckSortPlayers');
      localStorage.removeItem('puckSortTeam1');
      localStorage.removeItem('puckSortTeam2');
      
      // Reload the page to reset application state
      window.location.reload();
    } else {
      setShowConfirmReset(true);
      
      // Auto-hide confirmation after 5 seconds
      setTimeout(() => {
        setShowConfirmReset(false);
      }, 5000);
    }
  };
  
  // Handle export data as JSON
  const handleExportData = () => {
    try {
      const data = {
        players,
        team1,
        team2,
        exportDate: new Date().toISOString(),
        appVersion: '1.0.0'
      };
      
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `pucksort-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showNotification('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      showNotification('Error exporting data', 'error');
    }
  };

  return (
    <div className="settingsView">
      <div className="header">
        <h1 className="title">Settings</h1>
        <p className="subtitle">
          Manage application preferences and data
        </p>
      </div>
      
      <div className="settingsGrid">
        <div className="settingsCard">
          <h2 className="cardTitle">Application Summary</h2>
          <div className="summaryGrid">
            <div className="summaryItem">
              <span className="summaryValue">{totalTeams}</span>
              <span className="summaryLabel">Teams</span>
            </div>
            <div className="summaryItem">
              <span className="summaryValue">{totalPlayers}</span>
              <span className="summaryLabel">Players</span>
            </div>
            <div className="summaryItem">
              <span className="summaryValue">{assignedPlayers}</span>
              <span className="summaryLabel">Assigned</span>
            </div>
            <div className="summaryItem">
              <span className="summaryValue">{totalPlayers - assignedPlayers}</span>
              <span className="summaryLabel">Unassigned</span>
            </div>
          </div>
        </div>
        
        <div className="settingsCard">
          <h2 className="cardTitle">Data Management</h2>
          <div className="settingActions">
            <button 
              className={`actionButton exportButton`}
              onClick={handleExportData}
              disabled={players.length === 0}
            >
              Export Data (JSON)
            </button>
            <button 
              className={`actionButton resetButton ${showConfirmReset ? 'confirmReset' : ''}`}
              onClick={handleResetData}
            >
              {showConfirmReset ? 'Click again to confirm' : 'Reset All Data'}
            </button>
          </div>
          <p className="resetNote">
            Resetting will clear all player data and team assignments. This action cannot be undone.
          </p>
        </div>
        
        <div className="settingsCard">
          <h2 className="cardTitle">About PuckSort</h2>
          <div className="aboutContent">
            <p>
              <strong>Version:</strong> 1.0.0
            </p>
            <p>
              PuckSort is a professional team management system designed specifically for ball hockey leagues. 
              It allows you to easily manage your player roster and organize teams.
            </p>
            <p>
              Built with React and modern web technologies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;