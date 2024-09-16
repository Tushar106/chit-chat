import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTimes } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import ErrorToast from "./ErrorToast";


function ViewChat({fetchChat,setfetchChat}) {
    const { selectedChat, user, setSelectedChat,chatList,setChatList } = ChatState();
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [error, setError] = useState();
  const [open, setopen] = useState(false);

    function submitSearch() {
        setLoading(true);
        const data = async () => {
            try {
                const res = await axios.get(`https://chit-chat-server-7lyn.onrender.com/api/user?search=${search}`)
                await setResult([...res?.data])
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        data();
    }
    const renameGroup = async () => {
        setUpdateLoading(true);
        try {
            const { data } = await axios.put("https://chit-chat-server-7lyn.onrender.com/api/chat/rename", {
                newName: groupName,
                chatId: selectedChat._id
            })
            setSelectedChat(data);
            setUpdateLoading(false);

        } catch (error) {
            console.log(error)
        }
    }

    const saveChanges = async () => {
        setChatLoading(true);
        try {
            if (selectedUser.length<=2 ) {
                setError("Enter Group Members")
                setopen(true)
                setChatLoading(false)
                return
            }   
            const { data } = await axios.put("https://chit-chat-server-7lyn.onrender.com/api/chat/update", {
                chatId: selectedChat._id,
                users: selectedUser.map((e) => { return e._id })
            })
            setSelectedChat(data)
            setChatLoading(false);
            document.getElementById("close-btn3").click();
        } catch (error) {
            console.log(error)
        }
    }
    const removeSelf=async()=>{
        setChatLoading(true);
        try {
            // eslint-disable-next-line no-unused-vars
            const {data}=await axios.put("https://chit-chat-server-7lyn.onrender.com/api/chat/groupremove",{
                userId:user._id, 
                chatId:selectedChat._id
            })
            await setChatList(chatList.filter((i)=>{
                return chatList._id!=selectedChat._id
            }))
            await setChatLoading(false);
            await setSelectedChat();
            setfetchChat(!fetchChat);
            document.getElementById("close-btn3").click();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setSelectedUser(selectedChat?.users);
    }, [selectedChat])

    return (
        <div className="modal fade" id="viewChat" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
            {selectedChat &&
                <div className="modal-dialog">
                    <div className="modal-content" style={{
                        background: "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
                    }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{selectedChat.chatname}</h1>
                            <button type="button" className="btn-close" id="close-btn3" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                setResult([]);
                                setSelectedUser(selectedChat?.users);
                                setSearch("")
                            }}></button>
                        </div>
                        {/* <hr></hr> */}
                        <div className="modal-body">
                            <div className="" >
                                {selectedUser.length > 0 &&
                                    <ul className="d-flex list-unstyled overflow-x-auto custom-scroll" style={{ width: "100%", height: "73px", alignItems: "center" }}>
                                        {selectedUser.filter((i)=>{return i._id!=user._id}).map(item => {
                                            return (
                                                <li className="m-1" key={item._id}>
                                                    <button type="button" className="btn btn-primary position-relative p-1">
                                                        {item.name}
                                                        {selectedChat.groupAdmin._id===user._id &&<span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: "94%" }} onClick={() => {
                                                            setSelectedUser(selectedUser.filter((e) => e._id != item._id))
                                                        }}>
                                                            <FontAwesomeIcon icon={faTimes} />
                                                            <span className="visually-hidden">Remove</span>
                                                        </span>}
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>}
                            </div>
                            {!updateLoading ? <div className="input-group mb-3">
                                <input type="email" className="form-control " id="floatingInput" placeholder="New Group Name" onChange={(e) => {
                                    setGroupName(e.target.value)
                                }} />
                                <button className="btn btn-outline-success" type="button" id="button-addon2" disabled={groupName === "" ? true : false} onClick={renameGroup}>Update</button>
                            </div> : <div>loading</div>}
                            <div className="input-group mb-3">
                                <input type="email" className="form-control " id="floatingInput" value={search} placeholder="Search" onChange={(e) => {
                                    setResult([])
                                    setSearch(e.target.value)
                                }} />
                                <button className="btn btn-outline-success" type="button" disabled={search === "" ? true : false} id="button-addon2" onClick={submitSearch}>Search </button>
                            </div>
                            <hr></hr>
                            <div className="m-2 custom-scroll overflow-y-scroll" style={{ maxHeight: "300px" }}>
                                {!loading ?
                                    <ul className="list-unstyled components pl-lg-4 pr-lg-4">
                                        {result.length > 0 ?
                                            <>
                                                {result.filter((item1) => {
                                                    return !selectedUser.some((item2) => item2._id === item1._id);
                                                }).map((item, index) => {
                                                    return (
                                                        <li className="p-2 border-bottom custom-scroll contact-hover" key={item._id}>
                                                            <a className="d-flex justify-content-between" style={{ textDecoration: "none" }} onClick={() => {
                                                                setSelectedUser([...selectedUser, item])
                                                            }}>
                                                                <div className="d-flex flex-row">
                                                                    <img src={item.picture} alt="avatar"
                                                                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                                                                    <div className="pt-1">
                                                                        <p className="fw-bold mb-0">{item.name}</p>
                                                                        <p className="small text-muted">{item.email}</p>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )
                                                })}</>
                                            :
                                            <div>No Result Found!</div>}
                                    </ul> : <div>loading</div>}
                            </div>
                        </div>
                       {!chatLoading? <div className="modal-footer">
                            <button type="button" className="btn btn-danger"  onClick={removeSelf}>Leave</button>
                            <button type="button" className="btn btn-primary" onClick={saveChanges}>Save changes</button>
                        </div>:<div>loading</div>}
                    </div>
                </div>}
                {open && <ErrorToast data={error} setopen={setopen} />}
        </div>
    )
}
export default ViewChat