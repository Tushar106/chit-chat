import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";


import { faAdd, faSearch } from "@fortawesome/free-solid-svg-icons"
import { ChatState } from "../Context/ChatProvider";
function AddGroup() {

  const [groupName, setGroupName] = useState();
  const [result, setResult] = useState([]);
  const[search,setSearch]=useState("");
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [selectedUser,setSelectedUser]=useState([]);
  const {user,chatList,setchatList,setSelectedChat}=ChatState();
  function submitSearch() {
    setLoading(true);
    const data = async () => {
      try {
        const res = await axios.get(`/api/user?search=${search}`)
        await setResult(
          res.data.filter((item1) => {
            return !selectedUser.some((item2) => item2.id === item1.id);
          }))
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    data();
  }
  

  return (
    <>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
        <div className="modal-dialog .  modal-dialog-scrollable" >
          <div className="modal-content" style={{
            background: "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
          }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Create Group</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="Group-Name" onChange={(e) => {
                    setGroupName(e.target.value)
                }}/>
                <label for="floatingInput">Group Name</label>
              </div>
              <div className="input-group   rounded mb-3">
                <input type="search" className="form-control" id="floatingInput2" placeholder="Add users eg-Tushar Piyush" aria-label="Search"
                  aria-describedby="search-addon" onChange={(e) => {
                    setResult([])
                    setSearch(e.target.value)
                }} />
                <button className="btn bg-white" id="search-addon"  disabled={search===""?true:false}  onClick={submitSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              </div>
              <div className="m-2 custom-scroll overflow-y-scroll" style={{maxHeight:"300px"}}>
                {!loading && !chatLoading ? 
                    <ul className="list-unstyled components pl-lg-4 pr-lg-4">
                  {result.length > 0 ? 
                  <>
                    {result.filter(f=>!selectedUser.includes(f)).map((item, index) => {
                      return (
                        <li className="p-2 border-bottom custom-scroll contact-hover" key={item._id}>
                          <a className="d-flex justify-content-between" style={{ textDecoration: "none" }} onClick={()=>{
                            
                            setSelectedUser([...selectedUser,item])
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
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Create <FontAwesomeIcon icon={faAdd} /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AddGroup