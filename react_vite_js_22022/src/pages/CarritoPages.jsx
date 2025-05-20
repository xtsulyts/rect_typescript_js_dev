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

<<<<<<< HEAD
      </>     
=======
      </>
>>>>>>> f63c6462a0891478695b7fd30d063a3435835e6e
    
  );
};

export default CarritoPages;
