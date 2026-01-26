import React, { useEffect, useState } from "react";
import "../../css/taskModal.css";
import "../../css/commonStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { addTaskApi, editTaskApi, getAllUsersApi } from "../../services/allApi";
import { toast, ToastContainer } from "react-toastify";

function TaskModal({ setModalTask, sendToken, editingTask, setRefreshTasks }) {

  // console.log(editingTask)
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    taskStatus: "Pending",
    assignedTo: ""
  })
  const [allUsers, setAllUsers] = useState([])
  // console.log(taskDetails)

  const handleReset = () => {
    setTaskDetails({
      title: "",
      description: "",
      taskStatus: "Pending",
      assignedTo: ""
    })
  }

  const getAllUsers = async () => {
    const reqHeader = { "Authorization": `Bearer ${sendToken}` }
    const result = await getAllUsersApi(reqHeader)
    // console.log(result.data)
    setAllUsers(result.data)
  }

  const handleAddTask = async () => {
    const { title, description, assignedTo } = taskDetails
    if (!title || !description || !assignedTo) {
      toast.warning("Please fill all fields!")
      return
    }
    const reqHeader = { "Authorization": `Bearer ${sendToken}` }
    const reqBody = {
      title,
      description,
      userID: assignedTo
    }
    const result = await addTaskApi(reqBody, reqHeader)
    // console.log(result.data)
    if (result.status === 201) {
      handleReset()
      toast.success("Task Added Successfully")
      setTimeout(() => {
        setRefreshTasks(prev => !prev)
        setModalTask(false)
      }, 2500)
    } else if (result.status === 403) {
      handleReset()
      toast.error("Access Denied")
    } else if (result.status === 400) {
      handleReset()
      toast.error("Task already exists")
    } else {
      toast.error("Server Error")
    }
  }

  const handleEditTask = async () => {
    const id = editingTask._id
    // console.log(id)
    const { title, description, assignedTo, taskStatus } = taskDetails
    const reqHeader = { "Authorization": `Bearer ${sendToken}` }
    const reqBody = {
      title,
      description,
      userID: assignedTo,
      taskStatus
    }
    const result = await editTaskApi(id, reqBody, reqHeader)
    console.log(result.data)
    if (result.status === 200) {
      handleReset()
      toast.success("Task Updated Successfully")
      setTimeout(() => {
        setRefreshTasks(prev => !prev)
        setModalTask(false)
      }, 2500)
    } else if (result.status === 403) {
      handleReset()
      toast.error("Access Denied")
    } else if (result.status === 404) {
      handleReset()
      toast.error("Task not found")
    } else {
      toast.error("Server Error")
    }
  }

  useEffect(() => {
    if (sendToken) {
      getAllUsers()
    }
  }, [sendToken])

  useEffect(() => {
    if (editingTask) {
      setTaskDetails({
        title: editingTask.title,
        description: editingTask.description,
        taskStatus: editingTask.taskStatus,
        assignedTo: editingTask.assignedTo?._id
      });
    }
  }, [editingTask]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <div>
              {editingTask ? <h2>Edit Task</h2> : <h2>Create Task</h2>}
            </div>
            <button
              onClick={() => {
                setModalTask(false);
              }}
            >
              <FontAwesomeIcon icon={faX} size="xs" />
            </button>
          </div>
          <div className="form-body">
            <h5>ASSIGN USER</h5>
            <select value={taskDetails.assignedTo} onChange={(e) => { setTaskDetails({ ...taskDetails, assignedTo: e.target.value }) }} >
              <option value="">Select User</option>
              {allUsers?.map((user) => <option key={user._id} value={user._id} >{user.username}</option>)}
            </select>
            <h5>TASK TITLE</h5>
            <input
              type="text" className="input-box" value={taskDetails.title}
              onChange={(e) => { setTaskDetails({ ...taskDetails, title: e.target.value }) }} />
            <h5>TASK DESCRIPTION</h5>
            <textarea rows={5} className="text-area" value={taskDetails.description}
              onChange={(e) => { setTaskDetails({ ...taskDetails, description: e.target.value }) }} />
            {editingTask &&
              <>
                <h5>TASK STATUS</h5>
                <select value={taskDetails.taskStatus} onChange={(e) => { setTaskDetails({ ...taskDetails, taskStatus: e.target.value }) }}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress" >
                    In Progress
                  </option>
                  <option value="Completed">Completed</option>
                </select>
              </>}
          </div>
          <div className="footer">
            <button
              className="button-secondary"
              onClick={() => {
                setModalTask(false);
              }}
            >
              Cancel
            </button>
            {editingTask ?
              <button className="button-primary edit" onClick={handleEditTask}>Edit</button>
              :
              <button className="button-primary create" onClick={handleAddTask}>Create</button>
            }
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </>
  );
}

export default TaskModal;
