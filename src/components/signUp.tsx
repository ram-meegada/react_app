import React, { useState, useEffect } from "react";
import "../css/signUp.css";
import { BASE_URL } from "../utils";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  propemail: string;
  proppassword: string;
}

function SignUp({ propemail, proppassword }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(propemail);
  const [password, setPassword] = useState(proppassword);
  const [emailVerified, setEmailVerified] = useState(false);
  const location = useLocation() || {};

  // if (location.state) {
  //   setEmailVerified(location.state.emailVerified)
  // }

  useEffect(() => {
    if (location.state) {
      toast.success(location.state.message);
      setEmailVerified(location.state.emailVerified);
      navigate(location.pathname, { replace: true, state: null });
    if (localStorage.getItem("email")) {
      const email_from_local_storage = localStorage.getItem("email");
      setEmail(email_from_local_storage ? email_from_local_storage : "");
      console.log(email, "-------");
    }
    }
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    console.log(location.state?.emailVerified, "-----");

    if (!emailVerified) {
      toast.warning("Please verify your mail before registration");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}registration/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const api_response = await response.json();
      if (!response.ok) {
        toast.error(api_response.message);
      } else if (response.ok) {
        localStorage.removeItem("email");
        navigate("/login", { state: { toast_message: api_response.message } });
        // toast.success(api_response.message);
      }
    } catch (error) {
      console.log(error, "----error-----");
    }
  };
  const handleSendOtp = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (email.length == 0) {
      toast.info("Please enter email to verify.");
      return;
    }
    const userAgent = window.navigator.userAgent;
    localStorage.setItem("email", email);
    const data = { email: email, device_id: userAgent };

    try {
      const api_response = await fetch(`${BASE_URL}send-otp/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await api_response.json();
      if (api_response.ok) {
        const message = response.message;
        navigate("/verify-otp", { state: { message, email } });
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err, "--------err----------");
    }
  };

  return (
    <>
      <div className="body-background">
        <form onSubmit={handleSignUp}>
          <h1 className="heading-cls">SignUp here</h1>

          <div style={{ position: "relative" }}>
            <input
              type="text"
              className="input-box"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            ></input>
            <div style={{ position: "absolute", right: "3%", bottom: "33%" }}>
              <a
                href="/verify-otp"
                style={{ textDecoration: "none", color: "blue" }}
                onClick={handleSendOtp}
              >
                verify
              </a>
            </div>
          </div>

          <input
            type="password"
            className="input-box"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          ></input>

          <input type="submit" value="Submit" className="btn-submit"></input>
          <p className="login-para">
            Do you have account? <a href="/login">Login Here</a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignUp;
