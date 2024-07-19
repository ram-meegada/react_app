import React, { useEffect, useState } from "react";
import "../css/homePage.css";
import { BASE_URL } from "../utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
  useEffect(() => {
    const fetchData = async () => {
      console.log("7777777777777777777");

      const api_hit = await fetch(`${BASE_URL}user/`, {
        method: "GET",
        headers: {
          "Au"
        }
      });
      const response = await api_hit.json()
      if (api_hit.ok) {
      }
      else if (!api_hit.ok) {
        toast.error(response.message)
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
          <div className="home-top-bar-profile">
            <img src="" alt="profile"></img>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default HomePage;
