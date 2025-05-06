import React from 'react';
import { useTeamContext } from '../../context/TeamContext';

const TeamRoster = ({ team, teamName, teamColor }) => {
  const { removeFromTeams, getPlayersByPosition, POSITIONS } = useTeamContext();
  
  // Group players by position
  const playersByPosition = getPlayersByPosition(team);

  // Get position icon
  const getPositionIcon = (position) => {
    switch (position) {
      case POSITIONS.FORWARD:
        return <i className="fas fa-hockey-puck position-icon forward-icon"></i>;
      case POSITIONS.DEFENSE:
        return <i className="fas fa-shield-alt position-icon defense-icon"></i>;
      case POSITIONS.GOALIE:
        return <i className="fas fa-mask position-icon goalie-icon"></i>;
      default:
        return <i className="fas fa-hockey-puck position-icon"></i>;
    }
  };

  // Render a section for each position type
  const renderPositionSection = (positionType, players) => {
    if (players.length === 0) return null;
    
    return (
      <div className="positionSection" key={positionType}>
        <div className="positionHeader">
          {getPositionIcon(positionType)}
          <h3 className="positionTitle">{positionType}s</h3>
          <span className="positionCount">{players.length}</span>
        </div>
        
        <div className="positionPlayers">
          {players.map((player, index) => (
            <div key={player.id} className="teamPlayer">
              <div className="playerIndex">{index + 1}</div>
              <span className="playerName">{player.name}</span>
              <button 
                className="removeButton"
                onClick={() => removeFromTeams(player)}
                aria-label={`Remove ${player.name} from Team ${teamName}`}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`teamRoster team${teamName}`}>
      <div className="teamHeader">
        <div className="teamTitleContainer">
          <h2 className="teamName">Team {teamName}</h2>
          <span className="playerCount"><i className="fas fa-users"></i> {team.length}</span>
        </div>
      </div>
      
      {team.length > 0 ? (
        <div className="teamPlayersList">
          {renderPositionSection(POSITIONS.GOALIE, playersByPosition[POSITIONS.GOALIE])}
          {renderPositionSection(POSITIONS.DEFENSE, playersByPosition[POSITIONS.DEFENSE])}
          {renderPositionSection(POSITIONS.FORWARD, playersByPosition[POSITIONS.FORWARD])}
        </div>
      ) : (
        <div className="emptyTeam">
          <i className="fas fa-users-slash emptyTeamIcon"></i>
          <p>No players assigned to Team {teamName}</p>
          <p className="emptyTeamSubtext">
            Assign players from the roster or use auto-distribute
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamRoster;