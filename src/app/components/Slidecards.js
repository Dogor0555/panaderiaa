import React, { useState } from 'react';
import Image from 'next/image';
import fondoImage from '../images/fondo4.png';

const SliderCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Control de Inventario",
      description:
        "Nuestro sistema de control de inventario optimiza la gestión de tus productos mediante un seguimiento preciso y en tiempo real de las existencias. Olvídate de problemas de sobrestock o desabastecimiento: nuestro sistema automatiza las entradas y salidas, reduciendo errores y asegurando una base de datos siempre actualizada.",
    },
    {
      title: "Control de Producción",
      description:
        "Nuestro sistema de control de producción te permite optimizar cada etapa del proceso productivo, asegurando una gestión eficiente y en tiempo real. Desde la planificación de materiales hasta el seguimiento del progreso de cada lote, el sistema facilita la supervisión detallada de cada fase de producción.",
    },
    {
      title: "Control de Usuario",
      description:
        "Nuestro sistema de control de producción te permite optimizar cada etapa del proceso productivo, asegurando una gestión eficiente y en tiempo real. Desde la planificación de materiales hasta el seguimiento del progreso de cada lote, el sistema facilita la supervisión detallada de cada fase de producción.",
    },
  ];

  const totalSlides = Math.ceil(slides.length / 2);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-100">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={fondoImage}
          alt="Background image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      {/* Slider container */}
      <div className="relative w-full max-w-6xl mx-auto px-4 py-12">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }, (_, index) => (
              <div key={index} className="flex w-full flex-shrink-0 px-4">
                {slides.slice(index * 2, index * 2 + 2).map((slide, idx) => (
                  <div
                    key={idx}
                    className="w-1/2 px-4 flex items-center justify-center"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-sm">
                      <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6">
                        {/* Aquí puede ir la imagen o ícono de cada slide */}
                      </div>
                      <h3 className="text-3xl text-black font-bold mb-4">{slide.title}</h3>
                      <p className="text-black">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black p-2 rounded-full shadow-lg hover:bg-gray-500 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black p-2 rounded-full shadow-lg hover:bg-gray-500 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SliderCards;
