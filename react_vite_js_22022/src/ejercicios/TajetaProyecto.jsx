import React from "react";
import { useState } from "react";
import Boton from "../components/Boton"

const TarjetaProyecto = ({ nombreProyecto, descripcionProyecto })  => {
    const [ mensaje, setMensaje] = useState(null);

    const handleClick = () => {
        setMensaje(descripcionProyecto)
        console.log("Botón clickeado!");
        //alert("Acción realizada");
      };
    


    return (
        <div className="border border-gray-300 rounded-lg p-4 m-2 w-48 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-gray-800">Proyecto: {nombreProyecto}</h3>
        <Boton onClick={handleClick}
        tipo="primario"/>
        <p className="text-sm text-gray-600 mt-2">{mensaje}</p>
        </div>
      )
};

export default TarjetaProyecto;