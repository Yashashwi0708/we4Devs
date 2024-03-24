import React from 'react'
import './Bots.css'
import whastapp from '../../../Assets/bots/whastapp-icon.jpg'
import telegram from '../../../Assets/bots/telegram-icon.jpeg'
import discord from '../../../Assets/bots/discord-icon.png'

function Bots() {
  return (
    <div className='container'>

      

      <div className='left'>
        <img src={whastapp} alt='WhatsApp' />
        <h1>WhatsApp Bot</h1>
        <p>Powered by Safe Guard</p>
      </div>
      
      <div className='center'>
        <img src={telegram} alt='Telegram' />
        <h1>Telegram Bot</h1>
        <p>Powered by Safe Guard</p>
      </div>
      
      <div className='right'>
        <img src={discord} alt='Discord '/>
        <h1>Discord Bot</h1>
        <p>Powered by Safe Guard</p>
      </div>
    
    </div>
  )
}

export default Bots