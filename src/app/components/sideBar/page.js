"use client";
import React, { useState } from 'react';
import { X as XIcon } from 'lucide-react';
import { Home, Users, ShoppingCart, DollarSign, Handshake, FileText, Grid, BarChart2 } from 'lucide-react';
import Image from 'next/image';
import logo from '../../images/LogoTipo-Cafe.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative bg-gray-200">
      {/* Logo que siempre está visible y activa/desactiva el sidebar */}
      <button
        className="fixed top-4 left-4 z-50 p-2"
        onClick={toggleSidebar}
      >
        <Image src={logo} alt="Logo" className="w-12 h-12" />
      </button>

      <div
        className={` 
          md:block md:static md:w-auto md:bg-transparent
          bg-white shadow-lg fixed top-0 left-0 w-64 h-full z-40
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ paddingTop: '80px' }} // Ajusta si es necesario
      >
        <div className="p-6">
          {/* Botón de cerrar solo cuando el sidebar está abierto */}
          <button
            className="block md:hidden p-2 text-gray-500 hover:text-gray-700"
            onClick={toggleSidebar}
          >
            <XIcon className="w-6 h-6" />
          </button>

          <nav>
            <ul className="space-y-6 text-center mt-6">
              <li><a href="#"><Home className="w-8 h-8 text-gray-700 hover:text-gray-900" /></a></li>
              <li><a href="/clients"><Users className="w-8 h-8 text-gray-700 hover:text-gray-900" /></a></li>
              <li><a href="#"><ShoppingCart className="w-8 h-8 text-gray-700 hover:text-gray-900" /></a></li>
              <li><a href="#"><DollarSign className="w-8 h-8 text-gray-700 hover:text-gray-900" /></a></li>
              <li><a href="#"><Handshake className="w-8 h-8 text-gray-700 hover:text-gray-900" /></a></li>
              <li><a href="#"><FileText className="w-8 h-8 text-gray-700 hover:text-gray-900" /></a></li>
              <li><a href="#"><Grid className="w-8 h-8 text-gray-700 hover:text-gray-900" /></a></li>
              <li><a href="#"><BarChart2 className="w-8 h-8 text-gray-700 hover:text-gray-900" /></a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;