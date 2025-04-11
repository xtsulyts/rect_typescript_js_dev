import { FaSun, FaMoon, FaSearch, FaUser, FaShopify } from "react-icons/fa";
import {IconButton} from "./Boton";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center space-x-2">
          <FaShopify className="text-yellow-500 text-2xl dark:text-yellow-300" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            E-commerce-shop-shoes
          </h1>
        </div>

        {/* Barra de búsqueda */}
        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 flex-1 max-w-md mx-6">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent border-none outline-none w-full text-gray-700 dark:text-gray-200 placeholder-gray-500"
          />
        </div>

        {/* Botones reutilizables */}
        <div className="flex items-center space-x-4">
          <IconButton
            icon={<FaUser />}
            onClick={() => console.log("Click perfil")}
            ariaLabel="Perfil"
          />
          <IconButton
            icon={<FaMoon className="block dark:hidden" />}
            secondaryIcon={<FaSun className="hidden dark:block" />}
            onClick={() => console.log("Toggle dark mode")}
            ariaLabel="Alternar modo oscuro"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

// const { toggleTheme } = useThemeToggle();
// <button onClick={toggleTheme}>Toggle</button>

// tailwind.config.js
// module.exports = {
//     darkMode: "class", // 👈 Esto es crucial
//   };