import React from 'react';
import { Film } from 'lucide-react';
import SearchBar from './SearchBar';
import Filters from './Filters';

export default function Header({
    searchTerm,
    onSearchChange,
    genres,
    years,
    disciplines,
    durations,
    selectedGenre,
    selectedYear,
    selectedDiscipline,
    selectedDuration,
    onGenreChange,
    onYearChange,
    onDisciplineChange,
    onDurationChange,
    resultCount
}) {
    return (
        <header className="bg-black/30 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center gap-3 mb-6">
                    <Film className="w-8 h-8 text-blue-500" />
                    <h1 className="text-3xl font-bold">Catálogo de Filmes - Unifor</h1>
                </div>

                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={onSearchChange}
                />

                <Filters
                    genres={genres}
                    years={years}
                    disciplines={disciplines}
                    durations={durations}
                    selectedGenre={selectedGenre}
                    selectedYear={selectedYear}
                    selectedDiscipline={selectedDiscipline}
                    selectedDuration={selectedDuration}
                    onGenreChange={onGenreChange}
                    onYearChange={onYearChange}
                    onDisciplineChange={onDisciplineChange}
                    onDurationChange={onDurationChange}
                />

                <p className="text-gray-400 text-sm mt-4">
                    {resultCount} {resultCount === 1 ? 'filme encontrado' : 'filmes encontrados'}
                </p>
            </div>
        </header>
    );
}