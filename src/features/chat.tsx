import React, { useState } from 'react'
import SideBar from '../components/sidebar'
import '../css/chat.css'

const ChatModule = () => {
    const [ message, setMessage ] = useState("")
    return (
        <>
            <SideBar></SideBar>
            <div className='chat-main-div'>
                <div className='chat-text-div'>
                    <input type='text' className='chat-text-area' onChange={(e) => setMessage(e.target.value)} ></input>
                    <button className='chat-send-button'>send</button>
                </div>
                <div className='chat-flow-div'>
                    { message }
                </div>
            </div>
        </>
    )
}

export default ChatModule;
