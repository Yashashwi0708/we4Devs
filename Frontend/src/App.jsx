import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Screens/Home/Home';
import IsSpam from './Screens/IsSpam/IsSpam';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpamCheck from './Screens/SpamCheck/SpamCheck';
import SpamNumCheck from './Screens/SpamCheck/SpamNumCheck';
import VBrowser from './Screens/VirtualBrowser/VBrowser';
import Bots from './Screens/Bots/Bots';
import AboutUs from './Screens/AboutUs/AboutUs';
import WhatIsSpam from './Screens/WhatIsSpam/WhatIsSpam';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/isSpam' element={<IsSpam />} />
          <Route path='/checkspam' element={<SpamCheck />} />
          <Route path='/spamnumber' element={<SpamNumCheck />} />
          <Route path='/vbrowser' element={<VBrowser />} />
          <Route path='/bots' element={<Bots />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/whatisspam' element={<WhatIsSpam />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
