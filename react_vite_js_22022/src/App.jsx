import React, { useState } from 'react';
import Home from './layout/Home';
import './index.css'
import './App.css'


const App = () => {
  const [carrito, setCarrito] = useState([]);
  console.log('carrito desde app []', carrito)

  const handleAgregarCarrito = (producto) => {
    console.log('producto desde app handlecarrito', producto)
    setCarrito([...carrito, producto]);
  };

  return (
    <Home 
      carrito={carrito} 
      handleAgregarCarrito={handleAgregarCarrito} 
    />
  );
};

export default App;

