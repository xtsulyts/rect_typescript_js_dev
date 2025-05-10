import React, { useState } from 'react';
import Home from './layout/Home';
import './index.css'
import './App.css'
<<<<<<< HEAD
=======
//import Root from './routes/routes';
>>>>>>> origin/main

const App = () => {
  const [carrito, setCarrito] = useState([]);
  //console.log('carrito desde app []', carrito)

<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main

  return (
    <Home 
      carrito={carrito} 
      handleAgregarCarrito={handleAgregarCarrito} 
      totalCarrito={totalCarrito}
    />
  );
};

export default App;
