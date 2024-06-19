import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Props {
  book_id: number;
}
interface ApiResponse {
  id: number;
  name: string;
  price: number;
}

function ViewBook() {
  let { book_id } = useParams();
  const [api_response, setResponse] = useState<ApiResponse>({
    id: 0,
    name: "",
    price: 0,
  });
  const token = localStorage.getItem("auth_token");
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/book/${book_id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setResponse(response.data.data);
        console.log(response.data, "---api response----");
      })
      .catch((error) => {
        console.log(error, "---api error----");
      });
  }, []);

  return (
    <>
      <h1>book details</h1>
      <p>id:- {api_response.id}</p>
      <p>name:- {api_response.name}</p>
      <p>price:- {api_response.price}</p>
    </>
  );
}

export default ViewBook;
