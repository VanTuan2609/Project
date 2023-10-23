import axios from "./customize-axios";

function FetchAllUser () {
    return (
        axios.get("/users")
    )
}

const AddNew = (uid, firstName, lastName, gender, phone) => {
    return axios.post("/users",{uid, firstName, lastName, gender, phone})
}

const UpdateUser = (id,uid,firstName,lastName,gender,phone) => {
    return axios.put(`/users/${id}`,{uid,lastName, firstName, gender, phone})
}

const DeleteUser = (id) => {
    return axios.delete(`/users/${id}`)
}

const LoginAcount = (email,password) => {
    return axios.get("/account", {email, password})
} 

export {FetchAllUser, AddNew, UpdateUser, DeleteUser, LoginAcount}