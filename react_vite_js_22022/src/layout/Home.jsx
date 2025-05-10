import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import ListaProductos from '../components/ListaProductos'
import Main from '../components/Main'
import Footer from '../components/Footer'
//import { productosLista } from '../components/utils/data'
import Carrito from '../components/Carrito'
import { useState, useEffect } from 'react'
//import loadingGift from '../assets/loading.webm'


const API_KEY = '9tNEjFhwUIus25QDwOd8iywPhg5QEyYDWiVS9NlvWfD2MeSClgYAU125';

const Home = ({ carrito, totalCarrito,  handleAgregarCarrito }) => {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const LOADER_URL = "https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Hacer ambas llamadas a API simultáneamente
        const [imagesResponse, productosResponse] = await Promise.all([
          fetch("https://api.pexels.com/v1/search?query=sneakers&per_page=148", {
            headers: { 'Authorization': API_KEY }
          }),
          fetch('https://67f5e9af913986b16fa5e489.mockapi.io/api/products')
        ]);
        
        // Verificar respuestas
        if (!imagesResponse.ok) throw new Error('Error en API de imágenes');
        if (!productosResponse.ok) throw new Error('Error en API de salones');
        
        // Convertir a JSON
        const [imagesData, productosData] = await Promise.all([
          imagesResponse.json(),
          productosResponse.json()
        ]);

        // Guardar las imágenes por separado
        setImagenes(imagesData.photos);
        console.log(imagesResponse)
        //console.log(productosResponse)
        
        // Combinar datos
        const combinedData = productosData.map((producto, index) => {
          const imageIndex = index % imagesData.photos.length;
          return {
            ...producto,
            imagen: imagesData.photos[imageIndex]?.src.medium || 'https://via.placeholder.com/300'
          };
        });
        
        setProductos(combinedData);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    console.log(error);
    console.log(imagenes.index)

    fetchData();
  }, []); // El array vacío [] significa que se ejecuta solo al montar el componente

  //return { productos, loading, error, imagenes };



  return (
    <>  
      <Header
        totalCarrito={totalCarrito} />
      <Nav onMostrarCarrito={()=> setMostrarCarrito(true)}/>
      {loading? (<img src={LOADER_URL} alt='loadind'
      style={{ width: "330px", height: "330px" }}/>):
      <ListaProductos 
      productos={productos}  //  productosLista importado de data.js
      agregarCarrito={handleAgregarCarrito} 
    /> }
      
        {mostrarCarrito && (
        <div className="">
          <Carrito 
            carritoItems={carrito}
            onCerrar={() => setMostrarCarrito(false)} 
          />
        </div>
      )}
      <Main />
      <Footer />
    </>
  );
};

export default Home;