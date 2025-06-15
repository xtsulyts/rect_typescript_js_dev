import React from "react";
import ListaProductos from "../components/ListaProductos";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCarrito } from "../contex/CarritoContexto";

const ListaPages = () => {
  const { carrito, productos, handleAgregarCarrito, loading, LOADER_URL } = useCarrito()
  return (
    <>
      <Header carritoItems={carrito} />
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
