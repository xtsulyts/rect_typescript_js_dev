import React from 'react';
import ListProduct from './components/ListProduct';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
  const datos = [
    { id: 1, codigo: 1001, nombre: 'Producto A', cantidad: 5 },
    { id: 2, codigo: 1002, nombre: 'Producto B', cantidad: 3 },
    { id: 3, codigo: 1003, nombre: 'Producto C', cantidad: 8 },
  ];

  const handleItemClick = (id) => {
    console.log(`Item con ID ${id} clickeado`);
  };

  return (
    <>
    <Header/>
    <div className="lista-container">
      <h2>Lista de Productos</h2>
      {datos.map((item) => (
        <ListProduct
          key={item.id}
          {...item}
          onItemClick={handleItemClick}
          className="custom-class"
        />
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default App;