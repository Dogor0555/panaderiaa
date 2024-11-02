"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../images/logo.png';
import backgroundImage from '../../images/fondo3.jpg';
import loginBackground from '../../images/login.png';

const Register = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
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
                    router.push('/components/Login');
                }, 1000);
            } else {
                setError(data || 'Error al registrar el usuario');
            }
        } catch (error) {
            setError('Ocurrió un error. Por favor, intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex justify-center items-center h-screen">
            {/* Background Image */}
            <Image
                src={backgroundImage}
                alt="Background"
                fill
                className="object-cover z-0"
                priority
                quality={100}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-brown-900/60 to-brown-500/80" />

            {/* Register Container with Background Image */}
            <div
                className="relative z-20 rounded-lg shadow-md w-full max-w-5xl flex overflow-hidden"
                style={{
                    backgroundImage: `url(${loginBackground.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Logo Section */}
                <div className="w-1/2 flex justify-center items-center p-10">
                    <Image src={logo} alt="Pan Comido" width={300} height={300} quality={100} />
                </div>

                {/* Register Form Section */}
                <div className="w-1/2 p-10 pl-20 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-center text-[#A22D03] mb-8">Registrarse</h2>
                    {error && <p className="text-red-500 text-center mb-4 text-lg">{error}</p>}
                    {success && <p className="text-green-500 text-center mb-4 text-lg">¡Registro exitoso!</p>}
                    <form onSubmit={handleRegister}>
                        <div className="mb-6">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Usuario"
                                disabled={isLoading}
                                required
                                className="w-full p-4 border border-brown-300 rounded-lg text-xl font-bold text-[#A22D03] focus:outline-none focus:ring-2 focus:ring-[#A22D03]"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                disabled={isLoading}
                                required
                                className="w-full p-4 border border-brown-300 rounded-lg text-xl font-bold text-[#A22D03] focus:outline-none focus:ring-2 focus:ring-[#A22D03]"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirmar Contraseña"
                                disabled={isLoading}
                                required
                                className="w-full p-4 border border-brown-300 rounded-lg text-xl font-bold text-[#A22D03] focus:outline-none focus:ring-2 focus:ring-[#A22D03]"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-[#A22D03] hover:bg-yellow-600 text-white font-bold py-4 text-xl rounded-lg transition duration-200 ${
                                isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? 'Procesando...' : 'Registrarse'}
                        </button>
                    </form>

                    
<div className="flex justify-center mt-4 text-sm space-x-4">
  <a 
    onClick={() => router.push('/components/Login')} // Cambiar a Login
    className="text-[#A22D03] hover:underline cursor-pointer"
  >
    ¿Ya tienes una cuenta? Inicia sesión
  </a>
</div>
                </div>
            </div>
        </div>
    );
};

export default Register;
