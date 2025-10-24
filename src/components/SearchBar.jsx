import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <div className="relative  mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                placeholder="Buscar por título, sinopse ou palavras-chave..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
}