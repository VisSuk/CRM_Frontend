import React, { useEffect, useState } from "react";
import "../../css/commonStyles.css";
import "../../css/tasks.css";
import "../../css/table.css";
import "../../css/navbar.css"
import AdminSidebar from "../components/AdminSidebar";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskModal from "../components/TaskModal";
import { getAllTasksApi } from "../../services/allApi";
import ViewTaskModal from "../../components/ViewTaskModal";
import ConfirmModal from "../components/ConfirmModal";
import AdminNavbar from "../components/AdminNavbar";

function AdminTasks() {
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [allTasks, setAllTasks] = useState([])
  const [searchKey, setSearchKey] = useState("")
  // console.log(token)

  const [taskModal, setTaskModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [refreshTasks, setRefreshTasks] = useState(false)
  const [viewModal, setViewModal] = useState(null)
  const [confirmModal, setConfirmModal] = useState(null)

  const getAllTasks = async () => {
    setIsLoading(true)
    const reqHeader = { "Authorization": `Bearer ${token}` }
    const result = await getAllTasksApi(searchKey, reqHeader)
    // console.log(result.data)
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
  }, [token, searchKey, refreshTasks])

  return (
    <>
      <div className="tasks-container main-layout">
        <div className="sidebar">
          <AdminSidebar />
        </div>
        <div className="tasks-main">
          <div className="tasks-header">
            <Header />
          </div>
          <div className="tasks-contents content-layout">
            <div className="left-spacer-grid"></div>
            <div className="middle-content-grid">
              <div className="tasks content-container">

                <div className="tasks-header content-header">
                  <div className="tasks-text header-text">
                    <h3>Workstream</h3>
                    <small>Overview of project tasks</small>
                  </div>
                  <div className="tasks-search-add" >
                    <input type="text" placeholder="Search Tasks..." className="input-box"
                      onChange={(e) => { setSearchKey(e.target.value) }} />
                    <button className="button-primary" onClick={() => { setEditingTask(null); setTaskModal(true) }}>
                      <FontAwesomeIcon icon={faPlus} className="button-icon" /> ADD TASK
                    </button>
                  </div>
                </div>

                <div className="table-container">
                  <div className="table-wrapper">
                    <table className="shared-table">
                      <thead>
                        <tr>
                          <th>TASK NAME</th>
                          <th>ASSIGNED TO</th>
                          <th>STATUS</th>
                          <th>OPTIONS</th>
                        </tr>
                      </thead>

                      <tbody>
                        {isLoading ?
                          <tr>
                            <td colSpan="4" className="load-state">
                              <h3>Fetching Tasks...</h3>
                            </td>
                          </tr>
                          :
                          allTasks?.length > 0 ?
                            allTasks.map((task) => (<tr key={task._id}>
                              <td data-cell='TITLE' className="identity">
                                <span className="username">{task?.title}</span>
                              </td>
                              <td data-cell='ASSIGNED TO' className="email">{task?.assignedTo?.username}</td>
                              <td data-cell='STATUS'>
                                <span className={`badge ${task?.taskStatus.toLowerCase().replace(" ", "")}`}>{task?.taskStatus}</span>
                              </td>
                              <td data-cell='ACTIONS' className="actions">
                                <button className="icon-btn" onClick={() => { setViewModal(task) }}>🔍</button>
                                <button className="icon-btn"
                                  onClick={() => { setEditingTask(task); setTaskModal(true) }}>✏️</button>
                                <button className="icon-btn" onClick={(e) => { setConfirmModal(task) }} >🗑️</button>
                              </td>
                            </tr>))
                            :
                            <tr>
                              <td colSpan="4" className="empty-state">
                                <h3> No Tasks Created Yet</h3>
                              </td>
                            </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
            <div className="right-spacer-grid"></div>
          </div>
        </div>
      </div>

      <div className="mobile-nav">
        <AdminNavbar />
      </div>

      {taskModal && <TaskModal setModalTask={setTaskModal} sendToken={token}
        editingTask={editingTask} setRefreshTasks={setRefreshTasks} />}
      {viewModal && <ViewTaskModal task={viewModal} setViewModal={setViewModal} />}
      {confirmModal && <ConfirmModal sendToken={token} task={confirmModal} setConfirmModal={setConfirmModal} setRefreshTasks={setRefreshTasks} />}
    </>
  );
}

export default AdminTasks;
