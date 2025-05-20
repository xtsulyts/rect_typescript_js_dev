import React from 'react'
import DetalleProducto from '../components/DetalleProduto.jsx'

const DetalleProductoPages = ({productos}) => {
    console.log(productos)
  return (
    <>
    <DetalleProducto carrito={carrito}/>
    </>
  )
}

export default DetalleProductoPages
