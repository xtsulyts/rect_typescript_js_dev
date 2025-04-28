import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Productos from '../components/Productos'
import ListaProductos from '../components/ListaProductos'
import Main from '../components/Main'
import Footer from '../components/Footer'
import { productos } from '../components/utils/data'
import Carrito from '../components/Carrito'



const Home = ({carrito, handleAgregarCarrito}) => {

  return (
    <>
    <Header/>
    <Nav/>
    {/* <Productos/> */}
    <ListaProductos productosList={productos} agregarCarrito={handleAgregarCarrito}/>
    <Carrito carritoItems={carrito}/>
    <Main/>
    <Footer/>
    </>
  )
}

export default Home
