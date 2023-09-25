import React from "react"
// import {Offcanvas} from "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import SideBar from "./SideBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons"
// import {faBell} from "@fortawesome/free-regular-svg-icons"

function ChatNavbar() {
    return (
        // <div className="container">
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a class="btn btn-outline-success" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                    <FontAwesomeIcon icon={faSearch} /> Search
                </a>
                <SideBar />
                <a class="navbar-brand" href="#">Chit-Chat</a>
                <div > 
                  <FontAwesomeIcon icon={faBell} size={"xl"} style={{marginRight:"10px"}}/>
                </div>
            </div>
        </nav>
        // </div>
    )
}
export default ChatNavbar