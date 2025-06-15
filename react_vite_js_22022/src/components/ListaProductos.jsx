import React from "react";
import Productos from "./Productos";
import "../components/estilos/ListaProductos.css";
import { useCarrito } from "../contex/CarritoContexto";


const ListaProductos = () => {
  const { productos } = useCarrito();
  console.log(productos);



  return (
    <>
      <div className="galleryContainer">
        {productos.map((producto) => {
          return <Productos producto={producto} />;
        })}
      </div>
    </>
  );
};

export default ListaProductos;
