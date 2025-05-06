import React, { useState } from 'react';
import { useTeamContext } from '../../context/TeamContext';

const PlayerCard = ({ player }) => {
  const { 
    handleRemovePlayer, 
    addToTeam1, 
    addToTeam2, 
    removeFromTeams,
    team1,
    team2
  } = useTeamContext();

  const [showActions, setShowActions] = useState(false);

  // Check if player is already assigned to a team
  const isInTeam1 = team1.some(p => p.id === player.id);
  const isInTeam2 = team2.some(p => p.id === player.id);
  const isAssigned = isInTeam1 || isInTeam2;

  // Get position icon
  const getPositionIcon = (position) => {
    switch (position) {
      case 'Forward':
        return <i className="fas fa-hockey-puck position-icon forward-icon"></i>;
      case 'Defense':
        return <i className="fas fa-shield-alt position-icon defense-icon"></i>;
      case 'Goalie':
        return <i className="fas fa-mask position-icon goalie-icon"></i>;
      default:
        return <i className="fas fa-hockey-puck position-icon"></i>;
    }
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
        <div className="positionContainer">
          {getPositionIcon(player.position)}
          <span className="positionLabel">{player.position}</span>
        </div>
      </div>

      <div className="playerActions">
        {!isAssigned ? (
          <>
            <button 
              onClick={() => addToTeam1(player)}
              className={`actionButton teamBlackBtn`}
              aria-label="Add to Team Black"
            >
              <i className="fas fa-user-plus"></i> Team Black
            </button>
            <button 
              onClick={() => addToTeam2(player)}
              className={`actionButton teamWhiteBtn`}
              aria-label="Add to Team White"
            >
              <i className="fas fa-user-plus"></i> Team White
            </button>
          </>
        ) : (
          <button 
            onClick={() => removeFromTeams(player)}
            className={`actionButton removeTeamBtn`}
            aria-label="Remove from team"
          >
            <i className="fas fa-user-minus"></i> Remove
          </button>
        )}
        <button 
          onClick={() => handleRemovePlayer(player.id)}
          className={`actionButton deleteBtn`}
          aria-label="Delete player"
        >
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;