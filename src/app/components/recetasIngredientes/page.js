"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sideBar/page";
import { User, Search, Edit, Trash2, Eye, FileText, XCircle } from "lucide-react";
import { FaUser, FaIdCard, FaEnvelope, FaPhone, FaHome, FaClock, FaTimesCircle, FaSearch } from "react-icons/fa"


// Modal para Confirmar Eliminación
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, recetaId, materiaId }) => {
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
                    <p>¿Estás seguro de que deseas eliminar este ingrediente de la receta?</p>
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

// Modal para Agregar/Editar Ingrediente de Receta
const RecetaIngredienteModal = ({ isOpen, onClose, onSubmit, recetas, materiasPrimas, initialData = null }) => {
    const [formData, setFormData] = useState({
        idReceta: initialData?.idReceta || "",
        idMateriaPrima: initialData?.idMateriaPrima || "",
        cantidad: initialData?.cantidad || ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                idReceta: initialData.idReceta,
                idMateriaPrima: initialData.idMateriaPrima,
                cantidad: initialData.cantidad
            });
        }
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">
                        {initialData ? "Editar Ingrediente" : "Agregar Nuevo Ingrediente"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:text-red-700"
                    >
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Receta
                        </label>
                        <select
                            name="idReceta"
                            value={formData.idReceta}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                        >
                            <option value="">Seleccionar Receta</option>
                            {recetas.map(receta => (
                                <option 
                                    key={receta.idReceta} 
                                    value={receta.idReceta}
                                >
                                    {receta.nombreReceta}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Materia Prima
                        </label>
                        <select
                            name="idMateriaPrima"
                            value={formData.idMateriaPrima}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                        >
                            <option value="">Seleccionar Materia Prima</option>
                            {materiasPrimas.map(materia => (
                                <option 
                                    key={materia.idMateriaPrima} 
                                    value={materia.idMateriaPrima}
                                >
                                    {materia.nombreMateriaPrima}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Cantidad
                        </label>
                        <input
                            type="number"
                            name="cantidad"
                            value={formData.cantidad}
                            onChange={handleInputChange}
                            step="0.01"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        {initialData ? "Guardar Cambios" : "Agregar Ingrediente"}
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

// Componente Principal
const RecetasIngredientes = () => {
    const [recetasIngredientes, setRecetasIngredientes] = useState([]);
    const [recetas, setRecetas] = useState([]);
    const [searchResult, setSearchResult] = useState(null);
    const [searchId, setSearchId] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10; // Mantén solo una definición aquí
    const [materiasPrimas, setMateriasPrimas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetchRecetas();
        fetchMateriasPrimas();
        fetchRecetasIngredientes(); 
    }, []);

    const fetchRecetas = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/auth/recetas");
            setRecetas(response.data);
        } catch (error) {
            console.error("Error al cargar recetas:", error);
            setErrorMessage("Error al cargar las recetas");
        }
    };

    const handleSearch = () => {
        if (!searchId) return;

        axios
            .get(`http://localhost:8080/api/auth/recetas-ingredientes/${searchId}`)
            .then((response) => {
                setSearchResult(response.data);
            })
            .catch((error) => {
                console.error("Error al buscar receta:", error);
                setSearchResult(null);
            });
    };

    const fetchMateriasPrimas = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/auth/materiasPrimas");
            setMateriasPrimas(response.data);
        } catch (error) {
            console.error("Error al cargar materias primas:", error);
            setErrorMessage("Error al cargar las materias primas");
        }
    };

    const fetchRecetasIngredientes = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/auth/recetas-ingredientes");
            setRecetasIngredientes(response.data);  // Actualiza el estado con los datos
        } catch (error) {
            console.error("Error al cargar los ingredientes:", error);
            setErrorMessage("Error al cargar los ingredientes");
        }
    };

    const handleAddIngrediente = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/recetas-ingredientes",
                data
            );
            setRecetasIngredientes(prev => [...prev, response.data]);
            setSuccessMessage("Ingrediente agregado exitosamente");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al agregar ingrediente:", error);
            setErrorMessage("Error al agregar ingrediente");
        }
    };

    const handleEditIngrediente = async (data) => {
        try {
            const response = await axios.put(
                "http://localhost:8080/api/auth/recetas-ingredientes",
                data
            );
            setRecetasIngredientes(prev =>
                prev.map(item =>
                    (item.idReceta === data.idReceta && item.idMateriaPrima === data.idMateriaPrima)
                        ? response.data
                        : item
                )
            );
            setSuccessMessage("Ingrediente actualizado exitosamente");
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error al actualizar ingrediente:", error);
            setErrorMessage("Error al actualizar ingrediente");
        }
    };

    const handleDeleteIngrediente = async () => {
        if (itemToDelete) {
            try {
                await axios.delete(
                    `http://localhost:8080/api/auth/recetas-ingredientes/${itemToDelete.idReceta}/${itemToDelete.idMateriaPrima}`
                );
                setRecetasIngredientes(prev =>
                    prev.filter(item =>
                        !(item.idReceta === itemToDelete.idReceta && 
                          item.idMateriaPrima === itemToDelete.idMateriaPrima)
                    )
                );
                setSuccessMessage("Ingrediente eliminado exitosamente");
                setDeleteModalOpen(false);
            } catch (error) {
                console.error("Error al eliminar ingrediente:", error);
                setErrorMessage("Error al eliminar ingrediente");
            }
        }
    };

    const downloadReport = () => {
        axios({
            url: "http://localhost:8080/api/auth/reports/recetas-ingredientes",
            method: "GET",
            responseType: "blob",
        })
            .then((response) => {
                const blob = new Blob([response.data], { type: "application/pdf" });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "recetas_report.pdf");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("Error al generar el reporte:", error);
                setErrorMessage("Hubo un error al generar el reporte. Intenta nuevamente.");
            });
    };

    // Lógica de paginación
    const indexOfLastItem = currentPage * recordsPerPage;
    const indexOfFirstItem = indexOfLastItem - recordsPerPage;
    const currentItems = recetasIngredientes.slice(indexOfFirstItem, indexOfLastItem);

    const pageCount = Math.ceil(recetasIngredientes.length / recordsPerPage);

    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-16 bg-white">
                <div className="p-6">
                    <header className="text-black flex justify-between items-center mb-6">
                    <div className="text-xl font-semibold">Recetas de Ingredientes</div>
                         <div className="flex items-center space-x-6">
                            <input
                                type="text"
                                placeholder="Buscar Receta por ID..."
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                className="p-2 rounded-md border w-48 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                            >
                                <FaSearch className="w-6 h-6" />
                            </button>
                            <button onClick={downloadReport} className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-700 transition-colors duration-200">
                                <FileText className="w-5 h-5 mr-2" />
                                Generar Reporte
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors duration-200"
                            >
                                <FaUser className="w-5 h-5 mr-2" />
                                Agregar Nueva Receta de Ingrediente
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

                    {/* Search Results */}
                    {searchResult && (
                        <div className="bg-gray-200 rounded-lg p-6 mb-6 shadow-lg max-w-2xl mx-auto border border-gray-300">
                            {/* Header */}
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

                            {/* Content in two columns */}
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-800">
                                <div className="flex items-center gap-2">
                                    <FaUser className="text-gray-600" />
                                    <p className="text-sm">
                                        <strong>ID:</strong>{" "}
                                        <span className="font-medium">{searchResult.idReceta}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUser className="text-gray-600" />
                                    <p className="text-sm">
                                        <strong>Nombre:</strong>{" "}
                                        <span className="font-medium">{searchResult.nombreReceta}</span>
                                    </p>
                                </div>
                                <div className="col-span-2 flex items-center gap-2">
                                    <FaUser className="text-gray-600" />
                                    <p className="text-sm">
                                        <strong>Descripción:</strong>{" "}
                                        <span className="font-medium">{searchResult.descripcion}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-gray-200 rounded-lg p-6 shadow-md overflow-x-auto max-w-6xl mx-auto">
                        <table className="min-w-full table-auto text-sm">
                            <thead className="bg-gray-400 text-black">
                                <tr>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">Receta</th>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">Materia Prima</th>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">Cantidad</th>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentItems.map((item) => (
                                    <tr key={`${item.idReceta}-${item.idMateriaPrima}`} className="hover:bg-gray-50 transition duration-200">
                                        <td className="py-3 px-4 text-gray-800">{item.receta.nombreReceta}</td>
                                        <td className="py-3 px-4 text-gray-800">{item.materiaPrima.nombreMateriaPrima}</td>
                                        <td className="py-3 px-4 text-gray-800">{item.cantidad}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => {
                                                        setItemToEdit(item);
                                                        setIsEditModalOpen(true);
                                                    }}
                                                    className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setItemToDelete(item);
                                                        setDeleteModalOpen(true);
                                                    }}
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

                            {/* Botones de Paginación */}
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
                </div>
            </main>

            <RecetaIngredienteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddIngrediente}
                recetas={recetas}
                materiasPrimas={materiasPrimas}
            />

            {isEditModalOpen && (
                <RecetaIngredienteModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setItemToEdit(null);
                    }}
                    onSubmit={handleEditIngrediente}
                    recetas={recetas}
                    materiasPrimas={materiasPrimas}
                    initialData={itemToEdit}
                />
            )}

            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteIngrediente}
                recetaId={itemToDelete?.idReceta}
                materiaId={itemToDelete?.idMateriaPrima}
                />
            </div>
        
    );
};

export default RecetasIngredientes;

    
