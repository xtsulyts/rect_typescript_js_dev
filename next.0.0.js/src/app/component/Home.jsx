"use client"

import { useState } from 'react'
//import "globals.css"


function Home (props, nombe, apellido) {
    const [windowsView, setWindowsView] = useState("");
    const handleWindowsView = () => {
       setWindowsView("holaaaaa")
        
    }

    return (
        <>
        
            
            
            
            <div>esto es una props {props.estoesunaprop}</div>
        
        </>
    )
}

export default Home;
