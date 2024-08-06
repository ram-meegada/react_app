import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import "../css/chat.css";

const ChatModule = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const ws = new WebSocket("http://127.0.0.1:8000/ws/chat/");
    ws.addEventListener("open", (event) => {
      console.log("websocket is open");
    });
  }, []);

  return (
    <>
      <SideBar></SideBar>
      <div className="chat-container">
        <div className="messages"></div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message..."
            className="chat-input"
          />
          <button className="send-button">Send</button>
        </div>
      </div>
    </>
  );
};

export default ChatModule;
