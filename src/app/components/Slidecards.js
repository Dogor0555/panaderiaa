import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoIosArrowUp } from 'react-icons/io';
import { motion, useAnimation } from 'framer-motion';
import fondoImage from '../images/fondo4.png';
import vectorVentasSlide from '../images/VectorVentas-Slide.png';
import vectorUsersSlide from '../images/VectorUsers-Slide.png';
import vectorInventarioSlide from '../images/VectorInventario-Slide.png';
import vectorProduccionSlide from '../images/VectorProduccion-Slide.png';
import vectorComprasSlide from '../images/VectorCompras-Slide.png';
import vectorClientesSlide from '../images/VectorClientes-Slide.png';

const SliderCards = ({ scrollToTop }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardControls = useAnimation();

  const slides = [
    { title: "Gestión de ventas", description: "Nuestro sistema de control de ventas te permite gestionar y optimizar cada transacción de manera ágil y precisa, ayudando a mantener un registro detallado de tus ventas y a mejorar la relación con tus clientes, incrementando la eficiencia y precisión de cada operación.", image: vectorVentasSlide },
    { title: "Gestión de usuarios", description: "Nuestro sistema de gestión de usuarios simplifica y potencia la administración de perfiles, roles y permisos, ofreciendo una experiencia personalizada y segura para cada usuario dentro de la organización, promoviendo el control y la seguridad en el acceso a la información.", image: vectorUsersSlide },
    { title: "Control de inventario", description: "Nuestro sistema de control de inventario optimiza la gestión de tus productos, permitiendo un seguimiento en tiempo real de las existencias, movimientos y necesidades de reposición, ayudando a reducir costos y mejorar la disponibilidad de productos.", image: vectorInventarioSlide },
    { title: "Control de producción", description: "Nuestro sistema de control de producción te permite optimizar cada etapa del proceso productivo, asegurando un flujo constante y eficiente de materiales y recursos, mejorando la planificación y reduciendo los tiempos de entrega.", image: vectorProduccionSlide },
    { title: "Gestión de compras", description: "Nuestro sistema de gestión de compras facilita y optimiza cada etapa del proceso, desde la solicitud hasta la recepción, garantizando un control exhaustivo de proveedores y órdenes, y ayudando a negociar mejores condiciones y precios.", image: vectorComprasSlide },
    { title: "Gestión de clientes", description: "Con la funcionalidad de gestión de clientes, podrás centralizar toda la información relevante de tus clientes, permitiendo un seguimiento detallado de cada interacción, optimizando la fidelización y mejorando la experiencia del cliente.", image: vectorClientesSlide },
  ];

  // Detecta si la pantalla es móvil
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Configura la animación en bucle para las imágenes
  useEffect(() => {
    const animation = async () => {
      await cardControls.start({ scale: 1.05, transition: { duration: 3, repeat: Infinity, repeatType: 'reverse' } });
    };
    animation();
  }, [cardControls]);

  const totalSlides = Math.ceil(slides.length / (isMobile ? 1 : 2));

  useEffect(() => {
    // Configura el auto-slide cada 5 segundos
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [totalSlides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <Image src={fondoImage} alt="Background image" layout="fill" objectFit="cover" objectPosition="center" />
      </div>

      {/* Contenedor del Slider */}
      <div className="relative w-full max-w-7xl mx-auto px-4 py-16 overflow-hidden">
        <div
          className="relative flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }, (_, index) => (
            <div key={index} className={`flex w-full flex-shrink-0 ${isMobile ? "flex-col" : "flex-row"}`}>
              {slides.slice(index * (isMobile ? 1 : 2), index * (isMobile ? 1 : 2) + (isMobile ? 1 : 2)).map((slide, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="w-full px-4 flex items-center justify-center relative"
                >
                  <div
                    className="bg-white rounded-2xl p-6 md:p-10 pt-16 md:pt-24 shadow-lg text-center w-full max-w-xs md:max-w-lg flex flex-col justify-between relative overflow-visible"
                    style={{ minHeight: isMobile ? '280px' : '420px' }}
                  >
                    <div className="absolute top-[-40px] md:top-[-60px] left-1/2 transform -translate-x-1/2 z-10 shadow-xl rounded-full">
                      <motion.div animate={cardControls}>
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          width={isMobile ? 120 : 200}
                          height={isMobile ? 120 : 200}
                          layout="intrinsic"
                          className="object-contain"
                        />
                      </motion.div>
                    </div>
                    <h3 className="text-2xl md:text-3xl text-black font-bold mt-14 md:mt-24 mb-4">
                      {slide.title}
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base">{slide.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-500 transition-colors z-20"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-500 transition-colors z-20"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Botón de Flecha hacia Arriba */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-10 right-1/2 transform translate-x-1/2 bg-black p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-500 transition-colors z-20"
        >
          <IoIosArrowUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default SliderCards;