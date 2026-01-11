import React, { useEffect, useState } from 'react'
import UserSidebar from '../components/UserSidebar'
import Header from '../../components/Header'
import TaskCard from '../../components/TaskCard'

import './pages.css'
import './UserDashboard.css'
import '../components/modal.css'
import ConfirmModal from '../components/ConfirmModal'
import { deleteTaskApi, getUserTasksApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function UserTasks() {

  const navigate = useNavigate()

  const [isTaskModalOpen, setTaskModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("add")
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  const [token, setToken] = useState("")
  const [myTasks, setMytasks] = useState([])
  console.log(token)

  const [isLoading, setIsLoading] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const [deletedFlag, setDeletedFlag] = useState(null)

  const [searchKey, setSearchKey] = useState("")
  console.log(searchKey)

  const getUserTasks = async () => {
    console.log("Inside get user tasks function")
    setIsLoading(true)
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getUserTasksApi(searchKey, reqHeader)
    console.log(result.data)
    setMytasks(result.data)
    setIsLoading(false)
  }

  const handleDeleteTask = async () => {
    const reqHeader = { Authorization: `Bearer ${token}` }
    const result = await deleteTaskApi(selectedTask._id, reqHeader)
    console.log(result.data)
    setDeleteOpen(false)
    if (result.status == 200) {
      toast.success("Task deleted")
      setDeletedFlag(result.data)
    } else {
      toast.error("Serer error")
    }
  }

  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
  }, [])

  useEffect(() => {
    if (token) {
      getUserTasks()
    }
  }, [token, deletedFlag, searchKey])



  return (
    <>
      <div className="dashboard-layout">

        <div className="dashboard-sidebar">
          <UserSidebar />
        </div>

        <div className="dashboard-main">

          <div className="dashboard-header">
            <Header onSearch={setSearchKey} />
          </div>

          <div className="dashboard-content">

            <div className="page-header">
              <h2>My Tasks</h2>
              <button
                className="btn-primary"
                onClick={() => {
                  navigate('/addTask')
                }}
              >
                + Add Task
              </button>
            </div>

            <div className="task-grid">
              {isLoading ?
                <h3>Loading Tasks...</h3>
                :
                myTasks?.length > 0 ? (
                  myTasks.map((task) => (
                    <TaskCard
                      task={task}
                      onEdit={() => navigate(`/editTask/${task._id}`)}
                      onDelete={() => { setDeleteOpen(true), setSelectedTask(task) }}
                    />
                  ))
                ) : <h3>No Tasks Found</h3>
              }
            </div>

          </div>
        </div>

        {/* Modals */}


        <ConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={() => {
            handleDeleteTask()
            setDeleteOpen(false)
          }}
        />

      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default UserTasks