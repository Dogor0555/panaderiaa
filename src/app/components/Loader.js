// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="loader"></div>
        <p className="mt-4 text-xl text-gray-700">Cargando...</p>
      </div>

      {/* Estilos del loader (puedes poner esto en un archivo CSS) */}
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3; /* Color de fondo */
          border-top: 8px solid #3498db; /* Color del spinner */
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
