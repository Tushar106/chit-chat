
import React, { useEffect, useRef } from "react";
import ChatList from "./ChatList";
import ChatContent from "./ChatContent";
import { useParams } from 'react-router-dom';
import { ChatState } from "../Context/ChatProvider";

function ChatBody() {
    const {selectedChat}=ChatState();
    return (
        <div className="chat-body" style={{
            width: "100%",
            padding: "10px",
            height: "88vh"
        }}>
            <div className="container-fluid h-100" >
                <div className="row h-100" >
                    <ChatList />
                    {selectedChat&& <ChatContent />}
                </div>
            </div >
        </div >

    )
}
export default ChatBody