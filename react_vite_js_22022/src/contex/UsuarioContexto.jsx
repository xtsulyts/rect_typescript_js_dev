import { createContext, useState, useContext, useEffect, useCallback } from 'react';

const UsuarioContexto = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);



  // Limpiar autenticación
  const clearAuth = () => {
    localStorage.removeItem('avatar');
    localStorage.removeItem('usuarioData');
    setUsuario(null);
    setIsAuthenticated(false);
    setError(null);
  };

  // Función que se ejecuta al inicio
const initializeAuth = () => {
  const userData = localStorage.getItem('usuarioData');
  if (userData) {
    setUsuario(JSON.parse(userData));
    setIsAuthenticated(true);
  }
};

// Ejecutar al montar el contexto
useEffect(() => {
  initializeAuth();
}, []);

  // Login mejorado según dummyjson API
  const login = useCallback(async (credentials) => {
  try {
    setIsLoading(true);
    setError(null);
    
    // Validación de credenciales
    if (!credentials?.username || !credentials?.password) {
      throw new Error('usuarui y password requeridos');
    }

    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
        // expiresInMins: 30 // opcional: tiempo de expiración en minutos
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Extraer mensaje de error de la respuesta
      const errorMsg = data.message || 'Authentication failed';
      throw new Error(errorMsg);
    }

    // Estructura de datos según respuesta de DummyJSON
    const usuarioData = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
    };

    // Guardar en estado y almacenamiento local
    setUsuario(usuarioData);
    setIsAuthenticated(true);
    localStorage.setItem('avatar', data.image);
    localStorage.setItem('usuarioData', JSON.stringify(usuarioData));

    return { success: true, usuario: usuarioData };
  } catch (err) {
    setError(err.message);
    console.error('Login error:', err);
    throw err; // Re-lanzar el error para manejo en el componente
  } finally {
    setIsLoading(false);
  }
}, []);

  // Logout
  const logout = useCallback(() => {
    clearAuth();
  }, []);

  // Valor del contexto
  const value = {
    usuario,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    // Opcional: función para refrescar token
    refreshToken: async () => {
      // Implementación para refrescar token
    }
  };

  return (
    <UsuarioContexto.Provider value={value}>
      {children}
    </UsuarioContexto.Provider>
  );
};

// Hook personalizado
export const useUsuario = () => {
  const context = useContext(UsuarioContexto);
  
  if (!context) {
    throw new Error('useUsuario must be used within an UsuarioProvider');
  }
  
  return context;
};