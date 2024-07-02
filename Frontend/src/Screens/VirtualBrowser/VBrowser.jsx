import './vbrowser.css';
const API_URL = import.meta.env.VITE_HOST;

import React, { useState, useEffect } from 'react'
import spamCheck from '../../../Assets/disposableBrowsers.png';

const VBrowser = (props) => {
  const [url, setURL] = useState('');
  const [resp, setResp] = useState('');
  const [isErr, setIsErr] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/startContainer?url=${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 429) {

        alert('Error: Queue full, please try again later.');
        throw new Error('Queue full, please try again later.');
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setIsErr(false);
      console.log(data);
      const new_url = data.url;
      setResp(new_url);
      setTimerActive(true);
    } catch (error) {
      console.error('Error:', error);
      setIsErr(true);
      setResp('');
      // alert('This can only be accessed from Walchand Campus Network (WIFI6) for now.');

    }
  }


  const handleChange = (e) => {
    setURL(e.target.value);
  }
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  return (
    <div>
      <div className="gpt3__header section__padding" id="home" >

        <div className="gpt3__header-content">
          <h1 className="gradient__text">Start Disposable Browser</h1>
          <p className='text2'>Start a 10 minute disposable browser session. <br />Keep your online activities private and your devices safe from malware.</p>
          {
            !resp && <div className="num">
              <input type="text" placeholder="Enter URL (optional) " onChange={handleChange} />
              <button type="button" onClick={handleSubmit}>Start</button>
            </div>
          }
        </div>

        {
          !resp ? <div className="gpt3__header-image vert-move">
            <img style={{ scale: "1.25" }} src={spamCheck} />
          </div>
            :
            <div style={{display:'flex', justifyContent:'center',alignItems:'center' , width:'50%', height:'100%'}}>
              <div className="gpt3__header-content glass" style={{ height: '60%', padding:'5% 2%', margin:'18% 0'}}>
                {
                  isErr ? <p className='gradient__text' style={{ fontWeight: '500' }}>At the moment, this service can only be accessed from Walchand Campus Network (WIFI6).</p> :
                  <>
                  <p className='gradient__text' style={{ fontWeight: '500' ,fontSize:'1.4rem' }}>Session started at URL: <a href={resp} target="_blank">{resp}</a></p>
                  <p className='text2'>Your disposable browser session is active for {formatTime(timeRemaining)}.<br /> Do not refresh this page, else you will lose the session.</p>
                  </>
                }
              </div>
            </div>
        }

      </div>
    </div>
  )

};

export default VBrowser;
