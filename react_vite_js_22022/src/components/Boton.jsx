import React from "react";
import { useState } from "react";

const Boton = ({ 
    onClick, 
    children, 
    tipo = "primario" // Valor por defecto
  }) => {
    // Estilos base
    const baseStyles = "px-4 py-2 rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
    
    // Estilos según tipo
    const tipoStyles = {
      primario: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
      secundario: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
      peligro: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
    }
  
    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${tipoStyles[tipo]}`}
      >
        {children}
      </button>
    );
  };
  
  export default Boton;