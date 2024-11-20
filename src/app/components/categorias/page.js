"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sideBar/page";
import { User, Search, Edit, Trash2, Eye, FileText, XCircle } from "lucide-react";
import { FaUser, FaIdCard, FaEnvelope, FaPhone, FaHome, FaClock, FaTimesCircle, FaSearch } from "react-icons/fa"

// Componente Modal de confirmación
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, categoryName }) => {
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
                    <p>¿Estás seguro de que deseas eliminar la categoría {categoryName}?</p>
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

// Componente Modal de Edición
const EditCategoryModal = ({ isOpen, onClose, category, onEditCategory }) => {
    const [formData, setFormData] = useState({
        idCategoria: category?.idCategoria || "",
        nombreCategoria: category?.nombreCategoria || "",
    });

    useEffect(() => {
        if (category) {
            setFormData({
                idCategoria: category.idCategoria,
                nombreCategoria: category.nombreCategoria,
            });
        }
    }, [category]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onEditCategory(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">Editar Categoría</h3>
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:text-red-700"
                    >
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>
                <div className="mt-4">
                    <label className="block text-xs font-semibold">Nombre de la Categoría</label>
                    <input
                        type="text"
                        name="nombreCategoria"
                        value={formData.nombreCategoria}
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

// Componente Modal para Agregar
const CategoryModal = ({ isOpen, onClose, onAddCategory }) => {
    const [formData, setFormData] = useState({
        nombreCategoria: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onAddCategory(formData);
    };

    const handleClear = () => {
        setFormData({
            nombreCategoria: "",
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">Agregar Nueva Categoría</h3>
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:text-red-700"
                    >
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>
                <div className="mt-4">
                    <label className="block text-xs font-semibold">Nombre de la Categoría</label>
                    <input
                        type="text"
                        name="nombreCategoria"
                        value={formData.nombreCategoria}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-1 border rounded-md"
                    />
                </div>
                
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Agregar Categoría
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

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);

    const [formData, setFormData] = useState({
        nombreCategoria: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/auth/categorias")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener las categorías:", error);
            });
    }, []);

    const handleSearch = () => {
        if (!searchId) return;

        axios
            .get(`http://localhost:8080/api/auth/categorias/${searchId}`)
            .then((response) => {
                setSearchResult(response.data);
            })
            .catch((error) => {
                console.error("Error al buscar categoría:", error);
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
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);

    const handleAddCategory = (categoryData) => {
        axios
            .post("http://localhost:8080/api/auth/categorias", categoryData)
            .then((response) => {
                setCategories((prev) => [...prev, response.data.categoria]);
                setSuccessMessage("Categoría agregada exitosamente");

                setTimeout(() => {
                    setIsModalOpen(false);
                    setFormData({
                        nombreCategoria: "",
                    });
                }, 300);

                setErrorMessage(null);
            })
            .catch((error) => {
                console.error("Error al agregar categoría:", error);
                setErrorMessage("Error al agregar categoría. Intenta nuevamente.");
                setSuccessMessage(null);
            });
    };

    const handleDeleteCategory = (categoryId, categoryName) => {
        setCategoryToDelete({ id: categoryId, name: categoryName });
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (categoryToDelete) {
            axios
                .delete(`http://localhost:8080/api/auth/categorias/${categoryToDelete.id}`)
                .then((response) => {
                    setCategories(categories.filter(category => category.idCategoria !== categoryToDelete.id));
                    setDeleteModalOpen(false);
                    setCategoryToDelete(null);
                    setSuccessMessage("Categoría eliminada exitosamente");
                })
                .catch((error) => {
                    console.error("Error al eliminar categoría:", error);
                    setErrorMessage("Error al eliminar categoría. Intenta nuevamente.");
                });
        }
    };

    const handleEditCategory = (categoryData) => {
        axios
            .put(`http://localhost:8080/api/auth/categorias/${categoryData.idCategoria}`, categoryData)
            .then((response) => {
                const updatedCategories = categories.map((category) =>
                    category.idCategoria === categoryData.idCategoria ? response.data.categoria : category
                );
                setCategories(updatedCategories);
                setSuccessMessage("Categoría actualizada exitosamente");
                setIsEditModalOpen(false);
            })
            .catch((error) => {
                console.error("Error al actualizar categoría:", error);
                setErrorMessage("Error al actualizar categoría. Intenta nuevamente.");
            });
    };

    const downloadReport = () => {
        axios({
            url: "http://localhost:8080/api/auth/reports/categorias",
            method: "GET",
            responseType: "blob",
        })
            .then((response) => {
                const blob = new Blob([response.data], { type: "application/pdf" });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "categorias_report.pdf");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("Error al generar el reporte:", error);
                setErrorMessage("Hubo un error al generar el reporte. Intenta nuevamente.");
            });
    };

    const indexOfLastCategory = currentPage * recordsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - recordsPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageCount = Math.ceil(categories.length / recordsPerPage);

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-16 bg-white">
                <div className="p-6">
                    {/* Header Section */}
                    <header className="text-black flex justify-between items-center mb-6 flex-col sm:flex-row space-y-4 sm:space-y-0">
                        <div className="text-xl font-semibold">Categorías</div>
                        <div className="flex items-center space-x-6">
                            <input
                                type="text"
                                placeholder="Buscar Categoría por ID..."
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
                                Agregar Nueva Categoría
                            </button>
                        </div>
                    </header>

                    {/* Mensajes de éxito y error */}
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
                                        <span className="font-medium">{searchResult.idCategoria}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUser className="text-gray-600" />
                                    <p className="text-sm">
                                        <strong>Nombre:</strong>{" "}
                                        <span className="font-medium">{searchResult.nombreCategoria}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tabla de categorías */}
                    <div className="bg-gray-200 rounded-lg p-6 shadow-md overflow-x-auto max-w-6xl mx-auto">
                        <table className="min-w-full table-auto text-sm">
                            <thead className="bg-gray-400 text-black">
                                <tr>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">ID</th>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">Categoría</th>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentCategories.map((category) => (
                                    <tr key={category.idCategoria} className="hover:bg-gray-50 transition duration-200">
                                        <td className="py-3 px-4 text-gray-800">{category.idCategoria}</td>
                                        <td className="py-3 px-4 text-gray-800">{category.nombreCategoria}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => {
                                                        setCategoryToEdit(category);
                                                        setIsEditModalOpen(true);
                                                    }}
                                                    className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteCategory(category.idCategoria, category.nombreCategoria)}
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
                </div>
            </main>

            {/* Modales */}
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddCategory={handleAddCategory}
            />
            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                categoryName={categoryToDelete?.name}
            />
            {/* Modal de edición */}
            {isEditModalOpen && (
                <EditCategoryModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    category={categoryToEdit}
                    onEditCategory={handleEditCategory}
                />
            )}
        </div>
    );
};

export default Categories;