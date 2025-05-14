import React from "react";
import Productos from "./Productos";
import "../components/estilos/ListaProductos.css"
import Nav from "./Nav";
import Header from "./Header";


const ListaProductos = ({ productos, agregarCarrito, costoCompra }) => {
 console.log(productos)
 
 
  return (
    <>
    <Header
     costo={costoCompra}/>
    <div className="galleryContainer">
      {productos.map((producto) => {
        return (
          <Productos
            key={producto.codigo} // Key única basada en producto.codigo
            producto={producto}
            agregarCarrito={agregarCarrito}
            costo={producto} // Se pasa como referencia
          />
        );
      })}
    </div>
    </>
  );
};

export default ListaProductos;