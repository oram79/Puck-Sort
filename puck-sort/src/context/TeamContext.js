import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

// -------------------------------------------------------
// Context + Hook
// -------------------------------------------------------
const TeamContext = createContext();
export const useTeamContext = () => useContext(TeamContext);

// -------------------------------------------------------
// Position Constants
// Used across the app for consistent position references.
// -------------------------------------------------------
export const POSITIONS = {
  FORWARD: 'Forward',
  DEFENSE: 'Defense',
  GOALIE: 'Goalie',
  SPARE: 'Spare'
};

// -------------------------------------------------------
// Provider Component
// Wraps the app and exposes all shared state + actions.
// -------------------------------------------------------
export const TeamProvider = ({ children }) => {
  // -- Core State --
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [newPlayerPosition, setNewPlayerPosition] = useState(POSITIONS.FORWARD);
  const [team1, setTeam1] = useState([]);       // Team Black
  const [team2, setTeam2] = useState([]);       // Team White
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('roster');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');

  // -------------------------------------------------------
  // Notification Helper
  // Shows a toast that auto-dismisses after 3 seconds.
  // -------------------------------------------------------
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    const timer = setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // -------------------------------------------------------
  // localStorage: Load on Mount
  // Pulls saved players, teams, and active tab from storage.
  // -------------------------------------------------------
  useEffect(() => {
    try {
      const savedPlayers = localStorage.getItem('puckSortPlayers');
      if (savedPlayers) setPlayers(JSON.parse(savedPlayers));

      const savedTeam1 = localStorage.getItem('puckSortTeam1');
      if (savedTeam1) setTeam1(JSON.parse(savedTeam1));

      const savedTeam2 = localStorage.getItem('puckSortTeam2');
      if (savedTeam2) setTeam2(JSON.parse(savedTeam2));

      const savedTab = localStorage.getItem('puckSortActiveTab');
      if (savedTab) setActiveTab(savedTab);
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // -------------------------------------------------------
  // localStorage: Save on Change
  // Persists state whenever players, teams, or tab changes.
  // -------------------------------------------------------
  useEffect(() => {
    try {
      localStorage.setItem('puckSortPlayers', JSON.stringify(players));
      localStorage.setItem('puckSortTeam1', JSON.stringify(team1));
      localStorage.setItem('puckSortTeam2', JSON.stringify(team2));
      localStorage.setItem('puckSortActiveTab', activeTab);
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [players, team1, team2, activeTab]);

  // -------------------------------------------------------
  // Add Player
  // Creates a new player object and appends it to the list.
  // -------------------------------------------------------
  const handleAddPlayer = useCallback(() => {
    if (!newPlayer.trim()) {
      showNotification('Please enter a player name', 'error');
      return;
    }

    if (players.some(p => p.name.toLowerCase() === newPlayer.trim().toLowerCase())) {
      showNotification('This player already exists', 'error');
      return;
    }

    const playerObj = {
      id: Date.now().toString(),
      name: newPlayer.trim(),
      position: newPlayerPosition,
      createdAt: new Date().toISOString(),
      stats: { gamesPlayed: 0, goals: 0, assists: 0 }
    };

    setPlayers(prev => [...prev, playerObj]);
    setNewPlayer('');
    showNotification(`${playerObj.name} added as ${playerObj.position}`);
  }, [newPlayer, newPlayerPosition, players, showNotification]);

  // -------------------------------------------------------
  // Remove Player
  // Deletes from the roster AND from any team assignment.
  // -------------------------------------------------------
  const handleRemovePlayer = useCallback((id) => {
    const player = players.find(p => p.id === id);
    if (!player) return;

    setPlayers(prev => prev.filter(p => p.id !== id));
    setTeam1(prev => prev.filter(p => p.id !== id));
    setTeam2(prev => prev.filter(p => p.id !== id));
    showNotification(`${player.name} has been removed`);
  }, [players, showNotification]);

  // -------------------------------------------------------
  // Edit Player  (NEW FEATURE)
  // Updates a player's name and/or position in-place.
  // Also updates the player inside team arrays if assigned.
  // -------------------------------------------------------
  const editPlayer = useCallback((id, updatedName, updatedPosition) => {
    const trimmed = updatedName.trim();
    if (!trimmed) {
      showNotification('Player name cannot be empty', 'error');
      return false;
    }

    // Check for duplicate name (excluding current player)
    const duplicate = players.find(
      p => p.id !== id && p.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (duplicate) {
      showNotification('Another player with that name already exists', 'error');
      return false;
    }

    const updater = (list) =>
      list.map(p =>
        p.id === id ? { ...p, name: trimmed, position: updatedPosition } : p
      );

    setPlayers(updater);
    setTeam1(updater);
    setTeam2(updater);
    showNotification(`Player updated successfully`);
    return true;
  }, [players, showNotification]);

  // -------------------------------------------------------
  // Team Assignment Helpers
  // -------------------------------------------------------
  const addToTeam1 = useCallback((player) => {
    if (team1.some(p => p.id === player.id)) return;
    setTeam1(prev => [...prev, player]);
    setTeam2(prev => prev.filter(p => p.id !== player.id));
    showNotification(`${player.name} added to Team Black`);
  }, [team1, showNotification]);

  const addToTeam2 = useCallback((player) => {
    if (team2.some(p => p.id === player.id)) return;
    setTeam2(prev => [...prev, player]);
    setTeam1(prev => prev.filter(p => p.id !== player.id));
    showNotification(`${player.name} added to Team White`);
  }, [team2, showNotification]);

  const removeFromTeams = useCallback((player) => {
    setTeam1(prev => prev.filter(p => p.id !== player.id));
    setTeam2(prev => prev.filter(p => p.id !== player.id));
    showNotification(`${player.name} removed from team`);
  }, [showNotification]);

  // -------------------------------------------------------
  // Group Players by Position
  // Returns an object with arrays keyed by position name.
  // -------------------------------------------------------
  const getPlayersByPosition = useCallback((teamArray) => ({
    [POSITIONS.FORWARD]: teamArray.filter(p => p.position === POSITIONS.FORWARD),
    [POSITIONS.DEFENSE]: teamArray.filter(p => p.position === POSITIONS.DEFENSE),
    [POSITIONS.GOALIE]: teamArray.filter(p => p.position === POSITIONS.GOALIE),
    [POSITIONS.SPARE]: teamArray.filter(p => p.position === POSITIONS.SPARE),
  }), []);

  // -------------------------------------------------------
  // Auto-Distribute
  // Shuffles and splits players by position for balance.
  // Spares are excluded from auto-distribution.
  // -------------------------------------------------------
  const autoDistributeTeams = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      try {
        const shuffleArray = (arr) => {
          const s = [...arr];
          for (let i = s.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [s[i], s[j]] = [s[j], s[i]];
          }
          return s;
        };

        const regular = players.filter(p => p.position !== POSITIONS.SPARE);
        const forwards = shuffleArray(regular.filter(p => p.position === POSITIONS.FORWARD));
        const defense = shuffleArray(regular.filter(p => p.position === POSITIONS.DEFENSE));
        const goalies = shuffleArray(regular.filter(p => p.position === POSITIONS.GOALIE));

        const split = (arr) => [
          arr.filter((_, i) => i % 2 === 0),
          arr.filter((_, i) => i % 2 === 1)
        ];

        const [f1, f2] = split(forwards);
        const [d1, d2] = split(defense);
        const [g1, g2] = split(goalies);

        setTeam1([...f1, ...d1, ...g1]);
        setTeam2([...f2, ...d2, ...g2]);
        showNotification('Teams auto-distributed by position (spares excluded)');
      } catch (error) {
        console.error('Error auto-distributing teams:', error);
        showNotification('Error auto-distributing teams', 'error');
      } finally {
        setIsLoading(false);
      }
    }, 600);
  }, [players, showNotification]);

  // -------------------------------------------------------
  // Save Teams to File
  // Flat format: team name, then player names listed.
  // Goalies get a "- G" suffix to mark them.
  // -------------------------------------------------------
  const saveTeamsToFile = useCallback(() => {
    try {
      const date = new Date().toLocaleDateString();
      let roster = '';

      // Helper: formats one team's player list.
      // Non-goalies listed first, goalies sorted to the bottom with "- G".
      const appendTeam = (teamArr, label) => {
        const nonGoalies = teamArr.filter(p => p.position !== POSITIONS.GOALIE);
        const goalies = teamArr.filter(p => p.position === POSITIONS.GOALIE);

        // Shuffle non-goalies so forwards and defense are mixed
        for (let i = nonGoalies.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nonGoalies[i], nonGoalies[j]] = [nonGoalies[j], nonGoalies[i]];
        }

        roster += `${label}\n`;
        nonGoalies.forEach(p => {
          roster += `${p.name}\n`;
        });
        goalies.forEach(p => {
          roster += `${p.name} - G\n`;
        });
        roster += '\n';
      };

      if (team1.length > 0) appendTeam(team1, 'TEAM BLACK');
      if (team2.length > 0) appendTeam(team2, 'TEAM WHITE');

      const unassigned = players.filter(
        p => !team1.some(t => t.id === p.id) && !team2.some(t => t.id === p.id)
      );

      if (unassigned.length > 0) {
        appendTeam(unassigned, 'UNASSIGNED');
      }

      const blob = new Blob([roster.trim()], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pucksort-teams-${date.replace(/\//g, '-')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotification('Team lists saved successfully');
    } catch (error) {
      console.error('Error saving teams to file:', error);
      showNotification('Error saving team lists', 'error');
    }
  }, [team1, team2, players, showNotification]);

  // -------------------------------------------------------
  // Import Data  (NEW FEATURE)
  // Loads a previously exported JSON backup into state.
  // -------------------------------------------------------
  const importData = useCallback((jsonString) => {
    try {
      const data = JSON.parse(jsonString);

      if (!data.players || !Array.isArray(data.players)) {
        showNotification('Invalid backup file format', 'error');
        return;
      }

      setPlayers(data.players);
      setTeam1(data.team1 || []);
      setTeam2(data.team2 || []);
      showNotification(`Imported ${data.players.length} players successfully`);
    } catch (error) {
      console.error('Error importing data:', error);
      showNotification('Failed to parse backup file', 'error');
    }
  }, [showNotification]);

  // -------------------------------------------------------
  // Filtered + Sorted Player List
  // Used by RosterView to display the player grid.
  // -------------------------------------------------------
  const getFilteredPlayers = useCallback(() => {
    let filtered = [...players];

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case 'name-asc':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case 'date-asc':
        return filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'date-desc':
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return filtered;
    }
  }, [players, searchTerm, sortOption]);

  // -------------------------------------------------------
  // Context Value
  // Everything the rest of the app can access.
  // -------------------------------------------------------
  const contextValue = {
    players, newPlayer, newPlayerPosition,
    team1, team2, notification, isLoading,
    activeTab, searchTerm, sortOption,
    POSITIONS,
    setNewPlayer, setNewPlayerPosition,
    handleAddPlayer, handleRemovePlayer, editPlayer,
    addToTeam1, addToTeam2, removeFromTeams,
    autoDistributeTeams, saveTeamsToFile,
    showNotification, setActiveTab,
    setSearchTerm, setSortOption,
    getFilteredPlayers, getPlayersByPosition,
    importData
  };

  return (
    <TeamContext.Provider value={contextValue}>
      {children}
    </TeamContext.Provider>
  );
};

export default TeamContext;