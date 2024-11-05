import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import Image from 'next/image';
import Link from 'next/link';
import fondoImage from '../images/Fondo.png';
import logo from '../images/logo.png';

const WelcomeInterface = ({ scrollToSlider }) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="relative min-h-screen">
      <Image
        src={fondoImage}
        alt="Background"
        fill
        className="object-cover z-0 filter"
        priority
        quality={100}
        opacity={30}
      />
      <div className="absolute inset-0 z-10" />

      <div className="relative z-20 min-h-screen p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-8 md:mb-12">
            <div className="flex-1" />
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden">
                <Image
                  src={logo}
                  alt="Logo"
                  fill
                  className="object-contain p-2"
                  priority
                  quality={100}
                />
              </div>
              <div className="h-0.5 w-44 md:w-72 bg-white mt-4 shadow-md" />
            </div>
            <div className="flex-1 flex justify-end">
              <Link href="components/Login">
                <button className="px-4 py-2 text-white border-2 border-white rounded-md hover:bg-white/10 transition-colors">
                  Iniciar Sesión
                </button>
              </Link>
            </div>
          </header>

          {/* Title Section */}
<div className="text-center mb-16 md:mb-20 mt-4 md:mt-8 flex flex-col items-center justify-center min-h-[50vh] md:min-h-0">
  <h1 className="text-5xl md:text-[180px] leading-tight text-white mb-2 md:mb-4 font-better-together">
    Conoce
  </h1>
  <h1 className="text-4xl md:text-[100px] leading-tight text-white mb-4 md:mb-8 font-better-together">
    Nuestra Panadería
  </h1>
  <div className="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2">
    <IoIosArrowDown
      className="w-12 h-12 md:w-16 md:h-16 text-white animate-bounce cursor-pointer"
      onClick={scrollToSlider}
    />
    <span className="text-white text-lg">{currentDate}</span>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default WelcomeInterface;
