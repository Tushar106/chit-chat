import React, { useEffect, useRef, useState } from "react";
import { faArrowLeft, faEye, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ChatState } from "../Context/ChatProvider";
import ViewChat from "./ViewChat";
import axios from "axios";
import ScrollableFeed from 'react-scrollable-feed'
import io from "socket.io-client";

var socket, selectedChatCompare;
const ENDURL = "https://chit-chat-server-7lyn.onrender.com"
function ChatContent({ fetchChat, setfetchChat }) {

    const [socketConnected, setSocketConnected] = useState(false);
    const divRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [loading, setLoading] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [userTyping, setUserTyping] = useState("");

    const { selectedChat, user, setSelectedChat, notification, setNotification } = ChatState();
    function getSender(loggein, users) {
        return users[0]._id === loggein._id ? users[1] : users[0]
    }

    const scrollToBottom = () => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    };
    const [width, setWidth] = useState(window.innerWidth);
    const breakPoint = 1000;


    const fetchMessage = async () => {
        if (!selectedChat) return;
        setLoading(true)
        try {
            const { data } = await axios.get(`https://chit-chat-server-7lyn.onrender.com/api/message/${selectedChat._id}`, {
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
            setMessages(data);
            setLoading(false);
            socket.emit("join chat", selectedChat._id)
        } catch (error) {
            console.log(error)
        }
    }


    const sendMessage = async () => {
        try {
            setMessageText("");
            const { data } = await axios.post("https://chit-chat-server-7lyn.onrender.com/api/message", {
                content: messageText,
                chatId: selectedChat._id
            }, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            setfetchChat(!fetchChat)
            socket.emit("new message", data)
            setMessages([...messages, data])
        } catch (error) {
            console.log(error)
        }
    }
    const typingHandler = (e) => {
        // console.log(e)
        setMessageText(e.target.value)
        if (!socketConnected) return

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id, user);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                // console.log("hhh")
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
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
        socket = io(ENDURL);
        socket.emit("setup", user)
        socket.on('connected', () => {
            setSocketConnected(true)
        })
        socket.on("typing", (userName) => {
            setUserTyping(userName);
            setIsTyping(true)
        })
        socket.on("stop typing", () => {
            setUserTyping("");
            setIsTyping(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        fetchMessage();
        scrollToBottom();
        updateStateWithoutKey(selectedChat._id)
        selectedChatCompare = selectedChat;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => window.removeEventListener("resize", handleWindowResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChat]);

    const updateStateWithoutKey = (id) => {
        // Create a copy of the current state
        const newState = { ...notification };
        // console.log(notification[id])

        // Omit the key you want to remove
        delete newState[id];

        setNotification(newState);
    };

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            // console.log(newMessageRecieved)
            setfetchChat(!fetchChat)
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                // //give notification 
                // console.log("hello")
            }
            else {
                setMessages([...messages, newMessageRecieved]);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })



    return (
        <>
            <div className="col-lg-9 p-2 h-100 chat-content">
                <div className="container rounded h-100  mask-custom p-2"  >

                    {selectedChat ? <>
                        <div className="card-header d-flex justify-content-between align-items-center p-3" style={{ height: "10%", borderBottom: "1px solid" }}>
                            {width < breakPoint && <button className="btn btn-outline-secondary" onClick={() => {
                                setSelectedChat();
                            }}><FontAwesomeIcon icon={faArrowLeft} /></button>}
                            <div className="d-flex align-items-center">
                                <img src={!selectedChat.isGroupChat
                                    ? getSender(user, selectedChat.users).picture
                                    : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"}
                                    alt="avatar 1" style={{ width: "45px", marginRight: "20px", borderRadius: "100%" }} />

                                <h5 className="mb-0 text-truncate" style={{ maxWidth: "150px" }}>
                                    {!selectedChat.isGroupChat
                                        ? getSender(user, selectedChat.users).name
                                        : selectedChat.chatname}
                                </h5>
                            </div>
                            {selectedChat.isGroupChat && <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#viewChat">
                                <FontAwesomeIcon icon={faEye} />
                            </button>}
                        </div>
                    </> : <div>loading</div>}

                    <div className="container-fluid" style={{ height: "90%" }}>
                        <ScrollableFeed className="pt-3 pe-3 custom-scroll" ref={divRef} >
                            {!loading ? messages.map((message, index) => {
                                return (<>
                                    {message.sender._id !== user._id
                                        ?
                                        <div className="d-flex flex-row justify-content-start" key={message._id}>
                                            <img src={message.sender.picture}
                                                alt="avatar 1" style={{ width: "45px", height: "100%", borderRadius: "100%" }} />
                                            <div style={{ padding: "15px" }}>
                                                <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>
                                                    {message.content}.</p>
                                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">{date(message.createdAt
                                                )}</p>
                                            </div>
                                        </div> :
                                        <div className="d-flex flex-row justify-content-end" key={message._id}>
                                            <div style={{ padding: "15px" }}>
                                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                    {message.content}
                                                </p>
                                                <p className="small me-3 mb-3 rounded-3 text-muted">{date(message.createdAt
                                                )}</p>
                                            </div>
                                            {/* <img src={user.picture}
                                                alt="avatar 1" style={{ width: "45px", height: "100%" }} /> */}
                                        </div>}
                                </>)
                            }) : <div>loading</div>}
                        </ScrollableFeed>
                        {isTyping ? <div className="" style={{ height: "2%", marginBottom: "5px" }}>{userTyping} is typing...</div> : <div></div>}
                        <div className="text-muted d-flex justify-content-start align-items-center p-2" style={{ height: "15%" }}>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar 3" style={{ width: "40px", marginRight: "10px" }} />
                            <input type="text" className="form-control form-control-lg" id="exampleFormControlInput2"
                                placeholder="Type message" style={{ height: "80%" }} onChange={typingHandler} value={messageText} />
                            <button className="btn " style={{ marginLeft: "10px" }} onClick={sendMessage} disabled={messageText === "" ? true : false} >
                                <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                            </button>
                        </div>
                    </div>
                </div>
                {selectedChat.isGroupChat && <ViewChat fetchChat={fetchChat} setfetchChat={setfetchChat} />}
            </div>
        </>
    )
}
export default ChatContent