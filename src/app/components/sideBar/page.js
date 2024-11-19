"use client";
import React from 'react';
import { Home, Users, ShoppingCart, DollarSign, Handshake, FileText, Grid, BarChart2 } from 'lucide-react';
import Image from 'next/image';
import logo from '../../images/LogoTipo-Cafe.png';

const Sidebar = () => {
  return (
    <div className="relative bg-gray-200">
      {/* Logo fijo en la parte superior */}
      <div className="fixed top-4 left-2 z-50 p-2">
        <Image src={logo} alt="Logo" className="w-12 h-12" />
      </div>

      {/* Sidebar siempre visible */}
      <div
        className="bg-white shadow-lg fixed top-0 left-0 w-35 h-full z-40"
        style={{ paddingTop: '80px' }} // Ajusta si es necesario
      >
        <div className="p-6">
          <nav>
            <ul className="space-y-6 text-center mt-6">
              <li><a href="#"><Home className="w-8 h-8 text-gray-700 hover:text-gray-900" /></a></li>
              <li><a href="/components/clients"><Users className="w-8 h-8 text-gray-700 hover:text-gray-900" /></a></li>
              <li><a href="#"><ShoppingCart className="w-8 h-8 text-gray-700 hover:text-gray-900" /></a></li>
              <li><a href="#"><DollarSign className="w-8 h-8 text-gray-700 hover:text-gray-900" /></a></li>
              <li><a href="/components/proveedores"><Handshake className="w-8 h-8 text-gray-700 hover:text-gray-900" /></a></li>
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
