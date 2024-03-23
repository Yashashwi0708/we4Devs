import React from 'react'
import notSpam from '../../../Assets/notSpam.png'
import './IsSpam.css'

const NotSpam = () => {
    return (
        <div className='outer'>
            <div className='glass'>
                <div className='left'>
                    <img src={notSpam} alt='spam' />
                </div>
                <div className='right'>
                    <p style={{ color: 'green' }}>This Message is Not Spam</p>
                    
                    <p>Link Detected</p>
                    <p>Open In Virtual Browser</p>
                    <button>Virtual Browser</button>
                </div>
            </div>
        </div>
    )
}

export default NotSpam
