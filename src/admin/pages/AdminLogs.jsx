import React, { useEffect, useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import Header from "../../components/Header"
import Logs from "../../components/Logs"

import "../../users/pages/UserDashboard.css"
import "../../users/pages/pages.css"
import { getAllLogsApi } from "../../services/allApi"

function AdminLogs() {

  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [allLogs, setAllLogs] = useState([])

  const getAllLogs = async () => {
    setIsLoading(true)
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllLogsApi(reqHeader)
    console.log(result.data)
    setAllLogs(result.data)
    setIsLoading(false)
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (token) {
      getAllLogs()
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
          <h2>All Activity Logs</h2>
          <Logs  logs={allLogs}/>
        </div>

      </div>

    </div>
  )
}

export default AdminLogs
