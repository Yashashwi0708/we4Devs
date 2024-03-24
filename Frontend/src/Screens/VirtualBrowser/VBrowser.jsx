
import './vbrowser.css';

import React, { useState, useEffect } from 'react'
import spamCheck from '../../../Assets/spamCheck.png';


const VBrowser = (props) => {
  const [url, setURL] = useState('');
  const [resp, setResp] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);


  const handleSubmit = async () => {
    await fetch(`http://10.40.11.12:3000/startContainer?url=${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      console.log(res.json())
      return res.json();
    }).then(data => {
      console.log(data);
      setResp(data.url);
      setTimerActive(true);
    });
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
      <div className="gpt3__header section__padding" id="home">

        <div className="gpt3__header-content">
          <h1 className="gradient__text">Start Disposable Browser</h1>
          <p className='text2'>Start a 10 minute disposable browser session. <br/>Keep your online activities private and your devices safe from malware.</p>
          <div className="num">
            <input type="text" placeholder="Enter URL (optional) " onChange={handleChange} />
            <button type="button" onClick={handleSubmit}>Start</button>
          </div>
        </div>

        {
          resp===''? <div className="gpt3__header-image vert-move">
            <img style={{ scale: "1.25" }} src={spamCheck} />
          
          </div>:
          <div>
          <p className='text2'>Your disposable browser session is active for {formatTime(timeRemaining)}.</p>
          <p>URL: {resp}</p>
        </div>
        }

      </div>
    </div>
  )

  // const url = props.url || 'https://leetcode.com/jyot_150/';
  // console.log(url);
  // return (
  //   <>
  //     <div className='outer'>
  //       <iframe className='iframe' src={url} title="Virtual Browser" />
  //     </div>
  //   </>
  // );
};

export default VBrowser;
