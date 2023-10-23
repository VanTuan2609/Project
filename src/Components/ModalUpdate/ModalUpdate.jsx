import React, { useEffect, useState } from "react";
import {  toast } from 'react-toastify';
import { UpdateUser } from "../../service/UserService";

const ModalUpdate  = (props) => {
    const {showModalUpdate, handleShowModalUpdate, dataUpdate, TableWhenUpdate} = props
    const [uid,setUid] = useState ("")
    const [firstName,setFirstName] = useState ("")
    const [lastName,setLastName] = useState ("")

    const [gender,setGender] = useState ("")
    const [phone,setPhone] = useState ("")


    const handleUpdate = async () => {
        let res = await UpdateUser(dataUpdate?.id,uid,lastName, firstName, gender, phone)

        if(res){
            handleShowModalUpdate(true)
            toast.success("Sửa thông tin thành công!")
            TableWhenUpdate({
                id:dataUpdate.id,
                uid:dataUpdate.uid,
                lastName: lastName,
                firstName:firstName,
                gender:gender,
                phone:phone
            })
        }
    }   

    useEffect(() => {
        if(showModalUpdate === false){
            setUid(dataUpdate.uid)
            setLastName(dataUpdate.lastName)
            setFirstName(dataUpdate.firstName)
            setGender(dataUpdate.gender)
            setPhone(dataUpdate.phone)
        }
    },[dataUpdate])
    
    return (
        <>
        {   
            showModalUpdate === false &&

            <div className="modal-update">
                <div className="update-form">
                    <h3>Sửa thông tin</h3>
                    <label>Uid</label>
                    <input 
                    type="text" 
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    disabled
                    />
                    <label>Họ và Tên đệm</label>
                    <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                    <label>Tên</label>
                    <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label >Giới Tính</label>
                    <input 
                    type="text" 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    />
                    <label>Số điện thoại</label>
                    <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                    <div>
                        <button 
                        onClick={() => handleUpdate()}
                        >Sửa
                        </button>
                        <button 
                        onClick={() => handleShowModalUpdate(true)}
                        >Thoát
                        </button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default ModalUpdate