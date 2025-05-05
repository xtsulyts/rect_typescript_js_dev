import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import ListaProductos from '../components/ListaProductos'
import Main from '../components/Main'
import Footer from '../components/Footer'
//import { productosLista } from '../components/utils/data'
import Carrito from '../components/Carrito'
import { useState, useEffect } from 'react'



const Home = ({ carrito, totalCarrito,  handleAgregarCarrito }) => {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [productos, setProductos] = useState([]);
  console.log('carrito desde Home',carrito)
  
  useEffect(() => {
    fetch("https://67f5e9af913986b16fa5e489.mockapi.io/api/products")
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch((error) => console.error("Error fetching data:", error)); // Manejo de errores
  }, []); // <- Añade un array de dependencias vacío para que se ejecute solo una vez
  return (
    <>
      <Header
        totalCarrito={totalCarrito} />
      <Nav onMostrarCarrito={()=> setMostrarCarrito(true)}/>
      <ListaProductos 
        productos={productos}  //  productosLista importado de data.js
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