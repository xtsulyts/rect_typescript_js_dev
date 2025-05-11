import React from "react";
import Boton from "./Boton";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Carrito = ({ carritoItems, onCerrar }) => {
  const importeCompra = carritoItems.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-green bg-opacity-50">
      {/* Contenedor principal con altura automática */}
      <div
        className="max-w-md w-full bg-white/90  overflow-y-auto"
        style={{
          maxHeight: "90vh", // Altura máxima del 90% del viewport
          top: "10vh", // Margen superior
          bottom: "auto", // Anulamos el bottom:0
          position: "fixed", // Mantenemos posición fija
        }}
      >
        <div className="p-6">
          {/* Encabezado */}
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              CARRITO DE COMPRAS
            </h2>
            <button
              onClick={onCerrar}
              className="text-gray-500 hover:text-gray-700 ml-4"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Lista de items */}
          {carritoItems.length === 0 ? (
            <p className="text-gray-500 italic text-center py-4">
              El carrito está vacío
            </p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {carritoItems
                  .filter((item) => item.cantidad > 0)
                  .map((item, index) => (
                    <li
                      key={index}
                      className="py-3 flex justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex gap-2">
                        <span className="text-gray-700 font-medium">
                          {item.nombre}
                        </span>
                        <span className="text-blue-600">x{item.cantidad}</span>
                      </div>
                      <span className="text-green-600 font-semibold">
                        ${(item.precio * item.cantidad).toFixed(2)}
                      </span>
                    </li>
                  ))}
              </ul>

              {/* Total - lo mantenemos sticky abajo */}
              <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200">
                <p className="text-xl font-bold text-gray-800 text-right mb-4">
                  Total: ${importeCompra.toFixed(2)}
                </p>
                <Boton
                  tipo="finalizarCompra"
                  children={"Finalizar Compra"}
                  onClick={() => {
                    console.log("Finalizar Compra");
                    onCerrar();
                  }}
                  className="w-full py-3" // Botón más prominente
                />
                <Boton
                  tipo="seguirComprando"
                  children={"Seguir Comprando"}
                  onClick={() => {
                    console.log("Seguir Comprando");
                    onCerrar();
                  }}
                  className="w-full py-3" // Botón más prominente
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carrito;
