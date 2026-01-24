import React, { useEffect, useState } from "react";
import "../../css/commonStyles.css";
import "../../css/Logs.css";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getLogsApi } from "../../services/allApi";

function AdminLogs() {

  const [token, setToken] = useState("")
  const [logs, setLogs] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const getIcon = (action) => {
    if (action == 'CREATED') return faPlus
    if (action == 'UPDATED') return faPen
    if (action == 'DELETED') return faTrash
  }

  const getLogs = async() => {
    setIsLoading(true)
    const reqHeader = { "Authorization": `Bearer ${token}` }
    const result = await getLogsApi(reqHeader)
    // console.log(result.data)
    setLogs(result.data)
    setIsLoading(false)
  }

  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
  }, [])

  useEffect(()=>{
    if(token){
      getLogs()
    }
  },[token])

  return (
    <>
      <div className="logs-container main-layout">
        <div className="sidebar">
          <AdminSidebar />
        </div>
        <div className="logs-main">
          <div className="logs-header-top">
            <Header />
          </div>
          <div className="logs-contents content-layout">
            <div className="left-spacer-grid"></div>
            <div className="middle-content-grid">
              <div className="logs content-container">
                <div className="logs-header content-header">
                  <div className="logs-left-text">
                    <h3>Audit Trail</h3>
                  </div>
                  <div className="logs-right-text">
                    <small>Historical Record of Task Logs</small>
                  </div>
                </div>
                <hr />
                <div className="logs-tab-container">
                  { isLoading ? 
                  <div>
                    <h3>Fetching Logs...</h3>
                  </div>
                  :
                  logs?.length > 0 ?
                  logs.map((log) => (
                  <div key={log?._id} className="log-tab">
                    <div className="left-side">
                      <div className={`log-icon box-icon ${log?.action} `}><FontAwesomeIcon  icon={getIcon(log?.action)} size="sm"/> </div>
                      <div className="log-message">
                        <h4>{log?.message}</h4>
                      </div>
                    </div>
                    <div className="right-side"><small>{new Date(log?.createdAt).toLocaleString("en-GB")}</small></div>
                  </div>))  
                  :
                  <div>
                    <h3>No Logs recorded yet</h3>
                  </div>
                }
                </div>
              </div>
            </div>
            <div className="right-spacer-grid"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogs;
