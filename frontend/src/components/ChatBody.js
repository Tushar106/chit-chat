
import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatContent from "./ChatContent";
import { ChatState } from "../Context/ChatProvider";

function ChatBody() {
    const { selectedChat } = ChatState();
    const [fetchChat, setfetchChat] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const breakPoint = 1000;
    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return (
        <div className="chat-body" style={{
            width: "100%",
            padding: "10px",
            height: "88vh"
        }}>
            <div className="container-fluid h-100" >
                <div className="row h-100" >
                    {!selectedChat && width<breakPoint && <ChatList fetchChat={fetchChat} />}
                    {width>breakPoint && <ChatList fetchChat={fetchChat} setfetchChat={setfetchChat}/> }
                    {selectedChat && <ChatContent fetchChat={fetchChat} setfetchChat={setfetchChat} />}
                </div>
            </div >
        </div >

    )
}
export default ChatBody