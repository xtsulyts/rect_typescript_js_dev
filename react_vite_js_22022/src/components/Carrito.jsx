import React from 'react'

const Carrito = ({carritoItems}) => {
  return (
    <div>
        <h2>CARRITO DE COMPRAS</h2>
        {carritoItems.length === 0 ? (<p>el carrito esta vacio</p>) : 
        (<ul>
            {carritoItems.map((item, index)=>(<li key={index}>{item.name} - {item.precio}</li>))}
        </ul>)}
      
    </div>
  )
}

export default Carrito
