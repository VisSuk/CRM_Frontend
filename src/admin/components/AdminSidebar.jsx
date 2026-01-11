import React from "react"
import { NavLink } from "react-router-dom"
import "./AdminSidebar.css"

function AdminSidebar() {
  return (
    <>
      <div className="sidebar">
  
        {/* Top */}
        <div className="sidebar-top">
          <h2>Admin Panel</h2>
        </div>
  
        {/* Menu */}
        <div className="sidebar-menu">
          <ul>
            <li>
              <NavLink to="/admin-dash" className="sidebar-link">
                Dashboard
              </NavLink>
            </li>
  
            <li>
              <NavLink to="/admin-users" className="sidebar-link">
                Users
              </NavLink>
            </li>
  
            <li>
              <NavLink to="/admin-tasks" className="sidebar-link">
                Tasks
              </NavLink>
            </li>
  
            <li>
              <NavLink to="/admin-logs" className="sidebar-link">
                Logs
              </NavLink>
            </li>
          </ul>
        </div>
  
      </div>
    </>
  )
}

export default AdminSidebar
