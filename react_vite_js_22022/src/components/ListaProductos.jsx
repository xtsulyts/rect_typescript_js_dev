import React from "react";
import Productos from "./Productos";
import "../components/estilos/ListaProductos.css"

<<<<<<< HEAD
const ListaProductos = ({ productos, agregarCarrito }) => {
  console.log(productos)
=======
const ListaProductos = ({ productos, agregarCarrito, costo }) => {
  //console.log("lista", productos)
  // console.log("agregar al carrito", agregarCarrito)
  //console.log(costo)
>>>>>>> origin/main
  return (
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
  );
};

export default ListaProductos;