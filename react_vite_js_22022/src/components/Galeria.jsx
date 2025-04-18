import React from 'react';
import Boton from './Boton';
import '../components/estilos/Galeria.css';


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
            {/* Agregamos la imagen aquí */}
      {producto.imagen && (
        <img className='producto-imagen'
        src={producto.imagen}
        alt={producto.nombre}
 />
      )}
            <h3 className="productNombre">{producto.nombre}</h3>
            <p className="productCantidad">Disponibles: {producto.cantidad}</p>
          </div>
          <div className="cardFooter">
            <Boton onClick={()=>{console.log("click en componente")}}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Galeria;