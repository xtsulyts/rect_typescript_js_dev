function ListaProductos({ productos }) {
    return (
      <div>
        <h2>Productos Disponibles</h2>
        <ol>
          {productos.map((producto, index) => (
            <li key={index}>{producto}</li>
          ))}
        </ol>
      </div>
    );
  }
  
  // Uso:
  <ListaProductos productos={['Manzanas', 'Peras', 'Naranjas']} />