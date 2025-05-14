import Main from "../components/Main";
import Header from "../components/Header";
import ListaProductos from "../components/ListaProductos";

const HomePages = ({ carrito }) => {
  return (
    <>
    <Header carritoItems={carrito} />
      <Main />
      {/* <ListaProductos
      productos={productos}
      agregarCarrito={handleAgregarCarrito}/> */}
    </>
  );
};

export default HomePages;
//productos, handleAgregarCarrito