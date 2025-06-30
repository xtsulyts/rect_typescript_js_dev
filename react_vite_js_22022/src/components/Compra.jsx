import React, { useState, useEffect } from 'react';
import { PrinterIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

const ComprobantesCompra = () => {
  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [contadorCompras, setContadorCompras] = useState(0);

  // Obtener y monitorear compras del localStorage
  useEffect(() => {
    const obtenerYMonitorearCompras = () => {
      const todasLasCompras = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('compra')) {
          try {
            const compra = JSON.parse(localStorage.getItem(key));
            if (compra && compra.productos && compra.fecha) {
              todasLasCompras.push({ ...compra, id: key });
            }
          } catch (error) {
            console.error('Error al parsear compra:', error);
          }
        }
      }

      // Ordenar por fecha (más reciente primero)
      todasLasCompras.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      
      setCompras(todasLasCompras);
      setContadorCompras(todasLasCompras.length);
      setCargando(false);
    };

    obtenerYMonitorearCompras();

    // Escuchar cambios en el localStorage
    const manejarCambioStorage = (e) => {
      if (e.key?.startsWith('compra_')) {
        obtenerYMonitorearCompras();
      }
    };

    window.addEventListener('storage', manejarCambioStorage);
    return () => window.removeEventListener('storage', manejarCambioStorage);
  }, []);

  // Formatear fecha legible
  const formatearFecha = (fechaISO) => {
    const opciones = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(fechaISO).toLocaleDateString('es-ES', opciones);
  };

  // Calcular total de la compra
  const calcularTotal = (productos) => {
    return productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  };

  // Generar PDF (simulado)
  const generarPDF = (compra) => {
    alert(`Generando PDF para compra del ${formatearFecha(compra.fecha)}`);
    // Lógica para generar PDF iría aquí
  };

  const eliminarCompra = async (idCompra) => {
  const resultado = await Swal.fire({
    title: '¿Eliminar esta compra?',
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    backdrop: `
      rgba(0,0,0,0.7)
      url("/images/trash-icon.gif")
      center top
      no-repeat
    `,
    customClass: {
      popup: 'border-2 border-red-500',
      title: 'text-red-600 font-bold',
      actions: 'mt-4'
    }
  });

  if (resultado.isConfirmed) {
    localStorage.removeItem(idCompra);
    setCompras(compras.filter(compra => compra.id !== idCompra));
    setContadorCompras(prev => prev - 1);
    
    Swal.fire(
      '¡Eliminada!',
      'La compra ha sido eliminada del historial.',
      'success'
    );
  }
};
//   // Eliminar compra del historial
//   const eliminarCompra = (idCompra) => {
//      {
//       localStorage.removeItem(idCompra);
//       setCompras(compras.filter(compra => compra.id !== idCompra));
//       setContadorCompras(prev => prev - 1);
//     }
//   };

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Mis Comprobantes de Compra</h1>
        {contadorCompras > 0 && (
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            Total de compras: {contadorCompras}
          </span>
        )}
      </div>
      
      {compras.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No hay compras registradas</h2>
          <p className="text-gray-500">Todavía no has realizado ninguna compra.</p>
        </div>
      ) : (
        compras.map((compra) => (
          <div key={compra.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            {/* Encabezado del comprobante */}
            <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Comprobante de Compra</h2>
                <p className="text-sm text-gray-300">Fecha: {formatearFecha(compra.fecha)}</p>
                <p className="text-xs text-gray-400">ID: {compra.id.replace('compra_', '')}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => generarPDF(compra)}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  title="Descargar PDF"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => window.print()}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  title="Imprimir"
                >
                  <PrinterIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => eliminarCompra(compra.id)}
                  className="p-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
                  title="Eliminar del historial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Cuerpo del comprobante */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Productos</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unit.</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {compra.productos.map((producto, i) => (
                        <tr key={i}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full object-cover" src={producto.imagen} alt={producto.nombre} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{producto.nombre}</div>
                                <div className="text-sm text-gray-500">Código: {producto.codigo}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${producto.precio.toFixed(2)}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{producto.cantidad}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">${(producto.precio * producto.cantidad).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Resumen de la compra */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Subtotal:</span>
                  <span className="text-sm text-gray-900">${calcularTotal(compra.productos).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Envío:</span>
                  <span className="text-sm text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200">
                  <span>Total:</span>
                  <span>${calcularTotal(compra.productos).toFixed(2)}</span>
                </div>
              </div>

              {/* Estado de la compra */}
              <div className={`mt-6 p-3 rounded-md text-center ${
                compra.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                compra.estado === 'completado' ? 'bg-green-100 text-green-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                Estado: <span className="font-semibold capitalize">{compra.estado || 'completado'}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ComprobantesCompra;