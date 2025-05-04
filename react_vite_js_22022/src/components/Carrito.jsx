
import React from 'react'
import Boton from './Boton'
import { useState } from 'react'

const Carrito = ({ carritoItems }) => {



  const importeCompra = carritoItems.reduce(
    (total, item) => total + (item.precio * item.cantidad),
    0
  );
  
  console.log(carritoItems)
  console.log(importeCompra)




  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">CARRITO DE COMPRAS</h2>

      {carritoItems.length === 0 ? (
        <p className="text-gray-500 italic text-center py-4">El carrito está vacío</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {carritoItems.map((item, index) => (
              <li key={index} className="py-3 flex justify-between">
                <div className="flex gap-2">
                  <span className="text-gray-700 font-medium">{item.nombre}</span>
                  <span className="text-blue-600">x{item.cantidad}</span>
                </div>
                <span className="text-green-600 font-semibold">
                  ${(item.precio * item.cantidad).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xl font-bold text-gray-800 text-right">
              Total: ${importeCompra.toFixed(2)}
            </p>
          </div>
        </>
      )}
      <Boton
        tipo='finalizarCompra'
        children={"Finalizar Compra"}
        onClick={() => console.log("Finalizar Commpra")}

      />
    </div>
  );
}
  export default Carrito

