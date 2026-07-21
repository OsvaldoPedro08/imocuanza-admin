import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-gray-600 mb-6">Ops! Esta página não existe.</p>
            <button
                onClick={() => navigate('/')} 
                className="cursor-pointer px-6 py-3 bg-emerald-700 text-white rounded-xl font-bold"
            >
                Voltar para a página inicial
            </button>
        </div>
    )
}

export default NotFound