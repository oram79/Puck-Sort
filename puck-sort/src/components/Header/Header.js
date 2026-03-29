import React from 'react';
import { useTeamContext } from '../../context/TeamContext';

const Header = () => {
  const { activeTab, setActiveTab, players, team1, team2 } = useTeamContext();

  // Calculate counts for nav badges
  const assignedCount = team1.length + team2.length;

  return (
    <header className="header">
      {/* -- Logo & Tagline -- */}
      <div className="logoContainer">
        <div className="logo">
          <i className="fas fa-hockey-puck logoIcon"></i>
          <span className="appName">PuckSort</span>
        </div>
        <div className="tagline">Hockey Team Management</div>
      </div>

      {/* -- Navigation Tabs -- */}
      {/* Each tab shows a badge with a relevant count */}
      <nav className="navigation">
        <button
          className={`navButton ${activeTab === 'roster' ? 'active' : ''}`}
          onClick={() => setActiveTab('roster')}
        >
          <i className="fas fa-users navIcon"></i>
          Roster
          {players.length > 0 && (
            <span className="navBadge">{players.length}</span>
          )}
        </button>
        <button
          className={`navButton ${activeTab === 'teams' ? 'active' : ''}`}
          onClick={() => setActiveTab('teams')}
        >
          <i className="fas fa-people-group navIcon"></i>
          Teams
          {assignedCount > 0 && (
            <span className="navBadge">{assignedCount}</span>
          )}
        </button>
        <button
          className={`navButton ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="fas fa-sliders navIcon"></i>
          Settings
        </button>
      </nav>
    </header>
  );
};

export default Header;
