import React from 'react';
import { useTeamContext } from '../../context/TeamContext';
import TeamRoster from './TeamRoster';

/**
 * TeamsView
 * 
 * The team management dashboard. Contains:
 *  1. Header with Auto-Distribute and Save Roster buttons
 *  2. Stats row: total players + breakdown by position
 *  3. Balance bar: visual indicator of team distribution (NEW)
 *  4. Side-by-side team roster cards (Black vs White)
 *  5. Unassigned players section with quick-assign buttons
 */
const TeamsView = () => {
  const {
    team1, team2, players,
    autoDistributeTeams, saveTeamsToFile,
    isLoading, addToTeam1, addToTeam2,
    getPlayersByPosition, POSITIONS
  } = useTeamContext();

  // Unassigned players
  const unassignedPlayers = players.filter(
    p => !team1.some(t => t.id === p.id) && !team2.some(t => t.id === p.id)
  );
  const unassignedByPosition = getPlayersByPosition(unassignedPlayers);

  // Stats
  const total = players.length;
  const totalForwards = players.filter(p => p.position === POSITIONS.FORWARD).length;
  const totalDefense = players.filter(p => p.position === POSITIONS.DEFENSE).length;
  const totalGoalies = players.filter(p => p.position === POSITIONS.GOALIE).length;
  const totalSpares = players.filter(p => p.position === POSITIONS.SPARE).length;

  // Balance percentages for the visual bar
  const blackPct = total > 0 ? (team1.length / total) * 100 : 0;
  const whitePct = total > 0 ? (team2.length / total) * 100 : 0;
  const unassignedPct = total > 0 ? (unassignedPlayers.length / total) * 100 : 0;

  // Reusable unassigned position block renderer
  const renderUnassignedPosition = (positionType) => {
    const list = unassignedByPosition[positionType];
    if (list.length === 0) return null;

    return (
      <div className="positionSection" key={positionType}>
        <div className="positionHeader">
          <h3 className="positionTitle">{positionType}s</h3>
          <span className="positionCount">{list.length}</span>
        </div>
        <div className="positionPlayers">
          {list.map(player => (
            <div key={player.id} className="playerRow">
              <div className="playerRowInfo">
                <span className="playerRowName">{player.name}</span>
              </div>
              <div className="playerRowActions">
                <button onClick={() => addToTeam1(player)} className="rowBtn teamBlackBtn">
                  <i className="fas fa-plus"></i> Black
                </button>
                <button onClick={() => addToTeam2(player)} className="rowBtn teamWhiteBtn">
                  <i className="fas fa-plus"></i> White
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="teamsView">
      {/* -- Header with Actions -- */}
      <div className="header">
        <div>
          <h1 className="title">
            <i className="fas fa-people-group"></i> Team Management
          </h1>
          <p className="subtitle">Organize players into balanced teams by position</p>
        </div>
        <div className="actions">
          <button
            className="actionButton distributeButton"
            onClick={autoDistributeTeams}
            disabled={isLoading || players.length === 0}
          >
            {isLoading ? (
              <><i className="fas fa-spinner fa-spin"></i> Distributing...</>
            ) : (
              <><i className="fas fa-shuffle"></i> Auto-Distribute</>
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

      {/* -- Stats Row -- */}
      <div className="stats">
        <div className="statCard">
          <span className="statValue">{total}</span>
          <span className="statLabel">Total</span>
          {/* Balance bar shows distribution at a glance */}
          {total > 0 && (
            <div className="balanceBar">
              <div className="balanceSegment black" style={{ width: `${blackPct}%` }}></div>
              <div className="balanceSegment white" style={{ width: `${whitePct}%` }}></div>
              <div className="balanceSegment unassigned" style={{ width: `${unassignedPct}%` }}></div>
            </div>
          )}
        </div>
        <div className="statCard">
          <span className="statValue">{totalForwards}</span>
          <span className="statLabel">Forwards</span>
        </div>
        <div className="statCard">
          <span className="statValue">{totalDefense}</span>
          <span className="statLabel">Defense</span>
        </div>
        <div className="statCard">
          <span className="statValue">{totalGoalies}</span>
          <span className="statLabel">Goalies</span>
        </div>
        <div className="statCard">
          <span className="statValue">{totalSpares}</span>
          <span className="statLabel">Spares</span>
        </div>
      </div>

      {/* -- Side-by-Side Team Rosters -- */}
      <div className="teamsContainer">
        <TeamRoster team={team1} teamName="Black" />
        <TeamRoster team={team2} teamName="White" />
      </div>

      {/* -- Unassigned Players -- */}
      {unassignedPlayers.length > 0 && (
        <div className="unassignedSection">
          <h2 className="sectionTitle">
            <i className="fas fa-user-clock"></i> Unassigned Players
          </h2>
          <div className="rosterList">
            {renderUnassignedPosition(POSITIONS.GOALIE)}
            {renderUnassignedPosition(POSITIONS.DEFENSE)}
            {renderUnassignedPosition(POSITIONS.FORWARD)}
            {renderUnassignedPosition(POSITIONS.SPARE)}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsView;
