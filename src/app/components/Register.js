// components/Register.js
import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setSuccess(true);
        console.log('Registro exitoso');
      } else {
        const data = await response.text();
        setError(data || 'Fallo en el registro');
      }
    } catch (error) {
      setError('Ocurrió un error. Por favor, intenta de nuevo.');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-black mb-6">Crear Cuenta</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">¡Registro exitoso!</p>}
      <div className="mb-4 text-black">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
          required
          className="w-full p-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="mb-6 text-black">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          className="w-full p-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg transition duration-200"
      >
        Registrarse
      </button>
    </form>
  );
};

export default Register;
