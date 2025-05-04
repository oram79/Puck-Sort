import React from 'react';
import { useTeamContext } from '../../context/TeamContext';
import RosterView from '../RosterView/RosterView';
import TeamsView from '../TeamsView/TeamsView';
import SettingsView from '../SettingsView/SettingsView';
import Notification from '../Notification/Notification';
import styles from './Dashboard.css';

const Dashboard = () => {
  const { activeTab, notification } = useTeamContext();

  return (
    <main className={styles.dashboard}>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}
      
      <div className={styles.content}>
        {activeTab === 'roster' && <RosterView />}
        {activeTab === 'teams' && <TeamsView />}
        {activeTab === 'settings' && <SettingsView />}
      </div>
    </main>
  );
};

export default Dashboard;