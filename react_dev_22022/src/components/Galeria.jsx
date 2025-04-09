import React from 'react';
//import './Galeria.css'; 
//import './../styles/Galeria.css';
import '../styles/Galeria.css';


const Galeria = ({ productos, onProductClick }) => {
  return (
    <div >  
      {productos.map((producto) => (
        <div 
          key={producto.id} 
          className="product-card"
          onClick={() => onProductClick && onProductClick(producto.id)}
        >
          <div className="card-header">
            <span className="product-codigo">#{producto.codigo}</span>
          </div>
          <div className="card-body">
            <h3 className="product-nombre">{producto.nombre}</h3>
            <p className="product-cantidad">Disponibles: {producto.cantidad}</p>
          </div>
          <div className="card-footer">
            <button className="product-button">Ver detalles</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Galeria;