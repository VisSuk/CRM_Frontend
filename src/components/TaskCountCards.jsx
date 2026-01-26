import React from "react";
import '../css/TaskCountCards.css'
import '../css/commonStyles.css'
import {
  faCircle,
  faCircleCheck,
  faLayerGroup,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TaskCountCards({ numbers }) {
  const data = {
        all: numbers?.totalTasks,
        completed: numbers?.completedTasks,
        pending: numbers?.pendingTasks,
        inprogress: numbers?.inProgressTasks,
      }


    //   const data = isAdmin
    // ? {
    //     all: numbers?.totalTasks,
    //     completed: numbers?.completedTasks,
    //     pending: numbers?.pendingTasks,
    //     inprogress: numbers?.inProgressTasks,
    //   }
    // : numbers;

  // console.log(data);

  return (
    <>
      <div className="task-count-grid">
        <div className="count-card">
          <div className="sys-tasks-icon box-icon">
            <FontAwesomeIcon icon={faLayerGroup} />
          </div>
          <div className="count-body">
            <p>ALL TASKS</p>
            <h3>{data?.all ? data.all : "0"}</h3>
          </div>
        </div>

        <div className="count-card">
          <div className="pending-icon box-icon">
            <FontAwesomeIcon icon={faCircle} />
          </div>
          <div className="count-body">
            <p>PENDING</p>
            <h3>{data?.pending ? data.pending : "0"}</h3>
          </div>
        </div>

        <div className="count-card">
          <div className="in-progress-icon box-icon">
            <FontAwesomeIcon icon={faSpinner} />
          </div>
          <div className="count-body">
            <p>IN PROGRESS</p>
            <h3>{data?.inprogress ? data.inprogress : "0"}</h3>
          </div>
        </div>

        <div className="count-card">
          <div className="completed-icon box-icon">
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <div className="count-body">
            <p>COMPLETED</p>
            <h3>{data?.completed ? data.completed : "0"}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskCountCards;
