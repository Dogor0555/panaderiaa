"use client";

import React from 'react';
import { Package2 } from 'lucide-react';
// Importa la imagen directamente
import fondoImage from '../images/fondo.jpeg';
import imagen from '../images/imagen.jpeg';
import logo from '../images/logo.png';
import Image from 'next/image';

const WelcomeInterface = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <Image
        src={fondoImage}
        alt="Background"
        fill
        className="object-cover z-0"
        priority
        quality={100}
      />

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-br from-gray-100/40 to-orange-700/90"
      />

      {/* Content */}
      <div className="relative z-20 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-20">
            <div className="w-20 h-20 backdrop-blur-sm rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src={logo}
                alt="Logo"
                fill
                className="object-cover rounded-full"
                priority
                quality={100}
              />
            </div>
            <button 
              className="px-4 py-2 rounded-md backdrop-blur-sm text-white font-bold transition-colors hover:bg-gradient-to-br from-gray-300/40 to-gray-900/90 hover:text-white"
            >
              Iniciar Sesión
            </button>
          </header>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Left Circle with Illustration */}
            <div className="w-96 h-96 md:w-80 md:h-80 bg-white/95 backdrop-blur-sm rounded-full overflow-hidden flex items-center justify-center p-8 shadow-lg">
              <Image
                src={imagen}
                alt="Worker"
                fill
                className="object-cover rounded-full"
                priority
                quality={100}
              />
            </div>

            {/* Right Text Content */}
            <div className="md:w-1/2 text-left">
              <h1 className="text-4xl md:text-4xl font-bold text-white mb-6">
                CONTROL DE PRODUCCIÓN Y EMPAQUETADO
              </h1>
              <p className="text-lg text-gray-100 leading-relaxed">
                La producción implica la planificación y ejecución de tareas para transformar 
                materias primas en productos finales, optimizando recursos y tiempo. El 
                empaquetado, por su parte, protege los productos, facilita su manejo y les da 
                valor agregado al mejorar su presentaciónnnn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeInterface;
