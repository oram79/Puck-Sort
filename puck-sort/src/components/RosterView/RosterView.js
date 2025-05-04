import React from 'react';
import { useTeamContext } from '../../context/TeamContext';
import PlayerCard from './PlayerCard';
import styles from './RosterView.css';

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
    <div className={styles.rosterView}>
      <div className={styles.header}>
        <h1 className={styles.title}>Player Roster</h1>
        <p className={styles.subtitle}>
          Manage all players available for team assignment
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <input 
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button 
              className={styles.clearSearch}
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className={styles.sortContainer}>
          <label htmlFor="sort" className={styles.sortLabel}>Sort by:</label>
          <select
            id="sort"
            className={styles.sortSelect}
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

      <div className={styles.addPlayerContainer}>
        <input 
          type="text"
          placeholder="Enter player name"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.addPlayerInput}
        />
        <button 
          onClick={handleAddPlayer}
          className={styles.addPlayerButton}
          disabled={!newPlayer.trim()}
        >
          Add Player
        </button>
      </div>

      <div className={styles.playersList}>
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))
        ) : (
          <div className={styles.emptyState}>
            {searchTerm ? (
              <>
                <p className={styles.emptyTitle}>No players found</p>
                <p className={styles.emptyDesc}>Try a different search term</p>
              </>
            ) : (
              <>
                <p className={styles.emptyTitle}>No players added yet</p>
                <p className={styles.emptyDesc}>
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