
import Example  from './components/People';
import Navbar from './components/NavBar';;
import "./index.css"; 
import { Routes, Route } from 'react-router-dom';
import AboutPage from './about/page'
// O el archivo CSS que hayas usado para Tailwind


const App : React.FC = () => {
  return (
    <>
        <Routes>
        <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Navbar/>
        <Example/>
        </>
        );
};

export default App
