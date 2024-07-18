import React, { useEffect, useState } from "react";
import "../css/homePage.css";
import { BASE_URL } from "../utils";

function HomePage() {

  useEffect(() => {
    const fetchData = async () => {
      const api_hit = await fetch(`${BASE_URL}user/`, {
        method: "POST"
      })
      if (api_hit.ok) {

      }
    }
  }, [])
  return (
    <>
      <div className="home-container">
        <div className="home-sidebar">
          <h1 className="home-sidebar-heading">LOGO</h1>
          <ul className="home-content">
            <li><a href="#">Manage Colours</a></li>
            <li><a href="#">Manage #</a></li>
            <li><a href="#">Manage #</a></li>
            <li><a href="#">Manage #</a></li>
            <li><a href="#">Manage #</a></li>
          </ul>
        </div>
        <div className="home-top-bar">
          <div className="home-top-bar-profile">
            <img src="" alt="profile"></img>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;
