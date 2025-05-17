import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import Header from "./components/Header.jsx";
// import Footer from "./components/Footer.jsx";
import App from "./App.jsx";
import { UsuarioProvider } from "./contex/UsuarioContexto.jsx";
import { CarritoProvider } from "./contex/CarritoContexto.jsx";
import AppContex from "./AppContex.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UsuarioProvider>
      <CarritoProvider>
      <AppContex />
      {/* <App /> */}
      </CarritoProvider>
    </UsuarioProvider>
  </StrictMode>
);
