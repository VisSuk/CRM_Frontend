import React from "react"
import '../../css/Sidebar.css'
import '../../css/commonStyles.css'
import { NavLink, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBolt, faChartPie, faListCheck, faRightFromBracket, faSuitcase, faUsers } from "@fortawesome/free-solid-svg-icons"

function AdminSidebar() {

  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.clear()
    navigate("/", { replace: true })
  }

  return (
    <>
      <div className="sidebar">

        {/* Top */}
        <div className="sidebar-top">
          <div className="icon box-icon"><FontAwesomeIcon icon={faSuitcase} /></div>
          <h2>Mini CRM Pro</h2>
        </div>

        <div className="sidebar-content">
          {/* Menu */}
          <div className="sidebar-menu">
            <ul>
              <li>

                <NavLink to="/admin-dash" className="sidebar-link">
                  <FontAwesomeIcon icon={faChartPie} /> Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin-users" className="sidebar-link">
                  <FontAwesomeIcon icon={faUsers} /> Users
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin-tasks" className="sidebar-link">
                  <FontAwesomeIcon icon={faListCheck} /> Tasks
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin-logs" className="sidebar-link">
                  <FontAwesomeIcon icon={faBolt} /> Logs
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="sidebar-bottom">
            {/* User Info */}
            <div className="user-info">
              <img id="profile-picture"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F06%2F13%2F12%2F53%2Fprofile-2398782_960_720.png&f=1&nofb=1&ipt=3cc863969707805a51958e60119caddc4ebc57de0a188ab8c2891151a57acaba"
                alt="Profile Picture" />
              <div className="user-details">
                <h4>Admin</h4>
                <small>admin@gmail.com</small>
              </div>
            </div>

            {/* Logout */}
            <div className="logout-section"onClick={handleLogout} >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <p>Logout</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default AdminSidebar
