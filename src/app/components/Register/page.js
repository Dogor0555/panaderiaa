"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../images/VectorPan-Login.png';
import fondoImage from '../../images/FondoLogin.png';
import Loader from '../Loader';

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/roles');
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        setError('Error al cargar los roles');
      }
    };
    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nombreUsuario: username,
          contrasena: password,
          rol: { idRol: role }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el usuario');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/components/Login');
      }, 1000);
    } catch (error) {
      setError(error.message || 'Ocurrió un error al intentar registrar el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute inset-0">
        <Image
          src={fondoImage}
          alt="Fondo"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <div className="relative z-20 top-10 max-w-md w-full bg-white rounded-2xl p-10 shadow-lg text-center">
        <div className="relative w-full mb-10">
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 z-10 w-48 h-48 hover:scale-105 hover:rotate-2 transition-all duration-500">
            <Image
              src={logo}
              alt="Logo sobresaliente"
              layout="fill"
              objectFit="contain"
              className="shadow-xl transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-black mt-24">Registro de Usuario</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">¡Registro exitoso!</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-center text-black font-bold mb-1">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              required
              className="w-full p-4 border border-brown-300 rounded-lg bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-[#A22D03]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-center text-black font-bold mb-1">Rol</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full p-4 border border-brown-300 rounded-lg bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-[#A22D03]"
            >
              <option value="">Seleccione un rol</option>
              {roles.map((r) => (
                <option key={r.idRol} value={r.idRol}>
                  {r.nombreRol}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-yellow-600 text-white font-bold py-2 text-lg rounded-full transition duration-200"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
