import React from 'react';
import { Play, Info } from 'lucide-react';

const getDirectImageUrl = (driveUrl) => {
    if (!driveUrl) return null;

    if (driveUrl.includes('uc?id=') || driveUrl.includes('thumbnail')) {
        return driveUrl;
    }

    const match = driveUrl.match(/[-\w]{25,}/);
    if (match) {
        return `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1000`;
    }

    return null;
};

export default function HeroSection({ film, onPlayClick }) {
    const posterUrl = getDirectImageUrl(film['IMAGEM']);

    return (
        <div className="relative h-[80vh] w-full">

            {posterUrl ? (
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${posterUrl})` }}
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-purple-900/20" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />


            <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-2xl">

                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
                                DESTAQUE
                            </span>
                            <span className="text-gray-300 text-sm">{film['Ano']}</span>
                            {film['Classificação Indicativa'] && (
                                <span className="border border-gray-400 text-gray-300 px-2 py-0.5 text-xs rounded">
                                    {film['Classificação Indicativa']}
                                </span>
                            )}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
                            {film['Título']}
                        </h1>

                        <div className="flex items-center gap-4 mb-6 text-sm text-gray-300">
                            {film['Gênero'] && (
                                <span className="font-semibold text-white">{film['Gênero']}</span>
                            )}
                            {film['Duração'] && (
                                <>
                                    <span>•</span>
                                    <span>{film['Duração']}</span>
                                </>
                            )}
                            {film['Disciplina'] && (
                                <>
                                    <span>•</span>
                                    <span>{film['Disciplina']}</span>
                                </>
                            )}
                        </div>
                        {film['Sinopse'] && (
                            <p className="text-lg text-gray-200 mb-8 line-clamp-3 max-w-xl drop-shadow-lg">
                                {film['Sinopse']}
                            </p>
                        )}

                        <div className="flex items-center gap-4">
                            <button
                                onClick={onPlayClick}
                                className="flex cursor-pointer items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition"
                            >
                                <Play className="w-6 h-6 fill-current" />
                                Assistir
                            </button>
                            <button
                                onClick={onPlayClick}
                                className="flex cursor-pointer items-center gap-2 bg-gray-500/70 text-white px-8 py-3 rounded font-bold hover:bg-gray-500/50 transition"
                            >
                                <Info className="w-6 h-6" />
                                Mais informações
                            </button>
                        </div>

                        {film['Direção'] && (
                            <div className="mt-8 text-sm text-gray-400">
                                <span className="font-semibold">Direção:</span> {film['Direção']}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}