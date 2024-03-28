import React, { useState } from 'react'
import spamCheck from '../../../Assets/jyot.png';
import '../Home/home.css';
import './spamcheck.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IsSpam from './../IsSpam/IsSpam';

const SpamCheck = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const handleText = (e) => {
        setText(e.target.value);
        console.log(text);
    }
    const handleClick = (e) => {
        if (text === '') {
            alert('Input field is empty!');
            return;
        }
        if (text.length < 10) {
            alert('Input text is too short!');
            return;
        }
        axios(`https://we4devs.onrender.com/checkSpam`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "inputs": text
            }),
        }).then((res) => {
            setResult({"body":res.data,"text":text});
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            {
                result==='' ? (
                    <div>
                        <div className="gpt3__header section__padding" id="home">
                            <div className="gpt3__header-content">
                                <h1 className="gradient__text">Check Spam Text</h1>
                                <p className='text2'>Feel confident knowing that our advanced security system is diligently analyzing messages and links to protect you from potential threats</p>
                                <textarea className='glass2' type="text" placeholder="Enter the text here" onChange={handleText} />
                                <div className="gpt3__header-content__input">
                                    <button type="button" onClick={handleClick} style={{fontSize:"1.35rem"}}>Submit</button>
                                </div>
                            </div>

                            <div className="gpt3__header-image vert-move">
                                <img style={{ scale: "1.25" }} src={spamCheck} />
                            </div>
                        </div>
                    </div> 
                ):(
                    <div>
                        <IsSpam result={result} setResult={setResult} />
                        {/* <button className='' onClick={() => setResult('')}>Go Back</button> */}
                    </div>
                )
        }

        </>
    )
}

export default SpamCheck


