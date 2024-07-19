import React, { useEffect, useState } from "react";
import "../css/homePage.css";
import { BASE_URL } from "../utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [profile_picture, setProfilePicture] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const api_token = localStorage.getItem("auth_token")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const api_hit = await fetch(`${BASE_URL}user/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${api_token}`,
          "Content-Type": "application/json"
        }
      });
      const response = await api_hit.json()
      if (api_hit.ok) {
        setProfilePicture(response.data.profile_picture)
        setFirstName(response.data.first_name || "")
        setLastName(response.data.last_name || "")
        localStorage.setItem("profile_picture", response.data.profile_picture)
        localStorage.setItem("first_name", response.data.first_name)
        localStorage.setItem("last_name", response.data.last_name)
      }
      else if (!api_hit.ok) {
        if (api_hit.status === 403) {
          navigate("/login", { state: { toast_message: response.message, status: response.status } })
        }
        else {
          toast.error(response.message)
          return;
        }
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="home-container">
        <div className="home-sidebar">
          <h1 className="home-sidebar-heading">LOGO</h1>
          <ul className="home-content">
            <li>
              <a href="#">Manage Colours</a>
            </li>
            <li>
              <a href="#">Manage #</a>
            </li>
            <li>
              <a href="#">Manage #</a>
            </li>
            <li>
              <a href="#">Manage #</a>
            </li>
            <li>
              <a href="#">Manage #</a>
            </li>
          </ul>
        </div>
        <div className="home-top-bar">
          <div>
            <p style={{ fontSize: "150%", margin: "8% 20px auto", fontFamily: "sans-serif" }}>Hi {(first_name + " " + last_name).trim()}</p>
          </div>
          <div className="home-top-bar-profile">
            <a href="/profile"><img src={profile_picture} alt="profile"></img></a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default HomePage;
