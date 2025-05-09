import React, { useState } from 'react';
import Home from './layout/Home';
import './index.css'
import './App.css'
//import Root from './routes/routes';

const App = () => {
  const [carrito, setCarrito] = useState([]);
  //console.log('carrito desde app []', carrito)

// En el componente padre:
const handleAgregarCarrito = (producto, cantidad) => {
  setCarrito(prevItems => {
    const itemExistente = prevItems.find(item => item.nombre === producto.nombre);
    
    if (itemExistente) {
      return prevItems.map(item =>
        item.nombre === producto.nombre
          ? { ...item, cantidad } // Usa la cantidad que viene del hijo
          : item
      );
    } else {
      return [...prevItems, { ...producto, cantidad }]; // Agrega con la cantidad inicial
    }
  });
};

// Calculamos el importe total aquí
const totalCarrito = carrito.reduce(
  (total, item) => total + (item.precio * item.cantidad),
  0
).toFixed(2);

  return (
    <Home 
      carrito={carrito} 
      handleAgregarCarrito={handleAgregarCarrito} 
      totalCarrito={totalCarrito}
    />
  );
};

export default App;
