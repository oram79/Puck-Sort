import React from 'react';
import { useTeamContext } from '../../context/TeamContext';

const Header = () => {
  const { activeTab, setActiveTab } = useTeamContext();

  return (
    <header className="header">
      <div className="logoContainer">
        <div className="logo">
          <span className="iconHockey">🏒</span>
          <span className="appName">PuckSort</span>
        </div>
        <div className="tagline">Team Management System</div>
      </div>
      
      <nav className="navigation">
        <button
          className={`navButton ${activeTab === 'roster' ? 'active' : ''}`}
          onClick={() => setActiveTab('roster')}
        >
          Roster
        </button>
        <button
          className={`navButton ${activeTab === 'teams' ? 'active' : ''}`}
          onClick={() => setActiveTab('teams')}
        >
          Teams
        </button>
        <button
          className={`navButton ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </nav>
    </header>
  );
};

export default Header;