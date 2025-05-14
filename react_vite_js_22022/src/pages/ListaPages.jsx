import React from "react";
import ListaProductos from "../components/ListaProductos";
import Header from "../components/Header";
const LOADER_URL =
    "https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif";

const ListaPages = ({ productos, carrito,  agregarCarrito }) => {
    


  return (
    <>
  
      <Header carritoItems={carrito} />

 
              <ListaProductos
                productos={productos}
                agregarCarrito={agregarCarrito}
                // mostrarCarrito={() => setMostrarCarrito(true)}
              />
     
    </>
  );
};

export default ListaPages;
