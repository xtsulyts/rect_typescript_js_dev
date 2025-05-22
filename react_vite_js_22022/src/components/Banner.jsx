import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="mb-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-20 text-white relative mr-41 ml-41 overflow-hidden h-[250px] md:h-[300px]">
      <div className="flex flex-col md:flex-row justify-between items-center h-full">
        <div className="max-w-2xl z-10">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">
            Oferta de Temporada
          </h1>
          <p className="mb-5 text-lg md:text-xl">
            Hasta 40% de descuento en productos seleccionados
          </p>
          <Link
            to="/productos"
            className="inline-block rounded-lg bg-white px-5 py-2 font-semibold text-blue-600 transition hover:bg-gray-100 md:px-6 md:py-3"
          >
            Comprar Ahora
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;

