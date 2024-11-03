import React from 'react';
import { IoIosArrowDown  } from 'react-icons/io'; // Importa el icono de calendario
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import fondoImage from '../images/Fondo.jpg';
import logo from '../images/logo.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WelcomeInterface = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
  };

  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const slidesData = [
    {
      title: "Control y Gestión de Inventario - Slide 1",
      description: "Nuestro sistema de control de inventario optimiza la gestión de tus productos mediante un seguimiento preciso y en tiempo real de las existencias...",
    },
    {
      title: "Control y Gestión de Inventario - Slide 2",
      description: "Con nuestro sistema de inventario puedes personalizar reportes, mejorar la visibilidad de tus productos y optimizar tus operaciones.",
    },
    {
      title: "Control y Gestión de Inventario - Slide 3",
      description: "La solución ideal para mantener el inventario bajo control y maximizar la eficiencia en cada nivel.",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <Image
        src={fondoImage}
        alt="Background"
        fill
        className="object-cover z-0 filter"
        priority
        quality={100}
      />

      <div className="absolute inset-0 z-10 " />

      <div className="relative z-20 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-12">
            <div className="flex-1" />
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={logo}
                  alt="Logo"
                  fill
                  className="object-contain p-2"
                  priority
                  quality={100}
                />
              </div>
              <div className="h-0.5 w-72 bg-white mt-4 shadow-md" />
            </div>
            <div className="flex-1 flex justify-end">
              <Link href="/login">
                <button className="px-6 py-2 text-white border-2 border-white rounded-md hover:bg-white/10 transition-colors">
                  Iniciar Sesión
                </button>
              </Link>
            </div>
          </header>

         {/* Title Section with Extra Large Text */}
         <div className="text-center mb-20 mt-8">
            <div className="scale-125">
              <h1 className="text-[180px] leading-none text-white mb-4 font-better-together">
                Conoce
              </h1>
              <h1 className="text-[100px] leading-none text-white mb-8 font-better-together">
                Nuestra Panadería
              </h1>
              <div className="flex justify-center items-center">
              <IoIosArrowDown className="w-16 h-16 text-white animate-bounce" /> {/* Usa el ícono de flecha hacia abajo */}
              <span className="text-white text-lg">{currentDate}</span>
              </div>
            </div>
          </div>

          {/* Main Content - Carousel */}
          <div className="w-full bg-transparent">
            {/* <Slider {...settings}>
              {slidesData.map((slide, index) => (
                <div key={index}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-opacity duration-500 ease-in-out opacity-100">
                    <div className="w-full">
                      <div className="aspect-square relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-96 h-96">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-64 h-64 rounded-full bg-white opacity-30 blur-[100px] transition duration-500"></div>
                            </div>
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
                    <div className="text-left">
                      <h2 className="text-4xl font-bold text-white mb-6">
                        {slide.title}
                      </h2>
                      <p className="text-lg text-gray-200 leading-relaxed">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeInterface;
