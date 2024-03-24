import React from 'react'


import './IsSpam.css'
import Spam from './Spam'
import NotSpam from './NotSpam'
const IsSpam = (props) => {
  console.log(props.result);
  const str = props.result.text
  const isSpam = props.result.body.is_Spam
  const score = props.result.body.probability
  console.log(props)
  return (
    <>
      {
        isSpam ? (
          <Spam str={str} score={score} setResult={props.setResult}/>
        ) : (
          <NotSpam score={score} setResult={props.setResult}/>
        )
      }
    </>
  )
}

export default IsSpam;