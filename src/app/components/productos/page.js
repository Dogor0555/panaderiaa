"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sideBar/page";
import { 
    Search, Edit, Trash2, Eye, FileText, XCircle, Plus 
} from "lucide-react";
import { 
    FaSearch, FaBoxOpen, FaMoneyBillWave, FaList, FaClipboardList, FaUtensilSpoon  
} from "react-icons/fa";

// Modal para Confirmar Eliminación
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, productName }) => {
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
                    <p>¿Estás seguro de que deseas eliminar el producto {productName}?</p>
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

// Modal para Agregar/Editar Producto
const ProductModal = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    categories, 
    recipes, 
    initialData = null 
}) => {
    const [formData, setFormData] = useState({
        nombreProducto: initialData?.nombreProducto || "",
        descripcion: initialData?.descripcion || "",
        precioUnitario: initialData?.precioUnitario || "",
        idCategoria: initialData?.idCategoria || "",
        idReceta: initialData?.idReceta || ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombreProducto: initialData.nombreProducto,
                descripcion: initialData.descripcion,
                precioUnitario: initialData.precioUnitario,
                idCategoria: initialData.idCategoria,
                idReceta: initialData.idReceta
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
                        {initialData ? "Editar Producto" : "Agregar Nuevo Producto"}
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
                            Nombre del Producto
                        </label>
                        <input
                            type="text"
                            name="nombreProducto"
                            value={formData.nombreProducto}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Precio Unitario
                        </label>
                        <input
                            type="number"
                            name="precioUnitario"
                            value={formData.precioUnitario}
                            onChange={handleInputChange}
                            step="0.01"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Categoría
                        </label>
                        <select
                            name="idCategoria"
                            value={formData.idCategoria}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                        >
                            <option value="">Seleccionar Categoría</option>
                            {categories.map(category => (
                                <option 
                                    key={category.idCategoria} 
                                    value={category.idCategoria}
                                >
                                    {category.nombreCategoria}
                                </option>
                            ))}
                        </select>
                    </div>

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
                            {recipes.map(recipe => (
                                <option 
                                    key={recipe.idReceta} 
                                    value={recipe.idReceta}
                                >
                                    {recipe.nombreReceta}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        {initialData ? "Guardar Cambios" : "Agregar Producto"}
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
// Componente Principal de Productos
const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productToEdit, setProductToEdit] = useState(null);

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Cargar categorías
                const categoriesResponse = await axios.get("http://localhost:8080/api/auth/categorias");
                console.log('Datos de categorías cargados:', {
                    categorias: categoriesResponse.data,
                    estructura: categoriesResponse.data.map(cat => ({
                        id: cat.idCategoria,
                        tipo: typeof cat.idCategoria,
                        nombre: cat.nombreCategoria
                    }))
                });
                setCategories(categoriesResponse.data);
    
                // Cargar productos
                const productsResponse = await axios.get("http://localhost:8080/api/auth/productos");
                console.log('Datos de productos cargados:', {
                    productos: productsResponse.data,
                    estructura: productsResponse.data.map(prod => ({
                        id: prod.idProducto,
                        categoriaId: prod.idCategoria,
                        tipo: typeof prod.idCategoria
                    }))
                });
                setProducts(productsResponse.data);

                // Cargar recetas
                const recipesResponse = await axios.get("http://localhost:8080/api/auth/recetas");
                setRecipes(recipesResponse.data);
    
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                setErrorMessage("Error al cargar los datos. Por favor, recarga la página.");
            }
        };
    
        fetchData();
    }, []);

    // Función auxiliar para obtener el nombre de la categoría
    const getCategoryName = (producto) => {
        // Verificar si el producto tiene un objeto categoria
        if (producto.categoria && producto.categoria.nombreCategoria) {
            return producto.categoria.nombreCategoria;
        }
        return 'No asignada';
    };

    const getRecipeName = (producto) => {
        if (producto.receta && producto.receta.nombreReceta) {
            return producto.receta.nombreReceta;
        }
        return 'No asignada';
    };

    const handleSearch = () => {
        if (!searchId) return;

        axios.get(`http://localhost:8080/api/auth/productos/${searchId}`)
            .then((response) => {
                setSearchResult(response.data);
            })
            .catch((error) => {
                console.error("Error al buscar producto:", error);
                setSearchResult(null);
            });
    };

    const handleAddProduct = (productData) => {
        axios.post("http://localhost:8080/api/auth/productos", productData)
            .then((response) => {
                setProducts(prev => [...prev, response.data.producto]);
                setSuccessMessage("Producto agregado exitosamente");
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.error("Error al agregar producto:", error);
                setErrorMessage("Error al agregar producto. Intenta nuevamente.");
            });
    };

    const handleEditProduct = async (productData) => {
        try {
            // Ensure we have the product ID from the existing product
            const productId = productToEdit.idProducto;
            
            // Create the updated product object
            const updatedProduct = {
                idProducto: productId,
                nombreProducto: productData.nombreProducto,
                descripcion: productData.descripcion,
                precioUnitario: parseFloat(productData.precioUnitario),
                idCategoria: parseInt(productData.idCategoria),
                idReceta: productData.idReceta ? parseInt(productData.idReceta) : null
            };

            const response = await axios.put(
                `http://localhost:8080/api/auth/productos/${productId}`,
                updatedProduct
            );

            if (response.data && response.data.producto) {
                // Update the products list with the new data
                setProducts(prevProducts =>
                    prevProducts.map(product =>
                        product.idProducto === productId ? response.data.producto : product
                    )
                );

                // Show success message and close modal
                setSuccessMessage("Producto actualizado exitosamente");
                setIsEditModalOpen(false);
                setProductToEdit(null);
            }
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            setErrorMessage(
                error.response?.data?.message || 
                "Error al actualizar producto. Intenta nuevamente."
            );
        }
    };

    const handleDeleteProduct = (productId, productName) => {
        setProductToDelete({ id: productId, name: productName });
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            axios.delete(`http://localhost:8080/api/auth/productos/${productToDelete.id}`)
                .then(() => {
                    setProducts(products.filter(product => product.idProducto !== productToDelete.id));
                    setDeleteModalOpen(false);
                    setSuccessMessage("Producto eliminado exitosamente");
                })
                .catch((error) => {
                    console.error("Error al eliminar producto:", error);
                    setErrorMessage("Error al eliminar producto. Intenta nuevamente.");
                });
        }
    };

    const downloadReport = () => {
        axios({
            url: "http://localhost:8080/api/auth/reports/productos",
            method: "GET",
            responseType: "blob",
        })
        .then((response) => {
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "productos_report.pdf");
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
    const indexOfLastProduct = currentPage * recordsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - recordsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageCount = Math.ceil(products.length / recordsPerPage);

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-16 bg-white">
                <div className="p-6">
                    {/* Header Section */}
                    <header className="text-black flex justify-between items-center mb-6 flex-col sm:flex-row space-y-4 sm:space-y-0">
                        <div className="text-xl font-semibold">Productos</div>
                        <div className="flex items-center space-x-6">
                            <input
                                type="text"
                                placeholder="Buscar Producto por ID..."
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
                            Agregar Nuevo Producto
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
                    <span className="font-medium">{searchResult.idProducto}</span>
                </p>
            </div>
            <div className="flex items-center gap-2">
                <FaList className="text-gray-600" />
                <p className="text-sm">
                    <strong>Nombre:</strong>{" "}
                    <span className="font-medium">{searchResult.nombreProducto}</span>
                </p>
            </div>
            <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-gray-600" />
                <p className="text-sm">
                    <strong>Precio:</strong>{" "}
                    <span className="font-medium">${searchResult.precioUnitario.toFixed(2)}</span>
                </p>
            </div>
            <div className="flex items-center gap-2">
                <FaClipboardList className="text-gray-600" />
                <p className="text-sm">
                    <strong>Categoría:</strong>{" "}
                    <span className="font-medium">{getCategoryName(searchResult)}</span>
                </p>
            </div>
            <div className="flex items-center gap-2">
                <FaUtensilSpoon className="text-gray-600" />
                <p className="text-sm">
                    <strong>Receta:</strong>{" "}
                    <span className="font-medium">{getRecipeName(searchResult)}</span>
                </p>
            </div>
        </div>
    </div>
)}

                {/* Products Table */}
                <div className="bg-gray-200 rounded-lg p-6 shadow-md overflow-x-auto max-w-6xl mx-auto">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-gray-400 text-black">
                            <tr>
                                <th className="py-3 px-4 font-semibold text-sm text-left">ID</th>
                                <th className="py-3 px-4 font-semibold text-sm text-left">Nombre</th>
                                <th className="py-3 px-4 font-semibold text-sm text-left">Precio</th>
                                <th className="py-3 px-4 font-semibold text-sm text-left">Categoría</th>
                                <th className="py-3 px-4 font-semibold text-sm text-left">Receta</th>

                                <th className="py-3 px-4 font-semibold text-sm text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentProducts.map((product) => (
                                <tr key={product.idProducto} className="hover:bg-gray-50 transition duration-200">
                                    <td className="py-3 px-4 text-gray-800">{product.idProducto}</td>
                                    <td className="py-3 px-4 text-gray-800">{product.nombreProducto}</td>
                                    <td className="py-3 px-4 text-gray-800">${product.precioUnitario.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-gray-800">
    {getCategoryName(product)}
</td>
<td className="py-3 px-4 text-gray-800">
                    {getRecipeName(product)}
                </td>
                                    <td className="py-3 px-4">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => {
                                                    setProductToEdit(product);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.idProducto, product.nombreProducto)}
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
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddProduct}
                categories={categories}
                recipes={recipes}
            />
            {isEditModalOpen && (
                <ProductModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setProductToEdit(null);
                    setErrorMessage(null);
                }}
                onSubmit={handleEditProduct}
                categories={categories}
                recipes={recipes}
                initialData={{
                    ...productToEdit,
                    idCategoria: productToEdit.categoria?.idCategoria || productToEdit.idCategoria,
                    idReceta: productToEdit.receta?.idReceta || productToEdit.idReceta
                }}
            />
            )}
            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                productName={productToDelete?.name}
            />
        </div>
    );
};

export default Products;