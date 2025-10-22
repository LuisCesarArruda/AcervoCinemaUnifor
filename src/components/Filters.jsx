import React from 'react';

export default function Filters({
    genres,
    years,
    disciplines,
    selectedGenre,
    selectedYear,
    selectedDiscipline,
    onGenreChange,
    onYearChange,
    onDisciplineChange
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-white"
                value={selectedGenre}
                onChange={(e) => onGenreChange(e.target.value)}
            >
                <option value="">Todos os gêneros</option>
                {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                ))}
            </select>

            <select
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-white"
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
            >
                <option value="">Todos os anos</option>
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>

            <select
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-white"
                value={selectedDiscipline}
                onChange={(e) => onDisciplineChange(e.target.value)}
            >
                <option value="">Todas as disciplinas</option>
                {disciplines.map(disc => (
                    <option key={disc} value={disc}>{disc}</option>
                ))}
            </select>
        </div>
    );
}