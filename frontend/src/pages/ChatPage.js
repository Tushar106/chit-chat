import React, { useEffect, useState } from "react";
import axios from "axios"
import { ChatState } from "../Context/ChatProvider";
import ChatNavbar from "../components/ChatNavbar";
import ChatBody from "../components/ChatBody";
function ChatPage() {
    const [data, setData] = useState();
    const { user } = ChatState();
    useEffect(() => {
        console.log(user)
    }, [])


    return (
       <div className="container-fluid p-0">
        <ChatNavbar/>
        <ChatBody/>
       </div>
    )
}
export default ChatPage