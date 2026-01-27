import React, { useState } from "react"
import '../css/commonStyles.css'
import '../css/Header.css'
import { useNavigate, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPowerOff, faSuitcase } from "@fortawesome/free-solid-svg-icons"


function Header({ onSearch }) {
  const navigate = useNavigate()



  const handleLogout = () => {
    sessionStorage.clear()
    navigate("/", { replace: true })
  }

  return (
    <div className="header">

      <div className="header-left">
        <div className="logo box-icon"><FontAwesomeIcon icon={faSuitcase} /></div>
        <h2>Mini CRM Pro</h2>
      </div>

      <div className="header-right">
        <FontAwesomeIcon className="power-icon" icon={faPowerOff} onClick={handleLogout}/>
      </div>

    </div>
  )
}

export default Header
