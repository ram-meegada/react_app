import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.status == 403) {
      toast.info(location.state?.toast_message)
    }
    else {
      toast.success(location.state?.toast_message);
    }
    navigate(location.pathname, { replace: true, state: null });
  }, []);

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/user/login/", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const api_response = await response.json();
    if (response.ok) {
      console.log("login successfull");
      localStorage.setItem("auth_token", api_response.data.access_token);
      navigate("/home", { state: {toast_message: api_response.message} });
    } 
    else if (!response.ok) {
      toast.error(api_response.message);
    }
  };

  return (
    <>
      <div className="body-background">
        <form onSubmit={handleLogIn}>
          <h1 className="heading-cls">LogIn here</h1>

          <input
            type="text"
            id="email"
            name="email"
            className="input-box"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <input
            type="password"
            id="password"
            name="password"
            className="input-box"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <input type="submit" value="Submit" className="btn-submit"></input>
          <p className="login-para">
            Don't have account? <a href="/">Create Here</a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginIn;
