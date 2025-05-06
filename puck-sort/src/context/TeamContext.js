import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

// Create context
const TeamContext = createContext();

// Custom hook to use the team context
export const useTeamContext = () => useContext(TeamContext);

// Player positions
export const POSITIONS = {
  FORWARD: 'Forward',
  DEFENSE: 'Defense',
  GOALIE: 'Goalie'
};

// Provider component
export const TeamProvider = ({ children }) => {
  // State for players and teams
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [newPlayerPosition, setNewPlayerPosition] = useState(POSITIONS.FORWARD);
  const [team1, setTeam1] = useState([]); // Team Black
  const [team2, setTeam2] = useState([]); // Team White
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('roster'); // 'roster', 'teams', 'settings'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc'); // 'name-asc', 'name-desc', 'date-asc', 'date-desc', 'position'
  const [positionFilter, setPositionFilter] = useState('all'); // 'all', 'forward', 'defense', 'goalie'

  // Show notification message
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    
    // Auto-dismiss notification after 3 seconds
    const timer = setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Load players from localStorage on component mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedPlayers = localStorage.getItem('puckSortPlayers');
        if (savedPlayers) {
          setPlayers(JSON.parse(savedPlayers));
        }
        
        const savedTeam1 = localStorage.getItem('puckSortTeam1');
        if (savedTeam1) {
          setTeam1(JSON.parse(savedTeam1));
        }
        
        const savedTeam2 = localStorage.getItem('puckSortTeam2');
        if (savedTeam2) {
          setTeam2(JSON.parse(savedTeam2));
        }

        const savedTab = localStorage.getItem('puckSortActiveTab');
        if (savedTab) {
          setActiveTab(savedTab);
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        showNotification('Error loading saved data', 'error');
      }
    };

    loadData();
  }, [showNotification]);

  // Save to localStorage whenever players or teams change
  useEffect(() => {
    const saveData = () => {
      try {
        localStorage.setItem('puckSortPlayers', JSON.stringify(players));
        localStorage.setItem('puckSortTeam1', JSON.stringify(team1));
        localStorage.setItem('puckSortTeam2', JSON.stringify(team2));
        localStorage.setItem('puckSortActiveTab', activeTab);
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
        showNotification('Error saving data', 'error');
      }
    };

    saveData();
  }, [players, team1, team2, activeTab, showNotification]);

  // Handle adding a new player
  const handleAddPlayer = useCallback(() => {
    if (!newPlayer.trim()) {
      showNotification('Please enter a player name', 'error');
      return;
    }
    
    if (players.some(player => player.name.toLowerCase() === newPlayer.toLowerCase())) {
      showNotification('This player already exists', 'error');
      return;
    }
    
    const playerObj = {
      id: Date.now().toString(),
      name: newPlayer.trim(),
      position: newPlayerPosition,
      createdAt: new Date().toISOString(),
      stats: {
        gamesPlayed: 0,
        goals: 0,
        assists: 0
      }
    };
    
    setPlayers(prev => [...prev, playerObj]);
    setNewPlayer('');
    showNotification(`${playerObj.name} added as ${playerObj.position}`);
  }, [newPlayer, newPlayerPosition, players, showNotification]);

  // Handle removing a player
  const handleRemovePlayer = useCallback((id) => {
    const playerToRemove = players.find(player => player.id === id);
    if (!playerToRemove) return;

    setPlayers(prev => prev.filter(player => player.id !== id));
    setTeam1(prev => prev.filter(player => player.id !== id));
    setTeam2(prev => prev.filter(player => player.id !== id));
    showNotification(`${playerToRemove.name} has been removed`);
  }, [players, showNotification]);

  // Add player to Team 1 (Black)
  const addToTeam1 = useCallback((player) => {
    if (team1.some(p => p.id === player.id)) return;
    setTeam1(prev => [...prev, player]);
    setTeam2(prev => prev.filter(p => p.id !== player.id));
    showNotification(`${player.name} added to Team Black`);
  }, [team1, showNotification]);

  // Add player to Team 2 (White)
  const addToTeam2 = useCallback((player) => {
    if (team2.some(p => p.id === player.id)) return;
    setTeam2(prev => [...prev, player]);
    setTeam1(prev => prev.filter(p => p.id !== player.id));
    showNotification(`${player.name} added to Team White`);
  }, [team2, showNotification]);

  // Remove player from teams
  const removeFromTeams = useCallback((player) => {
    setTeam1(prev => prev.filter(p => p.id !== player.id));
    setTeam2(prev => prev.filter(p => p.id !== player.id));
    showNotification(`${player.name} removed from team`);
  }, [showNotification]);

  // Get players grouped by position
  const getPlayersByPosition = useCallback((teamArray) => {
    const grouped = {
      [POSITIONS.FORWARD]: teamArray.filter(p => p.position === POSITIONS.FORWARD),
      [POSITIONS.DEFENSE]: teamArray.filter(p => p.position === POSITIONS.DEFENSE),
      [POSITIONS.GOALIE]: teamArray.filter(p => p.position === POSITIONS.GOALIE),
    };
    
    return grouped;
  }, []);

  // Auto-distribute players into balanced teams
  const autoDistributeTeams = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        // Distribute by position to maintain balance
        const forwards = players.filter(p => p.position === POSITIONS.FORWARD);
        const defense = players.filter(p => p.position === POSITIONS.DEFENSE);
        const goalies = players.filter(p => p.position === POSITIONS.GOALIE);
        
        // Shuffle each position group
        const shuffleArray = (array) => {
          const shuffled = [...array];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          return shuffled;
        };
        
        const shuffledForwards = shuffleArray(forwards);
        const shuffledDefense = shuffleArray(defense);
        const shuffledGoalies = shuffleArray(goalies);
        
        // Split by position
        const forwardsTeam1 = shuffledForwards.filter((_, i) => i % 2 === 0);
        const forwardsTeam2 = shuffledForwards.filter((_, i) => i % 2 === 1);
        
        const defenseTeam1 = shuffledDefense.filter((_, i) => i % 2 === 0);
        const defenseTeam2 = shuffledDefense.filter((_, i) => i % 2 === 1);
        
        const goaliesTeam1 = shuffledGoalies.filter((_, i) => i % 2 === 0);
        const goaliesTeam2 = shuffledGoalies.filter((_, i) => i % 2 === 1);
        
        // Combine all positions
        setTeam1([...forwardsTeam1, ...defenseTeam1, ...goaliesTeam1]);
        setTeam2([...forwardsTeam2, ...defenseTeam2, ...goaliesTeam2]);
        
        showNotification('Teams auto-distributed by position');
      } catch (error) {
        console.error('Error auto-distributing teams:', error);
        showNotification('Error auto-distributing teams', 'error');
      } finally {
        setIsLoading(false);
      }
    }, 600); // Slight delay for UX
  }, [players, showNotification]);

  // Save team lists to a file
  const saveTeamsToFile = useCallback(() => {
    try {
      // Create team roster text
      const date = new Date().toLocaleDateString();
      let teamRoster = `PUCKSORT TEAM ROSTER - ${date}\n\n`;
      
      // Process Team Black by position
      const team1ByPosition = getPlayersByPosition(team1);
      
      teamRoster += "TEAM BLACK:\n";
      
      if (team1ByPosition[POSITIONS.FORWARD].length > 0) {
        teamRoster += "FORWARDS:\n";
        team1ByPosition[POSITIONS.FORWARD].forEach((player, index) => {
          teamRoster += `${index + 1}. ${player.name}\n`;
        });
        teamRoster += "\n";
      }
      
      if (team1ByPosition[POSITIONS.DEFENSE].length > 0) {
        teamRoster += "DEFENSE:\n";
        team1ByPosition[POSITIONS.DEFENSE].forEach((player, index) => {
          teamRoster += `${index + 1}. ${player.name}\n`;
        });
        teamRoster += "\n";
      }
      
      if (team1ByPosition[POSITIONS.GOALIE].length > 0) {
        teamRoster += "GOALIES:\n";
        team1ByPosition[POSITIONS.GOALIE].forEach((player, index) => {
          teamRoster += `${index + 1}. ${player.name}\n`;
        });
        teamRoster += "\n";
      }
      
      // Process Team White by position
      const team2ByPosition = getPlayersByPosition(team2);
      
      teamRoster += "TEAM WHITE:\n";
      
      if (team2ByPosition[POSITIONS.FORWARD].length > 0) {
        teamRoster += "FORWARDS:\n";
        team2ByPosition[POSITIONS.FORWARD].forEach((player, index) => {
          teamRoster += `${index + 1}. ${player.name}\n`;
        });
        teamRoster += "\n";
      }
      
      if (team2ByPosition[POSITIONS.DEFENSE].length > 0) {
        teamRoster += "DEFENSE:\n";
        team2ByPosition[POSITIONS.DEFENSE].forEach((player, index) => {
          teamRoster += `${index + 1}. ${player.name}\n`;
        });
        teamRoster += "\n";
      }
      
      if (team2ByPosition[POSITIONS.GOALIE].length > 0) {
        teamRoster += "GOALIES:\n";
        team2ByPosition[POSITIONS.GOALIE].forEach((player, index) => {
          teamRoster += `${index + 1}. ${player.name}\n`;
        });
        teamRoster += "\n";
      }
      
      // Create unassigned players list if any
      const unassignedPlayers = players.filter(
        player => !team1.some(p => p.id === player.id) && !team2.some(p => p.id === player.id)
      );
      
      if (unassignedPlayers.length > 0) {
        const unassignedByPosition = getPlayersByPosition(unassignedPlayers);
        
        teamRoster += "UNASSIGNED PLAYERS:\n";
        
        if (unassignedByPosition[POSITIONS.FORWARD].length > 0) {
          teamRoster += "FORWARDS:\n";
          unassignedByPosition[POSITIONS.FORWARD].forEach((player, index) => {
            teamRoster += `${index + 1}. ${player.name}\n`;
          });
          teamRoster += "\n";
        }
        
        if (unassignedByPosition[POSITIONS.DEFENSE].length > 0) {
          teamRoster += "DEFENSE:\n";
          unassignedByPosition[POSITIONS.DEFENSE].forEach((player, index) => {
            teamRoster += `${index + 1}. ${player.name}\n`;
          });
          teamRoster += "\n";
        }
        
        if (unassignedByPosition[POSITIONS.GOALIE].length > 0) {
          teamRoster += "GOALIES:\n";
          unassignedByPosition[POSITIONS.GOALIE].forEach((player, index) => {
            teamRoster += `${index + 1}. ${player.name}\n`;
          });
        }
      }
      
      // Create and download the file
      const blob = new Blob([teamRoster], { type: 'text/plain' });
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
  }, [team1, team2, players, getPlayersByPosition, showNotification]);

  // Get filtered and sorted players
  const getFilteredPlayers = useCallback(() => {
    // Filter players based on search term and position filter
    let filtered = [...players];
    
    if (searchTerm) {
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (positionFilter !== 'all') {
      filtered = filtered.filter(player => 
        player.position.toLowerCase() === positionFilter
      );
    }
    
    // Sort players based on sort option
    switch (sortOption) {
      case 'name-asc':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case 'date-asc':
        return filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'date-desc':
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'position':
        // Sort by position: Goalies first, then Defense, then Forwards
        return filtered.sort((a, b) => {
          const positions = [POSITIONS.GOALIE, POSITIONS.DEFENSE, POSITIONS.FORWARD];
          return positions.indexOf(a.position) - positions.indexOf(b.position);
        });
      default:
        return filtered;
    }
  }, [players, searchTerm, positionFilter, sortOption]);

  // Value to be provided to consumers
  const contextValue = {
    players,
    newPlayer,
    newPlayerPosition,
    team1,
    team2,
    notification,
    isLoading,
    activeTab,
    searchTerm,
    sortOption,
    positionFilter,
    POSITIONS,
    setNewPlayer,
    setNewPlayerPosition,
    handleAddPlayer,
    handleRemovePlayer,
    addToTeam1,
    addToTeam2,
    removeFromTeams,
    autoDistributeTeams,
    saveTeamsToFile,
    showNotification,
    setActiveTab,
    setSearchTerm,
    setSortOption,
    setPositionFilter,
    getFilteredPlayers,
    getPlayersByPosition
  };

  return (
    <TeamContext.Provider value={contextValue}>
      {children}
    </TeamContext.Provider>
  );
};

export default TeamContext;