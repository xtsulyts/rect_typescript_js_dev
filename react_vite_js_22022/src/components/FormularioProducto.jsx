import { useState } from "react";
import { useCarrito } from "../contex/CarritoContexto";

/**
 * Componente FormularioProducto - Permite agregar nuevos productos al sistema
 * 
 * Este componente proporciona un formulario para ingresar nuevos productos y enviarlos
 * a una API mock. Sigue los principios de mobile-first y está estilizado con Tailwind CSS.
 * 
 * Características:
 * - Validación básica de campos requeridos
 * - Manejo de errores
 * - Actualización del estado global del carrito
 * - Diseño responsive (mobile-first)
 * 
 * @returns {JSX.Element} Componente de formulario para agregar productos
 */
const FormularioProducto = () => {
  // Obtiene el estado global del carrito y su función de actualización
  const { productos } = useCarrito();
  
  // Estado local para manejar los valores del formulario
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: 0,
    cantidad: 0,
    codigo: 0,
  });

  /**
   * Maneja los cambios en los campos del formulario
   * 
   * Esta función se ejecuta cada vez que un campo del formulario cambia.
   * Convierte automáticamente los valores numéricos (precio, cantidad, código) a Number.
   * 
   * @param {Object} e - Evento del cambio en el input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({
      ...nuevoProducto,
      [name]: name === "precio" || name === "cantidad" || name === "codigo" 
        ? Number(value) 
        : value,
    });
  };

  /**
   * Maneja el envío del formulario
   * 
   * Realiza una petición POST a la API para agregar el nuevo producto.
   * Si es exitoso, actualiza el estado global y limpia el formulario.
   * Muestra alertas en caso de éxito o error.
   * 
   * @param {Object} e - Evento de submit del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validación básica antes de enviar
      if (!nuevoProducto.nombre || nuevoProducto.precio <= 0) {
        alert("Por favor complete todos los campos requeridos correctamente");
        return;
      }

      const response = await fetch(
        "https://67f5e9af913986b16fa5e489.mockapi.io/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoProducto),
        }
      );

      if (response.ok) {
        const productoAgregado = await response.json();
        alert(`Producto "${productoAgregado.nombre}" agregado con éxito!`);
        
        // Actualiza el estado global con el nuevo producto
        setNuevoProducto([...productos, productoAgregado]);
        
        // Limpia el formulario
        setNuevoProducto({
          nombre: "",
          precio: Number,
          cantidad: Number,
          codigo: Number,
        });
      } else {
        throw new Error("Error al agregar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al agregar el producto. Por favor intente nuevamente.");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-16 mb-16"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Agregar Nuevo Producto
      </h2>
      
      {/* Grupo de campo: Nombre */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
          Nombre del Producto
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nuevoProducto.nombre}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: Elegant Marble Salad"
        />
      </div>
      
      {/* Grupo de campos numéricos (responsive) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Campo: Precio */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
            Precio ($)
          </label>
          <input
            
            id="precio"
            name="precio"
            min="0"
            step="0.01"
            value={nuevoProducto.precio}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Campo: Cantidad */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidad">
            Cantidad
          </label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            min="0"
            value={nuevoProducto.cantidad}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Campo: Código */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="codigo">
            Código
          </label>
          <input
            type="number"
            id="codigo"
            name="codigo"
            min="0"
            value={nuevoProducto.codigo}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Agregar Producto
      </button>
    </form>
  );
};

export default FormularioProducto;