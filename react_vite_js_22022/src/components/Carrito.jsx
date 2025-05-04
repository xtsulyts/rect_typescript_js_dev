
import React from 'react'
import Boton from './Boton'

const Carrito = ({ carritoItems }) => {
  console.log("carrito items",carritoItems)
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">CARRITO DE COMPRAS</h2>
      
      {carritoItems.length === 0 ? (
        <p className="text-gray-500 italic text-center py-4">El carrito está vacío</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {carritoItems.map((item, index) => (
            <li key={index} className="py-3 flex justify-between">
              <span className="text-gray-700 font-medium">{item.nombre}</span>
              <span className="text-green-600 font-semibold">${item.precio}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Total del carrito (opcional) */}
      {carritoItems.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span className="text-blue-600">
              ${carritoItems.reduce((total, item) => total + item.precio, 0).toLocaleString()}
            </span>
          </div>
       <Boton 
        tipo='finalizarCompra'
        children={"Finalizar Compra"}
        onClick={()=>console.log("Finalizar Commpra")}
        
        />
        </div>
      )}
    </div>
  )
}

export default Carrito