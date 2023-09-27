import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
function ChatList() {
    return (
        <>
            <div className="col-lg-3 p-2 h-100 ">
                <div className="d-flex justify-content-between " style={{ height: "10%",alignItems:"center" }}>
                    <div><h5 className="font-weight-bold text-center m-0 text-white" >Member</h5></div>
                    <a className="btn btn-outline-success" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        New Group <FontAwesomeIcon icon={faAdd}/>
                    </a>
                </div>
                <div className="container p-2 rounded  mask-custom overflow-y-auto" style={{ height: "90%" }}>
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