import React from 'react'
import './Bots.css'
import whastapp from '../../../Assets/bots/whatsapp.png'
import telegram from '../../../Assets/bots/telegram.png'
import discord from '../../../Assets/bots/discord.png'

function Bots() {
  return (
    <div className='outer'>
      <div className='container'>
        <div className='left'>
          <img src={whastapp} alt='WhatsApp' />
          <h1>WhatsApp Bot</h1>
          <p>Powered by Safe Guard</p>
          <a href='' target='_blank' rel='noreferrer' style={{color:"white"}}>Add to WhatsApp</a>
        </div>
        <div className='center'>
          <img src={telegram} alt='Telegram' />
          <h1>Telegram Bot</h1>
          <p>Powered by Safe Guard</p>
          <a href='' target='_blank' rel='noreferrer' style={{color:"white"}}>Add to Telegram</a>
        </div>
        <div className='right'>
          <img src={discord} alt='Discord' style={{ scale: "1.2" }} />
          <h1>Discord Bot</h1>
          <p>Powered by Safe Guard</p>
          <a href='' target='_blank' rel='noreferrer' style={{color:"white"}}>Add to Discord</a>
        </div>
      </div>
    // </div>
  )
}

export default Bots