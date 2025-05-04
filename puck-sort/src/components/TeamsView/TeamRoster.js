import React from 'react';
import { useTeamContext } from '../../context/TeamContext';
import styles from './TeamsView.css';

const TeamRoster = ({ team, teamName, teamColor }) => {
  const { removeFromTeams } = useTeamContext();

  return (
    <div className={`${styles.teamRoster} ${styles[`team${teamName}`]}`}>
      <div className={styles.teamHeader}>
        <h2 className={styles.teamName}>Team {teamName}</h2>
        <span className={styles.playerCount}>{team.length} Players</span>
      </div>
      
      {team.length > 0 ? (
        <div className={styles.teamPlayersList}>
          {team.map((player, index) => (
            <div key={player.id} className={styles.teamPlayer}>
              <div className={styles.playerIndex}>{index + 1}</div>
              <span className={styles.playerName}>{player.name}</span>
              <button 
                className={styles.removeButton}
                onClick={() => removeFromTeams(player)}
                aria-label={`Remove ${player.name} from Team ${teamName}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyTeam}>
          <p>No players assigned to Team {teamName}</p>
          <p className={styles.emptyTeamSubtext}>
            Assign players from the roster or use auto-distribute
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamRoster;