import React, { useRef, useState } from 'react';
import { useTeamContext } from '../../context/TeamContext';
import ConfirmModal from '../Modal/ConfirmModal';

/**
 * SettingsView
 * 
 * Application settings and data management. Contains:
 *  1. Data Management card:
 *     - Export Data (JSON) -- downloads a backup file
 *     - Import Data (JSON) -- NEW: loads a backup from file
 *     - Reset All Data -- clears everything (with modal confirm)
 *  2. About card: version info, description, developer credit
 */
const SettingsView = () => {
  const { showNotification, players, team1, team2, importData } = useTeamContext();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef(null);

  // -- Export: downloads a JSON backup --
  const handleExportData = () => {
    try {
      const data = {
        players,
        team1,
        team2,
        exportDate: new Date().toISOString(),
        appVersion: '3.0.0'
      };

      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

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

  // -- Import: reads a JSON file and loads it into state --
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      importData(event.target.result);
    };
    reader.onerror = () => {
      showNotification('Failed to read file', 'error');
    };
    reader.readAsText(file);

    // Reset the input so the same file can be re-imported
    e.target.value = '';
  };

  // -- Reset: clears localStorage and reloads --
  const handleResetData = () => {
    localStorage.removeItem('puckSortPlayers');
    localStorage.removeItem('puckSortTeam1');
    localStorage.removeItem('puckSortTeam2');
    window.location.reload();
  };

  return (
    <div className="settingsView">
      {/* -- Section Header -- */}
      <div className="header">
        <h1 className="title">
          <i className="fas fa-sliders"></i> Settings
        </h1>
        <p className="subtitle">Manage application preferences and data</p>
      </div>

      <div className="settingsGrid">
        {/* ================================
            Data Management Card
            ================================ */}
        <div className="settingsCard">
          <h2 className="cardTitle">
            <i className="fas fa-database"></i> Data Management
          </h2>
          <div className="settingActions">
            {/* Export */}
            <button
              className="actionButton exportButton"
              onClick={handleExportData}
              disabled={players.length === 0}
            >
              <i className="fas fa-file-export"></i> Export Data (JSON)
            </button>

            {/* Import (NEW) */}
            <button
              className="actionButton importButton"
              onClick={handleImportClick}
            >
              <i className="fas fa-file-import"></i> Import Data (JSON)
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hiddenFileInput"
              onChange={handleFileChange}
            />

            {/* Reset */}
            <button
              className="actionButton resetButton"
              onClick={() => setShowResetConfirm(true)}
            >
              <i className="fas fa-trash-can"></i> Reset All Data
            </button>
          </div>
          <p className="resetNote">
            <i className="fas fa-circle-info"></i>
            Resetting data will clear all players and team assignments permanently. Export a backup first if needed.
          </p>
        </div>

        {/* ================================
            About Card
            ================================ */}
        <div className="settingsCard">
          <h2 className="cardTitle">
            <i className="fas fa-circle-info"></i> About PuckSort
          </h2>
          <div className="aboutContent">
            <div className="versionInfo">
              <div className="versionLabel">
                <i className="fas fa-code-branch"></i> Version
              </div>
              <div className="versionValue">3.0.0</div>
            </div>
            <p>
              PuckSort is a team management system built for recreational hockey leagues.
              Manage your roster, organize balanced teams by position, and share lineups with your players.
            </p>
            <p>
              <i className="fas fa-wrench"></i> Built with React and modern web technologies
            </p>
            <div className="developerInfo">
              <i className="fas fa-code"></i> Developed by <strong>Logan Oram</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <ConfirmModal
          title="Reset All Data"
          message="This will permanently delete all players, team assignments, and settings. This action cannot be undone."
          confirmText="Reset Everything"
          onConfirm={handleResetData}
          onCancel={() => setShowResetConfirm(false)}
          variant="danger"
        />
      )}
    </div>
  );
};

export default SettingsView;
