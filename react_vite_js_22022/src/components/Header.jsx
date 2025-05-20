//mport React, { useState } from 'react';
//import logo from '/src/assets/react.svg';
import '../components/estilos/Header.css'; // Archivo de estilos (opcional)
import  { FaShopify } from 'react-icons/fa';
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Nav from './Nav';
import { useUsuario } from '../contex/UsuarioContexto';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../contex/CarritoContexto';
<<<<<<< HEAD
import { HiUser } from "react-icons/hi";
=======
>>>>>>> f63c6462a0891478695b7fd30d063a3435835e6e



const Header = () => {

  const { precioTotal} = useCarrito()

  const navigate = useNavigate();
  const { usuario } = useUsuario();
  console.log(usuario);
<<<<<<< HEAD
=======
  

>>>>>>> f63c6462a0891478695b7fd30d063a3435835e6e
  

  


  return (
    <>
    <header className="header">
      <div className="header-container flex">
        {/* Logo y título */}
       <div className="header-brand">
          {<FaShopify  className="header-logo" />}
          <h1 className="header-titulo">E-Shop Shoes</h1>
        </div> 
        
        <div className="flex items-center bg-indigo-50 rounded-full px-4 py-2">
          <ShoppingCartIcon className="h-5 w-5 mr-2 text-indigo-600" />
          <span className="font-bold text-indigo-800">
            ${precioTotal}
          </span>
        </div>


        {/* Área de usuario */}
<<<<<<< HEAD
        <div className="flex">
          {usuario ? (
            <span className='flex'> <HiUser/>__{usuario.name}</span>
=======
        <div className="header-user">
          {usuario ? (
            <span>Bienvenido, {usuario.name}</span>
>>>>>>> f63c6462a0891478695b7fd30d063a3435835e6e
          ) : (
            <button  onClick={() => navigate("/login")} className="header-login-btn">
              Iniciar sesión
            </button>
          )}
        </div>
        
      </div>
      
    </header>
    <Nav
    />
      </>
  );
};

export default Header;