import React, { useState } from "react";
import bg from "../../img/background.png"
import { LoginAcount } from "../../service/UserService";
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const {handleShowNav} = props
    const [email, setEmail] =useState("")
    const [password, setPassword] =useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showEye, setShowEye] = useState(false)
    const [loadingSV, setLoadingSV] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async () => {
        setLoadingSV(true)
        let res = await LoginAcount(email,password)
        res.forEach((item,index) => {
            if(item.email === email && item.password === password){
                localStorage.setItem("account", JSON.stringify(item))
                navigate("/home")
                handleShowNav(true)
                alert("Đăng nhập thành công!")
                // toast.success("Đăng nhập thành công!")
            }
            else {
                toast.error("Sai tên đăng nhập hoặc mật khẩu!")
            }
        })
        setLoadingSV(false)
    }
    return (
        <>
            <div className="container-login">
                <div className="background">
                    <img src={bg} alt="" />
                </div>
                <div className="Login-form">
                    <div className="header-form">
                        <h1>Login</h1>
                    </div>
                    <form>
                        <div className="input-wrap">
                            <label htmlFor="email" className="form-label">
                                Email & Password
                            </label>
                            <input 
                                type="text" 
                                id="email" 
                                className="form-control"
                                name="email"
                                placeholder="Email ...."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            
                        </div>
                        <div className="input-wrap">
                            <input 
                                type={showPassword === true ? "text" : "password"} 
                                id="password" 
                                className="form-control"
                                name="password"
                                placeholder="Password ...."
                                value={password}
                                onChange={(e) => {setPassword(e.target.value);setShowEye(true)}}
                            />
                            {
                            showEye === true &&
                            <i 
                            className={showPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                            onClick={() => setShowPassword( !showPassword)}
                            ></i>}
                        </div>   
                        <div className="btn-wrap">
                            <button 
                                type="submit" 
                                className={email && password ? "active" : "submit-btn"} 
                                disabled = {email && password ? false : true}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleLogin()
                                    }
                                }
                            >
                                {loadingSV && <i className="fas fa-spinner fa-spin"></i>}
                                &nbsp;&nbsp;Login
                            </button>
                        </div>           
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Login