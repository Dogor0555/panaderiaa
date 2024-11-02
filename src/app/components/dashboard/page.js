"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../images/logo.png';
import backgroundImage from '../../images/fondo3.jpg';

const Dashboard = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Lógica para cerrar sesión
        console.log("Cerrar sesión");
        // Redirigir a la página de login
        router.push('/components/Login');
    };

    return (
        <div className="relative flex h-screen">
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

            {/* Sidebar */}
            <div className="relative z-20 w-64 bg-white border-r border-brown-300 shadow-lg">
                <div className="flex items-center justify-center p-4">
                    <Image src={logo} alt="Logo" width={150} height={150} />
                </div>
                <nav className="flex flex-col p-4">
                    <a href="#" className="py-2 text-lg text-[#A22D03] hover:bg-gray-200 rounded">Inicio</a>
                    <a href="#" className="py-2 text-lg text-[#A22D03] hover:bg-gray-200 rounded">Perfil</a>
                    <a href="#" className="py-2 text-lg text-[#A22D03] hover:bg-gray-200 rounded">Configuración</a>
                    <button
                        onClick={handleLogout}
                        className="py-2 text-lg text-[#A22D03] hover:bg-gray-200 rounded"
                    >
                        Cerrar Sesión
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-10 z-20">
                <h1 className="text-4xl font-bold text-[#A22D03] mb-6">Bienvenido al Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Sección 1</h2>
                        <p>Contenido de la sección 1.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Sección 2</h2>
                        <p>Contenido de la sección 2.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Sección 3</h2>
                        <p>Contenido de la sección 3.</p>
                    </div>
                    {/* Agrega más secciones según sea necesario */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
