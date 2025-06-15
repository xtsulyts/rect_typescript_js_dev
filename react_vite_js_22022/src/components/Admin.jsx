//mport React, { useState } from 'react';
import Boton from './Boton';

//import { useNavigate } from "react-router-dom";
//import { useUsuario } from '../contex/UsuarioContexto';
//import { useCarrito } from '../contex/CarritoContexto';
import ProductosCRUD from "./FormularioEditar"
import FormularioProducto from './FormularioProducto';


const Admin = () => {

  return (
     <>
     <FormularioProducto/>
     <ProductosCRUD />
    </>
  );
};

export default Admin;