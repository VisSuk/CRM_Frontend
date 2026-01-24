import React, { useEffect, useState } from "react";
import "../../css/commonStyles.css";
import "../../css/viewUserModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { getUserStatsApi } from "../../services/allApi";

function ViewUserModal({ setUserView, userDetails }) {
  // console.log(userDetails);
  const id = userDetails._id
  const [token, setToken] = useState("");
  const [userStats, setUserStats] = useState({})

  const getUserStats = async() => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    // console.log(reqHeader)
    const result = await getUserStatsApi(id, reqHeader)
    // console.log(result.data)
    setUserStats(result.data)
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  useEffect(()=>{
    if (token) {
    getUserStats()
    }
  }, [token])

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <div className="picture-details">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F06%2F13%2F12%2F53%2Fprofile-2398782_960_720.png&f=1&nofb=1&ipt=3cc863969707805a51958e60119caddc4ebc57de0a188ab8c2891151a57acaba"
                alt="Profile Picture"
              />
              <div className="user-text">
                <h3>{userDetails?.username}</h3>
                <small>{userDetails?.email}</small>
              </div>
            </div>
            <button
              onClick={() => {
                setUserView(null);
              }}
            >
              <FontAwesomeIcon icon={faX} size="xs" />
            </button>
          </div>
          <div className="details-grid">
            <div className="insights box">
              <h5>PROFILE INSIGHTS</h5>
              <div className="onboard-date">
                <h5>Onboarding</h5>
                <h6>
                  {userDetails?.createdAt
                    ? new Date(userDetails.createdAt).toLocaleDateString(
                        "en-GB",
                      )
                    : "—"}
                </h6>
              </div>
            </div>
            <div className="operations box">
              <h5>OPERATIONS VELOCITY</h5>
              <div className="tasks-stats">
                <div className="assigned-tasks user-task-counts">
                  <h2>{userStats.totalTasks ?? "-"}</h2>
                  <h5>Assigned Tasks</h5>
                </div>
                <div className="completed-tasks user-task-counts">
                  <h2>{userStats.completedTasks ?? "-"}</h2>
                  <h5>Completed Tasks</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="user-footer">
            <button
              onClick={() => {
                setUserView(null);
              }}
              className="button-secondary"
            >
              Close View
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewUserModal;
