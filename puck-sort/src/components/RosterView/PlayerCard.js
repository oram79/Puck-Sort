import React, { useState } from 'react';
import { useTeamContext } from '../../context/TeamContext';
import { useTheme } from '../../context/ThemeContext';
import styles from './RosterView.css';

const PlayerCard = ({ player }) => {
  const { 
    handleRemovePlayer, 
    addToTeam1, 
    addToTeam2, 
    removeFromTeams,
    team1,
    team2
  } = useTeamContext();

  const { isDarkMode } = useTheme();
  const [showActions, setShowActions] = useState(false);

  // Check if player is already assigned to a team
  const isInTeam1 = team1.some(p => p.id === player.id);
  const isInTeam2 = team2.some(p => p.id === player.id);
  const isAssigned = isInTeam1 || isInTeam2;

  // Format the date the player was added
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div 
      className={`${styles.playerCard} ${isAssigned ? styles.assigned : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={styles.playerInfo}>
        <div className={styles.nameContainer}>
          <h3 className={styles.playerName}>{player.name}</h3>
          {isAssigned && (
            <div 
              className={`${styles.teamBadge} ${isInTeam1 ? styles.teamBlack : styles.teamWhite}`}
            >
              {isInTeam1 ? 'Team Black' : 'Team White'}
            </div>
          )}
        </div>
        <p className={styles.playerDate}>
          Added {formatDate(player.createdAt)}
        </p>
      </div>

      <div className={`${styles.playerActions} ${showActions ? styles.visible : ''}`}>
        {!isAssigned ? (
          <>
            <button 
              onClick={() => addToTeam1(player)}
              className={`${styles.actionButton} ${styles.teamBlackBtn}`}
              aria-label="Add to Team Black"
            >
              Team Black
            </button>
            <button 
              onClick={() => addToTeam2(player)}
              className={`${styles.actionButton} ${styles.teamWhiteBtn}`}
              aria-label="Add to Team White"
            >
              Team White
            </button>
          </>
        ) : (
          <button 
            onClick={() => removeFromTeams(player)}
            className={`${styles.actionButton} ${styles.removeTeamBtn}`}
            aria-label="Remove from team"
          >
            Remove from Team
          </button>
        )}
        <button 
          onClick={() => handleRemovePlayer(player.id)}
          className={`${styles.actionButton} ${styles.deleteBtn}`}
          aria-label="Delete player"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;