import React, { useState } from 'react';
import { useTeamContext } from '../../context/TeamContext';
import { useTheme } from '../../context/ThemeContext';
import styles from './SettingsView.css';

const SettingsView = () => {
  const { showNotification, players, team1, team2 } = useTeamContext();
  const { isDarkMode, toggleTheme } = useTheme();
  
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
    <div className={styles.settingsView}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>
          Manage application preferences and data
        </p>
      </div>
      
      <div className={styles.settingsGrid}>
        <div className={styles.settingsCard}>
          <h2 className={styles.cardTitle}>Application Summary</h2>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryValue}>{totalTeams}</span>
              <span className={styles.summaryLabel}>Teams</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryValue}>{totalPlayers}</span>
              <span className={styles.summaryLabel}>Players</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryValue}>{assignedPlayers}</span>
              <span className={styles.summaryLabel}>Assigned</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryValue}>{totalPlayers - assignedPlayers}</span>
              <span className={styles.summaryLabel}>Unassigned</span>
            </div>
          </div>
        </div>
        
        <div className={styles.settingsCard}>
          <h2 className={styles.cardTitle}>Appearance</h2>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span className={styles.settingLabel}>Dark Mode</span>
              <span className={styles.settingDescription}>
                Switch between light and dark theme
              </span>
            </div>
            <label className={styles.toggle}>
              <input 
                type="checkbox" 
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        
        <div className={styles.settingsCard}>
          <h2 className={styles.cardTitle}>Data Management</h2>
          <div className={styles.settingActions}>
            <button 
              className={`${styles.actionButton} ${styles.exportButton}`}
              onClick={handleExportData}
              disabled={players.length === 0}
            >
              Export Data (JSON)
            </button>
            <button 
              className={`${styles.actionButton} ${styles.resetButton} ${showConfirmReset ? styles.confirmReset : ''}`}
              onClick={handleResetData}
            >
              {showConfirmReset ? 'Click again to confirm' : 'Reset All Data'}
            </button>
          </div>
          <p className={styles.resetNote}>
            Resetting will clear all player data and team assignments. This action cannot be undone.
          </p>
        </div>
        
        <div className={styles.settingsCard}>
          <h2 className={styles.cardTitle}>About PuckSort</h2>
          <div className={styles.aboutContent}>
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