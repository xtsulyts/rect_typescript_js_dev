
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import Header from "./components/Header.jsx";
// import Footer from "./components/Footer.jsx";
//import App from "./App.jsx";
import { UsuarioProvider } from "./contex/UsuarioContexto.jsx";
import { CarritoProvider } from "./contex/CarritoContexto.jsx";
import { AdminContexProvider } from "./contex/AdminContex.jsx";
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>

    <UsuarioProvider>
      <AdminContexProvider>
      <CarritoProvider>
      <App />
      </CarritoProvider>
      </AdminContexProvider>
    </UsuarioProvider>
  </StrictMode>
);
