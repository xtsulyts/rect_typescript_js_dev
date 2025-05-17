import React from "react";
import ListaProductos from "../components/ListaProductos";
import Header from "../components/Header";
import Footer from "../components/Footer";
const LOADER_URL =
  "https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif";

const ListaPages = ({ carrito, productos, handleAgregarCarrito, loading }) => {
  return (
    <>
      <Header carritoItems={carrito} />
      {loading ? (
        <img
          src={LOADER_URL}
          alt="Cargando productos..."
          className="w-80 h-80 object-contain animate-pulse rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
        />
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
