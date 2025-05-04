import React from "react";
import Boton from "./Boton";
import "../components/estilos/Galeria.css";

/**
 * Componente Gallery - Muestra una colección de productos en formato de tarjetas
 *
 * @param {Object[]} productos - Array de objetos con información de productos
 * @param {number} productos[].id - ID único del producto
 * @param {string} productos[].codigo - Código identificador del producto
 * @param {function} [onProductClick] - Función opcional que se ejecuta al hacer clic en un producto
 */

const Galeria = ({ productos, onProductClick }) => {
  return (
    <div className="galleryContainer">
      {/* Mapeo del array de productos para renderizar cada elemento */}
      {productos.map((producto) => (
        <div
          key={producto.id} // Identificador único para optimización de React
          className="productCard"
          onClick={() => onProductClick && onProductClick(producto.id)}
        >
          <div className="cardHeader">
            {/* Muestra el código del producto */}
            <span className="productCodigo">#{producto.codigo}</span>
          </div>
          <div className="cardBody">
            {/* Agregamos la imagen aquí */}
            {producto.imagen && (
              <img
                className="producto-imagen"
                src={producto.imagen}
                alt={producto.nombre}
              />
            )}
            <h3 className="productNombre">{producto.nombre}</h3>
            <p
              className={`productCantidad ${
                // Asignación dinámica de clases CSS
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
                ? `⚠️ Poco stock (${producto.cantidad})` 
                : `✔️ Disponibles: ${producto.cantidad}`}
            </p>
          </div>

          <div className="cardFooter">
            <Boton
              onClick={() => {
                console.log("click en el boton primairo");
              }}
              tipo="primario"
            />

            <Boton
              onClick={() => {
                console.log("click en el boton secundario");
              }}
              tipo="secundario"
            />

            <Boton
              onClick={() => {
                console.log("click en el boton peligro");
              }}
              tipo="peligro"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Galeria;
