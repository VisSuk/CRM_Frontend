import React, { useEffect, useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import Header from "../../components/Header"
import TaskCard from "../../components/TaskCard"

import "../../users/pages/UserDashboard.css"
import "../../users/pages/pages.css"
import { getAllTasksApi } from "../../services/allApi"

function AdminTasks() {

  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [allTasks, setAllTasks] = useState([])

    const [searchKey, setSearchKey] = useState("")
    console.log(searchKey)


  const getAllTasks = async () => {
    setIsLoading(true)
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllTasksApi(searchKey, reqHeader)
    console.log(result.data)
    setAllTasks(result.data)
    setIsLoading(false)
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (token) {
      getAllTasks()
    }
  }, [token, searchKey])

  return (
    <div className="dashboard-layout">

      <div className="dashboard-sidebar">
        <AdminSidebar />
      </div>

      <div className="dashboard-main">

        <div className="dashboard-header">
          <Header onSearch={setSearchKey} />
        </div>

        <div className="dashboard-content">
          <h2>All Tasks</h2>

          <div className="task-grid">
            {/* <TaskCard /> */}
            {isLoading ?
              <h3>Loading...</h3>
              :
              allTasks?.length > 0 ?
                allTasks?.map((task) => (<TaskCard task = {task} />))
                :
                <h3>No Users Yet</h3>
            }

          </div>

        </div>
      </div>

    </div>
  )
}

export default AdminTasks
