import React from 'react';
import { useTeamContext } from '../../context/TeamContext';

const TeamRoster = ({ team, teamName, teamColor }) => {
  const { removeFromTeams } = useTeamContext();

  return (
    <div className={`teamRoster team${teamName}`}>
      <div className="teamHeader">
        <h2 className="teamName">Team {teamName}</h2>
        <span className="playerCount">{team.length} Players</span>
      </div>
      
      {team.length > 0 ? (
        <div className="teamPlayersList">
          {team.map((player, index) => (
            <div key={player.id} className="teamPlayer">
              <div className="playerIndex">{index + 1}</div>
              <span className="playerName">{player.name}</span>
              <button 
                className="removeButton"
                onClick={() => removeFromTeams(player)}
                aria-label={`Remove ${player.name} from Team ${teamName}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="emptyTeam">
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