import React, { useEffect, useState } from 'react'
import SideBar from '../components/sidebar'
import '../css/manageColours.css'
import { toast, ToastContainer } from 'react-toastify'
import { BASE_URL } from '../utils'

type Colour = {
    id: number,
    name: string
}

const ColoursListingComponent = () => {
    const [ colors, setColors ] = useState<Colour[]>([])
    const api_token = localStorage.getItem("auth_token")

    useEffect(() => {
        const fetchData = async () => {
            const api_hit = await fetch(`${BASE_URL}colours/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${api_token}`,
                    "Content-Type": "application/json",
                  },
            })
            const response = await api_hit.json()
            if (api_hit.ok) {
                setColors(response.data)
                console.log(response.data, typeof(response.data), '------colors-------');
                toast.success(response.message)
            }
            else {
                toast.error(response.message)
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <a href='#' className='add-button'>Add Color</a>
            <div className='colours-table'>
                <table>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colors.map((value, index) => (
                            <tr key={index}>
                                <td>{value.id}</td>
                                <td>{value.name}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </>
    )
}

export default ColoursListingComponent;
