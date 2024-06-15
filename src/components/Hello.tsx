import React, { useState, useEffect } from "react";
// import axiosInstance from "../axiosInstance";
import axios from "axios";
 
interface Props {
    propdata: object;
}

function Hello({ propdata }: Props){
    const [data, setData] = useState(propdata);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/testing/")
        .then(response => {
            setData(response.data);
            setloading(false);
        })
        .catch(error => {
            console.log('some error', error);
            setloading(false);
        })
    }, []);
    if (loading) return <div>loading.....</div> 
    return (
        <>
            <pre>{JSON.stringify(data, null)}</pre>
        </>    
    )
}

export default Hello;