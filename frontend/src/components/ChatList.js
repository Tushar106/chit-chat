import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import AddGroup from "./AddGroup";
import io from "socket.io-client";

var socket;
const ENDURL = "https://chit-chat-server-7lyn.onrender.com"
function ChatList({ fetchChat, setfetchChat }) {
    // eslint-disable-next-line no-unused-vars
    const [socketConnected, setSocketConnected] = useState(false);

    const { user, chatList, setChatList, selectedChat, setSelectedChat, notification, setNotification, } = ChatState();
    const [loading, setLoading] = useState(false)
    function getSender(loggein, users) {
        return users[0]._id === loggein._id ? users[1] : users[0]
    }

    const date = (d) => {
        const date = new Date(d);

        // Formatting the time in 12-hour clock format (e.g., 12:00 PM)
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const time12Hour = `${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes} ${hours < 12 ? "AM" : "PM"}`;

        // Formatting the date (e.g., Aug 13)
        const options = { month: "short", day: "numeric" };
        const formattedDate = date.toLocaleDateString(undefined, options);

        // Combine the time and date formats
        const result = `${time12Hour} | ${formattedDate}`;
        return result;
    }
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const { data } = await axios.get("https://chit-chat-server-7lyn.onrender.com/api/chat",{
                    // withCredentials:true,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                });
                // console.log(data)
                await setChatList(data);
                await setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchChat])

    useEffect(() => {
        socket = io(ENDURL);
        socket.emit("setup", user)
        socket.on('connected', () => {
            setSocketConnected(true)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            setfetchChat(!fetchChat)
            if (!selectedChat || selectedChat._id !== newMessageRecieved.chat._id) {
                setNotification(prev => {
                    return {
                        ...prev,
                        [newMessageRecieved.chat._id]: notification[newMessageRecieved.chat._id] ? notification[newMessageRecieved.chat._id] + 1 : 1,
                    }
                });
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    if(loading){
        return(
            <div>
                loading
            </div>
        )
    }


    return (
        <>
            <div className="col-lg-3 p-2 h-100 " >
                <div className="d-flex justify-content-between " style={{ height: "10%", alignItems: "center" }}>
                    <div><h5 className="font-weight-bold text-center m-0 text-white" >Member</h5></div>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" href="#offcanvasExample" role="button" >
                        New Group <FontAwesomeIcon icon={faAdd} />
                    </a>
                    <AddGroup />
                </div>
                <div className="container p-2 rounded  mask-custom overflow-y-auto" style={{ height: "90%" }}>
                    <div className="card-body">
                        {chatList ?
                            chatList.length === 0 ? <div>Add members to Chat</div> :
                                <ul className="list-unstyled mb-0 " >
                                    {chatList.map((chat) => {
                                        return (
                                            <li key={chat._id} className={selectedChat && selectedChat._id === chat._id ? "p-2 border-bottom active-contact" : "p-2 border-bottom contact-hover"} style={{ borderBottom: "1px solid rgba(255,255,255,.3) !important" }} onClick={() => {
                                                setSelectedChat(chat);
                                            }}>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
                                                                    {chat.latestMessage.sender.name} : {chat.latestMessage.content.length > 50
                                                                        ? chat.latestMessage.content.substring(0, 51) + "..."
                                                                        : chat.latestMessage.content}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="pt-1">
                                                        {chat.latestMessage && <p className="small text-white mb-1">{date(chat.latestMessage.createdAt)}</p>}
                                                        {notification[chat._id] && <span className="badge bg-danger rounded-pill float-end">{notification[chat._id]}</span>}
                                                    </div>
                                                </a>
                                            </li>)
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