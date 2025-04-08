import { useState } from 'react'

const [windowsView, setWindowsView] = useState(null);

function Home ({windowsView}) {
    const handleWindowsView = () => {
        mostrarWindows = setWindowsView("hola como estas.")
    }

    return (
        <>
        <div>
            <button onClick= { handleWindowsView}>Precionar Boton</button>
        </div>
        </>
    )
}

export default Home;
