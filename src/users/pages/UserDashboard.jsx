import React, { useEffect, useState } from "react"
import './UserDashboard.css'
import UserSidebar from "../components/UserSidebar"
import Header from "../../components/Header"
import TaskCountCards from "../../components/TaskCountCards"
import { getUserTasksApi } from "../../services/allApi"
import { getTaskCounts } from "../../functions/taskCounts"


function UserDashboard() {

  const [token, setToken] = useState("")
  const [myTasks, setMytasks] = useState([])
  const [taskcounts, setTaskCounts] = useState({})

  console.log(token)
  console.log(taskcounts)

  const getUserTasks = async () => {
    console.log("Inside get user tasks function")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getUserTasksApi("", reqHeader)
    console.log(result.data)
    setMytasks(result.data)
    const counts = getTaskCounts(result.data)
    setTaskCounts(counts)
  }

  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
  }, [])

  useEffect(() => {
    if (token) {
      getUserTasks()
    }
  }, [token])

  return (
    <>
      <div className="dashboard-layout">

        {/* Left Grid – Sidebar */}
        <div className="dashboard-sidebar">
          <UserSidebar />
        </div>

        {/* Right Grid */}
        <div className="dashboard-main">

          {/* Top – Header */}
          <div className="dashboard-header">
            <Header />
          </div>

          {/* Bottom – Dashboard Content */}
          <div className="dashboard-content">
            <h2>Dashboard</h2>
            <TaskCountCards numbers={taskcounts} />
            <div className="recent-tasks">
            <h3>Recently Added Tasks</h3>

            {myTasks.length > 0 ? (
              myTasks.slice(0, 3).map((task) => (
                <div key={task._id} className="recent-task-item">
                  <div className="recent-task-title">{task.title}</div>
                  <div className={`recent-task-status ${task.taskStatus.toLowerCase().replace(" ", "")}`}>
                    {task.taskStatus}
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks yet</p>
            )}
          </div>
          </div>

          






        </div>

      </div>
    </>
  )
}

export default UserDashboard
