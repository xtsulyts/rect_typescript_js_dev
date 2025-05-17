import React from 'react'
import Header from '../components/Header'
import DetalleProducto from '../components/DetalleProducto'
import Footer from '../components/Footer'


const DetallePages = ({productos}) => {
  console.log(productos)
  return (
   <>
   <Header/>
   <DetalleProducto productos={productos} />
   <Footer/>
   </>
  )
}

export default DetallePages
