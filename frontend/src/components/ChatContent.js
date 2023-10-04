import React, { useEffect, useRef, useState } from "react";
import { faArrowLeft, faEye, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ChatState } from "../Context/ChatProvider";
import ViewChat from "./ViewChat";

function ChatContent({fetchChat,setfetchChat}) {
    const divRef = useRef(null);
    
    const { selectedChat, user ,setSelectedChat} = ChatState();
    function getSender(loggein, users) {
        return users[0]._id == loggein._id ? users[1] : users[0]
    }

    const scrollToBottom = () => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    };
    const [width, setWidth] = useState(window.innerWidth);
    const breakPoint = 1000;



    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return (
        <>
            <div className="col-lg-9 p-2 h-100 chat-content">
                <div className="container rounded h-100  mask-custom p-2"  >
                    
                    {selectedChat ? <>
                        <div className="card-header d-flex justify-content-between align-items-center p-3" style={{ height: "10%", borderBottom: "1px solid" }}>
                           {width<breakPoint && <button className="btn btn-outline-secondary" onClick={()=>{
                            setSelectedChat();
                           }}><FontAwesomeIcon icon={faArrowLeft} /></button>}  
                            <div className="d-flex align-items-center">
                                <img src={!selectedChat.isGroupChat
                                    ? getSender(user, selectedChat.users).picture
                                    : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"}
                                    alt="avatar 1" style={{ width: "45px", marginRight: "20px" }} />

                                <h5 className="mb-0 text-truncate" style={{maxWidth: "150px"}}>
                                    {!selectedChat.isGroupChat
                                        ? getSender(user, selectedChat.users).name
                                        : selectedChat.chatname}
                                </h5>
                            </div>
                            {selectedChat.isGroupChat&&<button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#viewChat">
                                <FontAwesomeIcon icon={faEye}/>
                            </button>}
                        </div>
                    </> : <div>loading</div>}

                    <div className="container-fluid" style={{ height: "90%" }}>
                        <div className="pt-3 pe-3 custom-scroll" ref={divRef}
                            style={{ height: "85%", overflowY: "auto", boxSizing: "border-box" }} >
                            <div className="d-flex flex-row justify-content-start">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                    alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                                <div style={{ width: "60%" }}>
                                    <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>Lorem ipsum
                                        dolor
                                        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore
                                        magna aliqua.</p>
                                    <p className="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                </div>
                            </div>

                            <div className="d-flex flex-row justify-content-end">
                                <div style={{ width: "60%" }}>
                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Ut enim ad minim veniam,
                                        quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem100 jhvjhuidsuhfjsdhfjdshfkjsfjbdskjkjgfjndf gmdabjkf  fkbsa  fkansbfha fnsdafbfsn ab</p>
                                    <p className="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
                                </div>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                    alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                            </div>
                        </div>
                        <div className="text-muted d-flex justify-content-start align-items-center p-2" style={{ height: "15%" }}>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar 3" style={{ width: "40px", marginRight: "10px" }} />
                            <input type="text" className="form-control form-control-lg" id="exampleFormControlInput2"
                                placeholder="Type message" style={{ height: "80%" }} />
                            <a className="btn" href="#!" style={{ marginLeft: "10px" }}>
                                <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                            </a>
                        </div>
                    </div>
                </div>
                {selectedChat.isGroupChat&&<ViewChat fetchChat={fetchChat} setfetchChat={setfetchChat}/> }
            </div>
        </>
    )
}
export default ChatContent