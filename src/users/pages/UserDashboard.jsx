import React, { useEffect, useState } from "react";
import UserSidebar from "../components/UserSidebar";
import Header from "../../components/Header";
import TaskCountCards from "../../components/TaskCountCards";
import WorkloadPerformance from "../../components/WorkloadPerformance";

import "../../css/dashboard.css";
import "../../css/commonStyles.css";
import { getUserStatsApi } from "../../services/allApi";
import UserNavbar from "../components/UserNavbar";

function UserDashboard() {

  const [token, setToken] = useState()
  const [id, setId] = useState("")

  const [taskCounts, setTaskCounts] = useState({})


  const getUserStats = async () => {
    const reqHeader = { "Authorization": `Bearer ${token}` }
    const result = await getUserStatsApi(id, reqHeader)
    // console.log(result.data)
    setTaskCounts(result.data)
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    const user = JSON.parse(sessionStorage.getItem("existingUser"))
    setId(user.id)
  }, []);

  useEffect(() => {
    if (token) {
      getUserStats()
    }
  }, [token]);

  return (
    <>
      <div className="dash-container main-layout">
        <div className="sidebar">
          <UserSidebar />
        </div>
        <div className="dash-main">
          <div className="dash-header">
            <Header />
          </div>
          <div className="dash-contents content-layout">
            <div className="left-spacer-grid"></div>
            <div className="middle-content-grid">
              <TaskCountCards numbers={taskCounts} />
              <WorkloadPerformance data={taskCounts} />
            </div>
            <div className="right-spacer-grid"></div>
          </div>
        </div>
      </div>

      <div className="mobile-nav">
        <UserNavbar />
      </div>
    </>
  );
}

export default UserDashboard;
