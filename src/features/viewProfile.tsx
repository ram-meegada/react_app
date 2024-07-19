import React, { useEffect, useState } from 'react'
import "../css/viewProfile.css"
import SideBar from '../components/sidebar';

function ViewProfile() {
    const [profile_picture, setProfile] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        const last_name = localStorage.getItem("last_name")

        setProfile(localStorage.getItem("profile_picture") || "")
        setFirstName(localStorage.getItem("first_name") || "")
        setEmail(localStorage.getItem("email") || "")
        setLastName(last_name || "")
    })

    return (
        <>
            <SideBar />
            <div className='view-profile'>
                <div className='view-profile-profile-name'>
                    <div className='view-profile-profile-name-first-layer'>
                        <img src={profile_picture} alt='Profile'></img>
                    </div>
                </div>
                <div className='view-profile-edit-details'>
                    <input type='text' placeholder='email' value={email} readOnly></input>
                    <input type='text' placeholder='first name' value={first_name}></input>
                    <input type='text' placeholder='last name' value={last_name}></input>
                </div>
            </div>
        </>
    )
}

export default ViewProfile;
