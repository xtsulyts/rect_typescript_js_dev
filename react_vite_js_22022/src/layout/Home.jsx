import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import ListaProductos from '../components/ListaProductos'
import Main from '../components/Main'
import Footer from '../components/Footer'
import { productosLista } from '../components/utils/data'
import Carrito from '../components/Carrito'



const Home = ({ carrito, handleAgregarCarrito }) => {
  return (
    <>
      <Header />
      <Nav />
      <ListaProductos 
        productos={productosLista}  //  productosLista importado de data.js
        agregarCarrito={handleAgregarCarrito} 
      />
      <Carrito carritoItems={carrito} />
      <Main />
      <Footer />
    </>
  );
};

export default Home;