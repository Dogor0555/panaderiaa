"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sideBar/page";
import { User, Search, Edit, Trash2, Eye, FileText, XCircle } from "lucide-react";
import { FaUser, FaIdCard, FaEnvelope, FaPhone, FaHome, FaClock, FaTimesCircle, FaSearch } from "react-icons/fa"

// Componente Modal de confirmación
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, clientName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Confirmar Eliminación</h3>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-4">
          <p>¿Estás seguro de que deseas eliminar al cliente {clientName}?</p>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Eliminar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

const EditClientModal = ({ isOpen, onClose, client, onEditClient }) => {
  const [formData, setFormData] = useState({
    idCliente: client?.idCliente || "",
    nombreCliente: client?.nombreCliente || "",
    email: client?.email || "",
    direccion: client?.direccion || "",
    telefonoCliente: client?.telefonoCliente || "",
    diasCredito: client?.diasCredito || 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onEditClient(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Editar Cliente</h3>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold">Nombre</label>
          <input
            type="text"
            name="nombreCliente"
            value={formData.nombreCliente}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold">Correo</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold">Teléfono</label>
          <input
            type="text"
            name="telefonoCliente"
            value={formData.telefonoCliente}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold">Días Crédito</label>
          <input
            type="number"
            name="diasCredito"
            value={formData.diasCredito}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Guardar Cambios
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};



// Componente Modal separado
const ClientModal = ({ isOpen, onClose, onAddClient }) => {
  const [formData, setFormData] = useState({
    nombreCliente: "",
    email: "",
    direccion: "",
    telefonoCliente: "",
    diasCredito: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onAddClient(formData);
  };

  const handleClear = () => {
    setFormData({
      nombreCliente: "",
      email: "",
      direccion: "",
      telefonoCliente: "",
      diasCredito: 0,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Agregar Nuevo Cliente</h3>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold">Nombre</label>
          <input
            type="text"
            name="nombreCliente"
            value={formData.nombreCliente}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold">Correo</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold">Teléfono</label>
          <input
            type="text"
            name="telefonoCliente"
            value={formData.telefonoCliente}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold">Días Crédito</label>
          <input
            type="number"
            name="diasCredito"
            value={formData.diasCredito}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Agregar Cliente
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Limpiar Campos
          </button>
        </div>
      </div>
    </div>
  );
};

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);

  const [formData, setFormData] = useState({
    nombreCliente: "",
    email: "",
    direccion: "",
    telefonoCliente: "",
    diasCredito: 0,
  });

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

  const handleCloseSearchResult = () => {
    setSearchResult(null);
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 5000); // El mensaje se eliminará después de 5 segundos

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta o el mensaje cambia antes de los 5 segundos
    }
  }, [successMessage, errorMessage]);

  const handleAddClient = (clientData) => {
    axios
      .post("http://localhost:8080/api/auth/clientes", clientData)
      .then((response) => {
        setClients((prev) => [...prev, response.data.cliente]);
        setSuccessMessage("Cliente agregado exitosamente");

        // Cerrar el modal después de agregar el cliente (con delay para asegurar el cierre)
        setTimeout(() => {
          setIsModalOpen(false); // Cerrar modal
          setFormData({
            nombreCliente: "",
            email: "",
            direccion: "",
            telefonoCliente: "",
            diasCredito: 0,
          }); // Limpiar formulario
        }, 300); // 300ms para asegurar que el modal se cierre antes de limpiar

        setErrorMessage(null); // Limpiar mensaje de error si hay éxito
      })
      .catch((error) => {
        console.error("Error al agregar cliente:", error);
        setErrorMessage("Error al agregar cliente. Intenta nuevamente.");
        setSuccessMessage(null); // Limpiar mensaje de éxito si ocurre un error
      });
  };

  const handleDeleteClient = (clientId, clientName) => {
    setClientToDelete({ id: clientId, name: clientName });
    setDeleteModalOpen(true);  // Abrir el modal de confirmación
  };

  const handleConfirmDelete = () => {
    if (clientToDelete) {
      axios
        .delete(`http://localhost:8080/api/auth/clientes/${clientToDelete.id}`)
        .then((response) => {
          setClients(clients.filter(client => client.idCliente !== clientToDelete.id));
          setDeleteModalOpen(false);
          setClientToDelete(null);
          setSuccessMessage("Cliente eliminado exitosamente");
        })
        .catch((error) => {
          console.error("Error al eliminar cliente:", error);
          setErrorMessage("Error al eliminar cliente. Intenta nuevamente.");
        });
    }
  };

  const handleEditClient = (clientData) => {
    axios
      .put(`http://localhost:8080/api/auth/clientes/${clientData.idCliente}`, clientData)
      .then((response) => {
        const updatedClients = clients.map((client) =>
          client.idCliente === clientData.idCliente ? response.data.cliente : client
        );
        setClients(updatedClients);
        setSuccessMessage("Cliente actualizado exitosamente");
        setIsEditModalOpen(false); // Cerrar el modal
      })
      .catch((error) => {
        console.error("Error al actualizar cliente:", error);
        setErrorMessage("Error al actualizar cliente. Intenta nuevamente.");
      });
  };

  const downloadReport = () => {
    axios({
      url: "http://localhost:8080/api/auth/reports/clientes", // URL del reporte
      method: "GET",
      responseType: "blob", // Para manejar la respuesta como un archivo
    })
      .then((response) => {
        // Crear un enlace temporal para descargar el archivo
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "clientes_report.pdf"); // Nombre del archivo descargado
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error al generar el reporte:", error);
        setErrorMessage("Hubo un error al generar el reporte. Intenta nuevamente.");
      });
  };




  // Calcular los clientes que se deben mostrar en la página actual
  const indexOfLastClient = currentPage * recordsPerPage;
  const indexOfFirstClient = indexOfLastClient - recordsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total de páginas
  const pageCount = Math.ceil(clients.length / recordsPerPage);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-16 bg-white">
        <div className="p-6">
          {/* Header Section */}
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
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                <Search className="w-6 h-6" />
              </button>
              <button onClick={downloadReport} className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-700 transition-colors duration-200">
                <FileText className="w-5 h-5 mr-2" />
                Generar Reporte
              </button>

              {/* Agregar Cliente Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors duration-200"
              >
                <User className="w-5 h-5 mr-2" />
                Agregar Nuevo Cliente
              </button>
            </div>
          </header>

          {successMessage && (
            <div className="bg-green-200 text-green-800 p-4 rounded-md mb-4">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-200 text-red-800 p-4 rounded-md mb-4">
              {errorMessage}
            </div>
          )}

          {/* Resultados de la búsqueda */}
          {searchResult && (
            <div className="bg-gray-200 rounded-lg p-6 mb-6 shadow-lg max-w-2xl mx-auto border border-gray-300">
              {/* Encabezado */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-black">
                <h3 className="text-black text-xl font-semibold flex items-center gap-2">
                  <FaSearch className="text-blue-500" />
                  Resultado de la Búsqueda
                </h3>
                <button
                  onClick={handleCloseSearchResult}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <FaTimesCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Contenido en dos columnas */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-800">
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-600" />
                  <p className="text-sm">
                    <strong>ID:</strong>{" "}
                    <span className="font-medium">{searchResult.idCliente}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaIdCard className="text-gray-600" />
                  <p className="text-sm">
                    <strong>Nombre:</strong>{" "}
                    <span className="font-medium">{searchResult.nombreCliente}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-600" />
                  <p className="text-sm">
                    <strong>Correo:</strong>{" "}
                    <span className="font-medium">{searchResult.email}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-gray-600" />
                  <p className="text-sm">
                    <strong>Teléfono:</strong>{" "}
                    <span className="font-medium">{searchResult.telefonoCliente}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaHome className="text-gray-600" />
                  <p className="text-sm">
                    <strong>Dirección:</strong>{" "}
                    <span className="font-medium">{searchResult.direccion}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-600" />
                  <p className="text-sm">
                    <strong>Días Crédito:</strong>{" "}
                    <span className="font-medium">{searchResult.diasCredito}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tabla de clientes */}
          <div className="bg-gray-200 rounded-lg p-6 shadow-md overflow-x-auto max-w-6xl mx-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-400 text-black">
                <tr>
                  <th className="py-3 px-4 font-semibold text-sm text-left">ID</th>
                  <th className="py-3 px-4 font-semibold text-sm text-left">Nombre</th>
                  <th className="py-3 px-4 font-semibold text-sm text-left">Correo</th>
                  <th className="py-3 px-4 font-semibold text-sm text-left">Dirección</th>
                  <th className="py-3 px-4 font-semibold text-sm text-left">Teléfono</th>
                  <th className="py-3 px-4 font-semibold text-sm text-left">Días Crédito</th>
                  <th className="py-3 px-4 font-semibold text-sm text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentClients.map((client) => (
                  <tr
                    key={client.idCliente}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-3 px-4 text-gray-800">{client.idCliente}</td>
                    <td className="py-3 px-4 text-gray-800">{client.nombreCliente}</td>
                    <td className="py-3 px-4 text-gray-800">{client.email}</td>
                    <td className="py-3 px-4 text-gray-800">{client.direccion}</td>
                    <td className="py-3 px-4 text-gray-800">{client.telefonoCliente}</td>
                    <td className="py-3 px-4 text-gray-800">{client.diasCredito}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setClientToEdit(client);
                            setIsEditModalOpen(true);
                          }}
                          className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                        >
                          <Edit className="w-5 h-5" />
                        </button>


                        <button
                          onClick={() => handleDeleteClient(client.idCliente, client.nombreCliente)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>



            {/* Paginación */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-700">
                Página {currentPage} de {pageCount}
              </span>

              {/* Botones de paginación */}
              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className={`px-4 py-2 rounded-md ${currentPage === pageCount ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                  disabled={currentPage === pageCount}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>

          {/* Modal de edición */}
          {isEditModalOpen && (
            <EditClientModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              client={clientToEdit}
              onEditClient={handleEditClient}
            />
          )}

          {/* Modal para agregar cliente */}
          <ClientModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddClient={handleAddClient}
          />



          {/* Modal de confirmación de eliminación */}
          <ConfirmDeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            clientName={clientToDelete ? clientToDelete.name : ''}
          />
        </div>
      </main>
    </div>
  );
};

export default Clients;