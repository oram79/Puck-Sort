import React, { useState } from 'react';
import { useTeamContext } from '../../context/TeamContext';
import ConfirmModal from '../Modal/ConfirmModal';

/**
 * PlayerRow
 *
 * Renders a single player as one row in the categorized roster list.
 *
 * Features:
 *  - Shows player name and team assignment badge (if assigned)
 *  - Action buttons: assign to Team Black/White, remove from team
 *  - Edit button: toggles inline edit mode (name + position) within the row
 *  - Delete button: triggers a confirmation modal first
 */
const PlayerRow = ({ player }) => {
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
  // Inline name input + position select within the same row.
  // -------------------------------------------------------
  if (isEditing) {
    return (
      <div className="playerRow playerRowEditing">
        <input
          type="text"
          className="editInput rowEditInput"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          placeholder="Player name"
        />
        <select
          className="editSelect rowEditSelect"
          value={editPosition}
          onChange={(e) => setEditPosition(e.target.value)}
        >
          <option value={POSITIONS.FORWARD}>Forward</option>
          <option value={POSITIONS.DEFENSE}>Defense</option>
          <option value={POSITIONS.GOALIE}>Goalie</option>
          <option value={POSITIONS.SPARE}>Spare</option>
        </select>
        <div className="playerRowActions">
          <button className="rowIconBtn save" onClick={handleSaveEdit} aria-label="Save changes">
            <i className="fas fa-check"></i>
          </button>
          <button className="rowIconBtn cancel" onClick={handleCancelEdit} aria-label="Cancel edit">
            <i className="fas fa-xmark"></i>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------
  // NORMAL MODE RENDER
  // -------------------------------------------------------
  return (
    <>
      <div className="playerRow">
        <div className="playerRowInfo">
          <span className="playerRowName">{player.name}</span>
          {isAssigned && (
            <span className={`teamBadge ${isInTeam1 ? 'teamBlack' : 'teamWhite'}`}>
              {isInTeam1 ? 'Black' : 'White'}
            </span>
          )}
        </div>

        <div className="playerRowActions">
          {!isAssigned ? (
            <>
              <button
                onClick={() => addToTeam1(player)}
                className="rowBtn teamBlackBtn"
                aria-label="Add to Team Black"
              >
                <i className="fas fa-plus"></i> Black
              </button>
              <button
                onClick={() => addToTeam2(player)}
                className="rowBtn teamWhiteBtn"
                aria-label="Add to Team White"
              >
                <i className="fas fa-plus"></i> White
              </button>
            </>
          ) : (
            <button
              onClick={() => removeFromTeams(player)}
              className="rowBtn removeTeamBtn"
              aria-label="Remove from team"
            >
              <i className="fas fa-minus"></i> Unassign
            </button>
          )}
          <button
            onClick={handleStartEdit}
            className="rowIconBtn edit"
            aria-label="Edit player"
          >
            <i className="fas fa-pen"></i>
          </button>
          <button
            onClick={handleDeleteClick}
            className="rowIconBtn delete"
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

export default PlayerRow;
