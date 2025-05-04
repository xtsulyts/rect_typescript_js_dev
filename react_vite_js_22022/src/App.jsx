import React, { useState } from 'react';
import Home from './layout/Home';
import './index.css'
import './App.css'

const App = () => {
  const [carrito, setCarrito] = useState([]);

 // Función para agregar/incrementar productos (debe estar en el componente padre o usando un contexto)
const handleAgregarCarrito = (producto) => {
  setCarrito(prevItems => {
    const itemExistente = prevItems.find(item => item.nombre === producto.nombre);
    if (itemExistente) {
      // Incrementa la cantidad si ya existe
      return prevItems.map(item =>
        item.nombre === producto.nombre
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      // Agrega el producto con cantidad inicial 1
      return [...prevItems, { ...producto, cantidad: 1 }];
    }
  });
};

  return (
    <Home 
      carrito={carrito} 
      handleAgregarCarrito={handleAgregarCarrito} 
    />
  );
};

export default App;

