import React from 'react'
import SideBar from '../components/sidebar'
import '../css/chat.css'

const ChatModule = () => {
    return (
        <>
            <SideBar></SideBar>
            <div className='chat-main-div'>
                <div className='chat-text-div'>
                    <input type='text'></input>
                    <button>send</button>
                </div>
            </div>
        </>
    )
}

export default ChatModule