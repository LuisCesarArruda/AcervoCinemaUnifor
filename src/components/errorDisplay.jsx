import React from 'react';

export default function ErrorDisplay({ error }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-6 max-w-md">
                <h2 className="text-red-300 text-xl font-bold mb-2">Erro ao carregar</h2>
                <p className="text-red-200 mb-4">{error}</p>
                <div className="text-red-200 text-sm space-y-2">
                    <p>Verifique se:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>O arquivo .env existe na raiz do projeto</li>
                        <li>A variável VITE_GOOGLE_API_KEY está configurada</li>
                        <li>A API Key é válida</li>
                        <li>A planilha tem permissão pública de leitura</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}