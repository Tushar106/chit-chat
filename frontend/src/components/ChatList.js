import React from "react";
function ChatList(){
    return(
        <>
         <div className="col-lg-3 p-2 h-100 ">
                        <div className="container p-2 rounded h-100 mask-custom overflow-y-auto  "  >
                            <div className="card-body">
                                <ul className="list-unstyled mb-0 ">
                                    <li className="p-2 border-bottom" style={{ borderBottom: "1px solid rgba(255,255,255,.3) !important" }}>
                                        <a href="#!" className="d-flex justify-content-between link-light">
                                            <div className="d-flex flex-row">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp" alt="avatar"
                                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                                                <div className="pt-1">
                                                    <p className="fw-bold mb-0">John Doe</p>
                                                    <p className="small text-white">Hello, Are you there?</p>
                                                </div>
                                            </div>
                                            <div className="pt-1">
                                                <p className="small text-white mb-1">Just now</p>
                                                <span className="badge bg-danger rounded-pill float-end">1</span>
                                            </div>
                                        </a>
                                    </li>

                                    

                                </ul>
                            </div>
                        </div>
                    </div>
        </>
    )
}
export default ChatList;