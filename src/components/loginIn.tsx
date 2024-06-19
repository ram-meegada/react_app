import React, {useState} from "react";
import '../css/signUp.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
    propemail: string;
    proppassword: string
}

function LoginIn({propemail, proppassword}: Props){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handleLogIn = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/user/login/", {
            email,
            password
        })
        .then(response => {
            console.log("login successfull", response.data);
            if (response.data.status == 400){
                setMessage(response.data.message)
                }
            else if (response.data.status == 200){
                localStorage.setItem("auth_token", response.data.data.access_token)
                navigate("/home")
                setMessage(response.data.message)
            }
        })
        .catch(error => {
            console.log("login err", error)
        })
    }

    return (
        <>
            <div className="body-background">
                <form action="">
                    <h1 id="heading">LogIn here</h1>

                    <label htmlFor="email">Email:</label><br></br>
                    <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)}></input><br></br>

                    <label htmlFor="password">Password:</label><br></br>
                    <input type="text" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input><br/><br/>

                    <input type="submit" value="Login" onClick={handleLogIn}></input>
                </form>
            </div>
            {message && <p>{message}</p>}
        </>
    )
};

export default LoginIn;