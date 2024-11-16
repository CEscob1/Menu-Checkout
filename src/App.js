import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'; 
import Category from './Category';
import Checkout from './Checkout';
import Editorder from './Editorder'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><Category /></>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/editOrder" element={<Editorder />} /> 
      </Routes>
    </Router>
  );
}

export default App;
