import React from 'react';
import { useTeamContext } from '../../context/TeamContext';
import TeamRoster from './TeamRoster';
import styles from './TeamsView.css';

const TeamsView = () => {
  const { 
    team1, 
    team2, 
    players,
    autoDistributeTeams, 
    saveTeamsToFile,
    isLoading,
    addToTeam1,
    addToTeam2
  } = useTeamContext();

  // Get unassigned players
  const unassignedPlayers = players.filter(
    player => !team1.some(p => p.id === player.id) && !team2.some(p => p.id === player.id)
  );

  // Calculate stats
  const totalPlayers = players.length;
  const assignedCount = team1.length + team2.length;
  const unassignedCount = unassignedPlayers.length;
  const assignedPercentage = totalPlayers > 0 
    ? Math.round((assignedCount / totalPlayers) * 100) 
    : 0;

  return (
    <div className={styles.teamsView}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Team Management</h1>
          <p className={styles.subtitle}>
            Organize players into balanced teams
          </p>
        </div>

        <div className={styles.actions}>
          <button 
            className={`${styles.actionButton} ${styles.distributeButton}`}
            onClick={autoDistributeTeams}
            disabled={isLoading || players.length === 0}
          >
            {isLoading ? 'Distributing...' : '🔄 Auto-Distribute'}
          </button>
          <button 
            className={`${styles.actionButton} ${styles.saveButton}`}
            onClick={saveTeamsToFile}
            disabled={team1.length === 0 && team2.length === 0}
          >
            💾 Save Roster
          </button>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{totalPlayers}</span>
          <span className={styles.statLabel}>Total Players</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{assignedCount}</span>
          <span className={styles.statLabel}>Assigned</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{unassignedCount}</span>
          <span className={styles.statLabel}>Unassigned</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.progressContainer}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${assignedPercentage}%` }}
            />
            <span className={styles.progressText}>{assignedPercentage}%</span>
          </div>
          <span className={styles.statLabel}>Assigned</span>
        </div>
      </div>

      <div className={styles.teamsContainer}>
        <TeamRoster 
          team={team1} 
          teamName="Black" 
          teamColor="black" 
        />
        <TeamRoster 
          team={team2} 
          teamName="White" 
          teamColor="white" 
        />
      </div>

      {unassignedPlayers.length > 0 && (
        <div className={styles.unassignedSection}>
          <h2 className={styles.sectionTitle}>Unassigned Players</h2>
          <div className={styles.unassignedList}>
            {unassignedPlayers.map(player => (
              <div key={player.id} className={styles.unassignedPlayer}>
                <span className={styles.playerName}>{player.name}</span>
                <div className={styles.actions}>
                  <button 
                    onClick={() => addToTeam1(player)}
                    className={`${styles.teamButton} ${styles.teamBlackBtn}`}
                  >
                    Team Black
                  </button>
                  <button 
                    onClick={() => addToTeam2(player)}
                    className={`${styles.teamButton} ${styles.teamWhiteBtn}`}
                  >
                    Team White
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsView;