// import { useEffect, useState } from "react"
// import { addTaskApi, updateTaskApi } from "../../services/allApi"
// import { toast } from "react-toastify"
// import "./modal.css"

// function TaskModal({ isOpen, mode, task, onClose, refreshTasks }) {
//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")
//   const [taskStatus, setTaskStatus] = useState("Pending")

//   const token = sessionStorage.getItem("token")

//   useEffect(() => {
//     if (mode === "edit" && task) {
//       setTitle(task.title)
//       setDescription(task.description)
//       setTaskStatus(task.taskStatus)
//     } else {
//       setTitle("")
//       setDescription("")
//       setTaskStatus("Pending")
//     }
//   }, [mode, task])

//   if (!isOpen) return null

//   const handleSubmit = async () => {
//     if (!title || !description) {
//       toast.warning("Fill all fields")
//       return
//     }

//     const reqBody = { title, description, taskStatus }
//     const reqHeader = {
//       Authorization: `Bearer ${token}`
//     }

//     try {
//       if (mode === "add") {
//         await addTaskApi(reqBody, reqHeader)
//         toast.success("Task added")
//       } else {
//         await updateTaskApi(task._id, reqBody, reqHeader)
//         toast.success("Task updated")
//       }

//       refreshTasks()
//       onClose()
//     } catch (error) {
//       toast.error("Server error")
//     }
//   }

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <h2>{mode === "add" ? "Add Task" : "Edit Task"}</h2>

//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//         />

//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//         />

//         <select value={taskStatus} onChange={e => setTaskStatus(e.target.value)}>
//           <option>Pending</option>
//           <option>In Progress</option>
//           <option>Completed</option>
//         </select>

//         <div className="modal-actions">
//           <button type="button" onClick={()=>{console.log("hello there")}}>Cancel</button>
//           <button type="button" className="btn-primary" onClick={()=>{console.log("hello there")}}>
//             {mode === "add" ? "Create" : "Update"}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TaskModal
