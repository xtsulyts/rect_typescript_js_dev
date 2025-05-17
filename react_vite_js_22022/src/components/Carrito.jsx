import React from "react";
import Boton from "./Boton";
import { XMarkIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline"; // o tu librería de iconos


const Carrito = ({ carritoItems, onCerrar }) => {
  const navigate = useNavigate();
  const importeCompra = carritoItems.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );
return (
  <div className="fixed inset-0 z-50 bg-white flex justify-center items-center">
    <div className="w-full max-w-2xl h-[calc(100vh-8rem)] flex flex-col shadow-xl">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tu Carrito</h2>
        <button
          onClick={onCerrar}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6">
        {carritoItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-12">
            <ShoppingBagIcon className="h-24 w-24 text-gray-300 mb-6" />
            <p className="text-gray-500 text-xl mb-8">Tu carrito está vacío</p>
            <button
              onClick={() => navigate("/productos")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Explorar productos
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 py-4">
            {carritoItems.filter(item => item.cantidad > 0).map((item, index) => (
              <li key={index} className="py-6 flex">
                <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                  {item.imagen ? (
                    <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingBagIcon className="w-full h-full text-gray-400 p-3" />
                  )}
                </div>

                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{item.nombre}</h3>
                    <p className="text-lg font-semibold text-green-600">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">${item.precio.toFixed(2)} c/u</p>
                  
                  <div className="flex items-center mt-3">
                    <button className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-l-md hover:bg-gray-200 transition-colors">
                      -
                    </button>
                    <span className="w-10 text-center border-t border-b border-gray-100">
                      {item.cantidad}
                    </span>
                    <button className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-r-md hover:bg-gray-200 transition-colors">
                      +
                    </button>
                    <button className="ml-4 p-1 text-gray-500 hover:text-red-500 transition-colors">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {carritoItems.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between text-lg font-semibold mb-3">
            <span>Subtotal</span>
            <span>${importeCompra.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">Envío e impuestos calculados al finalizar</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Pagar ahora
            </button>
            <button
              onClick={() => navigate("/productos")}
              className="w-full py-3 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Seguir comprando
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);
};


export default Carrito;
