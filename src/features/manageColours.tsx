import React, { useEffect, useState } from 'react'
import SideBar from '../components/sidebar'
import '../css/manageColours.css'
import { toast, ToastContainer } from 'react-toastify'
import { BASE_URL } from '../utils'
import ColoursListingComponent from '../components/coloursListingComponent'

const ManageColours = () => {

    return (
        <>
            <SideBar />
            <ColoursListingComponent />
            <ToastContainer />
        </>
    )
}

export default ManageColours;
