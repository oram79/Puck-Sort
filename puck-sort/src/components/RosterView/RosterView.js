import React from 'react';
import { useTeamContext } from '../../context/TeamContext';
import PlayerCard from './PlayerCard';

// Column display order + icon/copy for each position
const COLUMN_CONFIG = [
  { key: 'FORWARD', label: 'Forwards', icon: 'fa-bolt' },
  { key: 'DEFENSE', label: 'Defense', icon: 'fa-shield-halved' },
  { key: 'GOALIE', label: 'Goalies', icon: 'fa-mask' },
  { key: 'SPARE', label: 'Spares', icon: 'fa-user-plus' },
];

/**
 * RosterView
 *
 * The primary player management interface. Contains:
 *  1. Section header with title + subtitle
 *  2. Controls bar: search input + sort dropdown
 *  3. Add Player form: name input, position select, add button
 *  4. Four position columns (Forwards / Defense / Goalies / Spares)
 *  5. Empty state: shown when no players exist at all
 */
const RosterView = () => {
  const {
    newPlayer, setNewPlayer,
    newPlayerPosition, setNewPlayerPosition,
    handleAddPlayer,
    searchTerm, setSearchTerm,
    sortOption, setSortOption,
    getFilteredPlayers, getPlayersByPosition,
    POSITIONS
  } = useTeamContext();

  const filteredPlayers = getFilteredPlayers();
  const playersByPosition = getPlayersByPosition(filteredPlayers);
  const hasAnyPlayers = filteredPlayers.length > 0;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddPlayer();
  };

  return (
    <div className="rosterView">
      {/* -- Section Header -- */}
      <div className="header">
        <h1 className="title">
          <i className="fas fa-users"></i> Player Roster
        </h1>
        <p className="subtitle">
          Add, edit, and manage all players in your league
        </p>
      </div>

      {/* -- Controls: Search + Sort -- */}
      <div className="controls">
        <div className="searchContainer">
          <i className="fas fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchInput"
          />
          {searchTerm && (
            <button
              className="clearSearch"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <i className="fas fa-xmark"></i>
            </button>
          )}
        </div>

        <div className="filtersContainer">
          <div className="sortContainer">
            <label htmlFor="sort" className="sortLabel">Sort:</label>
            <select
              id="sort"
              className="sortSelect"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="date-asc">Oldest First</option>
              <option value="date-desc">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* -- Add Player Form -- */}
      <div className="addPlayerContainer">
        <input
          type="text"
          placeholder="Enter player name"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          onKeyDown={handleKeyDown}
          className="addPlayerInput"
        />
        <select
          className="positionSelect"
          value={newPlayerPosition}
          onChange={(e) => setNewPlayerPosition(e.target.value)}
        >
          <option value={POSITIONS.FORWARD}>Forward</option>
          <option value={POSITIONS.DEFENSE}>Defense</option>
          <option value={POSITIONS.GOALIE}>Goalie</option>
          <option value={POSITIONS.SPARE}>Spare</option>
        </select>
        <button
          onClick={handleAddPlayer}
          className="addPlayerButton"
          disabled={!newPlayer.trim()}
        >
          <i className="fas fa-plus"></i> Add Player
        </button>
      </div>

      {/* -- Position Columns -- */}
      {hasAnyPlayers ? (
        <div className="rosterColumns">
          {COLUMN_CONFIG.map(({ key, label, icon }) => {
            const positionPlayers = playersByPosition[POSITIONS[key]];
            return (
              <div className="rosterColumn" key={key}>
                <div className="rosterColumnHeader">
                  <span className="rosterColumnTitle">
                    <i className={`fas ${icon}`}></i> {label}
                  </span>
                  <span className="rosterColumnCount">{positionPlayers.length}</span>
                </div>
                <div className="rosterColumnBody">
                  {positionPlayers.length > 0 ? (
                    positionPlayers.map(player => (
                      <PlayerCard key={player.id} player={player} />
                    ))
                  ) : (
                    <div className="rosterColumnEmpty">
                      No {label.toLowerCase()} {searchTerm ? 'match your search' : 'yet'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="emptyState">
          <i className="fas fa-user-slash emptyIcon"></i>
          {searchTerm ? (
            <>
              <p className="emptyTitle">No players found</p>
              <p className="emptyDesc">Try a different search term</p>
            </>
          ) : (
            <>
              <p className="emptyTitle">No players added yet</p>
              <p className="emptyDesc">Add players to start building your teams</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RosterView;
