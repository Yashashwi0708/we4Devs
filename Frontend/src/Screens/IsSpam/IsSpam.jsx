import React from 'react'


import './IsSpam.css'
import Spam from './Spam'
import NotSpam from './NotSpam'
const IsSpam = (props) => {
  console.log(props.result);
  const str = props.result.text
  const isSpam = props.result.body.is_Spam
  return (
    <>
      {
        isSpam ? (
          <Spam str={str} />
        ) : (
          <NotSpam />
        )
      }
    </>
  )
}

export default IsSpam;