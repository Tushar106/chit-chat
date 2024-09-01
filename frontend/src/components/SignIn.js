import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignIn(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [error,setError]=useState("")
    const navigate=useNavigate()
    function empty() {
        if (email === "")
            return "Please Enter your email"
        else if (password === "")
            return "Please Enter your password"
        else if(error!=="")
        return error
    }
    function Toast(props) {
        return (
            <div className="align-items-center text-white bg-danger position-absolute  end-0 p-3" style={{ zIndex: "11", top: "12px" }}>
                <div className="d-flex">
                    <div className="body">
                        {props.data}.
                    </div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        onClick={() => setToast(false)}
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        )
    }

    const submit = async () => {
        if (email === "" || password === "" ) {
            setToast(true)
        }
        else {
            const body={
                email:email,
                password:password,
            }
            try {
                setLoading(true)
                const response=await axios.post("https://chit-chat-server-7y4zp2xxs-tushar106s-projects.vercel.app/api/user/login",body)
                localStorage.setItem("user",JSON.stringify(response.data))
                setLoading(false)
                navigate("/chat")
            } catch (error) {
                console.log(error.response.data.error)
                setError(error.response.data.error)
                setToast(true)
                setLoading(false)
            }
        }
    }
    return(
<form>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                                <input type="email"  className="form-control form-control-lg"
                                    placeholder="Enter a valid email address" onChange={(e)=>{setEmail(e.target.value)}} value={email}  />
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                                <input type="password"  className="form-control form-control-lg"
                                    placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}} value={password}  />
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} onClick={submit} disabled={loading}>Login</button>
                            </div>
                            {toast && <Toast data={empty()} />}

                        </form>
    )
}
export default SignIn