import React from "react"
// import {Offcanvas} from "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import SideBar from "./SideBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons"
import Profile from "./Profile"
// import {faBell} from "@fortawesome/free-regular-svg-icons"

function ChatNavbar() {
    return (
        // <div className="container">
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="btn btn-outline-success" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                    <FontAwesomeIcon icon={faSearch} /> Search
                </a>
                <SideBar />
                <a className="navbar-brand" href="#">Chit-Chat</a>
                <div className="d-flex" style={{alignItems:"center"}}> 
                  <FontAwesomeIcon icon={faBell} size={"xl"} style={{marginRight:"10px"}}/>
                  <Profile/>
                </div>
            </div>
        </nav>
        // </div>
    )
}
export default ChatNavbar