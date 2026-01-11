import React from "react"
import { NavLink } from "react-router-dom"
import "./UserSidebar.css"

function UserSidebar() {
  return (
    <div className="sidebar">

      {/* Top Section */}
      <div className="sidebar-top">
        <h2>Task Manager</h2>
      </div>

      {/* Menu */}
      <div className="sidebar-menu">
        <ul>
          <li>
            <NavLink to="/dashboard" className="sidebar-link">
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/tasks" className="sidebar-link">
              Tasks
            </NavLink>
          </li>

          <li>
            <NavLink to="/logs" className="sidebar-link">
              Logs
            </NavLink>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default UserSidebar
