import React, { useState } from 'react';
import { useTeamContext } from '../../context/TeamContext';
import ConfirmModal from '../Modal/ConfirmModal';

/**
 * PlayerCard
 * 
 * Renders a single player as a card in the roster grid.
 * 
 * Features:
 *  - Shows player name, position, and team assignment badge
 *  - Action buttons: assign to Team Black/White, remove from team
 *  - Edit button: toggles inline edit mode (name + position)
 *  - Delete button: triggers a confirmation modal first
 */
const PlayerCard = ({ player }) => {
  const {
    handleRemovePlayer,
    editPlayer,
    addToTeam1,
    addToTeam2,
    removeFromTeams,
    team1,
    team2,
    POSITIONS
  } = useTeamContext();

  // -- Local State for Edit Mode --
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(player.name);
  const [editPosition, setEditPosition] = useState(player.position);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Team assignment checks
  const isInTeam1 = team1.some(p => p.id === player.id);
  const isInTeam2 = team2.some(p => p.id === player.id);
  const isAssigned = isInTeam1 || isInTeam2;


  // -- Edit Handlers --
  const handleStartEdit = () => {
    setEditName(player.name);
    setEditPosition(player.position);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const success = editPlayer(player.id, editName, editPosition);
    if (success) setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName(player.name);
    setEditPosition(player.position);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveEdit();
    if (e.key === 'Escape') handleCancelEdit();
  };

  // -- Delete with Confirmation --
  const handleDeleteClick = () => setShowDeleteConfirm(true);
  const handleConfirmDelete = () => {
    handleRemovePlayer(player.id);
    setShowDeleteConfirm(false);
  };

  // -------------------------------------------------------
  // EDIT MODE RENDER
  // Shows input fields instead of the player info display.
  // -------------------------------------------------------
  if (isEditing) {
    return (
      <div className="playerCard">
        <div className="editForm">
          <div className="editRow">
            <input
              type="text"
              className="editInput"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="Player name"
            />
          </div>
          <div className="editRow">
            <select
              className="editSelect"
              value={editPosition}
              onChange={(e) => setEditPosition(e.target.value)}
            >
              <option value={POSITIONS.FORWARD}>Forward</option>
              <option value={POSITIONS.DEFENSE}>Defense</option>
              <option value={POSITIONS.GOALIE}>Goalie</option>
              <option value={POSITIONS.SPARE}>Spare</option>
            </select>
          </div>
          <div className="editActions">
            <button className="saveEditBtn" onClick={handleSaveEdit}>
              <i className="fas fa-check"></i> Save
            </button>
            <button className="cancelEditBtn" onClick={handleCancelEdit}>
              <i className="fas fa-xmark"></i> Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------
  // NORMAL MODE RENDER
  // Shows the player info and action buttons.
  // -------------------------------------------------------
  return (
    <>
      <div className={`playerCard ${isAssigned ? 'assigned' : ''}`}>
        <div className="playerInfo">
          <div className="nameContainer">
            <h3 className="playerName">{player.name}</h3>
            {isAssigned && (
              <div className={`teamBadge ${isInTeam1 ? 'teamBlack' : 'teamWhite'}`}>
                {isInTeam1 ? 'Black' : 'White'}
              </div>
            )}
          </div>
          <div className="positionContainer">
            <span className="positionLabel">{player.position}</span>
          </div>
        </div>

        <div className="playerActions">
          {!isAssigned ? (
            <>
              <button
                onClick={() => addToTeam1(player)}
                className="actionButton teamBlackBtn"
                aria-label="Add to Team Black"
              >
                <i className="fas fa-plus"></i> Black
              </button>
              <button
                onClick={() => addToTeam2(player)}
                className="actionButton teamWhiteBtn"
                aria-label="Add to Team White"
              >
                <i className="fas fa-plus"></i> White
              </button>
            </>
          ) : (
            <button
              onClick={() => removeFromTeams(player)}
              className="actionButton removeTeamBtn"
              aria-label="Remove from team"
            >
              <i className="fas fa-minus"></i> Unassign
            </button>
          )}
          <button
            onClick={handleStartEdit}
            className="actionButton editBtn"
            aria-label="Edit player"
          >
            <i className="fas fa-pen"></i> Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="actionButton deleteBtn"
            aria-label="Delete player"
          >
            <i className="fas fa-trash-can"></i>
          </button>
        </div>
      </div>

      {/* Confirmation modal for delete */}
      {showDeleteConfirm && (
        <ConfirmModal
          title="Delete Player"
          message={`Are you sure you want to remove "${player.name}" from the roster? This will also remove them from any team assignment.`}
          confirmText="Delete"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          variant="danger"
        />
      )}
    </>
  );
};

export default PlayerCard;
