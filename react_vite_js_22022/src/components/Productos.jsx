import React, { useState } from "react";
import Boton from "./Boton";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../contex/CarritoContexto";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useUsuario } from "../contex/UsuarioContexto";

/**
 * Componente para mostrar un producto individual con funcionalidad de carrito
 *
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.producto - Datos del producto a mostrar
 * @returns {JSX.Element} - Elemento JSX que representa el producto
 */
const Productos = ({ producto }) => {
  console.log(producto)
  const navigate = useNavigate();
  const { handleAgregarCarrito } = useCarrito();
  const {usuario} = useUsuario()


  // Estado para la cantidad seleccionada del producto
  const [cantidad, setCantidad] = useState(0);

  // Estado para el stock disponible del producto
  const [stock, setStock] = useState(producto.cantidad);

  // Estado para el costo total de la compra
  const [costoCompra, setCostoCompra] = useState(0);

  /**
   * Incrementa la cantidad del producto en 1
   * Actualiza el estado local pero no modifica el carrito hasta que se confirme
   */
  const incrementar = () => {
    if (stock > 0) {
      setCantidad((prev) => prev + 1);
      setStock((prev) => prev - 1);
      setCostoCompra((prev) => prev + producto.precio);
    }
  };

  /**
   * Decrementa la cantidad del producto en 1
   * Actualiza el estado local pero no modifica el carrito hasta que se confirme
   */
  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad((prev) => prev - 1);
      setStock((prev) => prev + 1);
      setCostoCompra((prev) => prev - producto.precio);
    }
  };

  /**
   * Maneja el evento de agregar al carrito
   * Solo aquí se actualiza el carrito con la cantidad seleccionada
   */
  const agregarAlCarrito = () => {
    if (cantidad > 0) {
      handleAgregarCarrito(producto, cantidad);
     
      setCantidad(cantidad);
      setCostoCompra(costoCompra);
    }
  };

  return (
    <div className="galleryContainer">
      <div
        className="productCard relative border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        key={producto.codigo}
      >
        {/* Imagen del producto */}
        {producto.imagen && (
          <div className="h-48 w-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={producto.imagen}
              alt={producto.nombre}
              onClick={() => navigate(`/productos/${producto.id}`)}
            />
            {/* Badge de código */}
            <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
              #{producto.codigo}
            </span>
          </div>
        )}

        {/* Contenido informativo */}
        <div className="p-4">
          {/* Nombre y precio */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">
              {producto.nombre}
            </h3>
            <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
              ${producto.precio}
            </span>
          </div>

          {/* Estado de stock */}
          <div className="mb-3">
            <p
              className={`text-sm font-medium py-1 px-3 rounded-full inline-block ${
                !stock
                  ? "bg-red-100 text-red-800"
                  : stock < 3
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {!stock
                ? "❌ Agotado"
                : stock < 15
                ? `⚠️ Poco stock (${stock})`
                : `✔️ Disponibles: ${stock}`}
            </p>
          </div>

          {/* Controles de cantidad y precio */}
          <div className="flex items-center justify-between">
            {/* Mostrar cantidad solo si es mayor a 0 */}
            {cantidad !== 0 && (
              <span className="animate-bounce bg-amber-500 text-black font-black px-3 py-1 rounded-lg shadow-[0_0_15px_#f59e0b]">
                {cantidad}
              </span>
            )}

            {/* Mostrar costo solo si es mayor a 0 */}
            {costoCompra !== 0 && (
              <span className="text-sm font-medium text-blue-600 ml-auto mr-3">
                ${costoCompra.toFixed(2)}
              </span>
            )}

            {/* Botones de incremento/decremento */}
            <div className="flex space-x-2">
              <Boton
                tipo="eliminar"
                children="➖"
                onClick={decrementar}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              />
              <Boton
                tipo="Agregar"
                children="➕"
                onClick={incrementar}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              />
            </div>
          </div>

          {/* Botón para agregar al carrito (solo visible si hay cantidad seleccionada) */}
          {cantidad !== 0 && usuario && (
            <div className="mt-6">
              <Boton tipo="verUsuarios" onClick={agregarAlCarrito}>
                <span className="flex items-center gap-2">
                  Agregar al carrito
                  <ShoppingCartIcon className="h-5 w-5 text-white" />
                </span>
              </Boton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productos;
