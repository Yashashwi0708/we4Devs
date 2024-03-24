import React, { useState } from 'react';
import itisSpam from '../../../Assets/itisSpam.png';
import './IsSpam.css';
import axios from 'axios';
import VBrowser from './../VirtualBrowser/VBrowser';
import { search } from 'truecallerjs';

const Spam = (props) => {
  const [url, setUrl] = useState('');
  const text = props.str;
  var urlRegex = /\b(?:https?:\/\/|ftp:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/\S*)?(?:\?\S*)?\b/gi;
  ;

  const [link, setLink] = useState('');
  const handlechange = (e) => {
    setLink(e.target.value);
  }

  const handleClick = async () => {
    const getReqLink = `http://10.40.11.12:3000/startContainer?url=${link}`
    console.log(getReqLink);
    const res = await axios.get(getReqLink)
    const tempPORT = res.data.url;
    const port = tempPORT[18] + tempPORT[19] + tempPORT[20] + tempPORT[21];
    setUrl(`https://10.40.11.12:${port}`);
  }

  const mp = new Map([
    ["randomly", 1],
    ["sweepstakes", 2],
    ["act", 3],
    ["congratulations!", 4],
    ["phishing", 5],
    ["urgent", 6],
    ["limited", 7],
    ["good", 8],
    ["wire", 9],
    ["prepay", 10],
    ["account", 11],
    ["social", 12],
    ["credit", 13],
    ["free", 14],
  ]);

  function highlight(para, mp) {
    let highlightedText = para.replace(/\b\w+\b/g, function (word) {
      const lowerWord = word.toLowerCase();
      if (mp.has(lowerWord)) {
        return `<span style="color:white; background-color: #ee4e4e; border-radius:2px">${word}</span>`;
      } else {
        return word;
      }
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  }

  return (
    <div>

      <div className='outer'>

        <div className='glass'>

          <div className='left'>
            <img src={itisSpam} alt='spam' style={{position:'relative', zIndex:-1}}/>
            <p className='text3'>{highlight(props.str, mp)}</p>
          </div>
          <div className='right '>
            <div className='score red'>{(100 - (props.score.toFixed(3)))}%</div>

            <p >This Message is Spam</p>


            {
              urlRegex.test(text) ? (
                <>
                  <p>Link Detected {text.match(urlRegex)[0]} <br/></p>
                  <button onClick={handleClick} >Open Virtual Browser</button>
                </>
              ) : (
                <p>No Link Detected</p>
              )
            }
          </div>
        </div>
      </div>{
        url === '' ? null : <VBrowser url={url} />
      }
    </div>
  );
};

export default Spam;