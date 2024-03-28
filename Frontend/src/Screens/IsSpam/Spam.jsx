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
    const getReqLink = `https://we4devs.onrender.com/startContainer?url=${link}`
    console.log(getReqLink);
    const res = await axios.get(getReqLink)
    const tempUrl = res.data.url;
    return setUrl(tempUrl);
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
    ["offer", 15],
    ["promotion", 16],
    ["win", 17],
    ["prize", 18],
    ["claim", 19],
    ["exclusive", 20],
    ["discount", 21],
    ["sale", 22],
    ["deal", 23],
    ["cash", 24],
    ["money", 25],
    ["voucher", 26],
    ["guaranteed", 27],
    ["special", 28],
    ["limited time", 29],
    ["discounted", 30],
    ["bonus", 31],
    ["reward", 32],
    ["save", 33],
    ["offer ends soon", 34],
    ["click now", 35],
    ["reply", 36],
    ["subscribe", 37],
    ["unsubscribe", 38],
    ["winning", 39],
    ["cash prize", 40],
    ["easy money", 41],
    ["earn", 42],
    ["enter now", 43],
    ["instant", 44],
    ["jackpot", 45],
    ["millionaire", 46],
    ["claim your prize", 47],
    ["limited offer", 48],
    ["get rich", 49],
    ["act fast", 50],
    ["best offer", 51],
    ["only today", 52],
    ["double your", 53],
    ["triple your", 54],
    ["money back", 55],
    ["refund", 56],
    ["unbeatable offer", 57],
    ["check now", 58],
    ["confirm", 59],
    ["verify", 60]
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
            <img src={itisSpam} alt='spam' style={{ position: 'relative', zIndex: -1 }} />
            <p className='text3'>{highlight(props.str, mp)}</p>
          </div>
          <div className='right '>
            <div className='score red'>{(100 - (props.score.toFixed(3)))}%</div>

            <p >This Message is Spam</p>

            {
              urlRegex.test(text) ? (
                <>
                  <p>Link Detected {text.match(urlRegex)[0]} <br /></p>
                  <button onClick={handleClick} >Open Virtual Browser</button>

                  <button className='button' onClick={() => props.setResult('')}>Go Back</button>
                </>
              ) : (
                <>
                  <p>No Link Detected</p>
                  <button className='button' onClick={() => props.setResult('')}>Go Back</button>
                </>
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