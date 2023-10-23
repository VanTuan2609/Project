import React from "react";
import img1 from "../../img/home4.jpg"
import img2 from "../../img/home3.jpg"
import img3 from "../../img/home6.jpg"
import { ToastContainer } from 'react-toastify';
import img4 from "../../img/home9.jpg"

function Home () {
    return (
        <>  
            <div className="home_container">
                <div className="home_wrap">
                    <div className="home_block1">
                        <img src={img3} alt="" width="250px" height="160px" />
                        <div>
                            "Người thầy trung bình chỉ biết nói. 
                            Người thầy giỏi biết giải thích. 
                            Người thầy xuất chúng biết minh họa. 
                            Người thầy vĩ đại biết cách truyền cảm hứng."
                        </div>
                        <img src={img1} alt="" width="190px" />
                    </div>
                    <div className="home_block2">
                        <img src={img2} alt="" width="190px" />
                        <div>
                            "Mục tiêu của giáo dục không phải là dạy cách kiếm sống hay cung cấp công cụ để đạt được sự giàu có, 
                            mà đó phải là con đường dẫn lối tâm hồn con người vươn đến cái Chân và thực hành cái Thiện."
                        </div>
                        <img src={img4} alt="" width="250px" height="160px"/>
                    </div>
                </div>
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            /> */}
            </div>
        </>
    )
}

export default Home