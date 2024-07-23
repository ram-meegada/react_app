import React from 'react'
import SideBar from '../components/sidebar';
import '../css/addColor.css'

const AddColour = () => {
    return (
        <>
            <SideBar />
            <div className='add-color-container'>
                <p>Add Color</p>
                <input type='text' placeholder='Enter color'></input>
                <input type="submit" value="Submit" className="add-color-btn-submit"></input>
            </div>
        </>
    )
}

export default AddColour;