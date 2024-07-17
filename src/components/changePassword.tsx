import React from "react";
import { useState } from "react";
import "../css/changePassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Payload {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

function ChangePassword() {
  const [data, setData] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const token = localStorage.getItem("auth_token")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const HandleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data["new_password"] != data["confirm_new_password"]) {
      setError("New password and confirm new password are not matching!")
      return;
    }
    axios.put("http://127.0.0.1:8000/change-password/", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response, '====response======');
      if (response.status == 200) {
        setError(response.data.message)
        navigate("/home");
      }
    })
    .catch((err) => {
      console.log(err, "---error--------");
      if (err.response.status == 400) {
        setError(err.response.data.message)
      }
    })
  };
  return (
    <>
      <div className="container">
        <h1>Change Password</h1>
        <form onSubmit={HandleChangePasswordSubmit}>
          <label htmlFor="old_password">Old Password:</label>
          <input type="text" id="old_password" name="old_password" onChange={(e) => setData((prevData) => ({...prevData, ["old_password"]: e.target.value})) } />

          <label htmlFor="new_password">New Password:</label>
          <input type="text" id="new_password" name="new_password" onChange={(e) => setData((prevData) => ({...prevData, ["new_password"]: e.target.value}))} />

          <label htmlFor="confirm_new_password">Confirm New Password:</label>
          <input
            type="text"
            id="confirm_new_password"
            name="confirm_new_password"
            onChange={(e) => setData((prevData) => ({...prevData, ["confirm_new_password"]: e.target.value}))}
          />
          <input type="submit"></input>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}

export default ChangePassword;
