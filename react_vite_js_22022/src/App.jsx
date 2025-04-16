import React from 'react';
import Header from './components/Header';
import TarjetaProyecto from './components/TajetaProyecto';
import Boton from './components/Boton';
import Galeria from './components/Galeria';
import Footer from './components/Footer';
import './index.css'
import './App.css'



const App = () => {

  const productos = [
    { id: 1, codigo: 1001, nombre: 'Producto A', cantidad: 5 },
    { id: 2, codigo: 1002, nombre: 'Producto B', cantidad: 3 },
    { id: 3, codigo: 1003, nombre: 'Producto C', cantidad: 8 },
    { id: 4, codigo: 1001, nombre: 'Producto A', cantidad: 5 },
    { id: 5, codigo: 1002, nombre: 'Producto B', cantidad: 3 },
    { id: 6, codigo: 1003, nombre: 'Producto C', cantidad: 8 },
    { id: 7, codigo: 1001, nombre: 'Producto A', cantidad: 5 },
    { id: 8, codigo: 1002, nombre: 'Producto B', cantidad: 3 },
    { id: 9, codigo: 1003, nombre: 'Producto C', cantidad: 8 },
  ];

  const proyecto = 
    { nombre: "E-Shoes-Shop",
      descripcion: "Ecommerce de venta de calzados del fabricante al cliente."
    }
  ;

  const desc = "esto tiene que cambiar"
    
  const handleVerMas = () => {
    return proyecto.descripcion
  }

  const handleProductClick = (productId) => {
    console.log('Producto seleccionado:', productId);
    // Aquí podrías navegar a una página de detalle o mostrar un modal
  }
  return (
    <>
    <Header titulo={"TRABAJO INTEGRADOR REACT"}/>
    <div className="app">

    <div className="p-4">
      <TarjetaProyecto
        nombreProyecto={proyecto.nombre}
        descripcionProyecto={proyecto.descripcion}
      />
      
    </div>
      <Galeria
        productos={productos} 
        onProductClick={handleProductClick}
      />
    </div>
   
    <Footer/>
    </>
  );
};

export default App;

