import Main from "../components/Main";
import Header from "../components/Header";
import ListaProductos from "../components/ListaProductos";
import Footer from "../components/Footer";

const HomePages = ({ carrito, productos, handleAgregarCarrito}) => {
  return (
    <>
    <Header carritoItems={carrito} />
      <Main />
      <ListaProductos
      productos={productos}
      agregarCarrito={handleAgregarCarrito}/>
      <Footer/>
    </>
  );
};

export default HomePages;
//productos, handleAgregarCarrito