"use client";
import React from 'react';
import Sidebar from '../../components/sideBar/page';
import { User, RefreshCw, Users, Package, BarChart2, PieChart, Grid } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar bgColor="bg-gray-100" /> {/* Aquí le pasas el color de fondo del sidebar */}

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-4 sm:p-6 transition-all duration-300 md:ml-0">
        {/* Header */}
        <header className="text-black flex justify-between items-center mb-6 flex-col sm:flex-row">
          <div className="text-lg font-semibold mb-4 sm:mb-0">Administrador</div>
          <div className="flex items-center space-x-4">
            <input type="text" placeholder="Buscar..." className="p-2 rounded-md border w-32 sm:w-48" />
            <User className="w-6 h-6 text-gray-700" />
            <RefreshCw className="w-6 h-6 text-gray-700" />
          </div>
        </header>

        {/* Main Dashboard Content */}
        <div className="text-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Bienvenida */}
          <div className="bg-white rounded-lg p-4 shadow-md col-span-2 flex flex-col sm:flex-row items-center">
            <div className="flex-1 mb-4 sm:mb-0">
              <h2 className="text-xl font-bold">¡Hola! Administrador</h2>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Bienvenido al panel de administración. Aquí podrás gestionar todos los aspectos clave de la panadería,
                desde la supervisión de ventas y pedidos hasta la administración del inventario y los clientes.
              </p>
            </div>
            <img src="/path-to-your-image.png" alt="Admin Image" className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32" />
          </div>

          {/* Opciones Rápidas */}
          <div className="bg-white rounded-lg p-4 shadow-md col-span-2 sm:col-span-1">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 text-center">
              <div className="bg-gray-200 rounded-md p-4">
                <Users className="w-6 h-6 mx-auto text-gray-700" />
                <p className="text-sm sm:text-base">Clientes</p>
              </div>
              <div className="bg-gray-200 rounded-md p-4">
                <Package className="w-6 h-6 mx-auto text-gray-700" />
                <p className="text-sm sm:text-base">Proveedores</p>
              </div>
              <div className="bg-gray-200 rounded-md p-4">
                <Grid className="w-6 h-6 mx-auto text-gray-700" />
                <p className="text-sm sm:text-base">Producción</p>
              </div>
            </div>
          </div>

          {/* Ventas del día, Faltante de Stock, Pedidos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-3">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold">Ventas del día</h3>
              <p className="text-gray-600">10/11/2024</p>
              <p className="text-xl font-bold">Total: 25</p>
              <button className="mt-4 bg-gray-800 text-white p-2 rounded-md">Más detalles</button>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold">Faltante de Stock</h3>
              <p className="text-gray-600">Advertencia de stock bajo de materia prima para producción</p>
              <button className="mt-4 bg-gray-800 text-white p-2 rounded-md">Ver más</button>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold">Pedidos</h3>
              <p className="text-gray-600">Vista previa de estado de los pedidos en tiempo real</p>
              <button className="mt-4 bg-gray-800 text-white p-2 rounded-md">Ver más</button>
            </div>
          </div>

          {/* Analíticas */}
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-800 text-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold mb-4">Ventas</h3>
              <BarChart2 className="w-full h-32" />
            </div>
            <div className="bg-gray-800 text-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold mb-4">Productos más vendidos</h3>
              <div className="flex justify-around">
                <PieChart className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500" />
                <PieChart className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" />
                <PieChart className="w-12 h-12 sm:w-16 sm:h-16 text-pink-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
