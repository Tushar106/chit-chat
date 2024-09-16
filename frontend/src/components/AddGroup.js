import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faAdd, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import { ChatState } from "../Context/ChatProvider";
import ErrorToast from "./ErrorToast";
function AddGroup() {

  const [groupName, setGroupName] = useState();
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [error, setError] = useState();
  const [open, setopen] = useState(false);
  const {  chatList, setChatList, setSelectedChat } = ChatState();
  function submitSearch() {
    setLoading(true);
    const data = async () => {
      try {
        const res = await axios.get(`https://chit-chat-server-7lyn.onrender.com/api/user?search=${search}`,{
          withCredentials:true,
          headers: {
            'Access-Control-Allow-Origin': '*',
              Accept: "application/json",
              "Content-Type": "application/json"
          }
        })
        await setResult(res.data.filter(f => !selectedUser.includes(f)))
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    data();
  }
  const handleSubmit = async () => {
    setChatLoading(true);
    try {
      if (groupName === "") {
        setError("Enter Group Name")
        setopen(true)
        return
      }
      if (selectedUser.length <= 1) {
        setError("Enter More Group Members")
        setopen(true)
        return
      }
      const { data } = await axios.post("https://chit-chat-server-7lyn.onrender.com/api/chat/group", {
        name: groupName,
        users: selectedUser.map((e) => { return e._id })
      },{
        withCredentials:true,
        headers: {
          'Access-Control-Allow-Origin': '*',
            Accept: "application/json",
            "Content-Type": "application/json"
        }
      })
      setChatList([data, ...chatList])
      setSelectedChat(data)
      setChatLoading(false);
      document.getElementById("close-btn2").click();
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-scrollable" >
          <div className="modal-content" style={{
            background: "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
          }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Create Group</h1>
              <button type="button" className="btn-close" id="close-btn2" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {!chatLoading ? <div className="modal-body overflow-hidden">
              <div>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="Group-Name" onChange={(e) => {
                    setGroupName(e.target.value)
                  }} />
                  <label htmlFor="floatingInput">Group Name</label>
                </div>
                <div className="input-group   rounded mb-3">
                  <input type="search" className="form-control" id="floatingInput2" placeholder="Add users eg-Tushar Piyush" aria-label="Search" value={search}
                    aria-describedby="search-addon" onChange={(e) => {
                      setResult([])
                      setSearch(e.target.value)
                    }} />
                  <button className="btn bg-white" id="search-addon" disabled={search === "" ? true : false} onClick={submitSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
              <div className="" >
                {selectedUser.length > 0 &&
                  <ul className="d-flex list-unstyled overflow-x-auto custom-scroll" style={{ width: "100%", height: "73px", alignItems: "center" }}>
                    {selectedUser.map(item => {
                      return (
                        <li className="m-1" key={item._id}>
                          <button type="button" className="btn btn-primary position-relative p-1">
                            {item.name}
                            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: "94%" }} onClick={() => {
                              setSelectedUser(selectedUser.filter((e) => e._id !== item._id))
                            }}>
                              <FontAwesomeIcon icon={faTimes} />
                              <span className="visually-hidden">Remove</span>
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>}
              </div>

              <div className="m-2 custom-scroll overflow-y-scroll" style={{ maxHeight: "300px" }}>
                {!loading && !chatLoading ?
                  <ul className="list-unstyled components pl-lg-4 pr-lg-4">
                    {result.length > 0 ?
                      <>
                        {result.filter((item1) => {
                          return !selectedUser.some((item2) => item2._id === item1._id);
                        }).map((item, index) => {
                          return (
                            <li className="p-2 border-bottom custom-scroll contact-hover" key={item._id}>
                              <div className="d-flex justify-content-between" style={{ textDecoration: "none" }} onClick={() => {

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
                              </div>
                            </li>
                          )
                        })}</>
                      :
                      <div>No Result Found!</div>}
                  </ul> : <div>loading</div>}
              </div>

            </div> : <div>loading</div>}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                setResult([]);
                setSelectedUser([]);
                setSearch("")
              }}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create <FontAwesomeIcon icon={faAdd} /></button>
            </div>
          </div>
        </div>
        {open && <ErrorToast data={error} setopen={setopen} />}
      </div>

    </>
  )
}
export default AddGroup