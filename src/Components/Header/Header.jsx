import React from "react"

import logo from "../../img/Logo.png"

function Header() {
    const obj = JSON.parse(localStorage.getItem("account"))
    console.log(obj);
    return (
        <>
        <div className="header">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="header-wrap">
                <div className="label">
                    Hệ thống quản lý học sinh Trường THPT Nguyễn Thị Minh Khai - Hà Nội 
                </div>
            {
                obj &&
                <div className="user-wrap">
                    <div className="user">
                        Xin chào  
                    &nbsp;<b>{obj.email}</b>
                    </div>
                </div>
            } 
            </div>
        </div>
        </>
    )
}

export default Header