import React from 'react'
import { useParams } from 'react-router-dom'

const DetalleProduto = ({producto}) => {
    console.log(producto)
    const {id} = useParams()
  return (
    <div>
        detalle: {id}
      
    </div>
  )
}

export default DetalleProduto
