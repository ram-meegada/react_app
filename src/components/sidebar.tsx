import React, { useEffect, useState } from "react";
import "../css/homePage.css";
import { BASE_URL } from "../utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function SideBar() {
  return (
    <>
      <div className="home-container">
        <div className="home-sidebar">
          <h1 className="home-sidebar-heading">
            <a href="/home">LOGO</a>
          </h1>
          <ul className="home-content">
            <li>
              <a href="#">Manage Colours</a>
            </li>
            <li>
              <a href="#">Manage Downloads</a>
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
      </div>
    </>
  );
}

export default SideBar;
