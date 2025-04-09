import Home from "./component/Home"
import Perfil from "./component/Perfil"
import Button from "./component/Button.jsx"

export default function App() {

  const mensaje = [
    {
      id: 1,
      nombre: "walter",
    }
  ]
  return (
    <>
    <Button boton="esto es un boton"/>
    <Home estoesunaprop="holaaa"/>
    <Perfil propDesdePadre="walter"/>
    
  
    </>

  );
}