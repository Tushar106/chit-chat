// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ChatContext=createContext({});

// const ChatProvider=({children})=>{
//     const [user,setUser]=useState({})
//     const navigate=useNavigate();
//     useEffect(()=>{
//         if(localStorage.getItem("user")){
//             const userInfo =  JSON.parse(localStorage.getItem("user"));
//             console.log(userInfo)
//             setUser(userInfo);
//         }
//         else{
//             navigate("/");
//         }
//     },[navigate])
//     return(
//         <ChatContext.Provider value={{user,setUser}}>
//             {children}
//         </ChatContext.Provider>
//     )
// }

// export default ChatProvider;

// export const ChatState = () => {
//     return useContext(ChatContext);
//   };


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
    setUser(userInfo);

    if (!userInfo) {
      navigate("/")
    }
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

