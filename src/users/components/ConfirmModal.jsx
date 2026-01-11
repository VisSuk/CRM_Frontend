import React from "react"
import "./modal.css"

function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h3>Delete Task</h3>
        <p>Are you sure you want to delete this task? This action cannot be undone.</p>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmModal
