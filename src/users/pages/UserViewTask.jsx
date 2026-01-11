import React, { useEffect, useState } from "react"
import UserSidebar from "../components/UserSidebar"
import Header from "../../components/Header"

import './UserDashboard.css'
import './pages.css'
import { useParams } from "react-router-dom"
import { getOneTaskApi } from "../../services/allApi"
import { getFormattedDate } from "../../functions/formattedDate"


function UserViewTask() {

  const { id } = useParams()
  const [token, setToken] = useState("")
  const [taskDetails, setTaskDetails] = useState({})
  console.log(taskDetails)

  const getTaskDetail = async () => {
    const reqHeader = { Authorization: `Bearer ${token}` }
    const result = await getOneTaskApi(id, reqHeader)
    setTaskDetails(result.data)
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (token) {
      getTaskDetail()
    }
  }, [token])

  return (
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

          <div className="view-task-container">
            <h2>{taskDetails?.title}</h2>

            <div className="view-task-meta">
              <span>Status: <b>{taskDetails?.taskStatus}</b></span>
              <span>Created: {taskDetails?.createdAt ? getFormattedDate(taskDetails.createdAt) : "Loading..."}</span>
              <span>Updated: {taskDetails?.updatedAt ? getFormattedDate(taskDetails.updatedAt) : "Loading..."}</span>
            </div>

            <div className="view-task-section">
              <h4>Description</h4>
              <p>
                {taskDetails?.description}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default UserViewTask
