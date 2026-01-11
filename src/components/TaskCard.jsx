import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import "./TaskCard.css"
import TaskMenu from "../users/components/TaskMenu"
import { getFormattedDate } from "../functions/formattedDate"

function TaskCard({ task, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const isAdmin = window.location.pathname.includes("admin-tasks") || window.location.pathname.includes("admin-users")

  const handleOpen = () => {
    setShowMenu(false)
    const isAdmin = window.location.pathname.includes("admin")
    navigate(isAdmin ? `/admin-task/${task?._id}` : `/task/${task?._id}`)
  }


  const handleEdit = () => {
    setShowMenu(false)
    onEdit(task)
  }

  const handleDelete = () => {
    setShowMenu(false)
    onDelete(task)
  }

  return (
    <div className="task-card">

      {/* Top section */}
      <div className="task-card-top">
        <h3 className="task-title">{task?.title ? task.title : "Task Title"}</h3>

        <div className="task-menu-wrapper">
          <div className="task-menu" onClick={() => setShowMenu(!showMenu)}>
            ⋮
          </div>

          {showMenu && (
            <TaskMenu
              onOpen={handleOpen}
              onEdit={!isAdmin ? handleEdit : null}
              onDelete={!isAdmin ? handleDelete : null}
              isAdmin={isAdmin}
            />
          )}
        </div>
      </div>

      <p className="task-description">
        {task?.description ? task.description : "Generic Task Description"}
      </p>

      <div className="task-dates">
        <p>Created: {task?.createdAt ? getFormattedDate(task.createdAt) : "10 Dec 2026"}</p>
        <p>Updated: {task?.updatedAt ? getFormattedDate(task.updatedAt) : "10 Dec 2026"}</p>
      </div>

      <div className="card-footer" style={isAdmin ? { display: "flex", justifyContent: "space-between", alignItems: "center" } : {}}>
        <div className={`task-status ${task?.taskStatus == 'Pending' ? "pending" : task?.taskStatus == 'Completed' ? 'completed' : 'inprogress'}`}>
          {task?.taskStatus}
        </div>
        {isAdmin && <div className="task-owner">
          {task?.createdBy ? task.createdBy : "..."}
        </div>}
      </div>

    </div>
  )
}

export default TaskCard
