import React, { useState } from "react";
import Boton from "./Boton";
import { Navigate, replace } from 'react-router-dom'
//import "../components/estilos/Productos.css";
import { useNavigate } from "react-router-dom";


const Productos = ({ producto, agregarCarrito }) => {
  // console.log(agregarCarrito)
  // console.log(producto)

  const navigate = useNavigate();


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
      <div className="productCard relative border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow" key={producto.codigo}>
        {/* Imagen que ocupa todo el espacio superior */}
        {producto.imagen && (
          <div className="h-48 w-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={producto.imagen}
              alt={producto.nombre}
            />
            {/* Badge de código superpuesto */}
            <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
              #{producto.codigo}
            </span>
          </div>
        )}
  
        {/* Contenido inferior */}
        <div className="p-4">
          {/* Nombre y precio en línea */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">
              {producto.nombre}
            </h3>
            <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
              ${producto.precio.toFixed(2)}
            </span>
          </div>
  
          {/* Estado de stock */}
          <div className="mb-3">
            <p className={`text-sm font-medium py-1 px-3 rounded-full inline-block ${
              !stock 
                ? "bg-red-100 text-red-800" 
                : stock < 3 
                ? "bg-yellow-100 text-yellow-800" 
                : "bg-green-100 text-green-800"
            }`}>
              {!stock
                ? "❌ Agotado"
                : stock < 15
                ? `⚠️ Poco stock (${stock})`
                : `✔️ Disponibles: ${stock}`}
            </p>
          </div>
  
          {/* Contador y botones */}
          
          <div className="flex items-center justify-between">
             
             {cantidad !== 0 && (

              <span className="animate-bounce bg-amber-500 text-black font-black px-3 py-1 rounded-lg shadow-[0_0_15px_#f59e0b]">
                {cantidad}
              </span>

            )}
            
            {costoCompra !== 0 && (
              <span className="text-sm font-medium text-blue-600 ml-auto mr-3">
                ${costoCompra.toFixed(2)}
              </span>
            )}
         
  
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
            <div className="flex space-x-2">
               <Boton
                tipo="verMas"
                children="Ver mas"
                 onClick={() => navigate(`/productos/${producto.id}`, replace)}
                // onClick={<Navigate to="/productos"/>}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;
