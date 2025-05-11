import React from "react";
import Productos from "./Productos";
import "../components/estilos/ListaProductos.css"
import Nav from "./Nav";
import Header from "./Header";


const ListaProductos = ({ productos, agregarCarrito, costo }) => {
  console.log(costo)
  console.log(agregarCarrito)
  return (
    <>
    <Header/>
    <div className="galleryContainer">
      {productos.map((producto) => (
        <Productos 
          key={producto.codigo}  // Key única basada en producto.codigo
          producto={producto} 
          agregarCarrito={agregarCarrito} 
          costo={costo} // Se pasa como referencia
        />
      ))}
    </div>
    </>
  );
};

export default ListaProductos;