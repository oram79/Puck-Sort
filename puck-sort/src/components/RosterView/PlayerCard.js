import React, { useState } from 'react';
import { useTeamContext } from '../../context/TeamContext';
import { useTheme } from '../../context/ThemeContext';

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
      className={`playerCard ${isAssigned ? 'assigned' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="playerInfo">
        <div className="nameContainer">
          <h3 className="playerName">{player.name}</h3>
          {isAssigned && (
            <div 
              className={`teamBadge ${isInTeam1 ? 'teamBlack' : 'teamWhite'}`}
            >
              {isInTeam1 ? 'Team Black' : 'Team White'}
            </div>
          )}
        </div>
        <p className="playerDate">
          Added {formatDate(player.createdAt)}
        </p>
      </div>

      <div className={`playerActions ${showActions ? 'visible' : ''}`}>
        {!isAssigned ? (
          <>
            <button 
              onClick={() => addToTeam1(player)}
              className={`actionButton teamBlackBtn`}
              aria-label="Add to Team Black"
            >
              Team Black
            </button>
            <button 
              onClick={() => addToTeam2(player)}
              className={`actionButton teamWhiteBtn`}
              aria-label="Add to Team White"
            >
              Team White
            </button>
          </>
        ) : (
          <button 
            onClick={() => removeFromTeams(player)}
            className={`actionButton removeTeamBtn`}
            aria-label="Remove from team"
          >
            Remove from Team
          </button>
        )}
        <button 
          onClick={() => handleRemovePlayer(player.id)}
          className={`actionButton deleteBtn`}
          aria-label="Delete player"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;