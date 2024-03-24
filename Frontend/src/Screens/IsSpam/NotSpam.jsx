import React from 'react'
import notSpam from '../../../Assets/notSpam.png'
import './IsSpam.css'

const NotSpam = (props) => {
    return (
        <div className='outer'>
            <div className='glass'>
                <div className='left'>
                    <img src={notSpam} alt='spam' />
                </div>
                <div className='right'>
                    <div className='score'>{(100 - (props.score.toFixed(3)))}%</div>
                    
                    <p>Good to go! <br/> This message is not spam.</p>
                    <button className='button' onClick={() => props.setResult('')}>Go Back</button>
                </div>
            </div>
        </div>
    )
}

export default NotSpam
