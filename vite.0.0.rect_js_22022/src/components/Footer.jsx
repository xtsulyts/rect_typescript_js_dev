import React from 'react';
//import './Footer.css'; // Archivo de estilos (opcional)

const Footer = ({ copyright, redesSociales, links }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Sección de links */}
        <div className="footer-links">
          {links?.map((link, index) => (
            <a key={index} href={link.url} className="footer-link">
              {link.texto}
            </a>
          ))}
        </div>

        {/* Redes sociales */}
        <div className="footer-social">
          {redesSociales?.map((red, index) => (
            <a 
              key={index} 
              href={red.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
            >
              <img src={red.icono} alt={red.nombre} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          {copyright || `© ${new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.`}
        </div>
      </div>
    </footer>
  );
};

export default Footer;