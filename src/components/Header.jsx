import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import logo from "../assets/LogoLabomidiaAtivo 1.png"
import Filters from './Filters';

export default function Header({
    scrolled,
    searchTerm,
    onSearchChange,
    subGenres,
    years,
    disciplines,
    selectedSubGenre,
    selectedYear,
    selectedDiscipline,
    selectedDuration,
    onSubGenreChange,
    onYearChange,
    onDisciplineChange,
    onDurationChange
}) {
    const [showSearch, setShowSearch] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'
            }`}>
            <div className="container mx-auto px-4 md:px-8 py-4">
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Logo Unifor" className="w-8 h-8" />

                            <h1 className="text-2xl font-bold">LABOFLIX</h1>
                        </div>

                        <nav className="hidden  md:flex items-center gap-6 text-sm">
                            <button
                                onClick={() => {
                                    onSubGenreChange('');
                                    onYearChange('');
                                    onDisciplineChange('');
                                    onDurationChange('');
                                    setShowFilters(false);
                                }}
                                className="hover:text-gray-300 cursor-pointer transition"
                            >
                                Início
                            </button>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`hover:text-gray-300 cursor-pointer transition ${showFilters ? 'text-white font-bold' : ''}`}
                            >
                                {showFilters ? 'Fechar Filtros' : 'Filtros'}
                            </button>
                        </nav>
                    </div>

                    <div className="flex  items-center gap-4">
                        {showSearch ? (
                            <div className="flex items-center bg-black border border-white">
                                <Search className="w-5 h-5 ml-3" />
                                <input
                                    type="text"
                                    placeholder="Títulos, gêneros, palavras-chave..."
                                    className="bg-transparent border-none outline-none px-3 py-2 w-64"
                                    value={searchTerm}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    autoFocus
                                />
                                <button onClick={() => {
                                    setShowSearch(false);
                                    onSearchChange('');
                                }} className="mr-2 cursor-pointer">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setShowSearch(true)}>
                                <Search className="w-6 h-6 hover:text-gray-300 cursor-pointer transition" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {showFilters && (
                <div className="w-full bg-black border-t border-gray-800">

                    <Filters
                        subGenres={subGenres}
                        years={years}
                        disciplines={disciplines}
                        selectedsubGenre={selectedSubGenre}
                        selectedYear={selectedYear}
                        selectedDiscipline={selectedDiscipline}
                        selectedDuration={selectedDuration}
                        onSubGenreChange={onSubGenreChange}
                        onYearChange={onYearChange}
                        onDisciplineChange={onDisciplineChange}
                        onDurationChange={onDurationChange}
                        
                    />
                    {(selectedSubGenre || selectedYear || selectedDiscipline || selectedDuration) && (
                        <div className="mt-3 flex items-center gap-2 text-sm">
                            <span className="text-gray-400">Filtros ativos:</span>
                            {selectedSubGenre && (
                                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                    {selectedSubGenre}
                                    <button onClick={() => onSubGenreChange('')} className="hover:text-gray-300">×</button>
                                </span>
                            )}
                            {selectedYear && (
                                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                    {selectedYear}
                                    <button onClick={() => onYearChange('')} className="hover:text-gray-300">×</button>
                                </span>
                            )}
                            {selectedDiscipline && (
                                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                    {selectedDiscipline}
                                    <button onClick={() => onDisciplineChange('')} className="hover:text-gray-300">×</button>
                                </span>
                            )}
                            {selectedDuration && (
                                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                    {selectedDuration === 'curta' ? 'Curta' : selectedDuration === 'media' ? 'Média' : 'Longa'}
                                    <button onClick={() => onDurationChange('')} className="hover:text-gray-300">×</button>
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    onSubGenreChange('');
                                    onYearChange('');
                                    onDisciplineChange('');
                                    onDurationChange('');
                                }}
                                className="text-gray-400 hover:text-white text-xs underline ml-2"
                            >
                                Limpar todos
                            </button>
                        </div>
                    )}
                </div>

            )}
        </header>
    );
}