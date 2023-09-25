import React, { useEffect, useRef } from "react";
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ChatContent(){
    const divRef = useRef(null);

  // Function to scroll the div to the bottom
  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, []);
    return (
        <>
        <div className="col-lg-9 p-2 h-100">
                        <div className="container rounded h-100 mask-custom   p-2">
                            <div class="pt-3 pe-3 custom-scroll" ref={divRef}
                                style={{height: "85%",overflowY:"auto" ,boxSizing:"border-box"}} >
                                <div class="d-flex flex-row justify-content-start">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                        alt="avatar 1" style={{width: "45px", height: "100%"}} />
                                    <div>
                                        <p class="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Lorem ipsum
                                            dolor
                                            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore
                                            magna aliqua.</p>
                                        <p class="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-content-end">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                        alt="avatar 1" style={{width: "45px", height: "100%"}} />
                                    <div>
                                        <p class="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Lorem ipsum
                                            dolor
                                            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore
                                            magna aliqua.</p>
                                        <p class="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-content-end">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                        alt="avatar 1" style={{width: "45px", height: "100%"}} />
                                    <div>
                                        <p class="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Lorem ipsum
                                            dolor
                                            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore
                                            magna aliqua.</p>
                                        <p class="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-content-end">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                        alt="avatar 1" style={{width: "45px", height: "100%"}} />
                                    <div>
                                        <p class="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Lorem ipsum
                                            dolor
                                            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore
                                            magna aliqua.</p>
                                        <p class="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-content-end">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                        alt="avatar 1" style={{width: "45px", height: "100%"}} />
                                    <div>
                                        <p class="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Lorem ipsum
                                            dolor
                                            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore
                                            magna aliqua.</p>
                                        <p class="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-content-end">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                        alt="avatar 1" style={{width: "45px", height: "100%"}} />
                                    <div>
                                        <p class="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Lorem ipsum
                                            dolor
                                            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore
                                            magna aliqua.</p>
                                        <p class="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-content-end">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                        alt="avatar 1" style={{width: "45px", height: "100%"}} />
                                    <div>
                                        <p class="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Lorem ipsum
                                            dolor
                                            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore
                                            magna aliqua.</p>
                                        <p class="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-content-end">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                        alt="avatar 1" style={{width: "45px", height: "100%"}} />
                                    <div>
                                        <p class="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Lorem ipsum
                                            dolor
                                            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore
                                            magna aliqua.</p>
                                        <p class="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                    </div>
                                </div>
                            </div>
                            <div class="text-muted d-flex justify-content-start align-items-center p-2" style={{height:"15%"}}>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                    alt="avatar 3" style={{width: "40px", marginRight:"10px"}}  />
                                <input type="text" className="form-control form-control-lg" id="exampleFormControlInput2"
                                    placeholder="Type message" style={{height:"80%"}} />
                                <a className="btn" href="#!" style={{marginLeft:"10px"}}>
                                    <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                                </a>
                            </div>
                        </div>
                    </div>
        </>
    )
}
export default ChatContent