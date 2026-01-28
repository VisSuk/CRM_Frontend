import React, { useEffect, useState } from "react";
import "../../css/usermodal.css";
import "../../css/commonStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { createUserApi, editUserApi } from "../../services/allApi";
import { toast, ToastContainer } from "react-toastify";


function UserModal({
  setOpenModal,
  editingUser,
  clearEditingUser,
  setRefreshUsers,
}) {
  const [token, setToken] = useState("");
  // console.log(token);
  const [newUserDetails, setNewUserDetails] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    status: "",
  });
  // console.log(newUserDetails);

  const handleFormReset = () => {
    setNewUserDetails({
    id: "",
    username: "",
    email: "",
    password: "",
    status: "",      
    })
  }

  const handleCreateUser = async () => {
    const { username, email, password } = newUserDetails;
    // console.log(username, email, password)
    if (!username || !email || !password) {
      toast.warning("Please fill all fields!")
      return
    }
    const reqHeader = { Authorization: `Bearer ${token}` };
    const reqBody = {
      username,
      email,
      password,
    };
    const result = await createUserApi(reqBody, reqHeader);
    if (result.status === 200) {
      handleFormReset()
      toast.success("User added successfully")
      setTimeout(() => {
        setRefreshUsers((prev) => !prev);
        setOpenModal(false);
      }, 2500)
    } else if (result.status === 400) {
      handleFormReset()
      toast.error("User Already Exists!")
    } else if (result.status === 403) {
      handleFormReset()
      toast.error("Access Denied")
    } else {
      toast.warning("Server Error")
    }

  }
  const handleEditUser = async () => {
    const { id, username, email, password, status } = newUserDetails;
    // if (!password) {
    //   toast.warning("Please enter the password!")
    //   return
    // }
    const reqHeader = { Authorization: `Bearer ${token}` };
    // console.log(reqHeader);
    const reqBody = {
      username,
      email,
      password,
      status,
    };
    const result = await editUserApi(id, reqBody, reqHeader);
    // console.log(result.data);
    if (result.status === 200) {
      handleFormReset()
      toast.success("User details updated")
      setTimeout(() => {
        setRefreshUsers((prev) => !prev);
        clearEditingUser();
        setOpenModal(false);
      }, 2500)
    } else if (result.status === 403) {
      toast.error('Access Denied')
    } else if (result.status === 404) {
      toast.error("User not found")
    } else {
      toast.warning("Server Error")
    }
  };

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (editingUser) {
      setNewUserDetails({
        id: editingUser._id,
        username: editingUser.username,
        email: editingUser.email,
        password: "",
        status: editingUser.status,
      });
    }
  }, [editingUser]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <div>
              <h2>{editingUser ? "Edit User" : "Create User"}</h2>
            </div>
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <FontAwesomeIcon icon={faX} size="xs" />
            </button>
          </div>
          <div className="form-body">
            <h5>FULL NAME</h5>
            <input
              type="text"
              className="input-box"
              value={newUserDetails.username}
              onChange={(e) => {
                setNewUserDetails({
                  ...newUserDetails,
                  username: e.target.value,
                });
              }}
            />
            <h5>EMAIL</h5>
            <input
              type="text"
              className="input-box"
              value={newUserDetails.email}
              onChange={(e) => {
                setNewUserDetails({ ...newUserDetails, email: e.target.value });
              }}
            />
            <h5>PASSWORD <small style={{color:"var(--text-muted)"}} >(keep blank or type new)</small> </h5>
            <input
              type="text"
              className="input-box"
              value={newUserDetails.password}
              onChange={(e) => {
                setNewUserDetails({
                  ...newUserDetails,
                  password: e.target.value,
                });
              }}
            />
            {editingUser && (
              <>
                <h5>STATUS</h5>
                <select
                  value={newUserDetails?.status}
                  onChange={(e) => {
                    setNewUserDetails({
                      ...newUserDetails,
                      status: e.target.value,
                    });
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </>
            )}
          </div>
          <div className="footer">
            <button
              className="button-secondary"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancel
            </button>
            {editingUser ? (
              <button className="button-primary edit" onClick={handleEditUser}>
                Edit
              </button>
            ) : (
              <button className="button-primary create" onClick={handleCreateUser}>
                Create
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </>
  );
}

export default UserModal;
