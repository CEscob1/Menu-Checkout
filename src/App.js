// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'; // Importa el componente Header
import Category from './Category';

function App() {
  return (
    <div>
      <Header /> 
      <Category/>
    </div>
  );
}

export default App;
