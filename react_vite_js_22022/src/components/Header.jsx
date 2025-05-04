import React from 'react';
//import logo from '/src/assets/react.svg';
import '../components/estilos/Header.css'; // Archivo de estilos (opcional)
import  { FaShopify} from 'react-icons/fa';


const Header = ({ titulo, menuItems, onLogin, usuarioProp }) => {

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo y título */}
       <div className="header-brand">
          {<FaShopify  className="header-logo" />}
          <h1 className="header-titulo">{titulo || 'E-Shoes Shop'}</h1>
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
          {usuarioProp ? (
            <span>Bienvenido, {usuarioProp}</span>
          ) : (
            <button onClick={onLogin} className="header-login-btn">
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;