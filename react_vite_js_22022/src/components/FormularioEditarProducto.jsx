import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioAgregarProducto from './FormularioAgregarProducto';

const API_KEY = "9tNEjFhwUIus25QDwOd8iywPhg5QEyYDWiVS9NlvWfD2MeSClgYAU125";
const MOCKAPI_URL = 'https://67f5e9af913986b16fa5e489.mockapi.io/api/products';

const FormularioEditarProducto = () => {
  
  const [productos, setProductos] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: 0,
    cantidad: 0,
    codigo: 0
  });
  const navigate = useNavigate();

// Función hash para generar un índice estable a partir de un string (ID)
function hashId(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convierte a entero de 32 bits
  }
  return Math.abs(hash);
}

// Fetch inicial de datos
const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);

    const [imagesResponse, productosResponse] = await Promise.all([
      fetch("https://api.pexels.com/v1/search?query=sneakers&per_page=148", {
        headers: { Authorization: API_KEY },
      }),
      fetch(MOCKAPI_URL),
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

useEffect(() => {
  fetchData();
}, []);

  // Manejar eliminación de producto
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${MOCKAPI_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar producto');

      setProductos(productos.filter(producto => producto.id !== id));
    } catch (err) {
      console.error("Error al eliminar:", err);
      setError(err.message);
    }
  };

  // Iniciar edición
  const startEdit = (producto) => {
    setEditingProduct(producto);
    setFormData({
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: producto.cantidad,
      codigo: producto.codigo
    });
  };

  // Manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'cantidad' || name === 'codigo' 
        ? Number(value) 
        : value
    }));
  };

  // Manejar actualización de producto
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${MOCKAPI_URL}/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al actualizar producto');

      const updatedProduct = await response.json();
      
      // Mantener la imagen original
      const updatedWithImage = {
        ...updatedProduct,
        imagen: editingProduct.imagen
      };

      setProductos(productos.map(p => 
        p.id === editingProduct.id ? updatedWithImage : p
      ));
      setEditingProduct(null);
    } catch (err) {
      console.error("Error al actualizar:", err);
      setError(err.message);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-3xl mx-auto mt-8">
      <p className="font-bold">Error</p>
      <p>{error}</p>
      <button 
        onClick={fetchData}
        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Reintentar
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">

  
      {/* Modal de edición */}
      {editingProduct && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-50 mt-16">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Encabezado */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Editar Producto</h2>
              <button 
                onClick={() => setEditingProduct(null)}
                className="text-white hover:text-indigo-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6">
              {/* Imagen */}
              <div className="mb-6">
                <div className="relative h-64 w-full rounded-lg overflow-hidden bg-gray-100 shadow-inner">
                  <img
                    className="w-full h-full object-cover"
                    src={editingProduct.imagen}
                    alt={editingProduct.nombre}
                  />
                  <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-2.5 py-1 rounded-full shadow-md">
                    #{editingProduct.codigo}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Imagen de referencia (no editable)
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleUpdate}>
                <div className="space-y-5">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre del producto</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      required
                    />
                  </div>

                  {/* Grupo de campos */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Precio */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Precio ($)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          $
                        </div>
                        <input
                          type="number"
                          name="precio"
                          value={formData.precio}
                          onChange={handleFormChange}
                          className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    {/* Cantidad */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock</label>
                      <input
                        type="number"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        min="0"
                        required
                      />
                    </div>

                    {/* Código */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Código</label>
                      <input
                        type="number"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Título y lista de productos */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
        <p className="text-gray-600 mt-2">Administra el inventario de productos</p>
            <FormularioAgregarProducto/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productos.map((producto) => (
          <div
            className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            key={producto.codigo}
          >
            {/* Imagen */}
            <div className="relative h-52 w-full overflow-hidden">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                src={producto.imagen}
                alt={producto.nombre}
                onClick={() => navigate(`/productos/${producto.id}`)}
              />
              <span className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2.5 py-1 rounded-full">
                #{producto.codigo}
              </span>
            </div>

            {/* Contenido */}
            <div className="p-4">
              {/* Nombre y precio */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800 truncate pr-2">
                  {producto.nombre}
                </h3>
                <span className="text-xl font-bold text-indigo-600 whitespace-nowrap">
                  ${producto.precio}
                </span>
              </div>

              {/* Stock */}
              <div className="flex items-center mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  producto.cantidad > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {producto.cantidad > 0 ? `${producto.cantidad} disponibles` : 'Agotado'}
                </span>
              </div>

              {/* Botones */}
              <div className="flex space-x-2">
                <button
                  onClick={() => startEdit(producto)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(producto.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormularioEditarProducto ;