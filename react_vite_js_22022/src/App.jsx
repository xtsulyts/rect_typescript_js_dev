import HomePages from "./pages/HomePages.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import ListaPages from "./pages/ListaPages.jsx";
//import ListaProductos from "./components/ListaProductos.jsx";
import NoFoundPages from "./pages/NoFoundPages.jsx";
import ContactoPages from "./pages/ContactoPages.jsx";
import { useState, useEffect } from "react";
import DocumentacionPages from "./pages/DocumentacionPages.jsx";
import CarritoPages from "./pages/CarritoPages.jsx";
import DetallePages from "./pages/DetallePages.jsx";
import UsuariosPrueba from "./components/UsuariosPrueba.jsx";
import LoginPages from "./pages/LoginPages.jsx";
import RutaProtegida from "./autenticacion/RutaProtegida.jsx";
import Admin from "./components/Admin.jsx";



const API_KEY = "9tNEjFhwUIus25QDwOd8iywPhg5QEyYDWiVS9NlvWfD2MeSClgYAU125";
/**
 * Componente principal de la aplicación
 * Maneja el estado global, rutas y efectos secundarios
 */
const App = () => {
  /**
   * Array que contiene los productos agregados al carrito
   */
  const [carrito, setCarrito] = useState([]);

  const [productos, setProductos] = useState([]); // Array que contiene todos los productos disponibles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Null cuando no hay error, string con mensaje de error cuando ocurre uno
  const [imagenes, setImagenes] = useState([]); // Array que contiene las imágenes obtenidas de Pexels API
  const [isAuth, setIsAuth] = useState(true)
  const LOADER_URL =
    "https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif";

  /**
   * Efecto secundario para cargar datos al montar el componente
   * Se ejecuta una vez al montar el componente (dependencias vacías [])
   */
  useEffect(() => {
    /**
     * Función asíncrona para obtener datos de las APIs
     * Realiza dos peticiones simultáneas:
     * 1. A Pexels API para obtener imágenes de zapatillas
     * 2. A MockAPI para obtener datos de productos
     */
    const fetchData = async () => {
      try {
        // Iniciar estado de carga y limpiar errores previos
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
        //console.log(productosResponse);

        // Combinar datos
        const combinedData = productosData.map((producto, index) => {
          // Usar módulo para ciclar las imágenes si hay más productos que imágenes
          const imageIndex = index % imagesData.photos.length;
          return {
            ...producto, // Spread operator para mantener todas las propiedades del producto

            // Asignar la imagen correspondiente o una imagen por defecto si no hay
            imagen:
              imagesData.photos[imageIndex]?.src.medium ||
              "https://via.placeholder.com/300",
          };
        });

        setProductos(combinedData); // Actualizar el estado de productos con los datos combinados
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        // Finalizar carga independientemente del resultado
        setLoading(false);
      }
    };
    console.log(error);

    fetchData(); // Llamar a la función para obtener datos
  }, []); // Array de dependencias vacío para que solo se ejecute al montar

  /**
   * Función para agregar productos al carrito
   * @param {Object} producto - El producto a agregar
   * @param {number} cantidad - La cantidad del producto a agregar
   */
  const handleAgregarCarrito = (producto, cantidad) => {
    //console.log("Producto a agregar:", producto);

    // Actualizar el estado del carrito usando el callback del setter
    // Esto asegura que tenemos el estado más actualizado
    setCarrito((prevItem = []) => {
      // Valor por defecto para prevItem en caso de ser null/undefined

      const itemExistente = (prevItem || []).find(
        (item) => item?.nombre === producto?.nombre
      );

      if (itemExistente) {
        // Si el producto ya está en el carrito
        // Mapear el carrito y actualizar solo la cantidad del producto existente
        return prevItem.map((item) =>
          item?.nombre === producto?.nombre ? { ...item, cantidad } : item
        );
      } else {
        // Si el producto no está en el carrito, agregarlo
        // Usamos spread operator para mantener los items previos
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
            />
          }
        />
        <Route
          path="/productos/:id"
          element={<DetallePages productos={productos} />}
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
          element={<DocumentacionPages carrito={carrito} />}
        />
        <Route path="*" element={<NoFoundPages />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/usuarios" element={<UsuariosPrueba />} />
        <Route path="administracion" element={<RutaProtegida isAuth={isAuth}>
      <Admin/> </RutaProtegida>}/>
      </Routes>
    </Router>
  );
};

export default App;
