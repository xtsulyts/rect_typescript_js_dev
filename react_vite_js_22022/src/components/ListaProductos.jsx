import React from "react";
//import { productos } from './utils/data';
import Productos from "./Productos";
import Boton from "./Boton";

const ListaProductos = ({ productosList, agregarCarrito }) => {
  return (
    <div>
      {productosList.map((producto) => (
        <Productos producto={producto} agregarCarrito={agregarCarrito} />
      ))}
    </div>
  );
};

export default ListaProductos;
