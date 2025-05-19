import React, { createContext, useState, useEffect, useContext } from 'react';

const API_KEY = "9tNEjFhwUIus25QDwOd8iywPhg5QEyYDWiVS9NlvWfD2MeSClgYAU125";

/**
 * Contexto para manejar el estado global del carrito de compras
 * Proporciona:
 * - Lista de productos
 * - Estado del carrito
 * - Funciones para manipular el carrito
 * - Estado de autenticación
 */
const CarritoContext = createContext();

/**
 * Proveedor del contexto del carrito
 * @param {Object} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 */
export const CarritoProvider = ({ children }) => {
  // Estado para los productos en el carrito
  const [carrito, setCarrito] = useState([]);
  
  // Estado para todos los productos disponibles
  const [productos, setProductos] = useState([]);
  
  // Estado de carga
  const [loading, setLoading] = useState(true);
  
  // Manejo de errores
  const [error, setError] = useState(null);
  
  // Estado para las imágenes de productos
  const [imagenes, setImagenes] = useState([]);
  
  // Estado de autenticación
  const [isAuth, setIsAuth] = useState(true);

  // URL para el loader de carga
  const LOADER_URL = "https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif";

  /**
   * Efecto para cargar datos al montar el componente
   * Realiza peticiones a:
   * - API de Pexels para imágenes de productos
   * - MockAPI para datos de productos
   */
  useEffect(() => {
    //const API_KEY = process.env.REACT_APP_PEXELS_API_KEY; // Asegúrate de tener esta variable de entorno

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [imagesResponse, productosResponse] = await Promise.all([
          fetch("https://api.pexels.com/v1/search?query=sneakers&per_page=148", {
            headers: { Authorization: API_KEY },
          }),
          fetch("https://67f5e9af913986b16fa5e489.mockapi.io/api/products"),
        ]);

        if (!imagesResponse.ok) throw new Error("Error en API de imágenes");
        if (!productosResponse.ok) throw new Error("Error en API de productos");

        const [imagesData, productosData] = await Promise.all([
          imagesResponse.json(),
          productosResponse.json(),
        ]);

        setImagenes(imagesData.photos);

        // Combinar productos con sus imágenes
        const combinedData = productosData.map((producto, index) => ({
          ...producto,
          imagen: imagesData.photos[index % imagesData.photos.length]?.src.medium || 
                 "https://via.placeholder.com/300",
        }));

        setProductos(combinedData);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Agrega un producto al carrito o actualiza su cantidad si ya existe
   * @param {Object} producto - Producto a agregar
   * @param {number} cantidad - Cantidad del producto
   */
  const handleAgregarCarrito = (producto, cantidad) => {
    setCarrito(prevCarrito => {
      const itemExistente = prevCarrito.find(item => item.id === producto.id);
      
      if (itemExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id ? { ...item, cantidad } : item
        );
      }
      
      return [...prevCarrito, { ...producto, cantidad }];
    });
  };

  /**
   * Elimina un producto del carrito
   * @param {string} productoId - ID del producto a eliminar
   */
  const eliminarDelCarrito = (productoId) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== productoId));
  };

  /**
   * Actualiza la cantidad de un producto en el carrito
   * @param {string} productoId - ID del producto
   * @param {number} nuevaCantidad - Nueva cantidad
   */
  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
      return;
    }

    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  /**
   * Vacía completamente el carrito
   */
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  /**
   * Calcula el total de productos en el carrito
   * @returns {number} - Cantidad total de items
   */
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  /**
   * Calcula el precio total del carrito
   * @returns {number} - Precio total
   */
  const precioTotal = carrito.reduce(
    (total, item) => total + (item.precio * item.cantidad), 0
  );

  // Valor que será accesible para los componentes que consuman este contexto
  const value = {
    carrito,
    productos,
    imagenes,
    loading,
    error,
    isAuth,
    LOADER_URL,
    totalItems,
    precioTotal,
    handleAgregarCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    setIsAuth,
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto del carrito
 * @returns {Object} - Todos los valores del contexto
 */
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};