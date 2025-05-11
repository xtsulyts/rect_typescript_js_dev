import React, { useState } from 'react'
import Carrito from '../components/Carrito'
import Header from '../components/Header'


const CarritoPages  = ({ carrito, totalCarrito }) => {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  console.log(carrito)



  return (
    <div>
    <Header
      totalCarrito={totalCarrito}
      onMostrarCarrito={mostrarCarrito}
      />
      <Carrito
      carritoItems={carrito}
       onCerrar={() => setMostrarCarrito(true)} 
      />
    </div>
  )
}

export default CarritoPages;
