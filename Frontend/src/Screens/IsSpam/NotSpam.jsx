import React from 'react'
import notSpam from '../../../Assets/notSpam.png'
import './IsSpam.css'

const NotSpam = () => {
    return (
        <div className='outer'><div className='glass'>
            <p>This Messege is Not Spam</p>
            <img src={notSpam} />
            <div>
                Link Detected
                Open In Virtual Browser
                
            </div>
        </div>
        </div>
    )
}

export default NotSpam
