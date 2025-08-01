import { useState } from "react";
import { useAdmin } from "../contex/AdminContex"



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
const FormularioAgregarProducto = () => {
  const { 
        loading,
        open,
        setOpen,
        productos,
        error,
        imagenes,
        abrirEditor,
        setAbrirEditor,
        nuevoProducto,
        setNuevoProducto,
        seleccionado,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        handleChange,
        prepararEdicion,
   } = useAdmin();

   const [isModalOpen, setIsModalOpen] = useState()
 

 return (
    <>
      {/* Botón para abrir el modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className=" right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span className="sr-only">Agregar producto</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Encabezado */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Agregar Nuevo Producto</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-indigo-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6">
              {/* Imagen de referencia */}
              <div className="mb-6 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                <div className="h-40 flex items-center justify-center text-gray-400">
                     <img
                    className="w-full h-full object-cover"
                    src={productos.imagen}
                    alt={imagenes.nombre}
                  />
                </div>
                <p className="text-center text-sm text-gray-500 py-2">
                  Imagen de referencia (se asignará automáticamente)
                </p>
              </div>

              <form onSubmit={agregarProducto}>
                <div className="space-y-5">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nombre del Producto
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={nuevoProducto.nombre}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Ej: Elegant Marble Salad"
                      required
                    />
                  </div>

                  {/* Grupo de campos */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Precio */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Precio ($)
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          $
                        </div>
                        <input
                          type="number"
                          name="precio"
                          min="0"
                          step="0.01"
                          value={nuevoProducto.precio}
                          onChange={handleChange}
                          className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Cantidad */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Cantidad
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="cantidad"
                        min="0"
                        value={nuevoProducto.cantidad}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        required
                      />
                    </div>

                    {/* Código */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Código
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="codigo"
                        min="0"
                        value={nuevoProducto.codigo}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Agregar Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormularioAgregarProducto; 