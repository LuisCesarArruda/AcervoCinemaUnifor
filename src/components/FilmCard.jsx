import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown, Film as FilmIcon } from 'lucide-react';

// Função para converter link do Google Drive em link de imagem direto
const getDirectImageUrl = (driveUrl) => {
    if (!driveUrl) return null;

    if (driveUrl.includes('uc?id=') || driveUrl.includes('thumbnail')) {
        return driveUrl;
    }

    const match = driveUrl.match(/[-\w]{25,}/);
    if (match) {
        return `https://drive.google.com/thumbnail?id=${match[0]}&sz=w400`;
    }

    return null;
};

export default function FilmCard({ film, onClick }) {
    const [isHovered, setIsHovered] = useState(false);
    const posterUrl = getDirectImageUrl(film['IMAGEM']);

    return (
        <div
            className="relative flex-shrink-0 w-[250px] cursor-pointer transition-all duration-300 ease-in-out"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            style={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                zIndex: isHovered ? 50 : 1,
            }}
        >

            <div className="relative aspect-video rounded overflow-hidden">
                {posterUrl ? (
                    <img
                        src={posterUrl}
                        alt={film['Título']}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}

                <div
                    className="absolute inset-0 bg-gradient-to-br from-red-900 to-purple-900 flex items-center justify-center"
                    style={{ display: posterUrl ? 'none' : 'flex' }}
                >
                    <FilmIcon className="w-16 h-16 text-white/30" />
                </div>

                {isHovered && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                )}
            </div>

            {isHovered && (
                <div className="bg-gray-900 rounded-b p-4 shadow-2xl">
                    <div className="flex items-center gap-2 mb-3">
                        <button

                            className="bg-white cursor-pointer text-black rounded-full p-2 hover:bg-gray-200 transition"
                        >
                            <Play className="w-4 h-4 fill-current" />
                        </button>

                    </div>

                    <h3 className="font-bold text-sm mb-2 line-clamp-1">
                        {film['Título']}
                    </h3>


                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        {film['Ano'] && <span className="text-green-500 font-semibold">{film['Ano']}</span>}
                        {film['Duração'] && (
                            <>
                                <span>•</span>
                                <span>{film['Duração']}</span>
                            </>
                        )}
                    </div>

                    {film['Gênero'] && (
                        <div className="flex flex-wrap gap-1 text-xs">
                            <span className="text-gray-400">{film['Gênero']}</span>
                        </div>
                    )}
                </div>
            )}

            {!isHovered && (
                <div className="mt-2 px-1">
                    <h3 className="text-sm font-semibold line-clamp-1">{film['Título']}</h3>
                </div>
            )}
        </div>
    );
}