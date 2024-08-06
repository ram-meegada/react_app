import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../components/sidebar";
import '../css/editColor.css'
import { BASE_URL } from '../utils';

const ViewColour = () => {
    const location = useLocation()
    const api_token = localStorage.getItem("auth_token")
    const [ name, setName ] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const id = location.state?.record_id 
            const api_hit = await fetch(`${BASE_URL}edit-color/${id}/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${api_token}`,
                    "Content-Type": "application/json",
                }
            });
            const response = await api_hit.json();
            console.log(response, '----response----');
            
            if (api_hit.ok) {
                setName(response.data?.name)
            }
            else {
                toast.error("Something went wrong")
            }
        }
        fetchData();
    }, [])

  return (
    <>
      <SideBar />
        <div className="edit-color-container">
          <p>Edit Color</p>
          <input
            type="text"
            id='box1'
            value={ name }
            readOnly
          ></input>
        </div>
      <ToastContainer />
    </>
  )
}

export default ViewColour;
