import React from 'react';
import gpt3Logo from '../../Assets/we4Devs.png';
import './footer.css';

const Footer = () => (
    <div className="footer">
        <div className="footer-top">
            <h1 className="footer-title">Raise awareness and advocate for the prevention of spam and fraudulent messages.</h1>
        </div>
        <div className="footer-bottom">
            <img src={gpt3Logo} className="footer-logo" alt="GPT-3 Logo" />
            <p className="footer-text">All Rights Reserved</p>
            <p className="footer-text">@2024 we4Devs</p>
        </div>
    </div>
);


export default Footer;