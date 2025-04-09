import React from 'react';
//import './Header.css'; // Archivo de estilos (opcional)

const Header = ({ titulo, logo, menuItems, onLogin, usuario }) => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo y título */}
        <div className="header-brand">
          {logo && <img src={logo} alt="Logo" className="header-logo" />}
          <h1 className="header-titulo">{titulo || 'Mi Aplicación'}</h1>
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
            <span>Bienvenido, {usuario.nombre}</span>
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