import { faBolt, faChartPie, faListCheck, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function AdminNavbar() {



    return (
        <>
            <div className='nav_menu'>
                <ul className='nav_list'>
                    <li className='nav_item'>
                        <NavLink to="/admin-dash" className={({ isActive }) =>`nav_link ${isActive ? 'active' : ''}`}>
                            <FontAwesomeIcon icon={faChartPie} className='nav_icon' />
                            <small>Dashboard</small>
                        </NavLink>
                    </li>
                    <li className='nav_item'>
                        <NavLink to="/admin-users" className={({ isActive }) =>`nav_link ${isActive ? 'active' : ''}`}>
                            <FontAwesomeIcon icon={faUsers} className='nav_icon'/>                            
                            <small>Users</small>
                        </NavLink>
                    </li>
                    <li className='nav_item'>
                        <NavLink to="/admin-tasks" className={({ isActive }) =>`nav_link ${isActive ? 'active' : ''}`}>
                            <FontAwesomeIcon icon={faListCheck} className='nav_icon'/>
                            <small>Tasks</small>
                        </NavLink>
                    </li>
                    <li className='nav_item'>
                        <NavLink to="/admin-logs" className={({ isActive }) =>`nav_link ${isActive ? 'active' : ''}`}>
                            <FontAwesomeIcon icon={faBolt} className='nav_icon'/>
                            <small>Logs</small>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default AdminNavbar