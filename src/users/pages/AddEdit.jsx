import React, { useEffect, useState } from 'react'

import "./pages.css"
import "./UserDashboard.css"
import "./AddEdit.css"
import UserSidebar from '../components/UserSidebar'
import Header from '../../components/Header'
import { addTaskApi, editTaskApi, getOneTaskApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

function AddEdit({ edit }) {

    const navigate = useNavigate()
    const { id } = useParams()

    const [token, setToken] = useState("")
    const [taskDetails, setTaskDetails] = useState({
        title: "",
        description: "",
        taskStatus: "Pending"
    })
    console.log(taskDetails)

    const handleAddTask = async () => {
        const { title, description, taskStatus } = taskDetails
        if (!title || !description || !taskStatus) {
            toast.warning("Fill all fields")
        } else {
            const reqHeader = { "Authorization": `Bearer ${token}` }
            const reqBody = { title, description, taskStatus }

            const result = await addTaskApi(reqBody, reqHeader)
            if (result.status == 200) {
                toast.success("Task Added")
                setTimeout(() => {
                    navigate('/tasks')
                }, 2001)
            } else if (result.status == 400) {
                toast.warning("Task already exists")
            } else {
                toast.error("Server error")
            }
        }


    }

    const handleEditTask = async() => {
        console.log(token)
        const { title, description, taskStatus } = taskDetails
        if (!title || !description || !taskStatus) {
            toast.warning("Fill all fields")
        } else {
            const reqHeader = { "Authorization": `Bearer ${token}` }
            const reqBody = { title, description, taskStatus }

            const result = await editTaskApi(id,reqBody, reqHeader)
            if (result.status == 200) {
                toast.success("Task Edited")
                setTimeout(() => {
                    navigate('/tasks')
                }, 2001)
            } else if (result.status == 400) {
                toast.warning("Task doesnt exist")
            } else {
                toast.error("Server error")
            }
        }
    }

    useEffect(() => {
        setToken(sessionStorage.getItem('token'))
    }, [])

    useEffect(() => {
        if (edit && id && token) {
            const reqHeader = { Authorization: `Bearer ${token}` }

            getOneTaskApi(id, reqHeader).then(res => {
                setTaskDetails({
                    title: res.data.title,
                    description: res.data.description,
                    taskStatus: res.data.taskStatus
                })
            })
        }
    }, [edit, id, token])


    return (
        <>
            <div className="dashboard-layout">

                {/* Sidebar */}
                <div className="dashboard-sidebar">
                    <UserSidebar />
                </div>

                {/* Main area */}
                <div className="dashboard-main">

                    {/* Header */}
                    <div className="dashboard-header">
                        <Header />
                    </div>

                    {/* Content */}
                    <div className="dashboard-content">

                        <div className="page-header">
                            {edit ?
                                <h2>Edit Task</h2>
                                :
                                <h2>Add Task</h2>
                            }
                        </div>

                        <div className="task-form">

                            <div className="form-group">
                                <label>Task Title</label>
                                <input type="text" placeholder="Enter task title" onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })} value={taskDetails.title}/>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea placeholder="Enter task description" onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })} value={taskDetails.description}></textarea>
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <select onChange={(e) => setTaskDetails({ ...taskDetails, taskStatus: e.target.value })}   value={taskDetails.taskStatus}>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            <div className="form-actions">
                                <button className="btn-secondary" onClick={() => {navigate('/tasks')}}>Cancel</button>
                                {edit ?
                                    <button className="btn-primary" onClick={handleEditTask}>Edit Task</button>
                                    :
                                    <button className="btn-primary" onClick={handleAddTask}>Create Task</button>}
                            </div>

                        </div>

                    </div>
                </div>

            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>

    )
}

export default AddEdit