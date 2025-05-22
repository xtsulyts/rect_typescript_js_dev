import Main from "../components/Main";
import Header from "../components/Header";
import ListaProductos from "../components/ListaProductos";
import Footer from "../components/Footer";
import CarruselOfertas from "../components/CarrouselOfertas";
import Banner from "../components/Banner"



const HomePages = ({ carrito, productos, handleAgregarCarrito }) => {
  console.log(productos);

  return (
    <>
      <Header carritoItems={carrito} />

      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Ofertas Especiales
        </h2>
        <CarruselOfertas
          productos={productos}
          autoPlay={true}
          interval={6000}
          showControls={true}
          showIndicators={true}
        />
      </section>
         <main className="container mx-auto px-4 py-6">
      <Banner />
      
    </main>
      <Main />

      <ListaProductos
        productos={productos}
        agregarCarrito={handleAgregarCarrito}
      />
      <Footer />
    </>
  );
};

export default HomePages;
//productos, handleAgregarCarrito
