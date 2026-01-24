import React, { useEffect, useState } from "react";
import "../../css/dashboard.css";
import "../../css/commonStyles.css";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../../components/Header";
import TaskCountCards from "../../components/TaskCountCards";
import WorkloadPerformance from "../../components/WorkloadPerformance";
import { getAdminStatsApi } from "../../services/allApi";

function AdminDashboard() {
  const [token, setToken] = useState("");
  const [taskCounts, setTaskCounts] = useState({})

  const getTaskStats = async() => {
    const reqHeader = { "Authorization": `Bearer ${token}` }
    const result = await getAdminStatsApi(reqHeader)
    // console.log(result.data)
    setTaskCounts(result.data)
  }


  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token) {
      getTaskStats()
    }
  }, [token]);

  return (
    <>
      <div className="dash-container main-layout">
        <div className="sidebar">
          <AdminSidebar />
        </div>
        <div className="dash-main">
          <div className="dash-header">
            <Header />
          </div>
          <div className="dash-contents content-layout">
            <div className="left-spacer-grid"></div>
            <div className="middle-content-grid">
              <TaskCountCards numbers = {taskCounts} isAdmin/>
              <WorkloadPerformance data = {taskCounts} />
            </div>
            <div className="right-spacer-grid"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
