import React, { useState } from 'react';
//import logo from '/src/assets/react.svg';
import '../components/estilos/Header.css'; // Archivo de estilos (opcional)
import  { FaShopify } from 'react-icons/fa';
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Nav from './Nav';



const Header = ({ titulo, menuItems,totalCarrito, onMostrarCarrito }) => {
  console.log(onMostrarCarrito)
  const[usuario, setusuario] = useState("walter")
  const[onLogin, setOnlogin]= useState(false);

  
  

  return (
    <>
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

        {/* Menú de navegación */}
        <nav className="header-nav">
          <ul className="header-menu">
            {menuItems?.map((item, index) => (
              <li key={index} className="header-menu-item">
                <a href={item.url}>{item.texto}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Área de usuario */}
        <div className="header-user">
          {usuario ? (
            <span>Bienvenido, {usuario}</span>
          ) : (
            <button onClick={onLogin} className="header-login-btn">
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