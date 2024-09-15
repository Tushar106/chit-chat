import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [pic, setPic] = useState("");
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [error,setError]=useState("")
    const navigate=useNavigate();

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


    const postDetail = (pic) => {
        setLoading(true);
        if (pic === undefined) {
            setPic()
        }
        else if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData();
            data.append("file", pic)
            data.append("upload_preset", "chatApp")
            data.append('cloud_name', "dbpdayu3c");
            fetch(`https://api.cloudinary.com/v1_1/dbpdayu3c/image/upload`, {
                method: "POST", body: data
            }).then((res) =>
                res.json()
            ).then((data) => {
                setPic(data.url.toString())
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })
        }
    }
    function empty() {
        if (name === "") {
            return "Please Enter your name"
        }
        else if (email === "")
            return "Please Enter your email"
        else if (password === "")
            return "Please Enter your password"
        else if (confirmPass === "")
            return "Please Enter your Confirm password"
        else if(password !== confirmPass)
        return "Password dont match!"
        else if(error!=="")
        return error
    }

    const submit = async () => {
        if (name === "" || email === "" || password === "" || confirmPass === "") {
            setToast(true)
        }
        else {
            if(confirmPass!==password){
                setToast(true)
                return
            }
            const body={
                name:name,
                email:email,
                password:password,
                picture:pic
            }
            try {
                setLoading(true)
                const response=await axios.post("https://chit-chat-server-7lyn.onrender.com/api/user/register",body)
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

    return (
        <form>
            <div className="form-outline mb-3 ">
                <label className="form-label" htmlFor="form3Example3">Name</label>
                <input type="text" id="form3Example3" className="form-control form-control-lg"
                    placeholder="Enter Your Name" onChange={(e) => { setName(e.target.value) }} value={name} required />
            </div>
            <div className="form-outline mb-3 ">
                <label className="form-label" htmlFor="form3Example3">Email address</label>
                <input type="email" className="form-control form-control-lg"
                    placeholder="Enter a valid email address" required onChange={(e) => { setEmail(e.target.value) }} value={email} />
            </div>
            <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">Password</label>
                <input type="password" className="form-control form-control-lg"
                    placeholder="Enter password" required onChange={(e) => { setPassword(e.target.value) }} value={password} />
            </div>
            <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">Confirm Password</label>
                <input type="password" className="form-control form-control-lg"
                    placeholder="Confirm password" required onChange={(e) => { setConfirmPass(e.target.value) }} value={confirmPass} />
            </div>
            <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">Upload Img</label>
                <input type="file" className="form-control form-control-lg" disabled={loading}
                    placeholder="Upload Img" accept="image/*" onChange={(e) => { postDetail(e.target.files[0]) }} />
            </div>


            <div className="text-center text-lg-start mt-4 pt-2">
                <button type="button" className="btn btn-primary btn-lg" disabled={loading}
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} onClick={submit}>Register</button>
            </div>

            {toast && <Toast data={empty()} />}

        </form>
    )
}
export default Register