import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import "../css/quizListing.css";
import { BASE_URL } from "../utils";
import { useNavigate } from "react-router-dom";

interface QuizItems {
    "id": number,
    "title": string,
    "description": string
}

const QuizListing = () => {
  const api_token = localStorage.getItem("auth_token");
  const [data, setData] = useState<QuizItems[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const api_hit = await fetch(`${BASE_URL}quizzes/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${api_token}`,
          "Content-Type": "application/json",
        },
      });
      const api_response = await api_hit.json();
      if (api_hit.ok) {
        setData(api_response.data)
        // console.log(api_response.data);
      }
    };
    fetchData();
  }, []);
  const handleClick = () => {
    navigate("/attempt-quiz")
  }

  return (
    <>
      <SideBar></SideBar>
      <div className="quizlisting-heading">
        <h1>All Quizzes</h1>
      </div>
      <div className="quizlisting-container">
        {data.map((value, index) => (
          <div className="quizlisting-element" key={index}>
            <h2>{value.title}</h2>
            <p>{value.description}</p>
            <button className="quizlisting-button" onClick={handleClick}>start</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuizListing;
