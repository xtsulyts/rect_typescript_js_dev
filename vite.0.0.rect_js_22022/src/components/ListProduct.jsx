import React from 'react';

const ListProduct = ({
  id,
  codigo,
  nombre,
  cantidad,
  onItemClick,
  className = ''
}) => {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick(id);
    }
  };

  return (
    <div 
      className={`lista-item ${className}`}
      onClick={handleClick}
      style={{ cursor: onItemClick ? 'pointer' : 'default' }}
    >
      <div className="lista-item__header">
        <span className="lista-item__codigo">Código: {codigo}</span>
        <span className="lista-item__id">ID: {id}</span>
      </div>
      <div className="lista-item__body">
        <h3 className="lista-item__nombre">{nombre}</h3>
        <span className="lista-item__cantidad">Cantidad: {cantidad}</span>
      </div>
    </div>
  );
};

export default ListProduct;