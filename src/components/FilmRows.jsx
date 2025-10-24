import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FilmCard from './FilmCard';

export default function FilmRows({ filmsByGenre, onFilmClick }) {
    return (
        <div className="relative -mt-32 z-10 pb-20">
            {Object.entries(filmsByGenre).map(([genre, films]) => (
                <FilmRow
                    key={genre}
                    title={genre}
                    films={films}
                    onFilmClick={onFilmClick}
                />
            ))}
        </div>
    );
}

function FilmRow({ title, films, onFilmClick }) {
    const rowRef = useRef(null);

    const scroll = (direction) => {
        if (rowRef.current) {
            const scrollAmount = direction === 'left' ? -800 : 800;
            rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (films.length === 0) return null;

    return (
        <div className="mb-8 px-4 md:px-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 px-4">{title}</h2>

            <div className="relative group">
                {/* Scroll Button Left */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute cursor-pointer left-0 top-0 bottom-0 z-10 w-12 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/90"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                {/* Films Container */}
                <div
                    ref={rowRef}
                    className="flex gap-2 overflow-x-scroll scrollbar-hide scroll-smooth px-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {films.map((film, index) => (
                        <FilmCard
                            key={index}
                            film={film}
                            onClick={() => onFilmClick(film)}
                        />
                    ))}
                </div>

                {/* Scroll Button Right */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute cursor-pointer right-0 top-0 bottom-0 z-10 w-12 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/90"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
}