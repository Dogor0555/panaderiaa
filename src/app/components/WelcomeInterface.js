import React from 'react';
import { Package2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import fondoImage from '../images/fondo.jpeg';
import logo from '../images/logo.png';

const WelcomeInterface = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with blur */}
      <Image
        src={fondoImage}
        alt="Background"
        fill
        className="object-cover z-0 filter" // Apply blur here
        priority
        quality={100}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-gray-900/80 to-gray-700/95 " />

      {/* Content */}
      <div className="relative z-20 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-20">
            {/* Center Logo */}
            <div className="flex-1" /> {/* Spacer */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={logo}
                  alt="Logo"
                  fill
                  className="object-contain p-2"
                  priority
                  quality={100}
                />
              </div>
              {/* Underline with shadow */}
              <div className="h-0.5 w-72 bg-white mt-4 shadow-md" /> {/* Adjust width for longer line */}
            </div>
            <div className="flex-1 flex justify-end"> {/* Right-aligned container */}
              <Link href="/login">
                <button className="px-6 py-2 text-white border-2 border-white rounded-md hover:bg-white/10 transition-colors">
                  Iniciar Sesión
                </button>
              </Link>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center gap-16 mt-12">
{/* Left Side - Illustration */}
<div className="relative w-full md:w-1/2">
  <div className="w-full aspect-square relative">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-96 h-96">
        
        {/* Círculo desenfocado de fondo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 rounded-full bg-white opacity-30 blur-[100px]"></div>
        </div>
        
        {/* Inventory Illustration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64">
            <Image
              src={logo}
              alt="Logo"
              fill
              className="object-contain p-2"
              priority
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




            {/* Right Side - Text Content */}
            <div className="md:w-1/2 text-left">
              <h2 className="text-4xl font-bold text-white mb-6">
                Control y Gestión de Inventario - Esto es una pruebaaaa
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed">
                Nuestro sistema de control de inventario optimiza la gestión de tus productos mediante
                un seguimiento preciso y en tiempo real de las existencias. Olvídate de problemas de sobrestock
                o desabastecimiento: nuestro sistema automatiza las entradas y salidas, reduciendo errores y
                asegurando una base de datos siempre actualizada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeInterface;
