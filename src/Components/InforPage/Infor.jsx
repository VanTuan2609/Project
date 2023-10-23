import React from "react";

const InforStu = () => {
    return (
        <>
            <div className="container-infor">
                <div className="row">
                    <div className="wrap1">
                        <h3>Thông tin thẻ</h3>
                        <div className="input-infor">
                            <label htmlFor="" className="label">ID Card</label>
                            <input type="text" className="content" />
                        </div>
                        <div className="input-infor">
                            <label htmlFor="" className="label">Họ và Tên</label>
                            <input type="text" className="content"/>
                        </div>
                        <div className="input-infor">
                            <label htmlFor="" className="label">Giới tính</label>
                            <input type="text" className="content"/>
                        </div>
                        <div className="input-infor">
                            <label htmlFor="" className="label">Số điện thoại</label>
                            <input type="text" className="content"/>
                        </div>
                        <div className="input-infor">
                            <label htmlFor="" className="label">Chức vụ</label>
                            <input type="text" className="content"/>
                        </div>
                    </div>
                    <div className="wrap2">
                        <table>
                            <thead>
                                <tr className="head-table">
                                    <th className="table-col">STT</th>
                                    <th className="table-col">ID Card</th>
                                    <th className="table-col">Họ và Tên</th>
                                    <th className="table-col">Thời gian vào</th>
                                    <th className="table-col">Thời gian ra</th>
                                </tr>
                            </thead>
                            <tbody>
                                    
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InforStu