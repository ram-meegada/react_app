import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../components/sidebar";
import '../css/editColor.css'
import { BASE_URL } from '../utils';

const EditColour = () => {
    const location = useLocation()
    const [ name, setName ] = useState(location.state?.record?.name)
    const api_token = localStorage.getItem("auth_token")
    const navigate = useNavigate()

    useEffect(() => {
        document.getElementById("box1")?.focus();
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = location.state?.record?.id 
        const api_hit = await fetch(`${BASE_URL}edit-color/${id}/`, {
            method: "PUT",
            body: JSON.stringify({name: name}),
            headers: {
                "Authorization": `Bearer ${api_token}`,
                "Content-Type": "application/json",
            }
        });
        const response = await api_hit.json();
        console.log(response, '----response-----');
        
        if (api_hit.ok) {
            navigate("/home", { state: {toast_message: response.message} });
        }
        else {
            toast.error("Something went wrong")
        }
    }
  return (
    <>
      <SideBar />
      <form onSubmit={handleSubmit}>
        <div className="edit-color-container">
          <p>Edit Color</p>
          <input
            type="text"
            id='box1'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="submit"
            value="Submit"
            className="edit-color-btn-submit"
          ></input>
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default EditColour;
