import React, { useEffect, useState } from "react";
import "../../css/commonStyles.css";
import "../../css/users.css";
import "../../css/table.css";
import "../../css/navbar.css"
import AdminSidebar from "../components/AdminSidebar";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import UserModal from "../components/UserModal";
import ViewUserModal from "../components/ViewUserModal";
import { getAllUsersApi } from "../../services/allApi";
import AdminNavbar from "../components/AdminNavbar";

function AdminUsers() {
  const [token, setToken] = useState("");

  const [isLoading, setIsLoading] = useState(false)
  const [allUsers, setAllUsers] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null)
  const [refreshUsers, setRefreshUsers] = useState(false)
  // console.log(viewUser);

  const getAllUsers = async () => {
    setIsLoading(true)
    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await getAllUsersApi(reqHeader);
    // console.log(result.data);
    setAllUsers(result.data);
    setIsLoading(false)
  };

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token) {
      getAllUsers();
    }
  }, [token, refreshUsers]);

  return (
    <>
      <div className="users-container main-layout">
        <div className="sidebar">
          <AdminSidebar />
        </div>
        <div className="users-main">
          <div className="users-header-section">
            <Header />
          </div>
          <div className="users-contents content-layout">
            <div className="left-spacer-grid"></div>
            <div className="middle-content-grid">
              <div className="users content-container">
                <div className="users-header content-header">
                  <div className="users-text header-text">
                    <h3>Stakeholders</h3>
                    <small>Authorized system participants and heirarchy</small>
                  </div>
                  <div className="add-user">
                    <button
                      className="button-primary"
                      onClick={() => {
                        setModalOpen(true);
                        setEditingUser(null)
                      }}
                    >
                      <FontAwesomeIcon
                        className="button-icon"
                        icon={faUserPlus}
                      />{" "}
                      NEW ENTRY
                    </button>
                  </div>
                </div>

                <div className="table-container">
                  <div className="table-wrapper">
                    <table className="shared-table">
                      <thead>
                        <tr>
                          <th>USERNAME</th>
                          <th>EMAIL</th>
                          <th>ROLE</th>
                          <th>OPTIONS</th>
                        </tr>
                      </thead>

                      <tbody>
                        {isLoading ?
                          <tr>
                            <td colSpan="4" className="fetch-state">
                              <h3>Fetching Users...</h3>
                            </td>
                          </tr>
                          :
                          allUsers?.length > 0
                            ? allUsers.map((user) => (
                              <tr key={user?._id}>
                                <td className="identity" data-cell="username">
                                  <div className="avatar">{user?.username[0]}</div>
                                  <span className="username">{user?.username}</span>
                                </td>
                                <td className="email" data-cell="email">{user?.email}</td>
                                <td data-cell="role">
                                  <span className="badge user">{user?.isAdmin ? "ADMIN" : "USER"}</span>
                                </td>
                                <td className="actions" data-cell="actions">
                                  <button
                                    className="icon-btn"
                                    onClick={() => {
                                      setViewUser(user);
                                    }}
                                  >
                                    👤
                                  </button>
                                  <button className="icon-btn"
                                    onClick={() => { setEditingUser(user); setModalOpen(true) }}
                                  >✏️</button>
                                </td>
                              </tr>
                            ))
                            :
                            <tr>
                              <td colSpan="4" className="empty-state">
                                <h3>No Users Added</h3>
                              </td>
                            </tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-spacer-grid"></div>
          </div>
        </div>
      </div>

      <div className="mobile-nav">
        <AdminNavbar />
      </div>

      {modalOpen && <UserModal setOpenModal={setModalOpen} editingUser={editingUser}
        clearEditingUser={() => setEditingUser(null)} setRefreshUsers={setRefreshUsers} />}
      {viewUser && <ViewUserModal setUserView={setViewUser} userDetails={viewUser} />}
    </>
  );
}

export default AdminUsers;
