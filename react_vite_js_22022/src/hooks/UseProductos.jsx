// hooks/useProductos.js
import { useState } from 'react';

export const useProductos = () => {
  const API_URL = "https://67f5e9af913986b16fa5e489.mockapi.io/api/products";
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const crearProducto = async (producto) => {
    // Implementación existente...
  };

  const editarProducto = async (id, nuevosDatos) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevosDatos)
      });
      
      if (!response.ok) throw new Error('Error al editar');
      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Error al eliminar');
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    crearProducto,
    editarProducto,
    eliminarProducto,
    loading,
    error
  };
};