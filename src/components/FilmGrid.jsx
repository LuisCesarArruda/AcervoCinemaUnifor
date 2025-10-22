import React from 'react';
import { Film } from 'lucide-react';
import FilmCard from './FilmCard';

export default function FilmGrid({ films, onFilmClick }) {
    if (films.length === 0) {
        return (
            <div className="text-center py-16">
                <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Nenhum filme encontrado</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {films.map((film, index) => (
                <FilmCard
                    key={index}
                    film={film}
                    onClick={onFilmClick}
                />
            ))}
        </div>
    );
}