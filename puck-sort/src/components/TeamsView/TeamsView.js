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
    addToTeam2,
    getPlayersByPosition,
    POSITIONS
  } = useTeamContext();

  // Get unassigned players
  const unassignedPlayers = players.filter(
    player => !team1.some(p => p.id === player.id) && !team2.some(p => p.id === player.id)
  );
  
  const unassignedByPosition = getPlayersByPosition(unassignedPlayers);

  // Sorting into teams by position 
  const totalPlayers = players.length;
  const assignedCount = team1.length + team2.length;
  const unassignedCount = unassignedPlayers.length;
  const assignedPercentage = totalPlayers > 0 
    ? Math.round((assignedCount / totalPlayers) * 100) 
    : 0;
    
  const totalForwards = players.filter(p => p.position === POSITIONS.FORWARD).length;
  const totalDefense = players.filter(p => p.position === POSITIONS.DEFENSE).length;
  const totalGoalies = players.filter(p => p.position === POSITIONS.GOALIE).length;
  
  const getPositionIcon = (position) => {
    switch (position) {
      case POSITIONS.FORWARD:
        return <i className="fas fa-hockey-puck position-icon"></i>;
      case POSITIONS.DEFENSE:
        return <i className="fas fa-shield-alt position-icon"></i>;
      case POSITIONS.GOALIE:
        return <i className="fas fa-mask position-icon"></i>;
      default:
        return <i className="fas fa-user position-icon"></i>;
    }
  };

  return (
    <div className="teamsView">
      <div className="header">
        <div>
          <h1 className="title">Team Management</h1>
          <p className="subtitle">
            Organize players into balanced teams by position
          </p>
        </div>

        <div className="actions">
          <button 
            className="actionButton distributeButton"
            onClick={autoDistributeTeams}
            disabled={isLoading || players.length === 0}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Distributing...
              </>
            ) : (
              <>
                <i className="fas fa-random"></i> Auto-Distribute
              </>
            )}
          </button>
          <button 
            className="actionButton saveButton"
            onClick={saveTeamsToFile}
            disabled={team1.length === 0 && team2.length === 0}
          >
            <i className="fas fa-download"></i> Save Roster
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="statCard">
          <i className="fas fa-users statIcon"></i>
          <span className="statValue">{totalPlayers}</span>
          <span className="statLabel">Total Players</span>
        </div>
        <div className="statCard">
          <i className="fas fa-hockey-puck statIcon"></i>
          <span className="statValue">{totalForwards}</span>
          <span className="statLabel">Forwards</span>
        </div>
        <div className="statCard">
          <i className="fas fa-shield-alt statIcon"></i>
          <span className="statValue">{totalDefense}</span>
          <span className="statLabel">Defense</span>
        </div>
        <div className="statCard">
          <i className="fas fa-mask statIcon"></i>
          <span className="statValue">{totalGoalies}</span>
          <span className="statLabel">Goalies</span>
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
          <h2 className="sectionTitle">
            <i className="fas fa-user-slash"></i> Unassigned Players
          </h2>
          
          {unassignedByPosition[POSITIONS.GOALIE].length > 0 && (
            <div className="unassignedPositionSection">
              <div className="positionHeader">
                <i className="fas fa-mask"></i>
                <h3>Goalies</h3>
              </div>
              <div className="unassignedList">
                {unassignedByPosition[POSITIONS.GOALIE].map(player => (
                  <div key={player.id} className="unassignedPlayer">
                    <span className="playerName">{player.name}</span>
                    <div className="actions">
                      <button 
                        onClick={() => addToTeam1(player)}
                        className="teamButton teamBlackBtn"
                      >
                        <i className="fas fa-user-plus"></i> Team Black
                      </button>
                      <button 
                        onClick={() => addToTeam2(player)}
                        className="teamButton teamWhiteBtn"
                      >
                        <i className="fas fa-user-plus"></i> Team White
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {unassignedByPosition[POSITIONS.DEFENSE].length > 0 && (
            <div className="unassignedPositionSection">
              <div className="positionHeader">
                <i className="fas fa-shield-alt"></i>
                <h3>Defense</h3>
              </div>
              <div className="unassignedList">
                {unassignedByPosition[POSITIONS.DEFENSE].map(player => (
                  <div key={player.id} className="unassignedPlayer">
                    <span className="playerName">{player.name}</span>
                    <div className="actions">
                      <button 
                        onClick={() => addToTeam1(player)}
                        className="teamButton teamBlackBtn"
                      >
                        <i className="fas fa-user-plus"></i> Team Black
                      </button>
                      <button 
                        onClick={() => addToTeam2(player)}
                        className="teamButton teamWhiteBtn"
                      >
                        <i className="fas fa-user-plus"></i> Team White
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {unassignedByPosition[POSITIONS.FORWARD].length > 0 && (
            <div className="unassignedPositionSection">
              <div className="positionHeader">
                <i className="fas fa-hockey-puck"></i>
                <h3>Forwards</h3>
              </div>
              <div className="unassignedList">
                {unassignedByPosition[POSITIONS.FORWARD].map(player => (
                  <div key={player.id} className="unassignedPlayer">
                    <span className="playerName">{player.name}</span>
                    <div className="actions">
                      <button 
                        onClick={() => addToTeam1(player)}
                        className="teamButton teamBlackBtn"
                      >
                        <i className="fas fa-user-plus"></i> Team Black
                      </button>
                      <button 
                        onClick={() => addToTeam2(player)}
                        className="teamButton teamWhiteBtn"
                      >
                        <i className="fas fa-user-plus"></i> Team White
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamsView;