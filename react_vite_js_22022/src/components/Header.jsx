import { useState } from "react";
import "../components/estilos/Header.css"; // Archivo de estilos (opcional)
import { FaShopify } from "react-icons/fa";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useUsuario } from "../contex/UsuarioContexto";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../contex/CarritoContexto";
import { HiUser } from "react-icons/hi";
import Nav from "./Nav";

const Header = () => {
  const { precioTotal } = useCarrito(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { usuario, logout } = useUsuario();

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo y título */}
          <div className="header-brand">
            {<FaShopify className="header-logo" />}
            <h1 className="header-titulo">E-Shop Shoes</h1>
          </div>

          <div className="flex items-center bg-indigo-50 rounded-full px-4 py-2">
            <ShoppingCartIcon className="h-5 w-5 mr-2 text-indigo-600" />
            <span className="font-bold text-indigo-800">
              ${usuario ? precioTotal : 0}
            </span>
          </div>

          {/* Área de usuario */}
          <div className="flex relative">
            {usuario ? (
              <div className="relative">
                {/* Botón del usuario - ahora con onClick y estilos hover */}
                <div
                  className="flex items-center cursor-pointer hover:text-yellow-400 hover:underline"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <HiUser />
                  <span className="ml-1">__{usuario.name}</span>
                </div>

                {/* Menú desplegable - se activa solo por click */}
                {isDropdownOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => navigate("/perfil")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Perfil
                    </button>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="header-login-btn"
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </header>
      <Nav/>
    </>
  );
};

export default Header;
