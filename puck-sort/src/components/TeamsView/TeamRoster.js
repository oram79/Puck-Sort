import React from 'react';
import { useTeamContext } from '../../context/TeamContext';

/**
 * TeamRoster
 * 
 * Displays a single team's player list, organized by position.
 * Rendered twice on the Teams page: once for Black, once for White.
 * 
 * Each position group (Goalies, Defense, Forwards, Spares) gets
 * its own collapsible-style section with a header and count badge.
 */
const TeamRoster = ({ team, teamName }) => {
  const { removeFromTeams, getPlayersByPosition, POSITIONS } = useTeamContext();
  const playersByPosition = getPlayersByPosition(team);


  const renderPositionSection = (positionType, players) => {
    if (players.length === 0) return null;

    return (
      <div className="positionSection" key={positionType}>
        <div className="positionHeader">
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
                aria-label={`Remove ${player.name}`}
              >
                <i className="fas fa-xmark"></i>
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
          <h2 className="teamName">
            <i className="fas fa-shirt"></i> Team {teamName}
          </h2>
          <span className="playerCount">
            <i className="fas fa-users"></i> {team.length}
          </span>
        </div>
      </div>

      {team.length > 0 ? (
        <div className="teamPlayersList">
          {renderPositionSection(POSITIONS.GOALIE, playersByPosition[POSITIONS.GOALIE])}
          {renderPositionSection(POSITIONS.DEFENSE, playersByPosition[POSITIONS.DEFENSE])}
          {renderPositionSection(POSITIONS.FORWARD, playersByPosition[POSITIONS.FORWARD])}
          {renderPositionSection(POSITIONS.SPARE, playersByPosition[POSITIONS.SPARE])}
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
