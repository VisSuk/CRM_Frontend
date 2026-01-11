import React, { useEffect, useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import Header from "../../components/Header"
import UserCard from "../components/UserCard"

import "../../users/pages/UserDashboard.css"
import "../../users/pages/pages.css"
import "./AdminUsers.css"
import { useNavigate } from "react-router-dom"
import { getAllUsersApi } from "../../services/allApi"

function AdminUsers() {

  const navigate = useNavigate()

  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [allUsers, setAllUsers] = useState([])

  const getAllUsers = async() => {
    setIsLoading(true)
    const reqHeader = {
      "Authorization":`Bearer ${token}`
    }
    const result = await getAllUsersApi(reqHeader)
    console.log(result.data)
    setAllUsers(result.data)
    setIsLoading(false)
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (token) {
      getAllUsers()
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
          <h2>Users</h2>

          <div className="admin-user-grid">
            {/* <UserCard user={{ username: "John Doe", email: "john@gmail.com" }} onClick={() => navigate("/admin-users/1")} /> */}
            {isLoading?
            <h3>Loading...</h3>
          :
          allUsers?.length > 0 ?
          allUsers?.map((user)=> (<UserCard user={user} onClick={() => navigate(`/admin-users/${user?._id}`)} />))
          :
          <h3>No Users Yet</h3>
          }
          </div>

        </div>
      </div>

    </div>
  )
}

export default AdminUsers
