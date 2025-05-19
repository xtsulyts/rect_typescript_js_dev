import React from "react";
import Productos from "./Productos";
import "../components/estilos/ListaProductos.css"


const ListaProductos = ({ productos, agregarCarrito }) => {
 console.log(productos)
 
 
  return (
    <>
    <div className="galleryContainer">
      {productos.map((producto) => {
        return (
          <Productos
            key={producto.codigo} // Key única basada en producto.codigo
            producto={producto}
            agregarCarrito={agregarCarrito}
            costo={producto.precio} // Se pasa como referencia
          />
        );
      })}
    </div>
    </>
  );
};

export default ListaProductos;