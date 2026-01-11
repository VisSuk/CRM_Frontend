import React from "react"
import "./logs.css"

function Logs({ logs }) {
  return (
    <div className="logs-table-wrapper">
      <table className="logs-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Task</th>
            <th>Task ID</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {logs?.length > 0 ? (
            logs.map((log, index) => (
              <tr key={index}>
                <td>{log.username}</td>
                <td>{log.action}</td>
                <td>{log.taskTitle}</td>
                <td>{log.taskId || "N/A"}</td>
                <td>{log.createdAt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No logs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Logs
