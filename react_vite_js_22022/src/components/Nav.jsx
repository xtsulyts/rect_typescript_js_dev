import React, { useState } from 'react';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          {/* Logo o marca - puedes reemplazar esto */}
          <div className="flex items-center py-4">
            <span className="font-semibold text-gray-800 text-lg">E-Shoes Shop</span>
          </div>
          
          {/* Menú para desktop (hidden en mobile) */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="#" className="py-4 px-3 text-gray-700 hover:text-blue-500 transition duration-300">
              Contacto
            </a>
            <a href="#" className="py-4 px-3 text-gray-700 hover:text-blue-500 transition duration-300">
              Información
            </a>
            <a href="#" className="py-4 px-3 flex items-center text-gray-700 hover:text-blue-500 transition duration-300">
              <ShoppingCartIcon className="h-5 w-5 mr-1" />
              Carrito
            </a>
          </div>
          
          {/* Botón hamburguesa (mobile) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none mobile-menu-button"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú mobile (condicional) */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100">Contacto</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100">Información</a>
        <a href="#" className=" py-2 px-4 text-sm hover:bg-gray-100 flex items-center">
          <ShoppingCartIcon className="h-5 w-5 mr-2" />
          Carrito
        </a>
      </div>
    </nav>
  );
}

export default Nav;