import React, { useState } from "react";
import Header from "./Components/Header/Header";
import NavBar from "./Components/Navbar/Navbar";
import Login from "./Components/LoginPage/Login";
import InforStu from "./Components/InforPage/Infor";
import Manage from "./Components/ManagePage/Manage";
import Home from "./Components/HomePage/Home";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Components/Header/Header.scss";
import "./Components/Navbar/Navbar.scss";
import "./Components/LoginPage/Login.scss";
import "./Components/InforPage/Infor.scss";
import "./Components/ManagePage/Manage.scss";
import 'react-toastify/dist/ReactToastify.css';
import "./Components/ModalUpdate/ModalUpdate.scss"
import "./Components/ModalDelete/ModalDelete.scss"
import "./Components/HomePage/Home.scss"

import { Route, Routes } from "react-router-dom";

function App () {
    const [showNav, setShowNav] = useState(false)
    return (
        <>
            <div className="container-block">
                <Header />
                <NavBar showNav= {showNav} handleShowNav = {setShowNav}/>

                <Routes>
                    <Route 
                        path="/home" element={<Home />}/>
                    <Route 
                        path="/" element={<Login showNav= {showNav} handleShowNav = {setShowNav}/>}/>
                    <Route 
                        path="/manage" element={<Manage />}/>
                    <Route 
                        path="/infor" element={<InforStu />}/>
                </Routes>
            </div>
        </>
    )
}

export default App