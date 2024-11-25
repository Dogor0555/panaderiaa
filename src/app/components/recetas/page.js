"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sideBar/page";
import { User, Search, Edit, Trash2, Eye, FileText, XCircle } from "lucide-react";
import { FaUser, FaIdCard, FaEnvelope, FaPhone, FaHome, FaClock, FaTimesCircle, FaSearch } from "react-icons/fa"

// Confirmation Delete Modal
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, recipeName }) => {
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
                    <p>¿Estás seguro de que deseas eliminar la receta {recipeName}?</p>
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

// Edit Recipe Modal
const EditRecipeModal = ({ isOpen, onClose, recipe, onEditRecipe }) => {
    const [formData, setFormData] = useState({
        idReceta: recipe?.idReceta || "",
        nombreReceta: recipe?.nombreReceta || "",
        descripcion: recipe?.descripcion || "",
    });

    useEffect(() => {
        if (recipe) {
            setFormData({
                idReceta: recipe.idReceta,
                nombreReceta: recipe.nombreReceta,
                descripcion: recipe.descripcion,
            });
        }
    }, [recipe]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onEditRecipe(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">Editar Receta</h3>
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:text-red-700"
                    >
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>
                <div className="mt-4">
                    <label className="block text-xs font-semibold">Nombre de la Receta</label>
                    <input
                        type="text"
                        name="nombreReceta"
                        value={formData.nombreReceta}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-1 border rounded-md"
                    />
                    <label className="block text-xs font-semibold mt-4">Descripción</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-1 border rounded-md"
                        rows="4"
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

// Add Recipe Modal
const RecipeModal = ({ isOpen, onClose, onAddRecipe }) => {
    const [formData, setFormData] = useState({
        nombreReceta: "",
        descripcion: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onAddRecipe(formData);
    };

    const handleClear = () => {
        setFormData({
            nombreReceta: "",
            descripcion: "",
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">Agregar Nueva Receta</h3>
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:text-red-700"
                    >
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>
                <div className="mt-4">
                    <label className="block text-xs font-semibold">Nombre de la Receta</label>
                    <input
                        type="text"
                        name="nombreReceta"
                        value={formData.nombreReceta}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-1 border rounded-md"
                    />
                    <label className="block text-xs font-semibold mt-4">Descripción</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-1 border rounded-md"
                        rows="4"
                    />
                </div>
                
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Agregar Receta
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

const Recetas = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [recipeToEdit, setRecipeToEdit] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/auth/recetas")
            .then((response) => {
                setRecipes(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener las recetas:", error);
            });
    }, []);

    const handleSearch = () => {
        if (!searchId) return;

        axios
            .get(`http://localhost:8080/api/auth/recetas/${searchId}`)
            .then((response) => {
                setSearchResult(response.data);
            })
            .catch((error) => {
                console.error("Error al buscar receta:", error);
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

    const handleAddRecipe = (recipeData) => {
        axios
            .post("http://localhost:8080/api/auth/recetas", recipeData)
            .then((response) => {
                setRecipes((prev) => [...prev, response.data.receta]);
                setSuccessMessage("Receta agregada exitosamente");

                setTimeout(() => {
                    setIsModalOpen(false);
                }, 300);

                setErrorMessage(null);
            })
            .catch((error) => {
                console.error("Error al agregar receta:", error);
                setErrorMessage("Error al agregar receta. Intenta nuevamente.");
                setSuccessMessage(null);
            });
    };

    const handleDeleteRecipe = (recipeId, recipeName) => {
        setRecipeToDelete({ id: recipeId, name: recipeName });
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (recipeToDelete) {
            axios
                .delete(`http://localhost:8080/api/auth/recetas/${recipeToDelete.id}`)
                .then((response) => {
                    setRecipes(recipes.filter(recipe => recipe.idReceta !== recipeToDelete.id));
                    setDeleteModalOpen(false);
                    setRecipeToDelete(null);
                    setSuccessMessage("Receta eliminada exitosamente");
                })
                .catch((error) => {
                    console.error("Error al eliminar receta:", error);
                    setErrorMessage("Error al eliminar receta. Intenta nuevamente.");
                });
        }
    };

    const handleEditRecipe = (recipeData) => {
        axios
            .put(`http://localhost:8080/api/auth/recetas/${recipeData.idReceta}`, recipeData)
            .then((response) => {
                const updatedRecipes = recipes.map((recipe) =>
                    recipe.idReceta === recipeData.idReceta ? response.data.receta : recipe
                );
                setRecipes(updatedRecipes);
                setSuccessMessage("Receta actualizada exitosamente");
                setIsEditModalOpen(false);
            })
            .catch((error) => {
                console.error("Error al actualizar receta:", error);
                setErrorMessage("Error al actualizar receta. Intenta nuevamente.");
            });
    };

    const downloadReport = () => {
        axios({
            url: "http://localhost:8080/api/auth/reports/recetas",
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

    const indexOfLastRecipe = currentPage * recordsPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recordsPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageCount = Math.ceil(recipes.length / recordsPerPage);

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-16 bg-white">
                <div className="p-6">
                    {/* Header Section */}
                    <header className="text-black flex justify-between items-center mb-6 flex-col sm:flex-row space-y-4 sm:space-y-0">
                        <div className="text-xl font-semibold">Recetas</div>
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
                                Agregar Nueva Receta
                            </button>
                        </div>
                    </header>

                    {/* Success and Error Messages */}
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

                    {/* Recipes Table */}
                    <div className="bg-gray-200 rounded-lg p-6 shadow-md overflow-x-auto max-w-6xl mx-auto">
                        <table className="min-w-full table-auto text-sm">
                            <thead className="bg-gray-400 text-black">
                                <tr>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">ID</th>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">Nombre</th>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">Descripción</th>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentRecipes.map((recipe) => (
                                    <tr key={recipe.idReceta} className="hover:bg-gray-50 transition duration-200">
                                        <td className="py-3 px-4 text-gray-800">{recipe.idReceta}</td>
                                        <td className="py-3 px-4 text-gray-800">{recipe.nombreReceta}</td>
                                        <td className="py-3 px-4 text-gray-800 truncate max-w-xs">{recipe.descripcion}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => {
                                                        setRecipeToEdit(recipe);
                                                        setIsEditModalOpen(true);
                                                    }}
                                                    className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteRecipe(recipe.idReceta, recipe.nombreReceta)}
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

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-sm text-gray-700">
                                Página {currentPage} de {pageCount}
                            </span>

                            {/* Pagination Buttons */}
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

            {/* Modals */}
            <RecipeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddRecipe={handleAddRecipe}
            />
            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                recipeName={recipeToDelete?.name}
            />
            {/* Edit Modal */}
            {isEditModalOpen && (
                <EditRecipeModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    recipe={recipeToEdit}
                    onEditRecipe={handleEditRecipe}
                />
            )}
        </div>
    );
};

export default Recetas;