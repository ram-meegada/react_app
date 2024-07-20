import React, { useEffect, useState } from "react";
import "../css/viewProfile.css";
import SideBar from "../components/sidebar";

function ViewProfile() {
  const [profile_picture, setProfile] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const last_name = localStorage.getItem("last_name");

    setProfile(localStorage.getItem("profile_picture") || "");
    setFirstName(localStorage.getItem("first_name") || "");
    setEmail(localStorage.getItem("email") || "");
    setLastName(last_name || "");
  });

  return (
    <>
      <SideBar />
      <form>
        <div className="view-profile">
          <div className="view-profile-profile-name">
            <div className="view-profile-profile-name-first-layer">
              <img src={profile_picture} alt="Profile"></img>
            </div>
            <div className="view-profile-cam-logo">
                <img src="../cam_logo.jfif" alt=""></img>
            </div>
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
            ></input>
            <input
              type="text"
              placeholder="last name"
              name="last_name"
              value={last_name}
            ></input>

            <input type="submit" value="Save" className="btn-submit"></input>
          </div>
        </div>
      </form>
    </>
  );
}

export default ViewProfile;
