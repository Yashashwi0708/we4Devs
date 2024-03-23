import React from 'react';
import './vbrowser.css';
const VBrowser = (props) => {
  const url = props.url || 'https://leetcode.com/jyot_150/';
  console.log(url);
  return (
    <>
      <div className='outer'>
        <iframe className='iframe' src={url} title="Virtual Browser" />
      </div>
    </>
  );
};

export default VBrowser;
