import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../css/homePage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface Book {
  id: number;
  name: string;
  price: string;
  book_id: number;
}

function HomePage() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState<Book[]>([]);
  const token = localStorage.getItem("auth_token");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/books/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("books fetched successfully");
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error, "came to error");
        setMessage(error);
      });
  }, []);

  const handleImageChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
  const handleImageUpload = (e: React.FormEvent) => {
    e.preventDefault();
    let form_data = new FormData
    if (image){
        // console.log(image, "---image----")
        form_data.append("file", image)
        form_data.append("name", image.name)
        form_data.append("title", image.type)
    }
    axios
      .post("http://127.0.0.1:8000/ppt-to-pdf/", form_data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMessage(response.data.message)
        console.log(response, "successfully uploaded---");
      })
      .catch((error) => {
        setMessage(error.response.data.message)
        // console.log(error.response.data.message, "---- error while upaoding -----");
      });
  };

  return (
    <>
      <div>
        <nav className="navbar">
          <h1 className="navbar-logo">MyApp</h1>
          <ul className="navbar-links">
            <li className="dropdown">
              <button className="dropbtn">Account</button>
              <div className="dropdown-content">
                <Link to="/viewprofile">View Profile</Link>
                <br />
                <Link to="/changepassword">Change Password</Link>
              </div>
            </li>
          </ul>
        </nav>
        <h1>Home Page</h1>
        <table>
          <tbody>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Price</th>
              <th>action</th>
            </tr>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button onClick={() => navigate(`/view-book/${item.id}`)}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <form>
          <input type="file" onChange={handleImageChangeUpload}></input>
          <button type="submit" onClick={handleImageUpload}>
            Upload
          </button>
        </form>
      </div>
      {message && <strong>{message}</strong>}
    </>
  );
}

export default HomePage;
