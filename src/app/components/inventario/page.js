"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sideBar/page";
import { 
    Search, Edit, Trash2, FileText, XCircle, Plus 
} from "lucide-react";
import { 
    FaSearch, FaBoxOpen, FaList, FaCube, FaLayerGroup
} from "react-icons/fa";

// Modal para Confirmar Eliminación
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
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
                    <p>¿Estás seguro de que deseas eliminar el item {itemName}?</p>
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

// Modal para Agregar/Editar Item de Inventario
const InventoryModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData = null
}) => {
    const [formData, setFormData] = useState({
        nombreItem: initialData?.nombreItem || "",
        idItem: initialData?.idItem || null,
        cantidad: initialData?.cantidad || "",
        tipoItem: initialData?.tipoItem || "",
        idProducto: initialData?.idProducto || null,
        idMateriaPrima: initialData?.idMateriaPrima || null
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombreItem: initialData.nombreItem,
                idItem: initialData.idItem || null,
                cantidad: initialData.cantidad,
                tipoItem: initialData.tipoItem,
                idProducto: initialData.idProducto || null,
                idMateriaPrima: initialData.idMateriaPrima || null
            });
        }
    }, [initialData]);

    const validateForm = () => {
        const errors = {};

        // Validaciones
        if (!formData.nombreItem.trim()) {
            errors.nombreItem = "El nombre del item es requerido";
        }

        if (!formData.cantidad || isNaN(parseFloat(formData.cantidad))) {
            errors.cantidad = "Cantidad inválida";
        }

        if (!formData.tipoItem) {
            errors.tipoItem = "Debe seleccionar un tipo de item";
        }

        // Validación condicional de IDs
        if (formData.tipoItem === 'Producto' && !formData.idProducto) {
            errors.idProducto = "ID de Producto es requerido";
        }

        if (formData.tipoItem === 'MateriaPrima' && !formData.idMateriaPrima) {
            errors.idMateriaPrima = "ID de Materia Prima es requerido";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar el error cuando se modifica el campo
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = () => {
        if (validateForm()) {
            // Preparar datos para envío
            const submitData = {
                nombreItem: formData.nombreItem,
                cantidad: parseFloat(formData.cantidad),
                tipoItem: formData.tipoItem,
                // Condicional para enviar idProducto o idMateriaPrima
                ...(formData.tipoItem === 'Producto' ? { idProducto: formData.idProducto } : {}),
                ...(formData.tipoItem === 'MateriaPrima' ? { idMateriaPrima: formData.idMateriaPrima } : {})
            };

            // Incluir idItem solo si está editando
            if (initialData) {
                submitData.idItem = formData.idItem;
            }

            onSubmit(submitData);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">
                        {initialData ? "Editar Item de Inventario" : "Agregar Nuevo Item"}
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
                            Nombre del Item
                        </label>
                        <input
                            type="text"
                            name="nombreItem"
                            value={formData.nombreItem}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${formErrors.nombreItem ? 'border-red-500' : ''}`}
                        />
                        {formErrors.nombreItem && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.nombreItem}</p>
                        )}
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
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${formErrors.cantidad ? 'border-red-500' : ''}`}
                        />
                        {formErrors.cantidad && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.cantidad}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tipo de Item
                        </label>
                        <select
                            name="tipoItem"
                            value={formData.tipoItem}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${formErrors.tipoItem ? 'border-red-500' : ''}`}
                        >
                            <option value="">Seleccione un tipo</option>
                            <option value="Producto">Producto</option>
                            <option value="MateriaPrima">Materia Prima</option>
                        </select>
                        {formErrors.tipoItem && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.tipoItem}</p>
                        )}
                    </div>

                    {formData.tipoItem === 'Producto' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                ID Producto
                            </label>
                            <input
                                type="number"
                                name="idProducto"
                                value={formData.idProducto || ''}
                                onChange={handleInputChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${formErrors.idProducto ? 'border-red-500' : ''}`}
                            />
                            {formErrors.idProducto && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.idProducto}</p>
                            )}
                        </div>
                    )}

                    {formData.tipoItem === 'MateriaPrima' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                ID Materia Prima
                            </label>
                            <input
                                type="number"
                                name="idMateriaPrima"
                                value={formData.idMateriaPrima || ''}
                                onChange={handleInputChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${formErrors.idMateriaPrima ? 'border-red-500' : ''}`}
                            />
                            {formErrors.idMateriaPrima && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.idMateriaPrima}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        {initialData ? "Guardar Cambios" : "Agregar Item"}
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


// Componente Principal de Inventario
const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const inventoryResponse = await axios.get("http://localhost:8080/api/auth/inventario");
                setInventory(inventoryResponse.data);
            } catch (error) {
                console.error("Error al cargar los datos de inventario:", error);
                setErrorMessage("Error al cargar los datos. Por favor, recarga la página.");
            }
        };
    
        fetchData();
    }, []);

    const handleSearch = () => {
        if (!searchId) return;

        axios.get(`http://localhost:8080/api/auth/inventario/${searchId}`)
            .then((response) => {
                setSearchResult(response.data);
            })
            .catch((error) => {
                console.error("Error al buscar item de inventario:", error);
                setSearchResult(null);
            });
    };

    const handleAddInventoryItem = (itemData) => {
        // Preparar los datos para enviar al backend
        const inventoryData = {
            nombreItem: itemData.nombreItem,
            cantidad: parseFloat(itemData.cantidad),
            tipoItem: itemData.tipoItem,
            // Condicional para enviar idProducto o idMateriaPrima
            ...(itemData.tipoItem === 'Producto' ? { idProducto: itemData.idProducto } : {}),
            ...(itemData.tipoItem === 'MateriaPrima' ? { idMateriaPrima: itemData.idMateriaPrima } : {})
        };
    
        axios.post("http://localhost:8080/api/auth/inventario", inventoryData)
            .then((response) => {
                // La respuesta ahora incluirá el ID generado automáticamente
                setInventory(prev => [...prev, response.data.inventario]);
                setSuccessMessage("Item de inventario agregado exitosamente");
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.error("Error al agregar item de inventario:", error);
                setErrorMessage(error.response?.data?.message || "Error al agregar item de inventario. Intenta nuevamente.");
            });
    };
    

    const handleEditInventoryItem = async (itemData) => {
        try {
            const itemId = itemToEdit.idItem;
            
            const updatedItem = {
                idItem: itemId,
                nombreItem: itemData.nombreItem,
                cantidad: parseInt(itemData.cantidad),
                tipoItem: itemData.tipoItem
            };

            const response = await axios.put(
                `http://localhost:8080/api/auth/inventario/${itemId}`,
                updatedItem
            );

            if (response.data && response.data.inventario) {
                setInventory(prevInventory =>
                    prevInventory.map(item =>
                        item.idItem === itemId ? response.data.inventario : item
                    )
                );

                setSuccessMessage("Item de inventario actualizado exitosamente");
                setIsEditModalOpen(false);
                setItemToEdit(null);
            }
        } catch (error) {
            console.error("Error al actualizar item de inventario:", error);
            setErrorMessage(
                error.response?.data?.message || 
                "Error al actualizar item de inventario. Intenta nuevamente."
            );
        }
    };

    const handleDeleteInventoryItem = (itemId, itemName) => {
        setItemToDelete({ id: itemId, name: itemName });
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            axios.delete(`http://localhost:8080/api/auth/inventario/${itemToDelete.id}`)
                .then(() => {
                    setInventory(inventory.filter(item => item.idItem !== itemToDelete.id));
                    setDeleteModalOpen(false);
                    setSuccessMessage("Item de inventario eliminado exitosamente");
                })
                .catch((error) => {
                    console.error("Error al eliminar item de inventario:", error);
                    setErrorMessage("Error al eliminar item de inventario. Intenta nuevamente.");
                });
        }
    };

    const downloadReport = () => {
        axios({
            url: "http://localhost:8080/api/auth/reports/inventario",
            method: "GET",
            responseType: "blob",
        })
        .then((response) => {
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "inventario_report.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            console.error("Error al generar el reporte:", error);
            setErrorMessage("Error al generar el reporte. Intenta nuevamente.");
        });
    };

    // Lógica de paginación
    const indexOfLastItem = currentPage * recordsPerPage;
    const indexOfFirstItem = indexOfLastItem - recordsPerPage;
    const currentInventoryItems = inventory.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageCount = Math.ceil(inventory.length / recordsPerPage);

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-16 bg-white">
                <div className="p-6">
                    {/* Header Section */}
                    <header className="text-black flex justify-between items-center mb-6 flex-col sm:flex-row space-y-4 sm:space-y-0">
                        <div className="text-xl font-semibold">Inventario</div>
                        <div className="flex items-center space-x-6">
                            <input
                                type="text"
                                placeholder="Buscar Item por ID..."
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
                            <button 
                                onClick={downloadReport} 
                                className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-700 transition-colors duration-200"
                            >
                                <FileText className="w-5 h-5 mr-2" />
                                Generar Reporte
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors duration-200"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Agregar Nuevo Item
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

                     {/* Search Result */}
                     {searchResult && (
                        <div className="bg-gray-200 rounded-lg p-6 mb-6 shadow-lg max-w-2xl mx-auto border border-gray-300">
                            <div className="flex justify-between items-center mb-4 pb-3 border-b border-black">
                                <h3 className="text-black text-xl font-semibold flex items-center gap-2">
                                    <FaSearch className="text-blue-500" />
                                    Resultado de la Búsqueda
                                </h3>
                                <button
                                    onClick={() => setSearchResult(null)}
                                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                >
                                    <XCircle className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-800">
                                <div className="flex items-center gap-2">
                                    <FaBoxOpen className="text-gray-600" />
                                    <p className="text-sm">
                                        <strong>ID:</strong>{" "}
                                        <span className="font-medium">{searchResult.idItem}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaList className="text-gray-600" />
                                    <p className="text-sm">
                                        <strong>Nombre:</strong>{" "}
                                        <span className="font-medium">{searchResult.nombreItem}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCube className="text-gray-600" />
                                    <p className="text-sm">
                                        <strong>Cantidad:</strong>{" "}
                                        <span className="font-medium">{searchResult.cantidad}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaLayerGroup className="text-gray-600" />
                                    <p className="text-sm">
                                        <strong>Tipo de Item:</strong>{" "}
                                        <span className="font-medium">{searchResult.tipoItem}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Inventory Table */}
                    <div className="bg-gray-200 rounded-lg p-6 shadow-md overflow-x-auto max-w-6xl mx-auto">
                        <table className="min-w-full table-auto text-sm">
                            <thead className="bg-gray-400 text-black">
                                <tr>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">ID</th>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">Nombre</th>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">Cantidad</th>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">Tipo de Item</th>
                                    <th className="py-3 px-4 font-semibold text-sm text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
    {currentInventoryItems.map((item, index) => (
        <tr key={item.idItem || index} className="hover:bg-gray-50 transition duration-200">
            <td className="py-3 px-4 text-gray-800">{item.idItem}</td>
            <td className="py-3 px-4 text-gray-800">{item.nombreItem}</td>
            <td className="py-3 px-4 text-gray-800">{item.cantidad}</td>
            <td className="py-3 px-4 text-gray-800">{item.tipoItem}</td>
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
                        onClick={() => handleDeleteInventoryItem(item.idItem, item.nombreItem)}
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
            <InventoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddInventoryItem}
            />
            {isEditModalOpen && (
                <InventoryModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setItemToEdit(null);
                }}
                onSubmit={handleEditInventoryItem}
                initialData={itemToEdit}
            />
        )}

        <ConfirmDeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            itemName={itemToDelete?.name}
        />
    </div>
);
};

export default Inventory;