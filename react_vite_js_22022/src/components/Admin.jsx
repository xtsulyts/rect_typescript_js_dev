//mport React, { useState } from 'react';
import Boton from './Boton';
import { useNavigate } from "react-router-dom";
import { useUsuario } from '../contex/UsuarioContexto';
import ListaProductos from './ListaProductos';
import { useCarrito } from '../contex/CarritoContexto';

const Admin = () => {
  const {  usuario } = useUsuario();
  const {  productos,
              carrito,
              handleAgregarCarrito} = useCarrito()
 
  
  const navigate = useNavigate();
  //if (!autenticado) {  // Pendiente resolver el estado autenticado
  if (!usuario) {
 return (
  <div className="max-w-md mx-auto mt-20 mb-20 p-8 bg-white border border-gray-200 rounded-xl shadow-md text-center">
    <div className="flex justify-center mb-4">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-12 w-12 text-red-500" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
        />
      </svg>
    </div>
    
    <h2 className="text-2xl font-bold text-gray-800 mb-3">Acceso restringido</h2>
    <p className="text-gray-600 mb-6">Necesitas privilegios de administrador para acceder a esta sección</p>
    
    <div className="flex justify-center gap-4">
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Volver al inicio
      </button>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
      >
        Iniciar sesión
      </button>
    </div>
    
    <p className="mt-6 text-xs text-gray-400">
      ¿Problemas para acceder? <a href="#" className="text-red-500 hover:underline">Contacta al soporte</a>
    </p>
  </div>
);
  }

  return (
     <>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tarjeta de Usuarios */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-blue-700 mb-2">Usuarios</h3>
          <p className="text-sm text-gray-600">Gestiona los usuarios del sistema</p>
          <button className="mt-3 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm">
            Administrar
          </button>
        </div>

        {/* Tarjeta de Productos */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="font-semibold text-green-700 mb-2">Productos</h3>
          <p className="text-sm text-gray-600">Administra el catálogo</p>
          <button className="mt-3 px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 text-sm">
            Administrar
          </button>
        </div>

        {/* Tarjeta de Pedidos */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <h3 className="font-semibold text-purple-700 mb-2">Pedidos</h3>
          <p className="text-sm text-gray-600">Revisa los pedidos realizados</p>
          <button className="mt-3 px-3 py-1 bg-purple-100 text-purple-600 rounded hover:bg-purple-200 text-sm">
            Administrar
          </button>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t">
        <h3 className="font-semibold mb-2">Acciones rápidas</h3>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm">
            Generar reporte
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm">
            Ver estadísticas
          </button>
        </div>
      </div>
      
    </div>
    <ListaProductos
       productos={productos}
              carrito={carrito}
              agregarCarrito={handleAgregarCarrito}/>
   </>
  );
};

export default Admin;