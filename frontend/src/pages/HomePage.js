import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import svg from "../Images/Group 14.
import HomeSvg from "../Images/HomeSvg";
import SignIn from "../components/SignIn";
import Register from "../components/Register";
function HomePage() {
    const [tab,setTab]=useState(0);
    const [user,setUser]=useState()
    const navigate=useNavigate();
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("user"));
        setUser(userInfo);
        if(userInfo){
            navigate("/chat");
        }
    },[])
    return (
        <section className="w-100">
            <div className="container-fluid" style={{ height: "89.5%" }}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <HomeSvg />
                    </div>
                    <div className="d-flex col-md-8 col-lg-6 col-xl-4 offset-xl-1 " style={{flexDirection:"column" ,gap:"20px"}}>
                       <div className="d-flex justify-content-center align-items-center" style={{gap:"10px"}}>
                        <button className="btn" style={{background:tab===0?"white":"",fontWeight:"bold" }} onClick={()=>{setTab(0)}}>Login</button>
                        <button className="btn" style={{background:tab===1?"white":"",fontWeight:"bold" }}onClick={()=>{setTab(1)}}>Register</button>
                       </div>
                       {tab===0&&<SignIn></SignIn>}
                       {tab===1&&<Register></Register>}

                    </div>
                </div>
            </div>
        </section>
    )
}
export default HomePage