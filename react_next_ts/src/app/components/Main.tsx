import { Console } from 'node:console';
import React from 'react';
import { FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi';

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
const MainEcommerce = () => {
  // Datos de productos de ejemplo
  const products = [
    {
      id: 1,
      name: 'Zapatos Deportivos Pro',
      price: 89.99,
      rating: 4.8,
      image: '../assets/shoes_2.webp',
      isNew: true,
    },
    {
      id: 2,
      name: 'Reloj Intellbigente X3',
      price: 199.99,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      discount: 80,
    },
    {
      id: 3,
      name: 'Audífonos Inalámbricos',
      price: 59.99,
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    },
    {
      id: 4,
      name: 'Cámara Profesional 4K',
      price: 499.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      isNew: true,
    },
    {
      id: 5,
      name: 'Bolso Elegante',
      price: 79.99,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7',
    },
    {
      id: 6,
      name: 'Gafas de Sol Premium',
      price: 129.99,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
    },
  ];

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentProductIndex((prevIndex) => 
          prevIndex === products.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [isHovered, products.length]);

  const nextProduct = () => {
    setCurrentProductIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProduct = () => {
    setCurrentProductIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <section className="mb-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="max-w-2xl z-10">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Oferta de Temporada</h1>
          <p className="mb-6 text-xl">Hasta 40% de descuento en productos seleccionados</p>
          <button 
            className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
            onClick={() => console.log("click en boton comprar ahora")}
          >
            Comprar Ahora
          </button>
        </div>
        
        {/* Imagen del producto */}
        <div 
          className="relative mt-6 md:mt-0 md:absolute md:right-8 md:bottom-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img 
            src={products[currentProductIndex].image} 
            alt={products[currentProductIndex].name}
            className="h-48 w-48 object-cover rounded-lg shadow-xl"
          />
          
          {/* Controles de navegación */}
          {isHovered && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2">
              <button 
                onClick={prevProduct}
                className="bg-white bg-opacity-80 rounded-full p-2 text-blue-600 hover:bg-opacity-100"
              >
                <FaArrowLeft />
              </button>
              <button 
                onClick={nextProduct}
                className="bg-white bg-opacity-80 rounded-full p-2 text-blue-600 hover:bg-opacity-100"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
          
          {/* Info del producto */}
          <div className="absolute -bottom-2 left-0 right-0 bg-black bg-opacity-50 p-2 rounded-b-lg">
            <p className="text-sm font-semibold truncate">{products[currentProductIndex].name}</p>
            <p className="text-xs">${products[currentProductIndex].price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </section>

      {/* Product Grid */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Productos Destacados</h2>
          <button className="text-blue-600 hover:underline">Ver todo</button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-md transition hover:shadow-lg"
            ><h1>{}</h1>
              {/* Badges */}
              <div className="absolute left-3 top-3 z-10 flex space-x-2">
                {product.isNew && (
                  <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                    Nuevo
                  </span>
                )}
                {product.discount && (
                  <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-gray-500 opacity-0 transition hover:text-red-500 group-hover:opacity-100">
                <FiHeart className="h-5 w-5" />
              </button>

              {/* Product Image */}
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">({product.rating})</span>
                </div>

                <h3 className="mb-1 text-lg font-semibold">{product.name}</h3>
                <div className="flex items-center">
                  <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  {product.discount && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                    </span>
                  )}
                </div>

                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700" onClick={() => console.log("click en añadir al carrito")}>
                  <FiShoppingCart className="h-5 w-5" />
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex items-center space-x-4 rounded-lg border border-gray-200 p-6">
          <div className="rounded-full bg-blue-100 p-4 text-blue-600">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Garantía de Calidad</h3>
            <p className="text-gray-600">Productos verificados y garantizados</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 rounded-lg border border-gray-200 p-6">
          <div className="rounded-full bg-green-100 p-4 text-green-600">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Envío Rápido</h3>
            <p className="text-gray-600">Entrega en 24-48 horas</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 rounded-lg border border-gray-200 p-6">
          <div className="rounded-full bg-purple-100 p-4 text-purple-600">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Pago Seguro</h3>
            <p className="text-gray-600">Protegemos tus datos</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainEcommerce;