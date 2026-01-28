import React from 'react'

import "../../css/commonStyles.css";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faChartPie, faListCheck } from '@fortawesome/free-solid-svg-icons';


function UserNavbar() {
    return (
        <>
            <div className='nav_menu'>
                <ul className='nav_list'>
                    <li className='nav_item'>
                        <NavLink to="/dashboard" className={({ isActive }) => `nav_link ${isActive ? 'active' : ''}`}>
                            <FontAwesomeIcon icon={faChartPie} className='nav_icon' />
                            <small>Dashboard</small>
                        </NavLink>
                    </li>
                    <li className='nav_item'>
                        <NavLink to="/tasks" className={({ isActive }) => `nav_link ${isActive ? 'active' : ''}`}>
                            <FontAwesomeIcon icon={faListCheck} className='nav_icon' />
                            <small>Tasks</small>
                        </NavLink>
                    </li>
                    <li className='nav_item'>
                        <NavLink to="/logs" className={({ isActive }) => `nav_link ${isActive ? 'active' : ''}`}>
                            <FontAwesomeIcon icon={faBolt} className='nav_icon' />
                            <small>Logs</small>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default UserNavbar