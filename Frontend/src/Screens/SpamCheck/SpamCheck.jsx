import React, { useState } from 'react'
import spamCheck from '../../../Assets/jyot.png';
import '../Home/home.css';
import './spamcheck.css';
import axios from 'axios';
import IsSpam from './../IsSpam/IsSpam';

const API_URL = import.meta.env.VITE_HOST;

const SpamCheck = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false); // State to track loading status

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

        setLoading(true);

        axios(`${API_URL}/checkSpam`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "inputs": text
            }),
        }).then((res) => {
            setResult({ "body": res.data, "text": text });
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }
    return (
        <>
            {
                result === '' ? (
                    <div>
                        <div className="gpt3__header section__padding" id="home">
                            <div className="gpt3__header-content">
                                <h1 className="gradient__text">Check Spam Text</h1>
                                <p className='text2'>Feel confident knowing that our advanced security system is diligently analyzing messages and links to protect you from potential threats</p>
                                {   
                                    loading ? <p>Loading...</p> :
                                    <>
                                    <textarea className='glass2' type="text" placeholder="Enter the text here" onChange={handleText} />
                                    <div className="gpt3__header-content__input">
                                        <button type="button" onClick={handleClick} style={{ fontSize: "1.35rem" }}>Submit</button>
                                    </div>
                                    </>
                                }
                            </div>

                            <div className="gpt3__header-image vert-move">
                                <img style={{ scale: "1.25" }} src={spamCheck} />
                            </div>
                        </div>
                    </div>
                ) : (
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


