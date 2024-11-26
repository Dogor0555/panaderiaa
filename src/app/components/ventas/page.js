"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sideBar/page";
import { 
  ShoppingCart, 
  PackageCheck, 
  DollarSign, 
  Users, 
  FileText, 
  PlusCircle, 
  Edit2, 
  Trash2, 
  X,
  Search 
} from "lucide-react";

const SalesModal = ({ isOpen, onClose, onSubmit, clients, products, currentUser }) => {
  const [formData, setFormData] = useState({
    idCliente: "",
    idUsuario: currentUser.idUsuario,
    estado: "Pagado",
    fechaVenta: new Date().toISOString().split('T')[0],
    totalVenta: 0,
    detalles: [{ idProducto: "", cantidad: 1, precioUnitario: 0 }]
  });

  const handleClientChange = (e) => {
    const selectedClient = clients.find(c => c.idCliente.toString() === e.target.value);
    setFormData(prev => ({
      ...prev,
      idCliente: selectedClient ? selectedClient.idCliente : ""
    }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetalles = [...formData.detalles];
    updatedDetalles[index] = {
      ...updatedDetalles[index],
      [name]: name === 'idProducto' 
        ? value 
        : parseFloat(value)
    };

    // Recalculate total sale amount
    const totalVenta = updatedDetalles.reduce((sum, detalle) => 
      sum + (detalle.cantidad * detalle.precioUnitario), 0);

    setFormData(prev => ({
      ...prev,
      detalles: updatedDetalles,
      totalVenta
    }));
  };

  const addProductDetail = () => {
    setFormData(prev => ({
      ...prev,
      detalles: [...prev.detalles, { idProducto: "", cantidad: 1, precioUnitario: 0 }]
    }));
  };

  const removeProductDetail = (index) => {
    const updatedDetalles = formData.detalles.filter((_, i) => i !== index);
    const totalVenta = updatedDetalles.reduce((sum, detalle) => 
      sum + (detalle.cantidad * detalle.precioUnitario), 0);

    setFormData(prev => ({
      ...prev,
      detalles: updatedDetalles,
      totalVenta
    }));
  };

  const handleSubmit = () => {
    // Validate form data before submitting
    if (!formData.idCliente || formData.detalles.length === 0) {
      alert("Por favor complete todos los campos necesarios");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className=" text-black fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[600px] p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="text-blue-600" size={32} />
            <h2 className="text-2xl font-bold text-gray-800">Nueva Venta</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
            <select
              value={formData.idCliente}
              onChange={handleClientChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Seleccionar Cliente</option>
              {clients.map(client => (
                <option key={client.idCliente} value={client.idCliente}>
                  {client.nombre}
                </option>
              ))}
            </select>
          </div>

          {formData.detalles.map((detalle, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 text-black">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Producto</label>
                <select
                  name="idProducto"
                  value={detalle.idProducto}
                  onChange={(e) => handleProductChange(index, e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Seleccionar Producto</option>
                  {products.map(product => (
                    <option key={product.idProducto} value={product.idProducto}>
                      {product.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
                <input
                  type="number"
                  name="cantidad"
                  value={detalle.cantidad}
                  onChange={(e) => handleProductChange(index, e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precio Unitario</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    name="precioUnitario"
                    value={detalle.precioUnitario}
                    onChange={(e) => handleProductChange(index, e)}
                    className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              {index > 0 && (
                <button 
                  onClick={() => removeProductDetail(index)}
                  className="text-red-500 hover:text-red-600 self-end"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}

          <button 
            onClick={addProductDetail}
            className="text-blue-600 hover:text-blue-700 flex items-center space-x-2 mt-2"
          >
            <PlusCircle size={20} />
            <span>Agregar Producto</span>
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Venta</label>
            <input
              type="text"
              value={`$${formData.totalVenta.toFixed(2)}`}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <PlusCircle size={20} />
            <span>Agregar Venta</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SalesDashboard = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchId, setSearchId] = useState("");
  
  // Simulated data - in real app, these would come from API
  const [clients, setClients] = useState([
    { idCliente: 101, nombre: "Juan Pérez" },
    { idCliente: 102, nombre: "María González" }
  ]);
  const [products, setProducts] = useState([
    { idProducto: 301, nombre: "Producto A", precio: 50.25 },
    { idProducto: 302, nombre: "Producto B", precio: 75.50 }
  ]);
  const currentUser = { idUsuario: 201, nombre: "Admin1" };

  useEffect(() => {
    // Fetch sales data
    axios.get("http://localhost:8080/api/auth/ventas")
      .then(response => {
        setSales(response.data);
        setFilteredSales(response.data);
      })
      .catch(error => console.error("Error fetching sales:", error));
  }, []);

  const addSale = (saleData) => {
    axios.post("http://localhost:8080/api/auth/ventas", saleData)
      .then(response => {
        const newSale = response.data.venta;
        setSales(prev => [...prev, newSale]);
        setFilteredSales(prev => [...prev, newSale]);
        setIsModalOpen(false);
      })
      .catch(error => console.error("Error adding sale:", error));
  };

  const deleteSale = (id) => {
    axios.delete(`http://localhost:8080/api/auth/ventas/${id}`)
      .then(() => {
        setSales(prev => prev.filter(sale => sale.idVenta !== id));
        setFilteredSales(prev => prev.filter(sale => sale.idVenta !== id));
      })
      .catch(error => console.error("Error deleting sale:", error));
  };

  const handleSearch = (e) => {
    const id = e.target.value;
    setSearchId(id);

    if (id.trim() === "") {
      setFilteredSales(sales);
    } else {
      const filtered = sales.filter(sale => 
        sale.idVenta.toString().includes(id.trim())
      );
      setFilteredSales(filtered);
    }
  };

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.totalVenta, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-16 bg-white p-8">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <ShoppingCart size={40} className="text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">Gestión de Ventas</h1>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => {/* Generate report logic */}} 
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                <FileText size={20} />
                <span>Generar Reporte</span>
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <PlusCircle size={20} />
                <span>Nueva Venta</span>
              </button>
            </div>
          </header>

          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Buscar venta por ID" 
                value={searchId}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingCart className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500">Total de Ventas</p>
                <h3 className="text-2xl font-bold text-gray-800">${totalSales.toFixed(2)}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <PackageCheck className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500">Ventas Realizadas</p>
                <h3 className="text-2xl font-bold text-gray-800">{filteredSales.length}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <DollarSign className="text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500">Precio Promedio</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  ${(totalSales / filteredSales.length || 0).toFixed(2)}
                </h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500">Clientes Distintos</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {new Set(filteredSales.map(sale => sale.cliente.nombre)).size}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-600">ID</th>
                  <th className="px-6 py-4 text-left text-gray-600">Cliente</th>
                  <th className="px-6 py-4 text-left text-gray-600">Fecha</th>
                  <th className="px-6 py-4 text-left text-gray-600">Total</th>
                  <th className="px-6 py-4 text-left text-gray-600">Estado</th>
                  <th className="px-6 py-4 text-center text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={sale.idVenta} className="border-b text-black hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">{sale.idVenta}</td>
                    <td className="px-6 py-4">{sale.cliente.nombre}</td>
                    <td className="px-6 py-4">{sale.fechaVenta}</td>
                    <td className="px-6 py-4">${sale.totalVenta.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium 
                        ${sale.estado === 'Pagado' ? 'bg-green-100 text-green-800' : 
                          sale.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}
                      `}>
                        {sale.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center space-x-3">
                      <button 
                        className="text-yellow-500 hover:text-yellow-600"
                        onClick={() => {/* Edit logic */}}
                      >
                        <Edit2 size={20} />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-600"
                        onClick={() => deleteSale(sale.idVenta)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <SalesModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={addSale}
          clients={clients}
          products={products}
          currentUser={currentUser}
        />
      </main>
    </div>
  );
};

export default SalesDashboard;