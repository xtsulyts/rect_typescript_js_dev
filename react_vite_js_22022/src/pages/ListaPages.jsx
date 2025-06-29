//import React,{ useEffect, useState }from "react";
import ListaProductos from "../components/ListaProductos";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCarrito } from "../contex/CarritoContexto";
import { useAdmin } from "../contex/AdminContex";


const ListaPages = () => {
  const { productos } = useAdmin()
  const { handleAgregarCarrito, LOADER_URL, loading } = useCarrito()

  return (
    <>
      <Header  />
      {loading ? (
       <div className="flex justify-center items-center min-h-screen bg-gray-50"> 
  <img
    src={LOADER_URL}
    alt="Cargando productos..."
    className="w-40 h-40 object-contain animate-pulse"  // Tamaño reducido para elegancia
  />
</div>
      ) : (
        <ListaProductos
          productos={productos}
          agregarCarrito={handleAgregarCarrito}
        />
      )}

      <Footer />
    </>
  );
};

export default ListaPages;
