import React, { useState } from 'react';
import itisSpam from '../../../Assets/itisSpam.png';
import './IsSpam.css';
// function containsLink(text) {
//   // Regular expression to match URLs
  
//   return;
// }
const Spam = (props) => {
  const text = props.str;
  // console.log(props);
  var urlRegex = /(http)/g;

  // containsLink(text);
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
  ]);

  function highlight(para, mp) {
    let highlightedText = para.replace(/\b\w+\b/g, function (word) {
      const lowerWord = word.toLowerCase();
      if (mp.has(lowerWord)) {
        return `<span style="color:black; background-color: white;">${word}</span>`;
      } else {
        return word;
      }
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  }

  return (
    <div className='outer'>
      <div className='glass'>
        <div className='left'>
          <img src={itisSpam} alt='spam' />
        </div>
        <div className='right'>
          <p style={{ color: '#FF203F' }}>This Message is Spam</p>
          {highlight(props.str, mp)}

          {
            urlRegex.test(text) ? (
              <>
                <p>Link Detected</p>
                <p>Open In Virtual Browser</p>
                <button >Virtual Browser</button>
              </>
            ) : (
              <p>No Link Detected</p>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Spam;