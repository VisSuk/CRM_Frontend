import React, { useEffect, useState } from 'react'
import UserSidebar from '../components/UserSidebar'
import Header from '../../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import "../../css/commonStyles.css";
import "../../css/tasks.css";
import "../../css/table.css";
import { getUserTasksApi } from '../../services/allApi'
import ViewTaskModal from '../../components/ViewTaskModal'

function UserTasks() {

  const [token, setToken] = useState("")
  // console.log(token)
  const [userTasks, setUserTasks] = useState([])
  const [searchKey, setSearchKey] = useState("")

  const [viewModal, setViewModal] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const getUserTasks = async () => {
    setIsLoading(true)
    const reqHeader = { "Authorization": `Bearer ${token}` }
    const result = await getUserTasksApi(searchKey, reqHeader)
    // console.log(result.data)
    setUserTasks(result.data)
    setIsLoading(false)
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (token) {
      getUserTasks()
    }
  }, [token, searchKey])


  return (
    <>
      <div className="tasks-container main-layout">
        <div className="sidebar">
          <UserSidebar />
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
                  <div className="tasks-search" >
                    <input type="text" placeholder="Search Tasks..." className="input-box"
                      onChange={(e) => { setSearchKey(e.target.value) }} />
                  </div>
                </div>

                <div className="table-container">
                  <div className="table-wrapper">
                    <table className="shared-table">
                      <thead>
                        <tr>
                          <th>TASK NAME</th>
                          <th>STATUS</th>
                          <th>VIEW</th>
                        </tr>
                      </thead>

                      <tbody>
                        { isLoading?
                        <tr>
                            <td colSpan="4" className="load-state">
                              <h3>Fetching Tasks...</h3>
                            </td>
                        </tr>
                        :
                        userTasks?.length > 0 ? 
                        userTasks?.map((task) => (
                        <tr key={task?._id}>
                          <td className="identity">
                            <span className="username">{task?.title}</span>
                          </td>
                          <td>
                            <span className={`badge ${task?.taskStatus.toLowerCase().replace(" ", "")}`}>{task?.taskStatus}</span>
                          </td>
                          <td>
                            <button className='icon-btn' onClick={()=>{setViewModal(task)}} >🔍</button>
                          </td>
                        </tr>
                        ))
                        
                          :
                          <tr>
                            <td colSpan="4" className="empty-state">
                              <h3>No tasks assigned</h3>
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
      { viewModal && <ViewTaskModal  task={viewModal}  setViewModal={setViewModal} />}
    </>
  )
}

export default UserTasks