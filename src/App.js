import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Category from './Category';
import Checkout from './Checkout';
import EditOrder from './Editorder';
import CheckoutEditOrder from './CheckoutEditOrder';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal con el Header y la categoría */}
        <Route path="/" element={<><Header /><Category /></>} />

        {/* Ruta para el checkout */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Ruta para editar una orden específica */}
        <Route path="/checkout/edit/:orderID" element={<CheckoutEditOrder />} />

        {/* Ruta para listar y administrar órdenes confirmadas */}
        <Route path="/editOrder" element={<EditOrder />} />
      </Routes>
    </Router>
  );
}

export default App;