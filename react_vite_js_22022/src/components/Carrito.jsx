import React from "react";
import Boton from "./Boton";
import { XMarkIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Carrito = ({ carritoItems, onCerrar }) => {
  const navigate = useNavigate();
  const importeCompra = carritoItems.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  return (
    <>
    <div className="fixed inset-0 z-50 bg-white bg-opacity-30 backdrop-blur-sm transition-opacity duration-300">
      {/* Contenedor principal - ahora ocupa toda la pantalla */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Panel del carrito - ajustado para no solaparse con el header */}
        <div className="absolute inset-y-0 right-0 flex max-w-full pl-10 mt-16">
          {""}
          {/* Añadido mt-16 para bajar el contenido */}
          <div className="w-screen max-w-md">
            <div className="flex flex-col h-full bg-white shadow-xl">
              {/* Encabezado */}
              <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                <div className="flex items-start justify-between sticky top-0 bg-white pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Tu Carrito
                  </h2>
                  <button
                    onClick={onCerrar}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors -mr-2"
                    aria-label="Cerrar carrito"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                {/* Contenido del carrito */}
                <div className="mt-8">
                  {carritoItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center py-12">
                      <ShoppingBagIcon className="h-16 w-16 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg mb-6">
                        Tu carrito está vacío
                      </p>
                      <Boton
                        tipo="seguirComprando"
                        children={"Explorar productos"}
                        onClick={() => navigate("/productos")}
                        className="w-full max-w-xs py-3"
                      />
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {carritoItems
                        .filter((item) => item.cantidad > 0)
                        .map((item, index) => (
                          <li key={index} className="py-6 flex">
                            <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden bg-gray-100">
                              {item.imagen ? (
                                <img
                                  src={item.imagen}
                                  alt={item.nombre}
                                  className="w-full h-full object-cover object-center"
                                />
                              ) : (
                                <ShoppingBagIcon className="w-full h-full text-gray-400 p-4" />
                              )}
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                              <div>
                                <h3 className="text-base font-medium text-gray-900">
                                  {item.nombre}
                                </h3>
                            
                              </div>
                                  <div>
                                  {item.cantidad !== 0 && (
                                    <span className="animate-bounce bg-amber-500 text-black font-black px-3 py-1 rounded-lg shadow-[0_0_15px_#f59e0b]">
                                     {item.cantidad}
                                    </span>
                                  )}
                                </div>
                              <div className="flex-1 flex items-end justify-between">
                                <p className="text-sm text-gray-500">
                                  ${item.precio.toFixed(2)} c/u
                                </p>
                                <p className="text-base font-medium text-green-600">
                                  ${(item.precio * item.cantidad).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Total y botones (solo si hay items) */}
              {carritoItems.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p>${importeCompra.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 mb-6">
                    Envío e impuestos calculados al finalizar
                  </p>
                  <div className="space-y-4">
                    <Boton
                      tipo="finalizarCompra"
                      children={"Pagar ahora"}
                      onClick={() => navigate("/productos")}
                      className="w-full py-3 text-lg"
                    />
                    <Boton
                      tipo="seguirComprando"
                      children={"Seguir comprando"}
                      onClick={() => navigate("/productos")}
                      className="w-full py-3 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Carrito;
