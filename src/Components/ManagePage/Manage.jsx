import { FetchAllUser, AddNew} from "../../service/UserService";
import React, { useState , useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import ModalUpdate from "../ModalUpdate/ModalUpdate";
import ModalDelete from "../ModalDelete/ModalDelete";
import _, { debounce } from "lodash"
import { CSVLink} from "react-csv";
import Papa from "papaparse";


const Manage = () => { 
    const [showModal, setShowModal] = useState (true)

    const [showModalUpdate, setShowModalUpdate] = useState(true)
    const [dataUpdate, setDataUpdate] = useState({})

    const [showModalDelete, setShowModalDelete] = useState(true)
    const [dataDelete, setDataDelete] = useState({})

    const [list,setList] = useState([])
    const [uid,setUid] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")

    const [gender,setGender] = useState("")
    const [phone,setPhone] = useState("")

    const [sortBy, setSortBy] = useState("")
    const [sortField, setSortFeild] = useState("asc")

    const [dataExport, setDataExport] = useState([])

    const handleClose = () => {
        setShowModal(true)
    }

    const deleteInput = () => {
        setUid("")
        setFirstName("")
        setLastName("")
        setGender("")
        setPhone("")
    }
    
    const handleX = () => {
        if(uid != "" && firstName != "" && gender != "" && phone != ""){
            handleAdd()
        }
        if(firstName === "") {
            toast.error("Hãy nhập tên của học sinh!")
            deleteInput()
        }
        if(gender === "") {
            toast.error("Hãy nhập giới tính của học sinh!")
            deleteInput()
        }
        if(phone === ""){
            toast.error("Hãy nhập số điện thoại!")
            deleteInput()
        }
    }
    
    const handleAdd = async () => {
        let res = await AddNew(uid,firstName ,lastName,gender,phone)
        if(res && res.id){
            handleClose()
            deleteInput()
            toast.success("Thêm mới thành công!")
            setList([...list,res])
        }
    }

    const TableWhenUpdate = (user) => {
        let cloneList = list
        let index = list.findIndex(item => item.id === user.id)
        cloneList[index].firstName = user.firstName
        cloneList[index].lastName = user.lastName
        cloneList[index].gender = user.gender
        cloneList[index].phone = user.phone
        setList(cloneList)
    }

    const TableWhenDelete = (user) => {
        let cloneList = list
        cloneList = cloneList.filter(item => item.id != user.id)
        setList(cloneList)
    }

    const getDataUser = (user) => {
        setShowModalUpdate(false)
        setDataUpdate(user)
    }

    const handleDelete = (user) => {
        setShowModalDelete(false)
        setDataDelete(user)
    }

    useEffect(() => {
        getInfor()
    },[])

    const getInfor = async () => {
        let res = await FetchAllUser()
        if(res){
            setList(res)
        }
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy)
        setSortFeild(sortField)

        let cloneList = _.cloneDeep(list)
        cloneList = _.orderBy(cloneList,[sortField],[sortBy])
        setList(cloneList)
    }

    const handleSearch = debounce((e) => {
        let value = e.target.value
        if(value) {
            let cloneList = _.cloneDeep(list)
            cloneList = cloneList.filter(item => item.firstName.toUpperCase().includes(value.toUpperCase()))
            setList(cloneList)
        }else{
            getInfor()
        }
    },500)

    const getUsersExport = (e,done) => {
        let result = []
        if (list && list.length>0) {
            result.push(["ID","UID","Họ và tên đệm","Tên","Giới tính","Số điện thoại"])
            list.map((item,index)=>{
                let arr = []
                arr[0] = item.id
                arr[1] = item.uid
                arr[2] = item.lastName
                arr[3] = item.firstName
                arr[4] = item.gender
                arr[5] = item.phone
                result.push(arr)
            })
            setDataExport(result)
            done()
        }
    }

    const handleImportCSV = (e) => {
        if ( e.target && e.target.files && e.target.files[0]) {
            let file = e.target.files[0]
            if (file.type !== "text/csv") {
                toast.error("File không đúng định dạng, hãy import file.csv!")
                return
            }
            Papa.parse(file, {
                complete: function (result) {
                    let valueCSV = result.data;
                    if ( valueCSV .length >0) {
                        if(valueCSV[0] && valueCSV[0].length === 6) {
                            if(valueCSV[0][0] !== "ID" 
                            || valueCSV[0][1] !== "UID"
                            || valueCSV[0][2] !== "Họ và tên đệm"
                            || valueCSV[0][3] !== "Tên"
                            || valueCSV[0][4] !== "Giới tính"
                            || valueCSV[0][5] !== "Số điện thoại"){
                                toast.error("Các cột dữ liệu trong file bị sai!")
                            } 
                            else {
                                let dataImport = []
                                valueCSV.map((item,index) => {
                                    if (index > 0 && item.length === 6) {
                                        let obj = {}
                                        obj.id = item[0]
                                        obj.uid = item[1]
                                        obj.lastName = item[2]
                                        obj.firstName = item[3]
                                        obj.gender = item[4]
                                        obj.phone = item[5]
                                        dataImport.push(obj)
                                    }
                                })

                                dataImport.forEach((item,index) => {
                                    setList(dataImport)
                                    const user = {
                                        id : item.id,
                                        uid : item.uid,
                                        lastName : item.lastName,
                                        firstName : item.firstName,
                                        gender : item.gender,
                                        phone : item.phone
                                    };
                                    fetch("http://localhost:3000/posts", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(user),
                                    });
                                })
                                toast.success("Import thành công!")
                            }

                        }
                    }
                }
            })
        }
    }

    return (
        <>
            <div className="div">
                <div className="container-manage">
                    <div className="manage-wrap">
                        <div className="heading">
                            <h3>Danh sách học sinh</h3>
                            <div>
                                <label 
                                htmlFor="click" 
                                className="import">
                                    <i class="fa-solid fa-file-import"></i>
                                    Import
                                </label>
                                <input 
                                type="file" 
                                id="click"  
                                hidden 
                                onChange={(e) => handleImportCSV(e)}
                                />

                                <CSVLink 
                                data={dataExport}
                                filename={"user.csv"}
                                asyncOnClick={true}
                                onClick={getUsersExport}
                                className="export"
                                >
                                    <i class="fa-solid fa-cloud-arrow-down"></i>
                                    Export
                                </CSVLink>

                                <button className="btn-add" onClick={() => setShowModal(false)}>
                                    <i class="fa-solid fa-plus"></i>
                                    Thêm học sinh
                                </button>
                            </div>
                        </div>
                        <div className="list">
                            <table>
                                <thead>
                                    <tr className="head-table">
                                        <th className="table-col">STT</th>
                                        <th className="table-col">ID Card</th>
                                        <th className="table-col">Họ và Tên đệm</th>
                                        <th className="table-col">Tên</th>
                                        <th className="table-col">Giới tính</th>
                                        <th className="table-col">Số điện thoại</th>
                                        <th className="table-col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list && list.length > 0 &&
                                        list.map((item,index) => {
                                                return (
                                                    <tr key={`user-${index}`}>
                                                        <td>{item.id}</td>
                                                        <td>{item.uid}</td>
                                                        <td>{item.lastName}</td>
                                                        <td>{item.firstName}</td>
                                                        <td>{item.gender}</td>
                                                        <td>{item.phone}</td>
                                                        <td className="operation">
                                                            <div>
                                                                <button className="update-btn" onClick={() => getDataUser(item)}>
                                                                    <i class="fa-solid fa-pen-nib"></i>
                                                                    Sửa
                                                                </button>
                                                                
                                                            </div>
                                                            <div>
                                                                <button className="delete-btn" onClick={() => handleDelete(item)}>
                                                                    <i class="fa-solid fa-trash"></i>
                                                                    Xóa
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="manage-option">
                        <div className="search-wrap">
                            <h3>Search</h3>
                            <div className="search">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input 
                                type="text"
                                onChange={(e) => handleSearch(e)} 
                                />
                            </div>
                        </div>
                        <div className="sort-wrap">
                            <h3>Sort Infor</h3>
                            <div className="list-wrap">
                                <div className="sort-id">
                                    <fieldset>
                                        <legend>ID</legend>
                                        <div className="sort-id-icon">
                                            <input 
                                            name="check"
                                            type="radio" 
                                            onClick={() => handleSort("asc","id")}
                                            />
                                            <i class="fa-solid fa-arrow-down-1-9"></i>

                                            <input 
                                            name="check"
                                            type="radio" 
                                            onClick={() => handleSort("desc","id")}
                                            />
                                            <i class="fa-solid fa-arrow-down-9-1"></i>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="sort-uid">
                                    <fieldset>
                                        <legend>UID</legend>
                                        <div className="sort-uid-icon">
                                            <input 
                                            type="radio"
                                            name="check" 
                                            onClick={() => handleSort("asc","uid")}
                                            />
                                            <i class="fa-solid fa-arrow-down-1-9"></i>
                                            <input 
                                            type="radio"
                                            name="check" 
                                            onClick={() => handleSort("desc","uid")}
                                            />
                                            <i class="fa-solid fa-arrow-down-9-1"></i>   
                                        </div>
                                    </fieldset>
                                    </div>
                                <div className="sort-name">
                                    <fieldset>
                                        <legend>Tên Học Sinh</legend>
                                        <div className="sort-name-icon">
                                            <input 
                                            type="radio"
                                            name="check" 
                                            onClick={() => handleSort("asc","firstName")}
                                            />
                                            <i class="fa-solid fa-arrow-down-a-z"></i>
                                            <input 
                                            type="radio"
                                            name="check" 
                                            onClick={() => handleSort("desc","firstName")}
                                            />
                                            <i class="fa-solid fa-arrow-up-z-a"></i>    
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                {
                    showModal === false &&
                        <div className="modal">
                            <div className="add-new">
                                <h3>Thêm học sinh</h3>
                                <div className="add-new-wrap">
                                    <label>UID</label>
                                    <input 
                                    type="text" 
                                    value={uid} 
                                    onChange={(e) => setUid(e.target.value)}
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

                                    <label>Giới tính</label>
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
                                </div>
                            <div className="btn-wrap">
                                <button onClick={ () => handleX()}>Thêm</button>
                                <button onClick={ () => handleClose()}>Đóng</button>
                            </div>
                            </div>
                        </div>
                }
                </div>
                
                <ModalUpdate 
                    showModalUpdate = {showModalUpdate}
                    handleShowModalUpdate = {setShowModalUpdate}
                    dataUpdate={dataUpdate}
                    list = {list}
                    setList = {setList}
                    TableWhenUpdate ={TableWhenUpdate}
                />

                <ModalDelete 
                    showModalDelete = {showModalDelete}
                    handleShowModalDelete = {setShowModalDelete}
                    dataDelete={dataDelete}
                    list = {list}
                    setList = {setList}
                    TableWhenDelete = {TableWhenDelete}
                />

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
            </div>
        </>
    )
}

export default Manage