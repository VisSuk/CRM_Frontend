import React, { useState } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { handleLoginApi, handleRegisterApi } from '../services/allApi'
import { toast, ToastContainer } from 'react-toastify'

function Auth({ register }) {

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleFormReset = () => {
        setUserDetails({
            username: "",
            email: "",
            password: ""
        })
    }
    const handleRegister = async () => {
        const { username, email, password } = userDetails

        if (!username || !email || !password) {
            toast.warning("Fill all fields!")
            handleFormReset()

        } else {
            const reqBody = {
                username,
                email,
                password
            }
            const result = await handleRegisterApi(reqBody)
            if (result.status == 200) {
                toast.success("User registered successfully")
                handleFormReset()
                navigate('/')
            } else if (result.status == 400) {
                toast.warning("User already exists")
                handleFormReset()
            } else {
                toast.error("Something went wrong")
                handleFormReset()
            }
        }


    }

    const handleLogin = async () => {
        const { email, password } = userDetails
        if (!email || !password) {
            toast.warning("Fill all fields!")
            handleFormReset()
        } else {
            const reqBody = {
                email,
                password
            }
            const result = await handleLoginApi(reqBody)
            console.log(result.data)
            if (result.status == 200) {
                toast.success("Login Successfull")
                handleFormReset()
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token", result.data.token)
                setTimeout(()=>{
                    if(result.data.existingUser.role == 'admin'){
                        navigate('/admin-dash')
                    } else {
                        navigate('/dashboard')
                    }
                }, 2500)
            } else if (result.status == 400) {
                toast.warning("Invalid Credentials")
                handleFormReset()
            } else {
                toast.error("Something went wrong")
                handleFormReset()
            }
        }
    }

    console.log(userDetails)


    return (
        <>

            <div className="auth-container">

                <div className="auth-left">
                    <h1>Task Manager</h1>
                </div>

                <div className="auth-right">
                    <div className="auth-form">

                        <h2>{register ? "Create Account" : "Login"}</h2>

                        {register && (
                            <input type="text" placeholder="Full Name"
                                onChange={(e) => { setUserDetails({ ...userDetails, username: e.target.value }) }}
                                value={userDetails.username} />
                        )}

                        <input type="email" placeholder="Email"
                            onChange={(e) => { setUserDetails({ ...userDetails, email: e.target.value }) }} value={userDetails.email} />

                        <input type="password" placeholder="Password"
                            onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }} value={userDetails.password} />

                        {register ?
                            <button onClick={handleRegister}>Register</button>
                            :
                            <button onClick={handleLogin}>Login</button>
                        }

                        {register ?
                            <p className='switch-text'>Already have an account? <Link to={'/'}>Login</Link> </p>
                            :
                            <p className='switch-text'>Already have an account? <Link to={'/register'}>Register</Link></p>}

                    </div>
                </div>
            </div>

            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default Auth