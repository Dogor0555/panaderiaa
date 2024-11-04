"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../images/VectorPan-Login.png';
import fondoImage from '../../images/FondoLogin.png';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.text();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/components/dashboard');
        }, 1000);
      } else {
        setError(data || 'Credenciales inválidas');
      }
    } catch (error) {
      setError('Ocurrió un error. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/components/Register');
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src={fondoImage}
          alt="Fondo"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      {/* Contenedor del Login */}
      <div className="relative z-20  top-10 max-w-md w-full bg-white rounded-2xl p-10 shadow-lg text-center">
        {/* Contenedor para el logo sobresaliente */}
        <div className="relative w-full mb-10">
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 z-10 w-48 h-48">
            <Image
              src={logo}
              alt="Logo sobresaliente"
              layout="fill"
              objectFit="contain"
              className="shadow-xl" // Sin redondez
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-black mt-24">Iniciar Sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">¡Login exitoso!</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-center text-black font-bold mb-1">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
              className="w-full p-4 border border-brown-300 rounded-lg bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-[#A22D03]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-center text-black font-bold mb-1">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              className="w-full p-4 border border-brown-300 rounded-lg bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-[#A22D03]"
            />
          </div>
          <button
  type="submit"
  disabled={isLoading}
  className={`w-full bg-black hover:bg-yellow-600 text-white font-bold py-2 text-lg rounded-full transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
>
  {isLoading ? 'Procesando...' : 'Entrar'}
</button>
        </form>

        {/* Enlaces adicionales */}
        <div className="flex justify-center mt-4 text-sm space-x-4">
          <a href="#" className="text-[#A22D03] hover:underline">
            Olvidé mi contraseña
          </a>
          <button onClick={handleRegisterRedirect} className="text-black hover:underline">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
