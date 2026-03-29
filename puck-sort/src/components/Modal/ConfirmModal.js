import React from 'react';

/**
 * ConfirmModal
 * 
 * A reusable confirmation dialog that overlays the screen.
 * Used before destructive actions like deleting a player or
 * resetting all data, so users don't accidentally lose work.
 * 
 * Props:
 *  - title:       Dialog heading text
 *  - message:     Body text explaining the action
 *  - confirmText: Label for the confirm button (e.g. "Delete")
 *  - cancelText:  Label for the cancel button (default "Cancel")
 *  - onConfirm:   Callback when user confirms
 *  - onCancel:    Callback when user cancels or clicks backdrop
 *  - variant:     'danger' | 'warning' -- controls button color
 */
const ConfirmModal = ({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'danger'
}) => {
  // Clicking the backdrop (overlay) cancels
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const confirmStyle = {
    danger: {
      background: 'var(--color-error)',
      color: 'white',
      border: 'none',
      padding: 'var(--sp-3) var(--sp-5)',
      borderRadius: 'var(--radius-md)',
      fontWeight: 600,
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-2)'
    },
    warning: {
      background: 'var(--color-warning)',
      color: 'var(--color-bg)',
      border: 'none',
      padding: 'var(--sp-3) var(--sp-5)',
      borderRadius: 'var(--radius-md)',
      fontWeight: 600,
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-2)'
    }
  };

  const cancelStyle = {
    background: 'var(--color-bg-raised)',
    color: 'var(--color-text-secondary)',
    border: '1px solid var(--color-border)',
    padding: 'var(--sp-3) var(--sp-5)',
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  };

  return (
    <div className="modalOverlay" onClick={handleOverlayClick}>
      <div className="modalContent">
        <h3 className="modalTitle">
          <i className="fas fa-exclamation-triangle"></i>
          {title}
        </h3>
        <p className="modalBody">{message}</p>
        <div className="modalActions">
          <button style={cancelStyle} onClick={onCancel}>
            {cancelText}
          </button>
          <button style={confirmStyle[variant] || confirmStyle.danger} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
