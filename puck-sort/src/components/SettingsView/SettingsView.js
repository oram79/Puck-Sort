import React, { useState } from 'react';
import { useTeamContext } from '../../context/TeamContext';

const SettingsView = () => {
  const { showNotification, players, team1, team2 } = useTeamContext();
  
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleResetData = () => {
    if (showConfirmReset) {
      // Clear localStorage
      localStorage.removeItem('puckSortPlayers');
      localStorage.removeItem('puckSortTeam1');
      localStorage.removeItem('puckSortTeam2');
      
      window.location.reload();
    } else {
      setShowConfirmReset(true);
      
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
        <h1 className="title">
          <i className="fas fa-cogs"></i> Settings
        </h1>
        <p className="subtitle">
          Manage application preferences and data
        </p>
      </div>
      
      <div className="settingsGrid">
        <div className="settingsCard">
          <h2 className="cardTitle">
            <i className="fas fa-database"></i> Data Management
          </h2>
          <div className="settingActions">
            <button 
              className="actionButton exportButton"
              onClick={handleExportData}
              disabled={players.length === 0}
            >
              <i className="fas fa-file-export"></i> Export Data (JSON)
            </button>
            <button 
              className={`actionButton resetButton ${showConfirmReset ? 'confirmReset' : ''}`}
              onClick={handleResetData}
            >
              {showConfirmReset ? (
                <>
                  <i className="fas fa-exclamation-triangle"></i> Click again to confirm
                </>
              ) : (
                <>
                  <i className="fas fa-trash-alt"></i> Reset All Data
                </>
              )}
            </button>
          </div>
          <p className="resetNote">
            <i className="fas fa-info-circle"></i> Resetting data will clear all player data and team assignments. This action cannot be undone.
          </p>
        </div>
        
        <div className="settingsCard">
          <h2 className="cardTitle">
            <i className="fas fa-info-circle"></i> About PuckSort
          </h2>
          <div className="aboutContent">
            <div className="versionInfo">
              <div className="versionLabel">
                <i className="fas fa-code-branch"></i> Version
              </div>
              <div className="versionValue">1.0.2</div>
            </div>
            <p>
              PuckSort is a team management system designed specifically for recreational hockey leagues. 
              It allows you to easily manage your player roster and organize teams.
            </p>
            <p>
              <i className="fas fa-tools"></i> Built with React and modern web technologies
            </p>
            <div className="developerInfo">
              <i className="fas fa-code"></i> Developed by <strong>Logan Oram</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;