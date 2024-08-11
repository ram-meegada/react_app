import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import "../css/attemptQuiz.css";
import { BASE_URL } from "../utils";
import { toast } from "react-toastify";

interface GeneratedQuestion {
  id: number;
  question: string;
  options: Array<string>;
}

const AttemptQuiz = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [data, setData] = useState<GeneratedQuestion | null>(null);
  const api_token = localStorage.getItem("auth_token");

  useEffect(() => {
    console.log("111111111111111111111");

    async function fetchData() {
      const api_hit = await fetch(`${BASE_URL}generate-question/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${api_token}`,
          "Content-Type": "application/json",
        },
      });
      const api_response = await api_hit.json();
      if (api_hit.ok) {
        setData(api_response.data);
      } else {
        toast.error("Something happened");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(selectedOption, "222222222222222222222");
  }, [selectedOption]);

  const handleSubmit = () => {
    
  }

  return (
    <>
      <SideBar></SideBar>
      <h1 style={{ marginLeft: "600px" }}>Attempt Quiz</h1>
      <form onSubmit={ handleSubmit }>
        <div className="attemptquiz-container">
          <div className="attemptquiz-header">
            <h3>Question 1/20</h3>
            <h3 style={{ color: "black" }}>10:30</h3>
          </div>
          <div className="attemptquiz-question">
            <p>{data?.question}</p>
          </div>
          <div className="attemptquiz-options">
            {data?.options.map((option, index) => (
              <div
                className="attemptquiz-single-option"
                key={index}
                onClick={() => setSelectedOption(index)}
                style={{
                  backgroundColor:
                    selectedOption === index ? "blue" : "rgb(246, 54, 54)",
                }}
              >
                <div>
                  <p>{option}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>

      <button className="attemptquiz-next-button">Next</button>
    </>
  );
};

export default AttemptQuiz;
