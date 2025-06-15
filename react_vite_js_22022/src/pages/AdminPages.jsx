import React from 'react'
import RutaProtegida from '../autenticacion/RutaProtegida'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Admin from '../components/Admin'
import { useCarrito } from '../contex/CarritoContexto'
const AdminPages = () => {
  const { productos } = useCarrito()
  return (
  <>
  <Header/>
  < Admin productos={productos}/>
  <Footer/>
  </>
  )
}

export default AdminPages
