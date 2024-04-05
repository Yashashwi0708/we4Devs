import React from 'react'
import './Bots.css'
import whastapp from '../../../Assets/bots/whatsapp.png'
import telegram from '../../../Assets/bots/telegram.png'
import discord from '../../../Assets/bots/discord.png'

function Bots() {
  return (
    <div className='outer'>
      <div className='container'>
        <div className='chi glass2'>
          <img src={whastapp} alt='WhatsApp' />
          <h1 className='gradient__text' style={{fontSize:'1.6rem'}}>WhatsApp Bot</h1>
          <p>Powered by SafeGuard</p>
          <a href='https://wa.me/+15550684919' target='_blank' rel='noreferrer' style={{color:"white"}}>Add to WhatsApp</a>
        </div>
        <div className='chi glass2'>
          <img src={telegram} alt='Telegram' />
          <h1 className='gradient__text' style={{fontSize:'1.6rem'}}>Telegram Bot</h1>
          <p>Powered by SafeGuard</p>
          <a href='https://t.me/SafeGuradBot' target='_blank' rel='noreferrer' style={{color:"white"}}>Add to Telegram</a>
        </div>
        <div className='chi glass2'>
          <img src={discord} alt='Discord'/>
          <h1 className='gradient__text' style={{fontSize:'1.6rem'}}>Discord Bot</h1>
          <p>Powered by SafeGuard</p>
          <a href='https://discord.com/oauth2/authorize?client_id=1221061876310474843&permissions=8&scope=bot' target='_blank' rel='noreferrer' style={{color:"white"}}>Add to Discord</a>
        </div>
      </div>
    // </div>
  )
}

export default Bots