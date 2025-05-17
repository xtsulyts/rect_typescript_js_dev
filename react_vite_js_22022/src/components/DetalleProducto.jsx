import React from "react";
import { useParams } from "react-router-dom";
import ListaProductos from "./ListaProductos";
import { useCarrito } from "../contex/CarritoContexto";

const DetalleProducto = ({
  productos,

  handleAgregarCarrito,
}) => {
  console.log(productos);
  const { id } = useParams();

  const productoDetalle = productos.find(
    (productoDetalle) => productoDetalle.id == id
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Imagen del producto */}
        <div className="w-full md:w-1/2">
          <img
            src={productoDetalle.imagen}
            alt={productoDetalle.nombre}
            className="w-full h-auto rounded-lg object-cover shadow-md"
          />
        </div>

        {/* Detalles del producto */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {productoDetalle.nombre}
            </h1>
            <p className="text-gray-600 mb-4">
              Código: {productoDetalle.codigo}
            </p>

            <div className="flex items-center mb-6">
              <span className="text-4xl font-bold text-indigo-600">
                ${productoDetalle.precio}
              </span>
              {productoDetalle.cantidad > 0 ? (
                <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {productoDetalle.cantidad} disponibles
                </span>
              ) : (
                <span className="ml-4 px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                  Agotado
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-6">
              Descripción del producto (puedes agregar este campo al objeto si
              lo necesitas). Estos deliciosos chips de bambú son perfectos para
              un snack saludable.
            </p>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200">
                -
              </button>
              <span className="px-4 py-2">1</span>
              <button
                onClick={handleAgregarCarrito}
                className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                +
              </button>
            </div>
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>

      {/* Sección adicional (opcional) */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Características</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-center">
            <span className="mr-2">✓</span> Ingredientes 100% naturales
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span> Libre de gluten
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span> Envío gratis en compras mayores a
            $100
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span> Empresa comprometida con el medio
            ambiente
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DetalleProducto;
