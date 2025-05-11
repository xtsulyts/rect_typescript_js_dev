import React from "react";
import { FiShoppingCart, FiStar, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Banner */}

      <section className="mb-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white relative overflow-hidden h-[400px]">
        <div className="flex flex-col md:flex-row justify-between items-center h-full">
          <div className="max-w-2xl z-10">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Oferta de Temporada
            </h1>
            <p className="mb-6 text-xl">
              Hasta 40% de descuento en productos seleccionados
            </p>
            <Link
              to="/productos"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
            >
              Comprar Ahora
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex items-center space-x-4 rounded-lg border border-gray-200 p-6">
          <div className="rounded-full bg-blue-100 p-4 text-blue-600">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
            <p className="text-gray-600">
              Productos verificados y garantizados
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 rounded-lg border border-gray-200 p-6">
          <div className="rounded-full bg-green-100 p-4 text-green-600">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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

export default Main;
