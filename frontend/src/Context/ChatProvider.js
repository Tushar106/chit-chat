
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState({});
  const [chatList, setChatList] = useState();
  

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    // console.log(userInfo)
    if (!userInfo) {
      navigate("/")
    }
    setUser(userInfo);
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chatList,
        setChatList,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;

