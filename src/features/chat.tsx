import React, { useEffect, useRef, useState } from "react";
import SideBar from "../components/sidebar";
import "../css/chat.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatModule = () => {
    const [ messages, setMessages ] = useState<string[]>([]);
    const [ input_message, setInputMessage ] = useState("");
    const [ socket, setSocket ] = useState<WebSocket | null>(null)
    const [displayedText, setDisplayedText] = useState<string>('');
    const [fullMessage, setFullMessage] = useState<string>('');
    const typingInterval = useRef<number | null>(null);
    const [ profile_picture, setprofilePicture ] = useState("")
    const [ index, setIndex ] = useState(0)

    useEffect(() => {
        const ws = new WebSocket("ws://127.0.0.1:8000/ws/sync-chatbot/");
        setSocket(ws)
        const profile_picture = localStorage.getItem("profile_picture")
        if (profile_picture){
            setprofilePicture(profile_picture)
        }
    }, []);

    useEffect(() => {
        socket?.addEventListener("open", (event) => {
            toast.success("Connection established successfully.")
        });
        socket?.addEventListener("message", (event) => {
            console.log(event.data, typeof(event.data), '------');
            // setMessages([...messages, event.data])
            setFullMessage(fullMessage + event.data);
        })
        socket?.addEventListener("close", () => {
            toast.error("Connection closed");
        })
    })

    useEffect(() => {
        const text = "Hi Iam Ram. Iam currently working as software developer in apptunix."
        function write_text() {
            
        }

    }, [fullMessage])


    const handleMessage = () => {
        socket?.send(input_message)
        setMessages(prevMessages => [...prevMessages, input_message])
        console.log(messages, '----messages----');

        const chat_input = document.getElementById("chat-input") as HTMLInputElement
        chat_input.value = ""
    }

    return (
        <>
            <SideBar></SideBar>
            <div className="chat-container">
                <div className="messages">
                    {/* { messages.map((value, index) => ( */}
                        {/* <div key={index} className="message-box"> */}
                            {/* <img src={profile_picture} alt="profile"></img> */}
                            {/* <p>{value}</p> */}
                        {/* </div> */}
                    {/* )) } */}
                    {fullMessage}
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
