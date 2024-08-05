import React from 'react'
import SideBar from '../components/sidebar'
import '../css/downloadFiles.css'

const DownloadFiles = () => {
    const handleDownload = () => {
        const link = 'https://enilcon.s3.ap-south-1.amazonaws.com/177418_kgf.webp';
        const click_link = document.createElement("a");
        
        click_link.href = link;
        click_link.target = "_blank"
        click_link.download = "image.jpg"; // Ensure this is the correct filename
        
        // Append link to the body
        document.body.appendChild(click_link);
        
        // Trigger download
        click_link.click();
        
        // Clean up
        document.body.removeChild(click_link);
    }
    return (
        <>
            <SideBar />
            <div>
                <p>Download File</p>
                <button className='download-button' onClick={handleDownload}>Click</button>
                <a href='cam_logo.jfif' target='blank' download> download here</a>
            </div>
        </>
    )
}

export default DownloadFiles
