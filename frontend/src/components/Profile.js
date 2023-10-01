import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";


function Profile() {
    const navigate = useNavigate();
    const [open, setopen] = useState(false)
    const { user } = ChatState();
    function deleteCookie() {
        localStorage.clear("user");
        navigate("/")
        window.location.reload(false);
    }
    window.onscroll = () => {
        setopen(false)
    }
    return (<div className="profile">
        <div id="profileContainer">
            <button className="btn" onClick={() => setopen(!open)} >
            <img src={user.picture}
                            className="img" style={{width:"32px" , height:"32px"}}/>
                {/* <FontAwesomeIcon icon={faUserCircle} size={"2x"} /> */}
                </button>
            {open && <div className="profileContainer">
                <div className="profileContent">
                    <div className="img">
                        <img src={user.picture}
                            className="rounded-circle img-fluid" />
                    </div>
                    <div className="profileInfo">
                        <div className="profileItem" >
                            <p className="mb-0">Username</p>
                            <p className="text-muted mb-0">{user.name}</p>
                        </div>
                        <div className="profileItem" >
                            <p className="mb-0">Email</p>
                            <p className="text-muted mb-0">{user.email}</p>
                        </div>
                        <div className="profileItem mt-10" >
                            <button className="btn btn-dark w-100 " onClick={deleteCookie}>Logout</button>
                        </div>

                    </div>
                </div>

            </div>}
        </div>
    </div>)
}
export default Profile;