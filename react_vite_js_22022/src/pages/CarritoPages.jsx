//import React, { useState } from 'react'
import Carrito from "../components/Carrito";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCarrito } from "../contex/CarritoContexto";

const CarritoPages = () => {
  const { carrito } = useCarrito()
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
