import React from 'react'
import boxLock from '../../../Assets/boxLock.png';
import spamCheck from '../../../Assets/spamCheck.png';
import './home.css';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer';
const Home = () => {
  return (
    <>
      <div>
        <div className="gpt3__header section__padding" id="home">
          <div className="gpt3__header-content">
            <h1 className="gradient__text">Better Safe Than Sorry</h1>
            <p className="text2">Feel confident knowing that our advanced security system is diligently analyzing messages and links to protect you from potential threats</p>
            <div className="gpt3__header-content__input">
              <button type="button">
                <Link to={'/checkspam'}>Check Spam
                </Link>
              </button>
            </div>
          </div>

          <div className="gpt3__header-image vert-move">
            <img src={boxLock} />
          </div>
        </div>
      </div>
      <Footer/>

    </>
  )
}

export default Home

