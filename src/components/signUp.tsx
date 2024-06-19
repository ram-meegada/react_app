import React, { useState, useEffect } from "react";
import "../css/signUp.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
    propemail: String;
    propusername: String;
    propfirst_name: String;
    proppassword: String
}

function SignUp({ 
    propemail,
    propusername,
    propfirst_name, 
    proppassword}: Props) {
        const navigate = useNavigate();
        const [email, setEmail] = useState(propemail);
        const [username, setUsername] = useState(propusername)
        const [first_name, setFirstName] = useState(propfirst_name) 
        const [password, setPassword] = useState(proppassword)
        const [loading, setLoading] = useState(false)
        const [message, setMessage] = useState("")

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try{
            axios.post("http://127.0.0.1:8000/registration/", {
                email,
                username,
                first_name,
                password
            })
            .then(response => {
                if (response.data.status == 200){
                    navigate('/login')
                    console.log('SignUp successfull', response.data);
                    }
                else if (response.data.status == 400){
                    console.log('error', response.data);
                    // window.location.reload()
                    setMessage(response.data.message)
                }
            })
            .catch(err => {
                console.error('SignUp error', err);
            });
        }
        catch(error) {
            setMessage("Server error.")
        }
    }    

    return (
        <>
            <div className="body-background">
                <form action="">
                    <h1 id="heading">SignUp here</h1>

                    <label htmlFor="email">Email:</label><br></br>
                    <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)}></input><br></br>

                    <label htmlFor="username">UserName:</label><br></br>
                    <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}></input><br></br>

                    <label htmlFor="first_name">First Name:</label><br></br>
                    <input type="text" id="first_name" name="first_name" onChange={(e) => setFirstName(e.target.value)}></input><br></br>

                    <label htmlFor="password">Password:</label><br></br>
                    <input type="text" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input><br/><br/>

                    <input type="submit" value="Sign Up" onClick={handleSignUp}></input>
                </form>
            </div>
            {message && <p>{message}</p>}
        </>
    )
}

export default SignUp;
