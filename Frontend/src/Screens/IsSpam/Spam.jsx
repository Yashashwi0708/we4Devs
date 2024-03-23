import React from 'react'
import itisSpam from '../../../Assets/itisSpam.png'
import './IsSpam.css'

const Spam = () => {
  return (
    <div className='outer'>
      <div className='glass'>
        <div className='left'>
          <img src={itisSpam} />
        </div>
        <div className='right'>
          <p style={{ color: '#FF203F' }}>This Messege is Spam</p>
          Link Detected
          Open In Virtual Browser
          <button>Virtual Brwoser</button>
        </div>
      </div>
    </div>
  )
}

export default Spam
