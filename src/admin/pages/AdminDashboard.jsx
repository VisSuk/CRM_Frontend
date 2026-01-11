import React, { useEffect, useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import Header from "../../components/Header"
import TaskCountCards from "../../components/TaskCountCards"

import "../../users/pages/UserDashboard.css"
import "../../users/pages/pages.css"
import { getAdminStatsApi, getRecentTasksApi, getRecentUsersApi } from "../../services/allApi"

function AdminDashboard() {

  const [token, setToken] = useState("")
  console.log(token)

  const [stats, setStats] = useState({})
  const [recentUsers, setRecentUsers] = useState([])
  const [recentTasks, setRecentTasks] = useState([])

  const getAdminStats = async() => {
    const reqHeader = {
      "Authorization":`Bearer ${token}`
    }
    const result = await getAdminStatsApi(reqHeader)
    console.log(result.data)
    setStats(result.data)
  }

  const getRecentUsers = async() => {
    const reqHeader = {
      "Authorization":`Bearer ${token}`
    }
    const result = await getRecentUsersApi(reqHeader)
    console.log(result.data)
    setRecentUsers(result.data)
  }

  const getRecentTasks = async () => {
    const reqHeader = {
      "Authorization":`Bearer ${token}`
    }
    const result = await getRecentTasksApi(reqHeader)
    console.log(result.data)
    setRecentTasks(result.data)
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])

  useEffect(()=>{
    if(token){
      getAdminStats()
      getRecentUsers()
      getRecentTasks()
    }
  }, [token])

  return (
    <div className="dashboard-layout">

      <div className="dashboard-sidebar">
        <AdminSidebar />
      </div>

      <div className="dashboard-main">

        <div className="dashboard-header">
          <Header />
        </div>

        <div className="dashboard-content">
          <h2>Admin Dashboard</h2>

          <TaskCountCards
            numbers={stats} isAdmin
          />

          <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
            <div className="admin-stat-card">
              <p>Total Users</p>
              <h2>{stats?.totalUsers ? stats.totalUsers : "Loading..."}</h2>
            </div>

            <div className="admin-stat-card">
              <p>Total Logs</p>
              <h2>{stats?.totalLogs ? stats.totalLogs : "Loading..."}</h2>
            </div>
          </div>

          <div className="admin-widgets">

  {/* Latest Users */}
  <div className="admin-widget">
    <h3>New Users</h3>

    {recentUsers?.length > 0 ?
    recentUsers?.map((user) => (<div className="admin-user-card">
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F06%2F13%2F12%2F53%2Fprofile-2398782_960_720.png&f=1&nofb=1&ipt=3cc863969707805a51958e60119caddc4ebc57de0a188ab8c2891151a57acaba" />
      <div>
        <h4>{user?.username}</h4>
        <p>{user?.email}</p>
      </div>
    </div>))  
    :
    "No Recent Users"
  }

  </div>

  {/* Recent Tasks */}
  <div className="admin-widget">
    <h3>Recently Updated Tasks</h3>

{  recentTasks?.length > 0 ?   
    recentTasks?.map((task) => (
      <div className="recent-task-row">
      <span>{task.title || "Loading..."}</span>
      <span className={`status  ${task.taskStatus.toLowerCase().replace(" ", "")} `}>{task.taskStatus}</span>
    </div>
    ))
    :
    "No Recent Tasks"
}

  </div>

</div>


        </div>
      </div>

    </div>
  )
}

export default AdminDashboard
