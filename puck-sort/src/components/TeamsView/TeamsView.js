import React from 'react';
import { useTeamContext } from '../../context/TeamContext';
import TeamRoster from './TeamRoster';

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
    <div className="teamsView">
      <div className="header">
        <div>
          <h1 className="title">Team Management</h1>
          <p className="subtitle">
            Organize players into balanced teams
          </p>
        </div>

        <div className="actions">
          <button 
            className={`actionButton distributeButton`}
            onClick={autoDistributeTeams}
            disabled={isLoading || players.length === 0}
          >
            {isLoading ? 'Distributing...' : '🔄 Auto-Distribute'}
          </button>
          <button 
            className={`actionButton saveButton`}
            onClick={saveTeamsToFile}
            disabled={team1.length === 0 && team2.length === 0}
          >
            💾 Save Roster
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="statCard">
          <span className="statValue">{totalPlayers}</span>
          <span className="statLabel">Total Players</span>
        </div>
        <div className="statCard">
          <span className="statValue">{assignedCount}</span>
          <span className="statLabel">Assigned</span>
        </div>
        <div className="statCard">
          <span className="statValue">{unassignedCount}</span>
          <span className="statLabel">Unassigned</span>
        </div>
        <div className="statCard">
          <div className="progressContainer">
            <div 
              className="progressBar" 
              style={{ width: `${assignedPercentage}%` }}
            />
            <span className="progressText">{assignedPercentage}%</span>
          </div>
          <span className="statLabel">Assigned</span>
        </div>
      </div>

      <div className="teamsContainer">
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
        <div className="unassignedSection">
          <h2 className="sectionTitle">Unassigned Players</h2>
          <div className="unassignedList">
            {unassignedPlayers.map(player => (
              <div key={player.id} className="unassignedPlayer">
                <span className="playerName">{player.name}</span>
                <div className="actions">
                  <button 
                    onClick={() => addToTeam1(player)}
                    className={`teamButton teamBlackBtn`}
                  >
                    Team Black
                  </button>
                  <button 
                    onClick={() => addToTeam2(player)}
                    className={`teamButton teamWhiteBtn`}
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