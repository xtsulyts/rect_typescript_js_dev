import React, { Component } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import TarjetaProyecto from './components/TajetaProyecto';
import Galeria from './components/Galeria';
import Footer from './components/Footer';
import './index.css'
import './App.css'



const App = () => {

  const productos = [
    { id: 1, codigo: 1001, nombre: 'Producto A', cantidad: 2, imagen: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg' },
    { id: 2, codigo: 1002, nombre: 'Producto B', cantidad: 0,  imagen:'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    { id: 3, codigo: 1003, nombre: 'Producto C', cantidad: 8, imagen: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    { id: 4, codigo: 1001, nombre: 'Producto D', cantidad: 5, imagen:'https://images.pexels.com/photos/292998/pexels-photo-292998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    { id: 5, codigo: 1002, nombre: 'Producto E', cantidad: 3, imagen: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg' },
    { id: 6, codigo: 1003, nombre: 'Producto F', cantidad: 8, imagen: "https://images.pexels.com/photos/3602449/pexels-photo-3602449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 6, codigo: 1003, nombre: 'Producto G', cantidad: 8, imagen: "https://images.pexels.com/photos/1750045/pexels-photo-1750045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 6, codigo: 1003, nombre: 'Producto H', cantidad: 8, imagen: "https://images.pexels.com/photos/3782789/pexels-photo-3782789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  ]

 
  const proyecto = 
    { nombre: "E-Shoes-Shop",
      descripcion: "Ecommerce de venta de calzados del fabricante al cliente."
    }
  ;


  const handleProductClick = (productId) => {
    console.log('Producto seleccionado:', productId);
   
  }
  return (
    <>
    <Header titulo={"TRABAJO INTEGRADOR REACT"}/>
  

    <div>
      <Nav/>
    </div>

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
   
   
    <Footer/>
    </>
  );
};

export default App;

