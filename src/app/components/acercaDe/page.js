import React from "react";
import Image from "next/image";
import Sidebar from "../../components/sideBar/page";
import { FaUserCircle } from "react-icons/fa";
import ILUSTRACION from "../../images/LogoTipo-Cafe.png";

const AboutPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 ml-16 p-8">
        {/* Header */}
        <header className="flex items-center mb-12">
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-[#b26f22] w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Acerca De</h1>
              <p className="text-gray-600 text-lg">Conoce más sobre este panel</p>
            </div>
          </div>
        </header>

        {/* About Section */}
        <section className="bg-gray-100 rounded-xl shadow-md p-10 flex justify-between items-center">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Sobre este Panel de Administración
            </h2>
            <p className="text-gray-600 text-xl mb-8">
              Este sistema está diseñado para facilitar la gestión de tu negocio, brindándote
              herramientas eficientes para manejar tus productos, pedidos y clientes. Nuestro
              objetivo es garantizar que tengas el control total de tu panadería de manera sencilla
              e intuitiva.
            </p>
            <p className="text-gray-600 text-lg mb-8">
              Con este panel, puedes explorar secciones específicas, generar reportes y monitorear
              el rendimiento general de tus operaciones.
            </p>
            <div className="space-x-4">
              <button className="bg-[#b26f22] text-white px-6 py-3 rounded-lg hover:bg-[#9c5e1a] transition">
                Aprende Más
              </button>
              <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
                Regresar al Inicio
              </button>
            </div>
          </div>
          <div>
            <Image
              src={ILUSTRACION}
              alt="Ilustración de Acerca De"
              className="w-96 rounded-lg"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
