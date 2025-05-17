//import React, { useState } from 'react'
import Carrito from "../components/Carrito";
import Footer from "../components/Footer";
import Header from "../components/Header";

const CarritoPages = ({ carrito }) => {
  //const [mostrarCarrito, setMostrarCarrito] = useState(false);
  console.log(carrito);

  return (
    <>
      <Header />
      <Carrito carritoItems={carrito} />
      <Footer/>

      </>
    
  );
};

export default CarritoPages;
