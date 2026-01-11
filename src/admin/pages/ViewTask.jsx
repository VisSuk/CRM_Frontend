import React, { useEffect, useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import Header from "../../components/Header"

import "../../users/pages/UserDashboard.css"
import "../../users/pages/pages.css"
import "./AdminViewTask.css"
import { useParams } from "react-router-dom"
import { getOneUserTaskDetailsApi } from "../../services/allApi"
import { getFormattedDate } from "../../functions/formattedDate"

function AdminViewTask() {

  const { id } = useParams()
  const [token, setToken] = useState("")
  const [taskDetails, setTaskDetails] = useState({})

  const getOneTaskDetails = async() => {
    const reqHeader = { Authorization: `Bearer ${token}` }
    const result = await getOneUserTaskDetailsApi(id, reqHeader)
    console.log(result.data)
    setTaskDetails(result.data)
  }


  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (token) {
      getOneTaskDetails()
    }
  }, [token])

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <AdminSidebar />
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
            <h2>{taskDetails?.title ? taskDetails.title : "..."}</h2>

            <div className="view-task-meta">
              <span>Status: <b>{taskDetails?.taskStatus ? taskDetails.taskStatus : "..."}</b></span>
              <span>Created: {taskDetails?.createdAt ? getFormattedDate(taskDetails.createdAt) : "..."}</span>
              <span>Updated: {taskDetails?.updatedAt ? getFormattedDate(taskDetails.updatedAt) : "..."}</span>
            </div>

            <div className="view-task-section">
              <h4>Description</h4>
              <p>
                {taskDetails?.description ? taskDetails.description : "..."}
              </p>
            </div>

            <div className="view-task-owner">
              <h4>Task Owner</h4>
              <p>{taskDetails?.createdBy ? taskDetails.createdBy : "..."}</p>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default AdminViewTask
