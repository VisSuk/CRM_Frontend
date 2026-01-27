import React, { useState } from "react";
import "../css/commonStyles.css";
import "../css/Auth.css";

import { Link, useNavigate } from "react-router-dom";
import { handleLoginApi, handleRegisterApi } from "../services/allApi";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faLock,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";

function Auth({ register }) {
  const navigate = useNavigate();

  const [toggleView, setToggleView] = useState(false)
  console.log(toggleView)
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const passwordToggle = () => {
    setToggleView(prev => !prev)
  }

  const handleFormReset = () => {
    setUserDetails({
      username: "",
      email: "",
      password: "",
    });
  };
  // const handleRegister = async () => {
  //   const { username, email, password } = userDetails;

  //   if (!username || !email || !password) {
  //     toast.warning("Fill all fields!");
  //     handleFormReset();
  //   } else {
  //     const reqBody = {
  //       username,
  //       email,
  //       password,
  //     };
  //     const result = await handleRegisterApi(reqBody);
  //     if (result.status == 200) {
  //       toast.success("User registered successfully");
  //       handleFormReset();
  //       navigate("/");
  //     } else if (result.status == 400) {
  //       toast.warning("User already exists");
  //       handleFormReset();
  //     } else {
  //       toast.error("Something went wrong");
  //       handleFormReset();
  //     }
  //   }
  // };

  const handleLogin = async () => {
    const { email, password } = userDetails;
    if (!email || !password) {
      toast.warning("Fill all fields!");
      handleFormReset();
    } else {
      const reqBody = {
        email,
        password,
      };
      const result = await handleLoginApi(reqBody);
      // console.log(result.data);
      if (result.status == 200) {
        toast.success("Login Successfull");
        handleFormReset();
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser),
        );
        sessionStorage.setItem("token", result.data.token);
        setTimeout(() => {
          if (result.data.existingUser.isAdmin == true) {
            navigate("/admin-dash");
          } else {
            navigate("/dashboard");
          }
        }, 2500);
      } else if (result.status == 401) {
        toast.warning("Invalid Credentials");
        handleFormReset();
      } else if (result.status == 403) {
        toast.warning("Inactive Account, contact Admin");
        handleFormReset();
      }
      else {
        toast.error("Something went wrong");
        handleFormReset();
      }
    }
  };

  // console.log(userDetails);

  return (
    <>
      <div className="auth-container">
        <div></div>
        <div className="auth-grid">
          <div className="auth-div">
            <div className="icon-part">
              <FontAwesomeIcon className="box-icon" icon={faSuitcase} />
              <h2>Mini CRM Pro</h2>
              <p>Secure Authentication</p>
            </div>
            <div className="form-part">
              <h5>EMAIL</h5>
              <div className="icon-input">
                <FontAwesomeIcon icon={faEnvelope} />
                <input type="text" placeholder="ex: peter@example.com" value={userDetails.email} onChange={(e) => { setUserDetails({ ...userDetails, email: e.target.value }) }} />
              </div>
              <h5>PASSWORD</h5>
              <div className="icon-input">
                <FontAwesomeIcon icon={faLock} />
                <input type={ toggleView? "text":"password"} placeholder="•••••••" value={userDetails.password} onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }} />
                <FontAwesomeIcon icon={faEye} onClick={passwordToggle}/>
              </div>
              <button className="button-primary" onClick={handleLogin} >VERIFY IDENTITY</button>
            </div>
          </div>
        </div>
        <div></div>
      </div>

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </>
  );
}

export default Auth;
