"use client";
import React from 'react';
import { Home, Users, ShoppingCart, DollarSign, Handshake, FileText, Grid, BarChart2, Tag, Package, Utensils } from 'lucide-react'; 
import { GiBread } from 'react-icons/gi';

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
        className="bg-white shadow-lg fixed top-0 left-0 w-35 h-full z-40" // Cambié el valor de 'w-35' a 'w-48' para hacer la sidebar más ancha
        style={{ paddingTop: '80px' }} // Ajusta si es necesario
      >
        <div className="p-6">
          <nav>
            <ul className="space-y-6 text-center mt-6">
              {/* Dashboard: Página principal */}
              <li className="group relative">
                <a href="/components/dashboard">
                  <Home className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-transform transform group-hover:scale-110" />
                </a>
                <span className="tooltip">Dashboard</span>
              </li>

              {/* Clientes */}
              <li className="group relative">
                <a href="/components/clients">
                  <Users className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-transform transform group-hover:scale-110" />
                </a>
                <span className="tooltip">Clientes</span>
              </li>

              {/* Materia Prima */}
              <li className="group relative">
                <a href="/components/materiasPrimas">
                  <Package className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-transform transform group-hover:scale-110" />
                </a>
                <span className="tooltip">Materia Prima</span>
              </li>

              <li className="group relative">
  <a href="/components/productos">
    <GiBread  className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-transform transform group-hover:scale-110" />
  </a>
  <span className="tooltip">Productos</span>
</li>


              {/* Carrito */}
              <li className="group relative">
                <a href="#">
                  <ShoppingCart className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-transform transform group-hover:scale-110" />
                </a>
                <span className="tooltip">Carrito</span>
              </li>

              {/* Ventas */}
              <li className="group relative">
                <a href="#">
                  <DollarSign className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-transform transform group-hover:scale-110" />
                </a>
                <span className="tooltip">Ventas</span>
              </li>

              {/* Proveedores */}
              <li className="group relative">
                <a href="/components/proveedores">
                  <Handshake className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-transform transform group-hover:scale-110" />
                </a>
                <span className="tooltip">Proveedores</span>
              </li>

              {/* Documentos */}
              <li className="group relative">
                <a href="#">
                  <FileText className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-transform transform group-hover:scale-110" />
                </a>
                <span className="tooltip">Documentos</span>
              </li>

              {/* Inventario */}
              <li className="group relative">
                <a href="#">
                  <Grid className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-transform transform group-hover:scale-110" />
                </a>
                <span className="tooltip">Inventario</span>
              </li>

              {/* Categorías */}
              <li className="group relative">
                <a href="/components/categorias">
                  <Tag className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-transform transform group-hover:scale-110" />
                </a>
                <span className="tooltip">Categorías</span>
              </li>

              {/* Estadísticas */}
              <li className="group relative">
                <a href="#">
                  <BarChart2 className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-transform transform group-hover:scale-110" />
                </a>
                <span className="tooltip">Estadísticas</span>
              </li>

               {/* Recetas */}
               <li className="group relative">
                <a href="/components/recetas">
                  <Utensils className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-transform transform group-hover:scale-110" />
                </a>
                <span className="tooltip">Recetas</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
