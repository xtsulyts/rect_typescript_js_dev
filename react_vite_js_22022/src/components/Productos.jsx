import React, { useState } from "react";
import Boton from "./Boton";
import "../components/estilos/Productos.css";

const Productos = ({ producto, agregarCarrito }) => {
  const [cantidad, setCantidad] = useState(0);
  const [stock, setStock] = useState(producto.cantidad); //cantidad es un atriburo del array ListaProductos
  const [costoCompra, setCostoCompra] = useState(0);
  // console.log(stock)
  //console.log(costoCompra)

  const incrementar = () => {
    if (stock > 0) {
      setCantidad((prev) => {
        const nuevaCantidad = prev + 1;
        const nuevoCosto = nuevaCantidad * producto.precio; // Calcula el costo total

        // Actualiza el carrito con la nueva cantidad
        agregarCarrito(producto, nuevaCantidad);

        // Actualiza el costo de compra
        setCostoCompra(nuevoCosto);

        return nuevaCantidad;
      });

      setStock((prev) => prev - 1);
    }
  };
  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad((prev) => {
        const nuevaCantidad = prev - 1;
        // Llamar a agregarCarrito con el nuevo valor
        agregarCarrito(producto, nuevaCantidad);
        return nuevaCantidad;
      });
      setStock((prev) => prev + 1);
      setCostoCompra((prev) => prev - producto.precio);
    }
  };

  return (
    <div className="galleryContainer">
      <div className="productCard" key={producto.codigo}>
        <div className="cardHeader">
          <h3 className="productoNombre">
            {producto.nombre} - ${producto.precio}
          </h3>

          {costoCompra !== 0 && (
            <span className="costoCompra">Total${costoCompra}</span>
          )}

          <span className="productCodigo">cod#{producto.codigo}</span>
        </div>
        <div className="cardBody">
          {producto.imagen && (
            <img
              className="producto-imagen"
              src={producto.imagen}
              alt={producto.nombre}
            />
          )}

          <p
            className={`productCantidad ${
              !stock ? "agotado" : stock < 3 ? "poco-stock" : "disponible"
            }`}
          >
            {!stock
              ? "❌ Agotado"
              : stock < 15
              ? `⚠️ Poco stock ( ${stock})`
              : `✔️ Disponibles: ${stock}`}
          </p>
          {cantidad !== 0 && <span>Unidades:{cantidad}</span>}
        </div>

        <div className="cardFooter">
          <Boton tipo="Agregar" children={"➕"} onClick={incrementar} />

          <Boton tipo="eliminar" children={"➖"} onClick={decrementar} />
        </div>
      </div>
    </div>
  );
};

export default Productos;
