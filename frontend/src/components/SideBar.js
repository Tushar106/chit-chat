import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react";
// import { Axios }from "axios";
import axios from "axios";
function SideBar() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    function submit() {
        setLoading(true);
        console.log("h")
        const data = async () => {
            try {
                const res = await axios.get(`/api/user?search=${search}`)
                console.log(res.data)
                await setResult([...res?.data])
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        data();
    }

    return (
        <>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{
                background: "rgb(238,174,202)",
                background: "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
            }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">List of Users</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="input-group   rounded mb-3">
                        <input type="search" className="form-control" id="floatingInput" placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon" onChange={(e) => {
                                setSearch(e.target.value)
                            }} />
                        {/* <label for="floatingInput">Email address</label> */}
                        <a className="btn  border-0" id="search-addon" onClick={submit} >
                            <FontAwesomeIcon icon={faSearch} />
                        </a>
                    </div>
                    <hr></hr>
                    <div className="m-2">
                        <ul className="list-unstyled components pl-lg-4 pr-lg-4">

                        </ul>
                    </div>
                </div>
            </div>
        </>

    )
}
export default SideBar