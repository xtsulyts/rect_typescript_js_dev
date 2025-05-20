import React, { useState, useEffect } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useUsuario } from '../contex/UsuarioContexto';
import { useNavigate } from 'react-router-dom';
const DocumentacionApi = () => {
  const [copied, setCopied] = useState(null);
  const [activeTab, setActiveTab] = useState('integracion');
  const { usuario } = useUsuario()

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

  // Función para copiar al portapapeles
  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  // Ejemplo de respuestas de API
  const ejemploPexels = {
    "photos": [
      {
        "id": 12345,
        "width": 3000,
        "height": 2000,
        "url": "https://www.pexels.com/photo/12345",
        "src": {
          "medium": "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg"
        }
      }
    ],
    "page": 1,
    "per_page": 1,
    "total_results": 100
  };

  const ejemploMockAPI = [
    {
      "id": "1",
      "nombre": "Zapatillas Running",
      "precio": "89.99",
      "descripcion": "Zapatillas deportivas para running",
      "categoria": "deportes"
    }
  ];

  const ejemploCombinado = [
    {
      "id": "1",
      "nombre": "Zapatillas Running",
      "precio": "89.99",
      "descripcion": "Zapatillas deportivas para running",
      "categoria": "deportes",
      "imagen": "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Documentación de Integración API</h1>
      
      {/* Pestañas */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('integracion')}
            className={`${activeTab === 'integracion' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Integración
          </button>
          <button
            onClick={() => setActiveTab('pexels')}
            className={`${activeTab === 'pexels' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            API Pexels
          </button>
          <button
            onClick={() => setActiveTab('mockapi')}
            className={`${activeTab === 'mockapi' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            API MockAPI
          </button>
          <button
            onClick={() => setActiveTab('resultado')}
            className={`${activeTab === 'resultado' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Resultado Final
          </button>
        </nav>
      </div>

      {/* Contenido de pestañas */}
      <div className="bg-white shadow rounded-lg p-6">
        {activeTab === 'integracion' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Proceso de Integración</h2>
            <p className="text-gray-600 mb-6">
              Este componente realiza la integración de dos APIs diferentes para crear productos de e-commerce completos:
            </p>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">1. Llamadas API simultáneas</h3>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm relative">
                  <code>
{`const [imagesResponse, productosResponse] = await Promise.all([
  fetch("https://api.pexels.com/v1/search?query=sneakers&per_page=148", {
    headers: { Authorization: API_KEY }
  }),
  fetch("https://67f5e9af913986b16fa5e489.mockapi.io/api/products")
]);`}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(`const [imagesResponse, productosResponse] = await Promise.all([
  fetch("https://api.pexels.com/v1/search?query=sneakers&per_page=148", {
    headers: { Authorization: API_KEY }
  }),
  fetch("https://67f5e9af913986b16fa5e489.mockapi.io/api/products")
]);`, 'integracion')}
                    className="absolute top-2 right-2 p-1 rounded bg-gray-700 hover:bg-gray-600"
                  >
                    {copied === 'integracion' ? (
                      <CheckIcon className="h-4 w-4 text-green-400" />
                    ) : (
                      <ClipboardDocumentIcon className="h-4 w-4 text-gray-300" />
                    )}
                  </button>
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">2. Combinación de datos</h3>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm relative">
                  <code>
{`const combinedData = productosData.map((producto, index) => {
  const imageIndex = index % imagesData.photos.length;
  return {
    ...producto,
    imagen: imagesData.photos[imageIndex]?.src.medium || 
            "https://via.placeholder.com/300"
  };
});`}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(`const combinedData = productosData.map((producto, index) => {
  const imageIndex = index % imagesData.photos.length;
  return {
    ...producto,
    imagen: imagesData.photos[imageIndex]?.src.medium || 
            "https://via.placeholder.com/300"
  };
});`, 'combinacion')}
                    className="absolute top-2 right-2 p-1 rounded bg-gray-700 hover:bg-gray-600"
                  >
                    {copied === 'combinacion' ? (
                      <CheckIcon className="h-4 w-4 text-green-400" />
                    ) : (
                      <ClipboardDocumentIcon className="h-4 w-4 text-gray-300" />
                    )}
                  </button>
                </pre>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                <h3 className="font-medium text-indigo-800 mb-2">Flujo completo</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  <li>Realizar ambas llamadas API en paralelo con <code className="bg-indigo-100 px-1 rounded">Promise.all</code></li>
                  <li>Verificar que ambas respuestas sean exitosas</li>
                  <li>Convertir respuestas a JSON</li>
                  <li>Combinar datos de productos con imágenes correspondientes</li>
                  <li>Actualizar el estado con los datos combinados</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pexels' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">API Pexels</h2>
            <p className="text-gray-600 mb-4">
              Proporciona imágenes de alta calidad para los productos. Ejemplo de respuesta:
            </p>
            
            <div className="bg-gray-800 rounded-md overflow-hidden">
              <div className="flex justify-between items-center bg-gray-700 px-4 py-2">
                <span className="text-sm font-mono text-gray-300">GET https://api.pexels.com/v1/search?query=sneakers</span>
                <button 
                  onClick={() => copyToClipboard(JSON.stringify(ejemploPexels, null, 2), 'pexels')}
                  className="flex items-center text-xs text-gray-300 hover:text-white"
                >
                  {copied === 'pexels' ? (
                    <>
                      <CheckIcon className="h-3 w-3 mr-1 text-green-400" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="h-3 w-3 mr-1" />
                      Copiar
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-gray-100 text-sm">
                {JSON.stringify(ejemploPexels, null, 2)}
              </pre>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h3 className="font-medium text-blue-800 mb-2">Estructura relevante</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><code className="bg-blue-100 px-1 rounded">photos[].src.medium</code>: URL de la imagen en tamaño mediano</li>
                <li><code className="bg-blue-100 px-1 rounded">photos[].id</code>: ID único de cada imagen</li>
                <li>Requiere autenticación via header <code className="bg-blue-100 px-1 rounded">Authorization</code></li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'mockapi' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">API MockAPI</h2>
            <p className="text-gray-600 mb-4">
              Proporciona los datos de los productos (nombre, precio, descripción). Ejemplo de respuesta:
            </p>
            
            <div className="bg-gray-800 rounded-md overflow-hidden">
              <div className="flex justify-between items-center bg-gray-700 px-4 py-2">
                <span className="text-sm font-mono text-gray-300">GET https://67f5e9af913986b16fa5e489.mockapi.io/api/products</span>
                <button 
                  onClick={() => copyToClipboard(JSON.stringify(ejemploMockAPI, null, 2), 'mockapi')}
                  className="flex items-center text-xs text-gray-300 hover:text-white"
                >
                  {copied === 'mockapi' ? (
                    <>
                      <CheckIcon className="h-3 w-3 mr-1 text-green-400" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="h-3 w-3 mr-1" />
                      Copiar
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-gray-100 text-sm">
                {JSON.stringify(ejemploMockAPI, null, 2)}
              </pre>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h3 className="font-medium text-green-800 mb-2">Estructura de producto</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><code className="bg-green-100 px-1 rounded">id</code>: Identificador único</li>
                <li><code className="bg-green-100 px-1 rounded">nombre</code>: Nombre del producto</li>
                <li><code className="bg-green-100 px-1 rounded">precio</code>: Precio como string</li>
                <li><code className="bg-green-100 px-1 rounded">descripcion</code>: Descripción detallada</li>
                <li><code className="bg-green-100 px-1 rounded">categoria</code>: Categoría del producto</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'resultado' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resultado de la Integración</h2>
            <p className="text-gray-600 mb-4">
              Datos combinados listos para mostrar en el e-commerce:
            </p>
            
            <div className="bg-gray-800 rounded-md overflow-hidden mb-6">
              <div className="flex justify-between items-center bg-gray-700 px-4 py-2">
                <span className="text-sm font-mono text-gray-300">Producto final</span>
                <button 
                  onClick={() => copyToClipboard(JSON.stringify(ejemploCombinado, null, 2), 'resultado')}
                  className="flex items-center text-xs text-gray-300 hover:text-white"
                >
                  {copied === 'resultado' ? (
                    <>
                      <CheckIcon className="h-3 w-3 mr-1 text-green-400" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="h-3 w-3 mr-1" />
                      Copiar
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-gray-100 text-sm">
                {JSON.stringify(ejemploCombinado, null, 2)}
              </pre>
            </div>

            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-medium text-gray-800">Ejemplo visual</h3>
              </div>
              <div className="p-6">
                <div className="max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                  <img 
                    className="h-48 w-full object-cover" 
                    src={ejemploCombinado[0].imagen} 
                    alt={ejemploCombinado[0].nombre} 
                  />
                  <div className="p-4">
                    <div className="font-bold text-lg mb-2">{ejemploCombinado[0].nombre}</div>
                    <p className="text-gray-600 text-sm mb-4">{ejemploCombinado[0].descripcion}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-indigo-600">${ejemploCombinado[0].precio}</span>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm font-medium">
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentacionApi;