import React, { useState } from 'react'
import spamCheck from '../../../Assets/spamCheck.png';

const SpamNumCheck = () => {
    const [number,setNumber]=useState('');
    const [res,setRes]=useState({}); // will be an object with detail of number 
    const handleSubmit=()=>{
        fetch('10.40.11.12:3000/checkSpam',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({number:number})
        }).then(res=>res.json())
    }
    const handleChange=(e)=>{
        setNumber(e.target.value);
        console.log(number);
    }

    return (
        <div>
            <div className="gpt3__header section__padding" id="home">
                <div className="gpt3__header-content">
                    <h1 className="gradient__text">Check Spam Number</h1>
                    <p className='text2'>Easily retrieve user details using their phone number <br/> Powered by <span style={{color:'#2589ff',backgroundColor:'aliceblue', padding:'0 0.55rem 0 0.45rem', borderRadius:'5px'}}>Truecaller</span></p>
                    <div className="num">
                        <input type="text" placeholder="Enter Phone Number " onChange={handleChange} />
                        <button type="button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div className="gpt3__header-image">
                    <img style={{scale:'0.75'}} src={spamCheck} />
                </div>
            </div>
        </div>
    )
}

export default SpamNumCheck
