import { useState } from "react";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function Nav({ onMostrarCarrito }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="flex items-center py-4">
            <span className="font-semibold text-gray-800 text-lg"></span>
          </div>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Otros elementos del menú... */}
            <button
              onClick={onMostrarCarrito}
              className="py-4 px-3 flex items-center text-gray-700 hover:text-blue-500 transition duration-300"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-1" />
              Carrito
            </button>
          </div>
        </div>
      </div>

      {/* Menú mobile desplegable */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        {/* Otros elementos del menú... */}
        <button
          onClick={() => {
            onMostrarCarrito();
            setIsOpen(false);
          }}
          className="w-full py-2 px-4 text-sm hover:bg-gray-100 flex items-center text-left"
        >
          <ShoppingCartIcon className="h-5 w-5 mr-2" />
          Carrito
        </button>
      </div>
    </nav>
  );
}

export default Nav;
