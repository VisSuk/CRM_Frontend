import React, { useState } from "react"
import '../css/Header.css'
import { useNavigate, useLocation } from "react-router-dom"


function Header({onSearch}) {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const showSearch =
    location.pathname.startsWith("/tasks") ||
    location.pathname.startsWith("/admin-tasks")

  const handleLogout = () => {
    sessionStorage.clear()
    navigate("/", { replace: true })
  }

  return (
    <div className="header">

      <div className="header-right">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F06%2F13%2F12%2F53%2Fprofile-2398782_960_720.png&f=1&nofb=1&ipt=3cc863969707805a51958e60119caddc4ebc57de0a188ab8c2891151a57acaba"
          alt="profile"
          className="profile-img"
          onClick={() => setShowMenu(!showMenu)}
        />

        {showMenu && (
          <div className="profile-menu">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

    </div>
  )
}

export default Header
