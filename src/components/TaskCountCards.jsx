import React from 'react'
import './TaskCountCards.css'

function TaskCountCards({numbers, isAdmin}) {

    const data = isAdmin
    ? {
        all: numbers?.totalTasks,
        completed: numbers?.completedTasks,
        pending: numbers?.pendingTasks,
        inprogress: numbers?.inProgressTasks
      }
    : numbers

    console.log(data)

  return (
    <>
      <div className="task-count-grid">

        <div className="count-card">
          <p className="count-title">All Tasks</p>
          <div className="count-body">
            <div className="count-circle all"></div>
            <h2>{data?.all}</h2>
          </div>
        </div>

        <div className="count-card">
          <p className="count-title">Completed</p>
          <div className="count-body">
            <div className="count-circle completed"></div>
            <h2>{data?.completed}</h2>
          </div>
        </div>

        <div className="count-card">
          <p className="count-title">Pending</p>
          <div className="count-body">
            <div className="count-circle pending"></div>
            <h2>{data?.pending}</h2>
          </div>
        </div>

        <div className="count-card">
          <p className="count-title">In Progress</p>
          <div className="count-body">
            <div className="count-circle inprogress"></div>
            <h2>{data?.inprogress}</h2>
          </div>
        </div>

      </div>
    </>
  )
}

export default TaskCountCards