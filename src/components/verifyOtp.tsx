import React, { HtmlHTMLAttributes, useEffect } from "react";
import "../css/verifyotp.css";
import { useState } from "react";
import { BASE_URL } from "../utils";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [box1, setBox1] = useState("");
  const [box2, setBox2] = useState("");
  const [box3, setBox3] = useState("");
  const [box4, setBox4] = useState("");
  const [email, setEmail] = useState("");
  const message = useLocation().state || {};
  const navigate = useNavigate();
  const msg = message.message;

  useEffect(() => {
	document.getElementById("box1")?.focus()
    if (msg) {
      toast.dismiss();
      setEmail(message.email);
      navigate(location.pathname, { replace: true, state: null });
      toast.success(msg);
    } else {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { otp: box1 + box2 + box3 + box4, email: email };

    try {
      const api_response = await fetch(`${BASE_URL}verify-otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response = await api_response.json();

      if (api_response.ok) {
        const message = response.message;
        const emailVerified = true;
        navigate("/", {
          state: { message: message, emailVerified: emailVerified },
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error, "------error------");
    }
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    const target = e.target as HTMLInputElement;
	console.log(e.key);
	
	if (e.key === "Backspace"){
		let box_id = target.id
		box_id = box_id.slice(0, box_id.length-1) + (parseInt(box_id[3]) - 1)
		console.log(box_id);
		
		document.getElementById(box_id)?.focus()
	}
	else {
		if (target.value.length === 1 && ["box1", "box2", "box3"].includes(target.id)) {
			document.getElementById(id)?.focus();
		  }	
	}
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1 style={{ fontSize: "140%" }}>Verify otp</h1>
          <div className="input-boxes">
            <input
              type="text"
              maxLength={1}
              className="box"
              id="box1"
              onChange={(e) => setBox1(e.target.value)}
              onKeyUp={(e) => handleKeyUp(e, "box2")}
			  style={{ cursor:"text" }}
            ></input>
            <input
              type="text"
              maxLength={1}
              className="box"
              id="box2"
              onChange={(e) => setBox2(e.target.value)}
              onKeyUp={(e) => handleKeyUp(e, "box3")}
            ></input>
            <input
              type="text"
              maxLength={1}
              className="box"
              id="box3"
              onChange={(e) => setBox3(e.target.value)}
              onKeyUp={(e) => handleKeyUp(e, "box4")}
            ></input>
            <input
              type="text"
              maxLength={1}
              className="box"
              id="box4"
              onChange={(e) => setBox4(e.target.value)}
			  onKeyUp={(e) => handleKeyUp(e, "box4")}
            ></input>
          </div>
          <input type="submit" className="sub-btn"></input>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default VerifyOtp;
