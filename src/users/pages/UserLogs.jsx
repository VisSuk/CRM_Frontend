import React, { useEffect, useState } from 'react'
import UserSidebar from '../components/UserSidebar'
import Header from '../../components/Header'

import './pages.css'
import './UserDashboard.css'
import { getUserLogsApi } from '../../services/allApi'

function UserLogs() {

  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userLogs, setUserLogs] = useState([])


  const getUserLogs = async () => {
    setIsLoading(true)
    const reqHeader = { "Authorization": `Bearer ${token}` }
    const result = await getUserLogsApi(reqHeader)
    console.log(result.data)
    setUserLogs(result.data)
    setIsLoading(false)
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (token) {
      getUserLogs()
    }
  }, [token])

  return (
    <>
      <div className="dashboard-layout">

        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <UserSidebar />
        </div>

        {/* Main */}
        <div className="dashboard-main">

          {/* Header */}
          <div className="dashboard-header">
            <Header />
          </div>

          {/* Content */}
          <div className="dashboard-content">

            <div className="page-header">
              <h2>My Activity Logs</h2>
            </div>

            <table className="log-table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Task</th>
                  <th>TaskID</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {isLoading? <h3>Loading...</h3>
                :
                userLogs?.length > 0?
                userLogs.map((log) => (
                  <tr>
                  <td>{log?.action}</td>
                  <td>{log?.taskTitle}</td>
                  <td>{log?._id}</td>
                  <td>{log?.createdAt}</td>
                </tr>
                ))
                :
                <h3>No logs yet</h3>}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  )
}

export default UserLogs