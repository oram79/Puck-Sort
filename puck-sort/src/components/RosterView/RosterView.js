import React from 'react';
import { useTeamContext } from '../../context/TeamContext';
import PlayerCard from './PlayerCard';

const RosterView = () => {
  const { 
    newPlayer, 
    setNewPlayer,
    newPlayerPosition,
    setNewPlayerPosition,
    handleAddPlayer, 
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    positionFilter,
    setPositionFilter,
    getFilteredPlayers,
    POSITIONS
  } = useTeamContext();

  const filteredPlayers = getFilteredPlayers();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  return (
    <div className="rosterView">
      <div className="header">
        <h1 className="title">Player Roster</h1>
        <p className="subtitle">
          Manage all players available for team assignment
        </p>
      </div>

      <div className="controls">
        <div className="searchContainer">
          <i className="fas fa-search search-icon"></i>
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
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <div className="filtersContainer">
          <div className="sortContainer">
            <label htmlFor="sort" className="sortLabel">Sort by:</label>
            <select
              id="sort"
              className="sortSelect"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="date-asc">Date Added (Oldest)</option>
              <option value="date-desc">Date Added (Newest)</option>
              <option value="position">Position</option>
            </select>
          </div>

          <div className="positionFilterContainer">
            <label htmlFor="position-filter" className="filterLabel">Position:</label>
            <select
              id="position-filter"
              className="filterSelect"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              <option value="all">All Positions</option>
              <option value="forward">Forwards</option>
              <option value="defense">Defense</option>
              <option value="goalie">Goalies</option>
            </select>
          </div>
        </div>
      </div>

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
        </select>
        <button 
          onClick={handleAddPlayer}
          className="addPlayerButton"
          disabled={!newPlayer.trim()}
        >
          <i className="fas fa-plus"></i> Add Player
        </button>
      </div>

      <div className="playersList">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))
        ) : (
          <div className="emptyState">
            <i className="fas fa-user-slash emptyIcon"></i>
            {searchTerm || positionFilter !== 'all' ? (
              <>
                <p className="emptyTitle">No players found</p>
                <p className="emptyDesc">Try different search terms or filters</p>
              </>
            ) : (
              <>
                <p className="emptyTitle">No players added yet</p>
                <p className="emptyDesc">
                  Add players to start building your teams
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RosterView;