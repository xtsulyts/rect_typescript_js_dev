import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const UsuariosPrueba = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data = await response.json();
        setUsers(data.users); // Ajuste para acceder al array de usuarios
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-8" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Lista de Usuarios</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Género</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center">
                      <img 
                        src={user.image} 
                        alt={`${user.firstName} ${user.lastName}`} 
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      {user.firstName} {user.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleUserClick(user)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Ver más
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalle de usuario */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-center mb-4">
                    <img 
                      src={selectedUser.image} 
                      alt={`${selectedUser.firstName} ${selectedUser.lastName}`} 
                      className="w-32 h-32 rounded-full border-4 border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">Información Personal</h3>
                    <p><span className="font-medium">Edad:</span> {selectedUser.age}</p>
                    <p><span className="font-medium">Género:</span> {selectedUser.gender}</p>
                    <p><span className="font-medium">Fecha de nacimiento:</span> {selectedUser.birthDate}</p>
                    <p><span className="font-medium">Altura:</span> {selectedUser.height} cm</p>
                    <p><span className="font-medium">Peso:</span> {selectedUser.weight} kg</p>
                    <p><span className="font-medium">Grupo sanguíneo:</span> {selectedUser.bloodGroup}</p>
                    <p><span className="font-medium">Color de ojos:</span> {selectedUser.eyeColor}</p>
                    <p>
                      <span className="font-medium">Cabello:</span> {selectedUser.hair.color}, {selectedUser.hair.type}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Contacto</h3>
                    <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
                    <p><span className="font-medium">Teléfono:</span> {selectedUser.phone}</p>
                    <p><span className="font-medium">Usuario:</span> {selectedUser.username}</p>
                    <p><span className="font-medium">Contraseña:</span> {selectedUser.password}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Dirección</h3>
                    <p>{selectedUser.address.address}</p>
                    <p>{selectedUser.address.city}, {selectedUser.address.state} {selectedUser.address.postalCode}</p>
                    <p>{selectedUser.address.country}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Trabajo</h3>
                    <p><span className="font-medium">Empresa:</span> {selectedUser.company.name}</p>
                    <p><span className="font-medium">Departamento:</span> {selectedUser.company.department}</p>
                    <p><span className="font-medium">Puesto:</span> {selectedUser.company.title}</p>
                    <p><span className="font-medium">Universidad:</span> {selectedUser.university}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Información Financiera</h3>
                    <p><span className="font-medium">Tarjeta:</span> {selectedUser.bank.cardNumber} ({selectedUser.bank.cardType})</p>
                    <p><span className="font-medium">Expira:</span> {selectedUser.bank.cardExpire}</p>
                    <p><span className="font-medium">Moneda:</span> {selectedUser.bank.currency}</p>
                    <p><span className="font-medium">IBAN:</span> {selectedUser.bank.iban}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Otros Datos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <p><span className="font-medium">IP:</span> {selectedUser.ip}</p>
                    <p><span className="font-medium">MAC:</span> {selectedUser.macAddress}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">EIN:</span> {selectedUser.ein}</p>
                    <p><span className="font-medium">SSN:</span> {selectedUser.ssn}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Cripto:</span> {selectedUser.crypto.coin}</p>
                    <p><span className="font-medium">Wallet:</span> {selectedUser.crypto.wallet}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default UsuariosPrueba;