import React, { useState } from "react";
import SideBar from "../components/sidebar";
import "../css/addColor.css";
import { BASE_URL } from "../utils";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddColour = () => {
  const [name, setName] = useState("");
  const api_token = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  const PAYLOAD = { name: name };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const api_hit = await fetch(`${BASE_URL}add-color/`, {
      method: "POST",
      body: JSON.stringify(PAYLOAD),
      headers: {
        Authorization: `Bearer ${api_token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await api_hit.json()
    if (api_hit.ok) {
        navigate("/home", { state: { toast_message: response.message } })
    }
    else {
        toast.error(response.message)
    }
  };
  return (
    <>
      <SideBar />
      <form onSubmit={handleSubmit}>
        <div className="add-color-container">
          <p>Add Color</p>
          <input
            type="text"
            placeholder="Enter color"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="submit"
            value="Submit"
            className="add-color-btn-submit"
          ></input>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddColour;
