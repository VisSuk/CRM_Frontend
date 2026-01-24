import React from 'react'
import '../../css/ConfirmModal.css'
import { deleteTaskApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'

function ConfirmModal({ sendToken, task, setConfirmModal, setRefreshTasks }) {
    // console.log(sendToken)
    // console.log(task)
    // console.log(setConfirmModal)
    const { _id } = task
    // console.log(_id)
    const handleDelete = async () => {
        const reqHeader = { "Authorization": `Bearer ${sendToken}` }
        const result = await deleteTaskApi(_id, reqHeader)
        console.log(result.data)
        if (result.status === 200) {
            setRefreshTasks(prev => !prev);
            setConfirmModal(null);
        } else if (result.status === 403) {
            toast.error("Access Denied!")
        } else if (result.status === 404) {
            toast.error("Task not found!")
        } else {
            toast.warning("Server Error")
        }
    }


    return (
        <>
            <div className="modal-overlay">
                <div className="modal">

                    <h3>Delete Task</h3>
                    <p>Are you sure you want to delete this task? This action cannot be undone.</p>

                    <div className="modal-actions">
                        <button className="btn-secondary" onClick={() => { setConfirmModal(null) }}>
                            Cancel
                        </button>
                        <button className="btn-danger" onClick={handleDelete} >
                            Delete
                        </button>
                    </div>

                </div>
            </div>
            <ToastContainer theme="colored" position="top-center" autoClose={2000} />
        </>
    )
}

export default ConfirmModal