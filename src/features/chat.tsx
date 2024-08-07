import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import "../css/chat.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatModule = () => {
    const [ messages, setMessages ] = useState<string[]>([]);
    const [ input_message, setInputMessage ] = useState("");
    const [ socket, setSocket ] = useState<WebSocket | null>(null)

    useEffect(() => {
        const ws = new WebSocket("ws://127.0.0.1:8000/ws/chat/");
        setSocket(ws)

        ws.addEventListener("open", (event) => {
            toast.success("Connection established successfully.")
        });
        ws.addEventListener("message", (event) => {
            console.log(event.data)
        })
    }, []);

    const handleMessage = () => {
        socket?.send(input_message)
        setMessages([...messages, input_message])
        const chat_input = document.getElementById("chat-input") as HTMLInputElement
        chat_input.value = ""
    }

    return (
        <>
            <SideBar></SideBar>
            <div className="chat-container">
                <div className="messages">
                    { messages.map((value, index) => (
                        <p key={index}>{value}</p>
                    )) }
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="chat-input"
                        id="chat-input"
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button className="send-button" onClick={handleMessage}>Send</button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default ChatModule;
