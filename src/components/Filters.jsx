import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Filters({
    genres,
    years,
    disciplines,
    selectedGenre,
    selectedYear,
    selectedDiscipline,
    selectedDurations,
    onGenreChange,
    onYearChange,
    onDisciplineChange,
    onDurationToggle
}) {
    const [showDurationDropdown, setShowDurationDropdown] = useState(false);

    const durationOptions = [
        5, 10, 15, 20, 25, 30, 40, 45, 50, 60, 90, 120
    ];

    const durationsArray = Array.isArray(selectedDurations)
        ? selectedDurations
        : selectedDurations
            ? [selectedDurations]
            : [];

    return (
        <div className="space-y-3">
            {/* Grid responsivo: 1 coluna mobile, 2 tablet, 4 desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <select
                    className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-600 w-full"
                    value={selectedGenre}
                    onChange={(e) => onGenreChange(e.target.value)}
                >
                    <option value="">Todos os gêneros</option>
                    {Array.isArray(genres) && genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>

                <select
                    className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-600 w-full"
                    value={selectedYear}
                    onChange={(e) => onYearChange(e.target.value)}
                >
                    <option value="">Todos os anos</option>
                    {Array.isArray(years) && years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <select
                    className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-600 w-full"
                    value={selectedDiscipline}
                    onChange={(e) => onDisciplineChange(e.target.value)}
                >
                    <option value="">Todas as disciplinas</option>
                    {Array.isArray(disciplines) && disciplines.map(disc => (
                        <option key={disc} value={disc}>{disc}</option>
                    ))}
                </select>

                {/* Dropdown de duração */}
                <div className="relative">
                    <button
                        onClick={() => setShowDurationDropdown(!showDurationDropdown)}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-600 flex items-center justify-between text-left"
                    >
                        <span className={durationsArray.length > 0 ? 'text-white' : 'text-gray-400'}>
                            {durationsArray.length > 0
                                ? `${durationsArray.length} duração(ões)`
                                : 'Todas as durações'}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${showDurationDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showDurationDropdown && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowDurationDropdown(false)}
                            />

                            <div className="absolute top-full mt-1 left-0 right-0 bg-gray-900 border border-gray-700 rounded shadow-lg z-20 max-h-64 overflow-y-auto">
                                {durationOptions.map(minutes => (
                                    <label
                                        key={minutes}
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 cursor-pointer transition"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={durationsArray.includes(minutes)}
                                            onChange={() => onDurationToggle(minutes)}
                                            className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-red-600 focus:ring-2 text-red-600 cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-300">{minutes} min</span>
                                    </label>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}