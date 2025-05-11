import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
//import CarritoPages from "./pages/CarritoPages.jsx";
//import ListaPages from "./pages/ListaPages.jsx";
//import Carrito from "./components/Carrito.jsx";
import ListaProductos from "./components/ListaProductos.jsx";
import NoFoundPages from "./pages/NoFoundPages.jsx";
import ContactoPages from "./pages/ContactoPages.jsx";
import { useState, useEffect } from "react";
import DocumentacionPages from "./pages/DocumentacionPages.jsx";
import CarritoPages from "./pages/CarritoPages.jsx";
const API_KEY = "9tNEjFhwUIus25QDwOd8iywPhg5QEyYDWiVS9NlvWfD2MeSClgYAU125";

const App = () => {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const LOADER_URL =
    "https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Hacer ambas llamadas a API simultáneamente
        const [imagesResponse, productosResponse] = await Promise.all([
          fetch(
            "https://api.pexels.com/v1/search?query=sneakers&per_page=148",
            {
              headers: { Authorization: API_KEY },
            }
          ),
          fetch("https://67f5e9af913986b16fa5e489.mockapi.io/api/products"),
        ]);

        // Verificar respuestas
        if (!imagesResponse.ok) throw new Error("Error en API de imágenes");
        if (!productosResponse.ok) throw new Error("Error en API de salones");

        // Convertir a JSON
        const [imagesData, productosData] = await Promise.all([
          imagesResponse.json(),
          productosResponse.json(),
        ]);

        // Guardar las imágenes por separado
        setImagenes(imagesData.photos);
        //console.log(imagesResponse);
        console.log(productosResponse);

        // Combinar datos
        const combinedData = productosData.map((producto, index) => {
          const imageIndex = index % imagesData.photos.length;
          return {
            ...producto,
            imagen:
              imagesData.photos[imageIndex]?.src.medium ||
              "https://via.placeholder.com/300",
          };
        });

        setProductos(combinedData);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    console.log(error);

    fetchData();
  }, []);

  const handleAgregarCarrito = (producto, cantidad) => {
    console.log("Producto a agregar:", producto);

    setCarrito((prevItem = []) => {
      // Valor por defecto para prevItem
      // Verificación segura con operador opcional y fallback
      const itemExistente = (prevItem || []).find(
        (item) => item?.nombre === producto?.nombre
      );

      if (itemExistente) {
        return prevItem.map((item) =>
          item?.nombre === producto?.nombre ? { ...item, cantidad } : item
        );
      } else {
        // Asegúrate de siempre retornar un array
        return [...(prevItem || []), { ...producto, cantidad }];
      }
    });
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleAgregarCarrito={handleAgregarCarrito}
              carrito={carrito}
            />
          }
        />
        {/* <Route path="./productos" element={<ListaPages
        handleAgregarCarrito={handleAgregarCarrito} carrito={carrito}/>} /> */}
        <Route
          path="/productos"
          element={
            loading ? (
              <img
                src={LOADER_URL}
                alt="Cargando productos..."
                className="w-80 h-80 object-contain animate-pulse rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              />
            ) : (
              <ListaProductos
                productos={productos} //  productosLista importado de data.js
                agregarCarrito={handleAgregarCarrito}
                mostrarCarrito={() => setMostrarCarrito(true)}
              />
            )
          }
        />
        <Route
          path="/carrito"
          element={
            <CarritoPages
              carrito={carrito}
              mostrarCarrito={() => setMostrarCarrito(true)}
            />
          }
        />
        <Route path="/contacto" element={<ContactoPages />} />
        <Route
          path="/documentacion"
          element={<DocumentacionPages carrito={carrito} />}
        />
        <Route path="*" element={<NoFoundPages />} />
      </Routes>
    </Router>
  );
};

export default App;
