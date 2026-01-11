import React, { useEffect, useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import Header from "../../components/Header"
import TaskCard from "../../components/TaskCard"
import Logs from "../../components/Logs"


import "../../users/pages/UserDashboard.css"
import "../../users/pages/pages.css"
import "./AdminUserDetails.css"
import { useParams } from "react-router-dom"
import { getOneUserDetailApi, getOneUserLogsApi, getOneUserTasksApi } from "../../services/allApi"

function AdminUserDetails() {
  const {id} = useParams()
  console.log(id)

  const [activeTab, setActiveTab] = useState("tasks")
  
  const [token, setToken] = useState("")
  const [userDetails, setUserDetails] = useState({})
  const [userTasks, setUserTasks] = useState([])
  const [userLogs, setUserLogs] = useState([])

  const [isLoading1, setIsLoading1] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)

  const user = {
    name: "John Doe",
    email: "john@gmail.com"
  }

  const getOneUserDetail = async() => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getOneUserDetailApi(id, reqHeader)
    console.log(result.data)
    setUserDetails(result.data)
  }

  const getOneUserTasks = async() => {
    setIsLoading1(true)
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getOneUserTasksApi(id, reqHeader)
    console.log(result.data)
    setUserTasks(result.data)
    setIsLoading1(false)
  }

  const getOneUserLog = async() => {
    setIsLoading2(true)
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getOneUserLogsApi(id, reqHeader)
    console.log(result.data)
    setUserLogs(result.data)
    setIsLoading2(false)
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if(token){
      getOneUserDetail()
      getOneUserTasks()
      getOneUserLog()
    }
  },[token])

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

          {/* User Info */}
          <div className="admin-user-header">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F06%2F13%2F12%2F53%2Fprofile-2398782_960_720.png&f=1&nofb=1&ipt=3cc863969707805a51958e60119caddc4ebc57de0a188ab8c2891151a57acaba" alt="user" />
            <div>
              <h3>{userDetails?.username ? userDetails.username : "..."}</h3>
              <p>{userDetails?.email ? userDetails.email : "..."}</p>
            </div>
          </div>

          {/* Toggle */}
          <div className="admin-toggle">
            <button
              className={activeTab === "tasks" ? "active" : ""}
              onClick={() => setActiveTab("tasks")}
            >
              Tasks
            </button>

            <button
              className={activeTab === "logs" ? "active" : ""}
              onClick={() => setActiveTab("logs")}
            >
              Logs
            </button>
          </div>

          {/* Content */}
          {activeTab === "tasks" && (
            <div className="task-grid">
              {isLoading1? 
              <h3>Loading...</h3> 
              :
              userTasks?.length > 0 ?
              userTasks.map((task) => <TaskCard task={task}/>)
              :
              <h3>No Tasks Assigned</h3>
            }
            </div>
          )}

          {activeTab === "logs" && (
            <div className="log-list">
              <Logs logs={userLogs}/>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}

export default AdminUserDetails
