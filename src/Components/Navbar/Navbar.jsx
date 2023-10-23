import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';


const NavBar = (props) => {
    const {showNav,handleShowNav} = props
    const [weightText, setWeightText] = useState(null)
    const navigate = useNavigate()
    const handleItemClick = (item) => {
        setWeightText(item)
    }
    const handleLogOut = () => {
        localStorage.removeItem("account")
        // navigate("/MyProject")
        toast.success("Đăng xuất thành công!")
    }
    return (
        <>
        { showNav === true &&
            <div className="navbar">
                <ul className="listitem" >
                    <li className="item">
                        <NavLink to="/manage" className={weightText === 2 ? "highlight" : ""} onClick={() => handleItemClick(2)} >Quản lý</NavLink>
                    </li>
                    <li className="item">
                        <NavLink to="/infor" className={weightText === 3 ? "highlight" : ""} onClick={() => handleItemClick(3)}>Thông tin</NavLink>
                    </li>
                    <li className="item">
                        <NavLink to="/" className={weightText === 4 ? "highlight" : ""} 
                            onClick={() => { 
                                handleItemClick(4); 
                                handleLogOut();
                                handleItemClick(0);
                                handleShowNav(false)
                                }
                            }
                                >Thoát
                        </NavLink>
                    </li>
                </ul>
            </div>
        }
        </>
    )
}

export default NavBar