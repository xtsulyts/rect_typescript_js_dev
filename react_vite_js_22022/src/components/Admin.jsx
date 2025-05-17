import React from 'react';
import Boton from './Boton';
import { useNavigate } from "react-router-dom";

const Admin = ({ autenticado }) => {
  const navigate = useNavigate();
  if (!autenticado) {
    return (
      <div className="max-w-md mx-auto p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Acceso denegado</h2>
        <p className="text-red-500">Debes iniciar sesión como administrador</p>
        <div className="flex space-x-2">
               <Boton
                tipo="login"
                children="LOGIN"
                 onClick={() => navigate("/login")}
                // onClick={<Navigate to="/productos"/>}
                />
            </div>
      </div>
    );
  }

  return (
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
  );
};

export default Admin;