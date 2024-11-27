import React from "react";
import Image from "next/image";
import Sidebar from "../../components/sideBar/page";
import { FaUserCircle } from "react-icons/fa";
import ILUSTRACION from "../../images/Administrador-DashboardHome.png";

const AdminWelcome = () => {
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
              <h1 className="text-3xl font-bold text-gray-800">Administrador</h1>
              <p className="text-gray-600 text-lg">Bienvenido de nuevo</p>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="bg-gray-100 rounded-xl shadow-md p-10 flex justify-between items-center">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">¡Hola! Bienvenido al Panel</h2>
            <p className="text-gray-600 text-xl mb-8">
              Aquí podrás gestionar todos los aspectos importantes de tu negocio. 
              Navega fácilmente entre diferentes secciones y mantén el control de tu panadería.
            </p>
            <div className="space-x-4">
              <button className="bg-[#b26f22] text-white px-6 py-3 rounded-lg hover:bg-[#9c5e1a] transition">
                Comenzar
              </button>
              <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
                Ver Menú
              </button>
            </div>
          </div>
          <div>
            <Image
              src={ILUSTRACION}
              alt="Ilustración de Bienvenida"
              className="w-96 rounded-lg"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminWelcome;