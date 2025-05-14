//import React, { useState } from 'react'
import Carrito from "../components/Carrito";
import Header from "../components/Header";

const CarritoPages = ({ carrito }) => {
  //const [mostrarCarrito, setMostrarCarrito] = useState(false);
  console.log(carrito);

  return (
    <div>
      <Header carritoItems={carrito} />
      <Carrito carritoItems={carrito} />
    </div>
  );
};

export default CarritoPages;
