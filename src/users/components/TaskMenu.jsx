import React from "react"
import "./taskmenu.css"

function TaskMenu({ onOpen, onEdit, onDelete, isAdmin }) {
  return (
    <div className="task-menu-dropdown">
      <button onClick={onOpen}>Open</button>
      {!isAdmin && <button onClick={onEdit}>Edit</button>}
      {!isAdmin && (
        <button className="danger" onClick={onDelete}>Delete</button>
      )}
    </div>
  )
}

export default TaskMenu
