import React, { useEffect, useRef, useState } from "react";
import SideBar from "../components/sidebar";
import "../css/chat.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PAYLOAD } from "../paylaod";

const ChatModule = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input_message, setInputMessage] = useState("");
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [displayedText, setDisplayedText] = useState<string>('');
    const [fullMessage, setFullMessage] = useState<string>('');
    const [success_message, setSuccessMessage] = useState<string>('');
    const typingInterval = useRef<number | null>(null);
    const [profile_picture, setprofilePicture] = useState("")
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const n = "abcdefghijklmnopqrstuvwxyz"
        let random_string = ''
        for (let i=0; i<=10; i++){
            let num = Math.floor(Math.random() * n.length)
            random_string += n[num]
        }
        const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/`);
        setSocket(ws)
        const profile_picture = localStorage.getItem("profile_picture")
        if (profile_picture) {
            setprofilePicture(profile_picture)
        }
    }, []);

    useEffect(() => {
        socket?.addEventListener("open", (event) => {
            toast.success("Connection established successfully.")
        });
        socket?.addEventListener("message", (event) => {
            // console.log(event.data, typeof(event.data), '------');
            const data = JSON.parse(event.data)
            if (data.signal == 1) {

                setMessages([...messages, data.data])
                // console.log(data.data);
            }
            else if (data.signal == 0) {
                setSuccessMessage("Summary generated successfully")
                console.log("---------Summary generated successfully--------");

            }
            // setFullMessage(event.data);
        })
        socket?.addEventListener("close", (e) => {
            console.log(e, "---------connection closed--------");
            // toast.error("Connection closed");
        })
        // return () => {
        //     socket?.close()
        // }
    })

    useEffect(() => {
        if (success_message){
            toast.success(success_message)
        }
    }, [success_message])

    const handleMessage = () => {
        // const data = {
        //     "topic": "kane williamson",
        //     "words": 500,
        //     "language": "arabic",
        //     "region": "New zealand",
        //     "tone": "Realistic",
        //     "pronouns": "Third person"
        // }
        socket?.send(JSON.stringify({hit: input_message}))
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
                    {messages.map((value, index) => (
                        <div key={index} className="message-box">
                            {/* <img src={profile_picture} alt="profile"></img> */}
                            <div dangerouslySetInnerHTML={{__html: value}} />
                        </div>
                    ))}
                    {/* {fullMessage} */}
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
