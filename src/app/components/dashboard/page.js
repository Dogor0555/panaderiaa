"use client";
import React from "react";
import Image from "next/image";
import Sidebar from "../../components/sideBar/page";
import { FiUsers, FiBox, FiGrid, FiSearch, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import ILUSTRACION from "../../images/Administrador-DashboardHome.png";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const salesData = [
  { name: "Lun", ventas: 400 },
  { name: "Mar", ventas: 300 },
  { name: "Mie", ventas: 200 },
  { name: "Jue", ventas: 278 },
  { name: "Vie", ventas: 189 },
  { name: "Sab", ventas: 239 },
  { name: "Dom", ventas: 349 },
];

const pieData = [
  { name: "Producto 1", value: 50 },
  { name: "Producto 2", value: 25 },
  { name: "Producto 3", value: 75 },
];

const costsData = [
  { name: "Enero", costos: 1200, ganancias: 3000 },
  { name: "Febrero", costos: 1500, ganancias: 3200 },
  { name: "Marzo", costos: 1700, ganancias: 3400 },
];

const paymentsData = [
  { metodoPago: "Efectivo", montoPago: 1000 },
  { metodoPago: "Tarjeta", montoPago: 500 },
  { metodoPago: "Transferencia", montoPago: 800 },
];

const returnsData = [
  { name: "Lun", montoDevolucion: 200 },
  { name: "Mar", montoDevolucion: 150 },
  { name: "Mié", montoDevolucion: 100 },
  { name: "Jue", montoDevolucion: 300 },
  { name: "Vie", montoDevolucion: 50 },
];

const productionData = [
  { fechaProduccion: "Lun", produccion: 120 },
  { fechaProduccion: "Mar", produccion: 130 },
  { fechaProduccion: "Mié", produccion: 140 },
  { fechaProduccion: "Jue", produccion: 150 },
  { fechaProduccion: "Vie", produccion: 160 },
];

const colors = ["#F87171", "#FBBF24", "#4F46E5"]; // Colores vibrantes del diseño.

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}

      <Sidebar />
  
     
     

      {/* Main Content */}
      <main className="flex-1 ml-16 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 bg-gray-200 rounded-xl shadow-md p-4">
          {/* Icono de Administrador */}
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-[#4F46E5] w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Administrador</h1>
              <p className="text-gray-600 text-sm">Bienvenido de nuevo</p>
            </div>
          </div>

          {/* Barra de Búsqueda */}
          <div className="relative flex-1 mx-6">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full border rounded-lg pl-10 pr-4 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {/* Botón de Logout */}
          <button className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold">
            <FiLogOut className="w-5 h-5" />
            <span>Salir</span>
          </button>
        </header>

        {/* Accesos rápidos */}
        <section className="grid grid-cols-4 gap-6 mb-6">
          {/* Acceso Rápido 1 */}
          <div className="bg-gray-200 rounded-xl shadow-md p-6 text-center flex flex-col justify-between">
            <FiUsers className="text-[#b26f22] w-12 h-12 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Usuarios</h3>
            <p className="text-black mt-2">Administrar usuarios</p>
            <button className="mt-4 text-[#b26f22] font-semibold">Ir a Usuarios</button>
          </div>

          {/* Acceso Rápido 2 */}
          <div className="bg-gray-200 rounded-xl shadow-md p-6 text-center flex flex-col justify-between">
            <FiBox className="text-[#b26f22] w-12 h-12 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Productos</h3>
            <p className="text-black mt-2">Ver inventario y gestionar productos</p>
            <button className="mt-4 text-[#b26f22] font-semibold">Ir a Productos</button>
          </div>

          {/* Acceso Rápido 3 */}
          <div className="bg-gray-200 rounded-xl shadow-md p-6 text-center flex flex-col justify-between">
            <FiGrid className="text-[#b26f22] w-12 h-12 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Reportes</h3>
            <p className="text-black mt-2">Ver reportes de ventas y rendimiento</p>
            <button className="mt-4 text-[#b26f22] font-semibold">Ir a Reportes</button>
          </div>

          {/* Acceso Rápido 4 */}
          <div className="bg-gray-200 rounded-xl shadow-md p-6 text-center flex flex-col justify-between">
            <FiBox className="text-[#b26f22] w-12 h-12 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Stock</h3>
            <p className="text-black mt-2">Gestionar stock y cantidades disponibles</p>
            <button className="mt-4 text-[#b26f22] font-semibold">Ir a Stock</button>
          </div>
        </section>

        {/* Grid principal */}
        <div className="grid grid-cols-4 gap-6">
          {/* Bienvenida */}
          <section className="col-span-2 bg-gray-200 rounded-xl shadow-md p-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Hola! Administrador</h1>
              <p className="text-gray-600 mt-2 text-xl">
                Bienvenido al panel de administración. Aquí podrás gestionar todos los aspectos
                clave de la panadería.
              </p>
            </div>
            <div>
              <Image
                src={ILUSTRACION}
                alt="Ilustración de Bienvenida"
                className="w-80 rounded-lg"
              />
            </div>
          </section>

          {/* Reportes */}
{/* Reportes */}
<section className="col-span-2 grid grid-cols-3 gap-6">
  {/* Ventas del Día */}
  <div className="bg-gray-700 rounded-xl shadow-lg p-6 border-t-4 border-[#4F46E5] hover:shadow-xl transition-all">
    <h3 className="text-lg font-semibold text-gray-100 mb-4">Ventas del Día</h3>
    <div className="flex flex-col justify-between space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-4xl font-bold text-[#4F46E5]">25</p>
        <span className="text-white text-sm">Más detalles</span>
      </div>
      <div className="text-white text-x">
        <p>Ventas totales realizadas hoy.</p>
        <p className="font-semibold text-[#4F46E5]">¡Sigue así!</p>
      </div>
    </div>
  </div>

  {/* Faltante de Stock */}
  <div className="bg-gray-700 rounded-xl shadow-lg p-6 border-t-4 border-red-500 hover:shadow-xl transition-all">
    <h3 className="text-lg font-semibold text-gray-100 mb-4">Faltante de Stock</h3>
    <div className="flex flex-col justify-between space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-4xl font-bold text-red-500">Alerta</p>
        <span className="text-white text-sm">Ver más</span>
      </div>
      <div className="text-white text-x">
        <p>Revisa los productos que están cerca de agotarse.</p>
        <p className="font-semibold text-red-500">¡Actúa rápido!</p>
      </div>
    </div>
  </div>

  {/* Pedidos */}
  <div className="bg-gray-700 rounded-xl shadow-lg p-6 border-t-4 border-[#4F46E5] hover:shadow-xl transition-all">
    <h3 className="text-lg font-semibold text-gray-100 mb-4">Pedidos</h3>
    <div className="flex flex-col justify-between space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-4xl font-bold text-[#4F46E5]">12</p>
        <span className="text-white text-sm">Ver más</span>
      </div>
      <div className="text-white text-x">
        <p>Cantidad de pedidos pendientes hoy.</p>
        <p className="font-semibold text-[#4F46E5]">¡Revisa tus órdenes!</p>
      </div>
    </div>
  </div>
</section>



          {/* Gráficos y Datos */}
          <section className="col-span-4 grid grid-cols-3 gap-4">
            {/* Ventas Totales */}
            <section className="bg-gray-200 text-black rounded-xl shadow-md p-6">
              <h3 className=" font-semibold mb-4">Ventas Totales</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={salesData}>
                  <Bar dataKey="ventas" fill="#4F46E5" />
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </section>

            {/* Costos vs Ganancias */}
            <section className="bg-gray-200 text-black  rounded-xl shadow-md p-6">
              <h3 className=" font-semibold mb-4">Costos vs Ganancias</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={costsData}>
                  <Line type="monotone" dataKey="costos" stroke="#F87171" />
                  <Line type="monotone" dataKey="ganancias" stroke="#FBBF24" />
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </section>

            {/* Inventario Crítico */}
            <section className="bg-gray-200 text-black rounded-xl shadow-md p-6">
              <h3 className=" font-semibold mb-4">Inventario Crítico</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={100}>
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </section>
          </section>
        </div>

        {/* Métodos de Pago y Devoluciones */}
        <section className="grid grid-cols-2 gap-6 mt-6">
          {/* Métodos de Pago */}
          <section className="bg-gray-200 text-black rounded-xl shadow-md p-6">
            <h3 className="text-gray-800 font-semibold mb-4">Métodos de Pago</h3>
            <ul className="text-gray-600">
              {paymentsData.map((payment, index) => (
                <li key={index} className="flex justify-between py-2">
                  <span>{payment.metodoPago}</span>
                  <span className="font-semibold">${payment.montoPago}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Devoluciones */}
          <section className="bg-gray-200 text-black rounded-xl shadow-md p-6">
            <h3 className="text-gray-800 font-semibold mb-4">Devoluciones</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={returnsData}>
                <Line type="monotone" dataKey="montoDevolucion" stroke="#F87171" />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </section>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
