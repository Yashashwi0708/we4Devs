import React from 'react';
import gpt3Logo from '../../Assets/we4Devs.png';
import './footer.css';

const Footer = () => (
    <div className="gpt3__footer section__padding">
        <div className="gpt3__footer-heading">
            <h1 className="gradient__text">Raise awareness and advocate for the prevention of spam and fraudulent messages.</h1>
            <br></br>
        </div>
        {/* <div className="gpt3__footer-links "> */}
        <div className="gpt3__footer-links_logo">
            <img src={gpt3Logo} alt="gpt3_logo" style={{ scale: "2", height: "100px" }} />
            <br></br>
            <br></br>
            <p>we4Devs</p>
            <p>All Rights Reserved</p>
        </div>
        {/* </div> */}
        <div className="gpt3__footer-copyright">
            <p>@2024 we4Devs</p>
        </div>
    </div>
);

export default Footer;