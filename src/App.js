import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'; 
import Category from './Category';
import Checkout from './Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><Category /></>} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
