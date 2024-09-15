import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect, useState } from "react";
// import { Axios }from "axios";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
function SideBar() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    const [open,setOpen]=useState(true);
    const btnElement = React.useRef()
    useEffect(()=>{
        setOpen(true);
    })  
    const {
        setSelectedChat,
        user,
        notification,
        setNotification,
        chatList,
        setChatList,
      } = ChatState();

    function submit() {
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
    const accessChat = async (userId) => {
        try {
          setChatLoading(true);
          const { data } = await axios.post(`https://chit-chat-server-7lyn.onrender.com/api/chat`, { userId });
          if (!chatList.find((c) => c._id === data._id)) setChatList([data, ...chatList]);
          setSelectedChat(data);
          setChatLoading(false);
          document.getElementById("close-btn1").click();
        } catch (error) {
          console.log(error)
        }
      };

    return (
        <>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{
                background: "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
            }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Search for Users</h5>
                    <button type="button" className="btn-close " id="close-btn1" data-bs-dismiss="offcanvas"   aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="input-group   rounded mb-3">
                        <input type="search" className="form-control" id="floatingInput" placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon" onChange={(e) => {
                                setResult([])
                                setSearch(e.target.value)
                            }} />
                        <button className="btn bg-white border-0" id="search-addon" disabled={search===""?true:false}   onClick={submit} >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <hr></hr>
                    <div className="m-2 custom-scroll overflow-y-scroll">
                        {!loading ?<ul className="list-unstyled components pl-lg-4 pr-lg-4">
                            {result.length>0 ?<>
                               {result.map((item, index) => {
                                return (
                                    <li className="p-2 border-bottom custom-scroll contact-hover" key={item._id}>
                                        <a  className="d-flex justify-content-between" style={{textDecoration:"none"}} onClick={()=>{
                                            accessChat(item._id)
                                        }} >
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
                            })}</>:<div>No Result Found!</div>}
                        </ul>:<div>loading</div>}
                    </div>
                </div>
            </div>
        </>

    )
}
export default SideBar