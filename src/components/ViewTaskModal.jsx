import React from 'react'

import '../css/commonStyles.css'
import '../css/ViewTaskModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

function ViewTaskModal({ task, setViewModal }) {

    // console.log(task)

    return (
        <>
            <div className='modalBackground'>
                <div className="modalContainer">
                    <div className="view-user-header titleCloseBtn">
                        <div>
                            <h3>{task?.title ?? '...'}</h3>
                        </div>
                        <button onClick={()=>{setViewModal(null)}}><FontAwesomeIcon icon={faX} size="2xs" /></button>
                    </div>
                    <div className='description'>
                        <textarea rows={5} value={task?.description ?? '...'} readOnly className=''></textarea>
                    </div>

                    <div className="dates-section">

                        <div className="dates-flex">
                            <div className="created-date dates-box">
                                <small>Created on: </small>
                                <h4>{task?.createdAt? new Date(task.createdAt).toLocaleDateString("en-GB")
                                    : "—"}</h4>
                            </div>
                            <div className="last-updated dates-box">
                                <small>Last Updated:</small>
                                <h4>{task?.updatedAt? new Date(task.updatedAt).toLocaleDateString("en-GB")
                                    : "—"}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="task-meta">
                        <span className="assigned-user">
                            Assigned to: <strong>{task?.assignedTo?.username || '-'}</strong>
                        </span>

                        <span className={`modal-badge ${task?.taskStatus.toLowerCase().replace(" ", "")}`}>{task?.taskStatus}</span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ViewTaskModal