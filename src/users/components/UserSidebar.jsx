import { faBolt, faChartPie, faRightFromBracket, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import "../../css/Sidebar.css"
import '../../css/commonStyles.css'

function UserSidebar() {

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: ""
  })

  const handleLogout = () => {
    sessionStorage.clear()
    navigate("/", { replace: true })
  }

  // console.log(userDetails)

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"))
    setUserDetails({ username: user.username, email: user.email })
  }, []);

  return (
    <div className="sidebar">

      {/* Top Section */}
      <div className="sidebar-top">
        <h2>Task Manager</h2>
      </div>

      {/* Menu */}
      <div className="sidebar-content">
        <div className="sidebar-menu">
          <ul>
            <li>
              <NavLink to="/dashboard" className="sidebar-link">
                <FontAwesomeIcon icon={faChartPie} /> Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/tasks" className="sidebar-link">
                <FontAwesomeIcon icon={faUsers} /> Tasks
              </NavLink>
            </li>

            <li>
              <NavLink to="/logs" className="sidebar-link">
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
              <h4>{userDetails?.username ?? '-'}</h4>
              <small>{userDetails?.email ?? '-'}</small>
            </div>
          </div>

          {/* Logout */}
          <div className="logout-section" onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <p>Logout</p>
          </div>
        </div>
      </div>



    </div>
  )
}

export default UserSidebar
