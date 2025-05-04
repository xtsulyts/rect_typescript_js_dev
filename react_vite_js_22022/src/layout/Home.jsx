import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import ListaProductos from '../components/ListaProductos'
import Main from '../components/Main'
import Footer from '../components/Footer'
import { productosLista } from '../components/utils/data'
import Carrito from '../components/Carrito'
import { useState } from 'react'



const Home = ({ carrito, totalCarrito,  handleAgregarCarrito }) => {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  console.log('carrito desde Home',carrito)
  return (
    <>
      <Header
        totalCarrito={totalCarrito} />
      <Nav onMostrarCarrito={()=> setMostrarCarrito(true)}/>
      <ListaProductos 
        productos={productosLista}  //  productosLista importado de data.js
        agregarCarrito={handleAgregarCarrito} 
      />
        {mostrarCarrito && (
        <div className="">
          <Carrito 
            carritoItems={carrito}
            onCerrar={() => setMostrarCarrito(false)} 
          />
        </div>
      )}
      <Main />
      <Footer />
    </>
  );
};

export default Home;