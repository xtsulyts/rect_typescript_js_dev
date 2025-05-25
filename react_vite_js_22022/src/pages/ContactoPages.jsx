import React from 'react'
import FormularioContacto from '../components/FormularioContacto'
import Header from '../components/Header'
import Footer from '../components/Footer'
const Contacto = ({ carrito }) => {
  
  return (
    <div>
      <Header carritoItems={carrito}/>
        <FormularioContacto/>
      <Footer/>
      
    </div>
  )
}

export default Contacto
