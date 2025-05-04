import React from 'react';
import { useTeamContext } from '../../context/TeamContext';
import { useTheme } from '../../context/ThemeContext';
import styles from './Header.css';

const Header = () => {
  const { activeTab, setActiveTab } = useTeamContext();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <span className={styles.iconHockey}>🏒</span>
          <span className={styles.appName}>PuckSort</span>
        </div>
        <div className={styles.tagline}>Team Management System</div>
      </div>
      
      <nav className={styles.navigation}>
        <button
          className={`${styles.navButton} ${activeTab === 'roster' ? styles.active : ''}`}
          onClick={() => setActiveTab('roster')}
        >
          Roster
        </button>
        <button
          className={`${styles.navButton} ${activeTab === 'teams' ? styles.active : ''}`}
          onClick={() => setActiveTab('teams')}
        >
          Teams
        </button>
        <button
          className={`${styles.navButton} ${activeTab === 'settings' ? styles.active : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </nav>
      
      <div className={styles.actions}>
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Header;