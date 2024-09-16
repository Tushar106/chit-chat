import React from "react";

import { ChatState } from "../Context/ChatProvider";
import ChatNavbar from "../components/ChatNavbar";
import ChatBody from "../components/ChatBody";
// import { useParams } from 'react-router-dom';
function ChatPage() {
    const { user } = ChatState()

    return (
        <div className="container-fluid p-0">
            {user && <>
                <ChatNavbar />
                <ChatBody/>
            </>}

        </div>
    )
}
export default ChatPage