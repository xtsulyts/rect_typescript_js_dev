import React from 'react'
import Formulario from '../components/Formulario'
import Header from '../components/Header'
import Footer from '../components/Footer'
const Contacto = ({ carrito }) => {
  
  return (
    <div>
      <Header carritoItems={carrito}/>
        <Formulario/>
      <Footer/>
      
    </div>
  )
}

export default Contacto
