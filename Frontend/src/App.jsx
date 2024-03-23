import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Screens/Home/Home';
import IsSpam from './Screens/IsSpam/IsSpam';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpamCheck from './Screens/SpamCheck/SpamCheck';
import SpamNumCheck from './Screens/SpamCheck/SpamNumCheck';
import VBrowser from './Screens/VirtualBrowser/VBrowser';

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
