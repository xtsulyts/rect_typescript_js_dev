import React from "react";
import Boton from "./Boton";
import "../components/estilos/Productos.css";

const Productos = ({ producto, agregarCarrito }) => {
  return (
    <div className="galleryContainer">
      <div className="productCard" key={producto.codigo}>
        <div className="cardHeader">
          <span className="productCodigo">#{producto.codigo}</span>
        </div>
        <div className="cardBody">
          {producto.imagen && (
            <img
              className="producto-imagen"
              src={producto.imagen}
              alt={producto.nombre}
            />
          )}
          <h3 className="productoNobre">{producto.nombre} - ${producto.precio}</h3>
         
          <p
            className={`productCantidad ${
              !producto.cantidad
                ? "agotado"
                : producto.cantidad < 3
                ? "poco-stock"
                : "disponible"
            }`}
          >
            {!producto.cantidad
              ? "🛒 Agotado"
              : producto.cantidad < 3
              ? `⚠️ Poco stock ( ${producto.cantidad})`
              : `✔️ Disponibles: ${producto.cantidad}`}
          </p>
        </div>
        <div className="cardFooter">
          <Boton
            tipo="compra"
            children={"comprar"}
            onClick={() => agregarCarrito(producto)} 
          />
        </div>
      </div>
    </div>
  );
};

export default Productos;