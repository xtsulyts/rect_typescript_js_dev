import React from 'react';
import '../styles/Galeria.css';


const Galeria = ({ productos, onProductClick }) => {
  return (
    <div className='galleryContainer'>  
      {productos.map((producto) => (
        <div 
          key={producto.id} 
          className="productCard"
          onClick={() => onProductClick && onProductClick(producto.id)}
        >
          <div className="cardHeader">
            <span className="productCodigo">#{producto.codigo}</span>
          </div>
          <div className="cardBody">
            <h3 className="productNombre">{producto.nombre}</h3>
            <p className="productCantidad">Disponibles: {producto.cantidad}</p>
          </div>
          <div className="cardFooter">
            <button className="productButton">Ver detalles</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Galeria;