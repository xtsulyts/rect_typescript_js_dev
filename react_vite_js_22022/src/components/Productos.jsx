import React, { useState } from "react";
import Boton from "./Boton";
import "../components/estilos/Productos.css";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";

const Productos = ({ producto, agregarCarrito }) => {
  const [cantidad, setCantidad] = useState(0)
  const [stock, setStock] = useState(producto.cantidad) //cantidad es un atriburo del array ListaProductos
  const [costoCompra, setCostoCompra] = useState(0)
  // console.log(stock)
  //console.log(costoCompra)

  const incrementar = () => {
    if (stock >0) {
      setCantidad(prev => prev + 1);
      setStock(prev => prev - 1);
      setCostoCompra( costoCompra + producto.precio  )
    }
  };

  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(prev => prev - 1);
      setStock(prev => prev + 1);
      setCostoCompra( costoCompra - producto.precio  )
    }
  };
  

  return (
    <div className="galleryContainer">
      <div className="productCard" key={producto.codigo}>
        <div className="cardHeader">
            <h3 className="productoNobre">{producto.nombre} - ${producto.precio}</h3>
            {costoCompra!== 0 && <span>${costoCompra}</span>}
         
          <span className="productCodigo">#{producto.codigo}</span>
        </div>
        <div className="cardBody">
          {producto.imagen && (
            <img
              className="producto-imagen"
              src={producto.imagen}
              alt={producto.nombre}
            />
          )}
        
          <p
            className={`productCantidad ${
              !stock
                ? "agotado"
                : stock < 3
                ? "poco-stock"
                : "disponible"
            }`}
          >
            {!stock
              ? "❌ Agotado"
              : stock < 3
              ? `⚠️ Poco stock ( ${stock})`
              : `✔️ Disponibles: ${stock}`}
             
          </p>
          {cantidad !== 0 && <span>Unidades:{cantidad}</span>}
          
        </div>
        
        <div className="cardFooter">
          <Boton
            tipo="Agregar"
            children={"➕"}
            onClick={incrementar} 
          />
       
       
          <Boton
            tipo="eliminar"
            children={"➖"}
            onClick={decrementar} 
          />
        
       
          <Boton
            tipo="compra"
            children={ <a href="#" className="py-4 px-2 flex items-center text-white   hover:text-yellow transition duration-300">
              Agregar
              <ShoppingCartIcon className="h-5 w-5 mr-1" />
              
            </a>}
            onClick={() => agregarCarrito(producto)} 
          />
        </div>

      </div>
    </div>
  );
};

export default Productos;