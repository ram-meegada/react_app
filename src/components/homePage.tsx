import React, { useEffect, useState } from "react";
import "../css/homePage.css";
import { BASE_URL } from "../utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import ColoursListingComponent from "./coloursListingComponent";

function HomePage() {
  const [profile_picture, setProfilePicture] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const api_token = localStorage.getItem("auth_token");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const api_hit = await fetch(`${BASE_URL}user/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${api_token}`,
            "Content-Type": "application/json",
          },
        });
        const response = await api_hit.json();
        if (api_hit.ok) {
          setProfilePicture(response.data.profile_picture);
          setFirstName(response.data.first_name || "");
          setLastName(response.data.last_name || "");
          localStorage.setItem(
            "profile_picture",
            response.data.profile_picture
          );
          localStorage.setItem("first_name", response.data.first_name);
          localStorage.setItem("last_name", response.data.last_name);

          toast.success(location.state?.toast_message)
          navigate(location.pathname, { state: null })
        } else if (!api_hit.ok) {
          console.log(response.status, '-----');
          
          if (response.status == 403) {
            navigate("/login", {
              state: {
                toast_message: response.message,
                status: response.status,
              },
            });
          } else {
            toast.error(response.message);
            return;
          }
        }
      };
      fetchData();
    } catch (err) {
      console.log(err, '----error-----');
    }
  }, []);
  return (
    <>
      <div className="home-container">
        <div className="home-sidebar">
          <h1 className="home-sidebar-heading">LOGO</h1>
          <ul className="home-content">
            <li>
              <a href="/manage-colours">Manage Colours</a>
            </li>
            <li>
              <a href="/download-files">Manage downloads</a>
            </li>
            <li>
              <a href="/chat">Chat With friend</a>
            </li>
            <li>
              <a href="/quiz-listing">Take Quiz</a>
            </li>
            <li>
              <a href="/speech">Speech App</a>
            </li>
          </ul>
        </div>
        <div className="home-top-bar">
          <div>
            <p
              style={{
                fontSize: "150%",
                margin: "8% 20px auto",
                fontFamily: "sans-serif",
              }}
            >
              Hi {(first_name + " " + last_name).trim()}
            </p>
          </div>
          <div className="home-top-bar-profile">
            <a href="/profile">
              <img src={profile_picture} alt="profile"></img>
            </a>
          </div>
        </div>
      </div>
      <ColoursListingComponent />
      <ToastContainer />
    </>
  );
}

export default HomePage;
