import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Galeria from './components/Galeria';
import './index.css'
import './App.css'


const App = () => {
  const productos = [
    { id: 1, codigo: 1001, nombre: 'Producto A', cantidad: 5 },
    { id: 2, codigo: 1002, nombre: 'Producto B', cantidad: 3 },
    { id: 3, codigo: 1003, nombre: 'Producto C', cantidad: 8 },
    { id: 1, codigo: 1001, nombre: 'Producto A', cantidad: 5 },
    { id: 2, codigo: 1002, nombre: 'Producto B', cantidad: 3 },
    { id: 3, codigo: 1003, nombre: 'Producto C', cantidad: 8 },
    { id: 1, codigo: 1001, nombre: 'Producto A', cantidad: 5 },
    { id: 2, codigo: 1002, nombre: 'Producto B', cantidad: 3 },
    { id: 3, codigo: 1003, nombre: 'Producto C', cantidad: 8 },
  ];

  // const handleItemClick = (id) => {
  //   console.log(`Item con ID ${id} clickeado`);
  // };

  const handleProductClick = (productId) => {
    console.log('Producto seleccionado:', productId);
    // Aquí podrías navegar a una página de detalle o mostrar un modal
  }
  return (
    <>
    <Header titulo={"TRABAJO INTEGRADOR REACT"}/>
    <div className="app">
      <h1>Catálogo de Productos</h1>
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

