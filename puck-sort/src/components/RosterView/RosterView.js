import React from 'react';
import { useTeamContext } from '../../context/TeamContext';
import PlayerCard from './PlayerCard';

const RosterView = () => {
  const { 
    newPlayer, 
    setNewPlayer, 
    handleAddPlayer, 
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    getFilteredPlayers
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
              ×
            </button>
          )}
        </div>

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
          </select>
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
        <button 
          onClick={handleAddPlayer}
          className="addPlayerButton"
          disabled={!newPlayer.trim()}
        >
          Add Player
        </button>
      </div>

      <div className="playersList">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))
        ) : (
          <div className="emptyState">
            {searchTerm ? (
              <>
                <p className="emptyTitle">No players found</p>
                <p className="emptyDesc">Try a different search term</p>
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