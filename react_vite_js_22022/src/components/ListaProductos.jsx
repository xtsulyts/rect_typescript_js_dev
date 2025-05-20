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
<<<<<<< HEAD
            costo={producto.precio} // Se pasa como referencia
=======
            costo={producto} // Se pasa como referencia
>>>>>>> f63c6462a0891478695b7fd30d063a3435835e6e
          />
        );
      })}
    </div>
    </>
  );
};

export default ListaProductos;