import React from 'react';
//import logo from '/src/assets/react.svg';
import '../components/estilos/Header.css'; // Archivo de estilos (opcional)
import  { FaShopify } from 'react-icons/fa';
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Nav from './Nav';

const Header = ({ titulo, totalCarrito, usuarioProp, onLogin }) => {
const menuItems = [{
  texto: "inicio",
  url: "productos",
  
}
]
const item = ["hola"]
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo y título */}
       <div className="header-brand">
          {<FaShopify  className="header-logo" />}
          <h1 className="header-titulo">{titulo || 'E-Shop'}</h1>
        </div> 
        
        <div className="flex items-center bg-indigo-50 rounded-full px-4 py-2">
          <ShoppingCartIcon className="h-5 w-5 mr-2 text-indigo-600" />
          <span className="font-bold text-indigo-800">
            ${totalCarrito}
          </span>
        </div>



        {/* Área de usuario */}
        <div className="header-user">
          {usuarioProp ? (
            <span>Bienvenido, {usuarioProp}</span>
          ) : (
            <button onClick={onLogin} className="header-login-btn">
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
      <Nav/>
      
    </header>
    
  );
};

export default Header;