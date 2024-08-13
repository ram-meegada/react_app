import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import "../css/manageColours.css";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../utils";
import { useNavigate } from "react-router-dom";

type Colour = {
  id: number;
  name: string;
};

const ColoursListingComponent = () => {
  const [colors, setColors] = useState<Colour[]>([]);
  const api_token = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const api_hit = await fetch(`${BASE_URL}colours/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${api_token}`,
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': "1"
          },
        });
        const response = await api_hit.json();
        if (api_hit.ok) {
          setColors(response.data)
        } else {
          toast.error(response.message);
        }
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleDelete = async (id: number) => {
    const api_hit = await fetch(`${BASE_URL}delete-color/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${api_token}`,
        "Content-Type": "application/json"
      },
    })
    const response = await api_hit.json();
    if (api_hit.ok) {
      window.location.reload();
      toast.success(response.message)
    }
    else {
      toast.error("Something went wrong")
    }
  }

  return (
    <>
      <a href="/add-color" className="add-button">
        Add Color
      </a>
      <div className="colours-table">
        <table>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((value, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{value.name}</td>
                <td style={{ width: "20%" }}>
                  <ul className="colours-table-action">
                    <li onClick={() => navigate("/view-color", { state: { record_id: value.id } } ) }><img src="view_logo.jpg" alt="view" /></li>
                    <li onClick={() => navigate("/edit-color", { state: { record: value } } ) } className="colours-table-action-edit"><img src="edit_logo.png" alt="edit" /></li>
                    <li onClick={() => handleDelete(value.id)} className="colours-table-action-delete"><img src="delete_logo.png" alt="delete" /></li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  );
};

export default ColoursListingComponent;
