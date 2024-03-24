import React from 'react';
import we4Devs from '../../../Assets/we4Devs.png';

const AboutUs = () => {
    return (
        
        <div>
        <div className="gpt3__header section__padding" id="home">
          <div className="gpt3__header-content">
            <h1 className="gradient__text">Hackathon Project</h1>
            <p className="text2">This website is made as part of Hackathon Project</p>
            <p className="text2">For the purpose to ensure security awerness and browser safety SafeGaurd has been made</p>
            <p className="text2">We are altogether the students of Walchand College Of Enginnering, Sangli</p>
            
            <p className="text2">We are Team <b>we4Devs</b></p>
            <p ><a href='https://www.linkedin.com/in/yashashwi-patil-95b824225/'>Yashashwi Patil</a></p>
            <p ><a href='https://www.linkedin.com/in/jyotiraditya-patil-996933230/'>Jyotiraditya Patil</a></p>
            <p ><a href='https://www.linkedin.com/in/smit-butle-17ba97240/'>Smit Butle</a></p>
            <p ><a href='https://www.linkedin.com/in/siddheshkitkaru/'>Siddhesh Kitkaru</a></p>

            <div className="gpt3__header-contFeel confident knowing that our advanced security system is diligently analyzing messages and links to protect you from potential threatsent__input">
            </div>
          </div>

          <div className="gpt3__header-image vert-move">
            <img src={we4Devs} />
          </div>
        </div>
      </div>

    );
};

export default AboutUs;