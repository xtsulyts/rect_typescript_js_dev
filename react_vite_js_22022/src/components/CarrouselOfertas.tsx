import React, { useState, useEffect } from 'react';
import { useUsuario } from '../contex/UsuarioContexto';
import { useCarrito } from '../contex/CarritoContexto';

/**
 * Componente CarruselOfertas - Muestra ofertas especiales en formato de carrusel
 * 
 * Props:
 * @param {Array} productos - Array de productos con estructura:
 *   {
 *     id: string,
 *     nombre: string,
 *     precio: number,
 *     imagen: string,
 *     codigo: number,
 *     cantidad: number
 *   }
 * @param {boolean} autoPlay - Habilita la rotación automática (default: true)
 * @param {number} interval - Intervalo en ms para cambio de slide (default: 5000)
 * @param {boolean} showControls - Muestra flechas de navegación (default: true)
 * @param {boolean} showIndicators - Muestra indicadores de posición (default: true)
 */
const CarruselOfertas = ({
  
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true
}) => {
  // Contextos
  const { autenticado } = useUsuario();
  const { handleAgregarCarrito, productos } = useCarrito();
  
  // Crear ofertas basadas en los productos recibidos
  const [ofertas, setOfertas] = useState(() => {
    // Solo toma los primeros 3 productos para el carrusel
    const productosDestacados = productos.map((producto, index) => ({
      id: producto.id,
      imagen: producto.imagen,
      titulo: producto.nombre,
      descripcion: `¡Oferta especial! $${producto.precio} (Código ${producto.codigo})`,
      productoId: producto.id,
      enlace: `/productos/${producto.id}`,
      precio: producto.precio,
      cantidad: producto.cantidad
    }));
    
    // Si no hay productos, usa datos de ejemplo
    return productosDestacados.length > 0 ? productosDestacados : [
      {
        id: '1',
        imagen: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&h=350',
        titulo: 'Fresh Bamboo Chips',
        descripcion: '¡Oferta especial! $57 (Código 48)',
        productoId: '1',
        enlace: '/productos/1',
        precio: 57,
        cantidad: 21
      },
      {
        id: '2',
        imagen: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        titulo: 'Running Shoes Pro',
        descripcion: '¡Oferta limitada! $89 (Código 32)',
        productoId: '2',
        enlace: '/productos/2',
        precio: 89,
        cantidad: 15
      },
      {
        id: '3',
        imagen: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        titulo: 'Leather Boots',
        descripcion: '¡Últimas unidades! $120 (Código 56)',
        productoId: '3',
        enlace: '/productos/3',
        precio: 120,
        cantidad: 8
      }
    ];
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Efecto para el auto-play
  useEffect(() => {
    if (!autoPlay || isHovered || ofertas.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ofertas.length);
    }, interval);

    return () => clearInterval(timer);
  }, [ofertas.length, autoPlay, interval, isHovered]);

  // Manejar agregar al carrito desde una oferta
  const agregarAlCarrito = (productoId) => {
    if (!autenticado) {
      console.log('Debes iniciar sesión para agregar al carrito');
      return;
    }
    
    const producto = ofertas.find(p => p.id === productoId);
    if (producto) {
      handleAgregarCarrito({
        id: producto.id,
        nombre: producto.titulo,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1 // Se añade 1 unidad por defecto
      });
    }
  };

  // Cambiar slide manualmente
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Navegación anterior/siguiente
  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + ofertas.length) % ofertas.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % ofertas.length);
  };

  if (!ofertas || ofertas.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No hay ofertas disponibles en este momento</p>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenedor de slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {ofertas.map((oferta) => (
          <div
            key={oferta.id}
            className="w-full flex-shrink-0 relative group"
          >
            {/* Imagen de fondo */}
            <div className="relative h-96 w-full">
              <img
                src={oferta.imagen}
                alt={oferta.titulo}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Overlay de información */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-8">
                <div className="max-w-2xl">
                  <h3 className="text-3xl font-bold text-white mb-2">{oferta.titulo}</h3>
                  <p className="text-xl text-white mb-6">{oferta.descripcion}</p>
                  
                  <div className="flex gap-4">
                    <a
                      onClick={()=>alert("Funcionalidad pendiente")}
                      className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
                    >
                      Ver detalles
                    </a>
                    <button
                      onClick={()=>alert("Funcionalidad pendiente")}//onClick={() => agregarAlCarrito(oferta.id)}
                      className="px-6 py-3 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-600 transition-colors duration-300 flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Añadir al carrito (${oferta.precio})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegación */}
      {showControls && ofertas.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300"
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300"
            aria-label="Siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Indicadores de posición */}
      {showIndicators && ofertas.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {ofertas.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-amber-400 w-6' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Ir a la oferta ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarruselOfertas;