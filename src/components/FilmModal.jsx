import React from 'react';
import { X, Play, Film as FilmIcon, Award } from 'lucide-react';


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

export default function FilmModal({ film, onClose }) {
    if (!film) return null;

    const posterUrl = getDirectImageUrl(film['IMAGEM']);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl mt-8 mb-8 bg-gray-900 rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="relative h-[60vh] rounded-t-lg overflow-hidden">

                    {posterUrl ? (
                        <img
                            src={posterUrl}
                            alt={posterUrl}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                    ) : null}

                    <div
                        className="absolute inset-0 bg-gradient-to-br from-red-900 to-purple-900"
                        style={{ display: posterUrl ? 'none' : 'block' }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FilmIcon className="w-32 h-32 text-white/20" />
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute cursor-pointer top-4 right-4 z-10 bg-black/80 rounded-full p-2 hover:bg-black transition"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                            {film['Título']}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            {film['Link (ANTIGO)'] && (
                                <a
                                    href={film['Link (ANTIGO)']}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-white text-black px-8 py-2 rounded font-bold hover:bg-gray-200 transition"
                                >
                                    <Play className="w-5 h-5 fill-current" />
                                    Assistir
                                </a>
                            )}
                            
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-4 mb-6 text-sm">
                                {film['Ano'] && (
                                    <span className="text-green-500 font-semibold">{film['Ano']}</span>
                                )}
                                {film['Duração'] && (
                                    <span className="text-gray-400">{film['Duração']}</span>
                                )}
                                {film['Classificação Indicativa'] && (
                                    <span className="border border-gray-500 text-gray-300 px-2 py-0.5 text-xs rounded">
                                        {film['Classificação Indicativa']}
                                    </span>
                                )}
                            </div>
                            {film['Sinopse'] && (
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    {film['Sinopse']}
                                </p>
                            )}

                            {film['Elenco'] && (
                                <div className="mb-4">
                                    <span className="text-gray-500 text-sm">Elenco: </span>
                                    <span className="text-gray-300 text-sm">{film['Elenco']}</span>
                                </div>
                            )}

                            {film['Palavras-chaves'] && (
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {film['Palavras-chaves'].split(',').map((keyword, i) => (
                                        <span key={i} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">
                                            {keyword.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4 text-sm">
                            {film['Direção'] && (
                                <div>
                                    <span className="text-gray-500">Direção: </span>
                                    <span className="text-gray-300">{film['Direção']}</span>
                                </div>
                            )}

                            {film['Roteiro'] && (
                                <div>
                                    <span className="text-gray-500">Roteiro: </span>
                                    <span className="text-gray-300">{film['Roteiro']}</span>
                                </div>
                            )}

                            {film['Produção'] && (
                                <div>
                                    <span className="text-gray-500">Produção: </span>
                                    <span className="text-gray-300">{film['Produção']}</span>
                                </div>
                            )}

                            {film['Direção de Fotografia'] && (
                                <div>
                                    <span className="text-gray-500">Fotografia: </span>
                                    <span className="text-gray-300">{film['Direção de Fotografia']}</span>
                                </div>
                            )}

                            {film['Edição'] && (
                                <div>
                                    <span className="text-gray-500">Edição: </span>
                                    <span className="text-gray-300">{film['Edição']}</span>
                                </div>
                            )}

                            {film['Gênero'] && (
                                <div>
                                    <span className="text-gray-500">Gênero: </span>
                                    <span className="text-gray-300">{film['Gênero']}</span>
                                </div>
                            )}

                            {film['Subgênero'] && (
                                <div>
                                    <span className="text-gray-500">Subgênero: </span>
                                    <span className="text-gray-300">{film['Subgênero']}</span>
                                </div>
                            )}

                            {film['Disciplina'] && (
                                <div>
                                    <span className="text-gray-500">Disciplina: </span>
                                    <span className="text-gray-300">{film['Disciplina']}</span>
                                </div>
                            )}

                            {film['Prof. Orientador'] && (
                                <div>
                                    <span className="text-gray-500">Orientador: </span>
                                    <span className="text-gray-300">{film['Prof. Orientador']}</span>
                                </div>
                            )}

                            {film['Local Gravado'] && (
                                <div>
                                    <span className="text-gray-500">Local: </span>
                                    <span className="text-gray-300">{film['Local Gravado']}</span>
                                </div>
                            )}

                            {film['Festivais/Premiações'] && (
                                <div className="bg-yellow-900/30 p-3 rounded border border-yellow-700/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Award className="w-4 h-4 text-yellow-500" />
                                        <span className="text-yellow-500 font-semibold text-xs">PREMIAÇÕES</span>
                                    </div>
                                    <span className="text-gray-300 text-xs">{film['Festivais/Premiações']}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}