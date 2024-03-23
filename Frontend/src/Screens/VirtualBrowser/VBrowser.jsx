import React from 'react';
import './vbrowser.css';
const VBrowser = () => {
  return (
    <>
      <div className='outer'>
        <iframe className='iframe' src="https://10.40.11.12:6800" title="Virtual Browser" />
      </div>
    </>
  );
};

export default VBrowser;
