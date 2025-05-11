import React from 'react'
import Carrito from '../components/Carrito'

const CarritoLayout = () => {
  return (
    <div>
           {loading? (<img src={LOADER_URL} alt='loadind'
      style={{ width: "330px", height: "330px" }}/>):
      <ListaProductos 
      productos={productos}  //  productosLista importado de data.js
      agregarCarrito={handleAgregarCarrito} 
    /> }
      
    </div>
  )
}

export default CarritoLayout
