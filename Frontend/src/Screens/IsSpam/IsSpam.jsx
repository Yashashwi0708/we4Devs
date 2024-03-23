import React from 'react'


import './IsSpam.css'
import Spam from './Spam'
import NotSpam from './NotSpam'
const IsSpam = () => {
  const str="Subject: You Won! Congratulations! Hello, We are thrilled to inform you that you have been randomly selected as a winner in our exclusive online sweepstakes! You have a chance to claim a FREE brand new smartphone (limited time offer)!To claim your prize, simply click the link below and verify your account information. Act now! Don't miss out on this incredible opportunity www.jitoinam.comCongratulations again!Sincerely,The Devdut Firm Team"
  return (
    <>
      <Spam str={str}  />
      {/* <NotSpam /> */}
    </>
  )
}

export default IsSpam;