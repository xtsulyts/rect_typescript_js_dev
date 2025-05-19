import HomePages from "./pages/HomePages.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import ListaPages from "./pages/ListaPages.jsx";
//import ListaProductos from "./components/ListaProductos.jsx";
import NoFoundPages from "./pages/NoFoundPages.jsx";
import ContactoPages from "./pages/ContactoPages.jsx";
import DocumentacionPages from "./pages/DocumentacionPages.jsx";
import CarritoPages from "./pages/CarritoPages.jsx";
import DetallePages from "./pages/DetallePages.jsx";
import UsuariosPrueba from "./components/UsuariosPrueba.jsx";
import LoginPages from "./pages/LoginPages.jsx";
import RutaProtegida from "./autenticacion/RutaProtegida.jsx";
//import Admin from "./components/Admin.jsx";
import { useCarrito } from "./contex/CarritoContexto.jsx";
import { useUsuario } from "./contex/UsuarioContexto.jsx";
import AdminPages from "./pages/AdminPages.jsx";

function AppContex() {
  const { carrito, handleAgregarCarrito, productos, autenticado, loading  } = useCarrito();
  const { login} = useUsuario();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePages
              handleAgregarCarrito={handleAgregarCarrito}
              carrito={carrito}
              productos={productos}
            />
          }
        />
        <Route
          path="/productos"
          element={
            <ListaPages
              productos={productos}
              carrito={carrito}
              handleAgregarCarrito={handleAgregarCarrito}
              loading={loading}
            />
          }
        />
        <Route
          path="/productos/:id"
          element={<DetallePages  productos={productos}
              carrito={carrito}
              handleAgregarCarrito={handleAgregarCarrito}
              loading={loading} />}
        />
        <Route
          path="/carrito"
          element={
            <CarritoPages
              carrito={carrito}
              // mostrarCarrito={() => setMostrarCarrito(true)}
            />
          }
        />
        <Route path="/contacto" element={<ContactoPages />} />
        <Route
          path="/documentacion"
          element={<RutaProtegida autenticado={autenticado}>
          <DocumentacionPages />{" "}
        </RutaProtegida>}
        />
    


        <Route path="*" element={<NoFoundPages />} />
        <Route path="/login" element={<LoginPages login={login}/>} />
        <Route path="/usuarios" element={<UsuariosPrueba />} />
        <Route
          path="administracion"
          element={
            <RutaProtegida autenticado={autenticado}>
              <AdminPages />{" "}
            </RutaProtegida>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppContex;
