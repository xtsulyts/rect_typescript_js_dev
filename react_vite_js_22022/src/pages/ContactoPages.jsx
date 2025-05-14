import React from 'react'
import Formulario from '../components/Formulario'
import Header from '../components/Header'
const Contacto = ({ carrito }) => {
  
  return (
    <div>
      <Header carritoItems={carrito}/>
        <Formulario/>
      
    </div>
  )
}

export default Contacto
