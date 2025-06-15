import { useState } from 'react';
//import { useCarrito } from '../contex/CarritoContexto';
import { FaUser, FaLock } from 'react-icons/fa';
import { useUsuario } from '../contex/UsuarioContexto'; // Importamos nuestro hook personalizado
import Boton from './Boton';
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  // Accedemos a las funciones del contexto
  const { login, logout} = useUsuario();

  const [loginError, setLoginError] = useState(null);

/**
 * Valida los campos de un formulario de inicio de sesión/registro.
 * Verifica que el email tenga formato correcto y que la contraseña cumpla con longitud mínima.
 * 
 * @returns {boolean} - Retorna `true` si no hay errores de validación, `false` si hay errores
 * 
 * @example
 * const isValid = validateForm();
 * if (isValid) {
 *   // Proceder con el envío del formulario
 * }
 */
const validateForm = () => {
  // Objeto para almacenar los mensajes de error
  const newErrors = {};
  
  // Expresión regular para validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validación del campo email
  if (!email) {
    newErrors.email = 'El email es requerido';
  } else if (!emailRegex.test(email)) {
    newErrors.email = 'Email no válido';
  }

  // Validación del campo contraseña
  if (!password) {
    newErrors.password = 'La contraseña es requerida';
  } else if (password.length < 6) {
    newErrors.password = 'Mínimo 6 caracteres';
  }

  // Actualiza el estado de errores con los nuevos mensajes
  setErrors(newErrors);
  
  // Retorna true si no hay errores (el objeto newErrors está vacío)
  return Object.keys(newErrors).length === 0;
};



  /**
 * Maneja el envío del formulario de inicio de sesión.
 * Realiza validación, autenticación y manejo de errores.
 * 
 * @param {Event} e - Evento de submit del formulario
 * @async
 * 
 * @example
 * <form onSubmit={handleSubmit}>
 *   {/* Campos del formulario *\/}
 * </form>
 */
const handleSubmit = async (e) => {
    // Previene el comportamiento por defecto del formulario (recarga de página)
    e.preventDefault();
    
    // Valida el formulario y sale si hay errores
    if (!validateForm()) return;
    
    try {
      // Limpia errores previos
      setLoginError(null);
      
      // Intenta hacer login (llamada asíncrona a API/servicio)
      await login({ email, password });

      // Navega a la página principal si el login es exitoso
      navigate('/'); 
    } catch (error) {
      // Captura y muestra errores de autenticación
      setLoginError(error.message);
    }
};

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
        
        {loginError && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {loginError}
          </div>
        )}

        {/* Campo Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-500" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@tienda.com"
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Campo Contraseña */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-500" />
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Botón de Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          
        >
          Ingresar
        </button>
         <h2 className="text-2xl font-bold mb-6 mt-10 text-center text-gray-800">Usuarios de prueba</h2>
        
           <div className="flex space-x-2">
               <Boton
               tipo='verUsuarios'
                children="Usuarios"
                 onClick={() => navigate("/usuarios")}
                // onClick={<Navigate to="/productos"/>}
                />
            </div>
      </form>
    </div>
  );
};

export default LoginForm;