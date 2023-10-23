import React from "react";
import { DeleteUser } from "../../service/UserService";
import { toast } from 'react-toastify';

const ModalDelete  = (props) => {
    const {showModalDelete , handleShowModalDelete, dataDelete,TableWhenDelete} = props
    const ConfirmDelete = async () => {
        let res = await DeleteUser (dataDelete.id)
        if(res){
            toast.success("Xóa thành công!")
            handleShowModalDelete(true)
            TableWhenDelete(dataDelete)
        }
    }
    return (
        <>
        {
            showModalDelete === false &&
            <div className="modal-delete">
                <div className="delete-form">
                    <h3>Xóa học sinh</h3>
                    <p>Bạn chắc muốn xóa thông tin của học sinh có </p>
                    <p>Họ và Tên là "<b>{dataDelete.lastName}</b> <b>{dataDelete.firstName}</b> " này không !</p>
                    <br/>
                    

                    <div>
                        <button onClick={() => ConfirmDelete()}>Xóa</button>
                        <button onClick={() => handleShowModalDelete(true)}>Thoát</button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default ModalDelete