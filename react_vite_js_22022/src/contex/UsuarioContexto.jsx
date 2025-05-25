import { createContext, useState, useContext, useEffect } from 'react';

/**
 * Creación del contexto de usuario.
 * Este contexto permitirá compartir el estado de autenticación y los datos del usuario
 * en toda la aplicación sin necesidad de pasar props manualmente.
 */
const UsuarioContexto = createContext();

/**
 * Proveedor del contexto de usuario.
 * Este componente envolverá las partes de la aplicación que necesiten acceder
 * a los datos de autenticación.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 */
export const UsuarioProvider = ({ children }) => {
  // Estado para almacenar los datos del usuario logueado
  const [usuario, setUsuario] = useState(null);
  // Estado para saber si el usuario está autenticado
  const [autenticado, setAutenticado] = useState(true);
  // Estado para manejar la carga inicial
  const [cargando, setCargando] = useState(true);

  /**
   * Efecto para verificar la autenticación al cargar la aplicación.
   * Aquí podrías verificar si hay un token en localStorage, por ejemplo.
   */
  useEffect(() => {
    const verificarAutenticacion = () => {
      // Simulamos una verificación de token (en una app real, sería asíncrono)
      const token = localStorage.getItem('token');
      const nombreUsuario = localStorage.getItem('nombre');
      
      if (token) {
        setAutenticado(false);
        // Aquí podrías hacer una llamada a la API para obtener los datos del usuario
      }
      
      setCargando(false);
      if (nombreUsuario) {
        setAutenticado(true);
      }
    };

    verificarAutenticacion();
  }, []);

  /**
   * Función para iniciar sesión.
   * 
   * @param {Object} datosUsuario - Objeto con los datos del usuario
   * @param {string} datosUsuario.email - Email del usuario
   * @param {string} datosUsuario.password - Contraseña del usuario
   * @returns {Promise} Promesa que resuelve cuando el login es exitoso
   */
  const login = async (datosUsuario) => {
    console.log(datosUsuario);
    
    try {
      // Aquí iría la llamada real a tu API de autenticación
      // Esto es un mock para demostración
      const response = await fetch('https://67f5e9af913986b16fa5e489.mockapi.io/api/usuarios');
      const usuarios = await response.json();
      
      // Buscamos el usuario que coincida con email y contraseña
      const usuarioEncontrado = usuarios.find(
        u => u.email === datosUsuario.email && u.password === datosUsuario.password
      );

      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
        setAutenticado(true);
        console.log(usuarioEncontrado)
        console.log("usuario autenticado:", {usuarioEncontrado})
        localStorage.setItem('token', 'token_simulado'); // pendiente JWT
        localStorage.setItem('usuario', usuarioEncontrado.nombre);
        return { success: true };
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  /**
   * Función para cerrar sesión.
   * Limpia los datos del usuario y el estado de autenticación.
   */
  const logout = () => {
    setUsuario(null);
    setAutenticado(false);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario')
  };

  // Valor que será accesible para los componentes que consuman este contexto
  const valor = {
    usuario,
    autenticado,
    cargando,
    login,
    logout
  };

  return (
    <UsuarioContexto.Provider value={valor}>
      {children}
    </UsuarioContexto.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto de usuario.
 * Simplifica el uso del contexto en los componentes.
 * 
 * @returns {Object} Objeto con los valores y funciones del contexto
 */
export const useUsuario = () => {
  const context = useContext(UsuarioContexto);
  
  if (!context) {
    throw new Error('useUsuario debe ser usado dentro de un UsuarioProvider');
  }
  
  return context;
};