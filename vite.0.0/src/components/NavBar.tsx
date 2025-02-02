import React from "react";
import { Routes, Route } from 'react-router-dom';
import AboutPage from './about/page'


const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">Pagina de prueba</div>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-blue-200">
              Home
            </a>
          </li>
          <li>
            <a href="./about" className="hover:text-blue-200">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-200">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-200">
              Contact
            </a>
          </li>
        </ul>

        {/* Call-to-Action Button */}
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
