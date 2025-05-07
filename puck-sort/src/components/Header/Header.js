import React from 'react';
import { useTeamContext } from '../../context/TeamContext';

const Header = () => {
  const { activeTab, setActiveTab } = useTeamContext();

  return (
    <header className="header">
      <div className="logoContainer">
        <div className="logo">
          <i className="fas fa-hockey-puck logoIcon"></i>
          <span className="appName">PuckSort</span>
        </div>
        <div className="tagline"> Hockey Team Management System</div>
      </div>
      
      <nav className="navigation">
        <button
          className={`navButton ${activeTab === 'roster' ? 'active' : ''}`}
          onClick={() => setActiveTab('roster')}
        >
          <i className="fas fa-users navIcon"></i>
          Roster
        </button>
        <button
          className={`navButton ${activeTab === 'teams' ? 'active' : ''}`}
          onClick={() => setActiveTab('teams')}
        >
          <i className="fas fa-users-cog navIcon"></i>
          Teams
        </button>
        <button
          className={`navButton ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="fas fa-cog navIcon"></i>
          Settings
        </button>
      </nav>
    </header>
  );
};

export default Header;