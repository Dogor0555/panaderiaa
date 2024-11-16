"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sideBar/page";
import { User, Search, Edit, Trash2, Eye, FileText, XCircle } from "lucide-react"; // Importando el icono de cerrar

const Clients = () => {
  const [clients, setClients] = useState([]); // Para la lista de clientes
  const [searchId, setSearchId] = useState(""); // Para buscar cliente por ID
  const [searchResult, setSearchResult] = useState(null); // Cliente encontrado por ID

  // Obtener todos los clientes
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/clientes")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los clientes:", error);
      });
  }, []);

  // Buscar cliente por ID
  const handleSearch = () => {
    if (!searchId) return;

    axios
      .get(`http://localhost:8080/api/auth/clientes/${searchId}`)
      .then((response) => {
        setSearchResult(response.data);
      })
      .catch((error) => {
        console.error("Error al buscar cliente:", error);
        setSearchResult(null);
      });
  };

  // Cerrar el resultado de la búsqueda
  const handleCloseSearchResult = () => {
    setSearchResult(null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar bgColor="bg-gray-100" />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6 transition-all duration-300 md:ml-0 overflow-hidden">
        {/* Header */}
        <header className="text-black flex justify-between items-center mb-6 flex-col sm:flex-row space-y-4 sm:space-y-0">
          <div className="text-xl font-semibold">Clientes</div>
          <div className="flex items-center space-x-6">
            <input
              type="text"
              placeholder="Buscar cliente por ID..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="p-2 rounded-md border w-48 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              <Search className="w-6 h-6" />
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Generar Reporte
            </button>
          </div>
        </header>

        {/* Search Result */}
        {searchResult && (
  <div className="bg-white rounded-lg p-6 mb-6 shadow-lg max-w-2xl mx-auto">
    <div className="flex justify-between items-center">
      <h3 className="text-black text-xl font-semibold text-brown-800">Resultado de la Búsqueda</h3>
      <button
        onClick={handleCloseSearchResult}
        className="text-red-500 hover:text-red-700 transition-colors duration-200"
      >
        <XCircle className="w-6 h-6" />
      </button>
    </div>
    <div className="text-gray-800 mt-4 space-y-2">
      <p className="text-sm">
        <strong>ID:</strong> <span className="font-medium">{searchResult.idCliente}</span>
      </p>
      <p className="text-sm">
        <strong>Nombre:</strong> <span className="font-medium">{searchResult.nombreCliente}</span>
      </p>
      <p className="text-sm">
        <strong>Correo:</strong> <span className="font-medium">{searchResult.email}</span>
      </p>
    </div>
  </div>
)}


        {/* Clients Table */}
        <div className="bg-white rounded-lg p-6 shadow-md overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 font-semibold text-sm text-gray-600">ID</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-600">Nombre</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-600">Correo</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.idCliente} className="hover:bg-gray-100 transition duration-300">
                  <td className="py-3 px-4 text-gray-800">{client.idCliente}</td>
                  <td className="py-3 px-4 text-gray-800">{client.nombreCliente}</td>
                  <td className="py-3 px-4 text-gray-800">{client.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Client Button */}
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <User className="w-5 h-5 mr-2" />
            Agregar Nuevo Cliente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clients;
