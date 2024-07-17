import axios from "axios";
import React, { FormEvent } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProfileData {
  email: string;
  username: string;
  first_name: string;
  profile_picture: string;
}

function ProfileComponent() {
  const [data, setData] = useState<ProfileData>({
    email: "",
    username: "",
    first_name: "",
    profile_picture: ""
  });
  const [image, setImage] = useState<File | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstname] = useState("");
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
        setEmail(response.data.data.email);
        setUsername(response.data.data.username);
        setFirstname(response.data.data.first_name);
        setImage(response.data.data.profile_picture);
        console.log(response.data.data, "---- response ----");
      })
      .catch((err) => {
        console.log(err.response.data.message, "----err response ----");
      });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("email", email);
    form_data.append("username", username);
    form_data.append("first_name", first_name);
    console.log(image, '---- image ----')
    image && form_data.append("profile_picture", image);

    axios
      .put(`http://127.0.0.1:8000/user/update/`, form_data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.status == 200){
            navigate("/home");
        }
        console.log(response.data.data, "---- data ----");
      })
      .catch((error) => {
        console.log(error, "---- error ----");
      });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
        setImage(e.target.files[0]);
    }
  }

  return (
    <>
      <div>
        <h1>Edit Profile</h1>
        <br></br>
        <form>
          {image && (
            <img
              style={{ borderRadius: "50%", width: "100px", height: "100px" }}
              src={`http://127.0.0.1:8000/${image}`}
              alt="Image"
            />
          )}
          <label htmlFor="profile_picture">Profile Picture</label>
          <br />
          <br />
          <input
            type="file"
            id="profile_picture"
            name="profile_picture"
            onChange={handleChangeImage}
          />
          <br></br>

          <label htmlFor="email">Email:</label>
          <br></br>
          <input
            type="text"
            id="email"
            name="email"
            value={data?.email}
            readOnly
          ></input>
          <br></br>

          <label htmlFor="username">UserName:</label>
          <br></br>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <br></br>

          <label htmlFor="first_name">First Name:</label>
          <br></br>
          <input
            type="text"
            id="first_name"
            name="first_name"
            onChange={(e) => setFirstname(e.target.value)}
            value={first_name}
          ></input>
          <br />
          <br />
          <button onClick={handleSubmit}>Save</button>
        </form>
      </div>
    </>
  );
}

export default ProfileComponent;
