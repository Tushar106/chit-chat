import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import AddGroup from "./AddGroup";
function ChatList() {
    const { user, chatList, setChatList, selectedChat, setSelectedChat } = ChatState();
    const [loading, setLoading] = useState(false)
    function getSender(loggein, users) {
        return users[0]._id == user._id ? users[1] : users[0]
    }


    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const { data } = await axios.get("/api/chat");
                await setChatList(data);
                await setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="col-lg-3 p-2 h-100 ">
                <div className="d-flex justify-content-between " style={{ height: "10%", alignItems: "center" }}>
                    <div><h5 className="font-weight-bold text-center m-0 text-white" >Member</h5></div>
                    <a className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" href="#offcanvasExample" role="button" >
                            New Group <FontAwesomeIcon icon={faAdd} />
                        </a>
                    <AddGroup />    
                </div>
                <div className="container p-2 rounded  mask-custom overflow-y-auto" style={{ height: "90%" }}>
                    <div className="card-body">
                        {chatList ?
                            <ul className="list-unstyled mb-0 " >
                                {chatList.map((chat) => {
                                    return (
                                        <li key={chat._id} className={selectedChat && selectedChat._id == chat._id ? "p-2 border-bottom active-contact" : "p-2 border-bottom contact-hover"} style={{ borderBottom: "1px solid rgba(255,255,255,.3) !important" }} onClick={() => {
                                            setSelectedChat(chat);
                                        }}>
                                            <a className="d-flex justify-content-between link-light " style={{ textDecoration: "none" }}>
                                                <div className="d-flex flex-row">
                                                    <img src={!chat.isGroupChat ? getSender(user, chat.users).picture : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"} alt="avatar"
                                                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                                                    <div className="pt-1">
                                                        <p className="fw-bold mb-0">
                                                            {!chat.isGroupChat
                                                                ? getSender(user, chat.users).name
                                                                : chat.chatname}
                                                        </p>
                                                        {chat.latestMessage && (
                                                            <p className="small text-white">
                                                                {chat.latestMessage.sender.name} :
                                                                {chat.latestMessage.content.length > 50
                                                                    ? chat.latestMessage.content.substring(0, 51) + "..."
                                                                    : chat.latestMessage.content}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="pt-1">
                                                    <p className="small text-white mb-1">Just now</p>
                                                    <span className="badge bg-danger rounded-pill float-end">1</span>
                                                </div>
                                            </a>
                                        </li>)
                                    console.log(chat)
                                })}
                            </ul>
                            :
                            <div>loading</div>}

                    </div>
                </div>
            </div>
        </>
    )
}
export default ChatList;