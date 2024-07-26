import React, { useEffect, useState } from "react";
import "../css/viewProfile.css";
import SideBar from "../components/sidebar";
import { BASE_URL } from "../utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ViewProfile() {
  const [profile_picture, setProfile] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const api_token = localStorage.getItem("auth_token")

  useEffect(() => {
    const last_name = localStorage.getItem("last_name");

    setProfile(localStorage.getItem("profile_picture") || "");
    setFirstName(localStorage.getItem("first_name") || "");
    setEmail(localStorage.getItem("email") || "");
    setLastName(last_name || "");
  }, []);

  const fetchData = async (e:React.FormEvent) => {
    e.preventDefault();
    const PAYLOAD = {"first_name": first_name, "last_name": last_name}
    const api_hit = await fetch(`${BASE_URL}user/update/`, {
        method: "PUT", 
        body: JSON.stringify(PAYLOAD),
        headers: {
            Authorization: `Bearer ${api_token}`,
            "Content-Type": "application/json",
          },
    }) 
    const response = await api_hit.json()
    if (api_hit.ok) {
        toast.success(response.message)
        localStorage.setItem("first_name", response.data.first_name)
        localStorage.setItem("last_name", response.data.last_name)
    }
    else {
        toast.error(response.message)
    }
  }

  return (
    <>
      <SideBar />
      <form onSubmit={fetchData}>
        <div className="view-profile">
          <div className="view-profile-profile-name">
            <div className="view-profile-profile-name-first-layer">
              <img src={profile_picture} alt="Profile"></img>
            </div>
            {/* <div className="view-profile-cam-logo">
                <img src="../cam_logo.jfif" alt=""></img>
            </div> */}
          </div>
          <div className="view-profile-edit-details">
            <input
              type="text"
              placeholder="email"
              name="email"
              value={email}
              readOnly
            ></input>
            <input
              type="text"
              placeholder="first name"
              name="first_name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="last name"
              name="last_name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            ></input>

            <input type="submit" value="Save" className="btn-submit"></input>
          </div>
        </div>
      </form>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default ViewProfile;
