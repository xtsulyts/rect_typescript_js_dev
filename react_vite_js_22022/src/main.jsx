import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    {/* <Header
      totalCarrito={"???????"}
      /> */}
    <App />
    <Footer/>
  </StrictMode>,
)
