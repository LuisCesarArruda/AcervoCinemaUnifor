import React from 'react';
import { Film, Award, Video } from 'lucide-react';

export default function FilmModal({ film, onClose }) {
    if (!film) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="container mx-auto px-4 py-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-gray-800 rounded-lg max-w-4xl mx-auto border border-gray-700">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 h-64 flex items-center justify-center rounded-t-lg">
                        <Film className="w-24 h-24 text-white/50" />
                    </div>

                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-3xl font-bold">{film['Título']}</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div>
                                <p className="text-gray-400 text-sm">Ano</p>
                                <p className="font-semibold">{film['Ano']}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Gênero</p>
                                <p className="font-semibold">{film['Gênero']}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Duração</p>
                                <p className="font-semibold">{film['Duração'] || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Disciplina</p>
                                <p className="font-semibold">{film['Disciplina']}</p>
                            </div>
                        </div>

                        {film['Sinopse'] && (
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-2">Sinopse</h3>
                                <p className="text-gray-300">{film['Sinopse']}</p>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-lg font-bold mb-3">Ficha Técnica</h3>
                                <div className="space-y-2 text-sm">
                                    {film['Direção'] && (
                                        <div>
                                            <span className="text-gray-400">Direção:</span>
                                            <span className="ml-2">{film['Direção']}</span>
                                        </div>
                                    )}
                                    {film['Roteiro'] && (
                                        <div>
                                            <span className="text-gray-400">Roteiro:</span>
                                            <span className="ml-2">{film['Roteiro']}</span>
                                        </div>
                                    )}
                                    {film['Direção de Fotografia'] && (
                                        <div>
                                            <span className="text-gray-400">Fotografia:</span>
                                            <span className="ml-2">{film['Direção de Fotografia']}</span>
                                        </div>
                                    )}
                                    {film['Edição'] && (
                                        <div>
                                            <span className="text-gray-400">Edição:</span>
                                            <span className="ml-2">{film['Edição']}</span>
                                        </div>
                                    )}
                                    {film['Produção'] && (
                                        <div>
                                            <span className="text-gray-400">Produção:</span>
                                            <span className="ml-2">{film['Produção']}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold mb-3">Informações</h3>
                                <div className="space-y-2 text-sm">
                                    {film['Prof. Orientador'] && (
                                        <div>
                                            <span className="text-gray-400">Orientador:</span>
                                            <span className="ml-2">{film['Prof. Orientador']}</span>
                                        </div>
                                    )}
                                    {film['Local Gravado'] && (
                                        <div>
                                            <span className="text-gray-400">Local:</span>
                                            <span className="ml-2">{film['Local Gravado']}</span>
                                        </div>
                                    )}
                                    {film['Classificação Indicativa'] && (
                                        <div>
                                            <span className="text-gray-400">Classificação:</span>
                                            <span className="ml-2">{film['Classificação Indicativa']}</span>
                                        </div>
                                    )}
                                    {film['Festivais/Premiações'] && (
                                        <div>
                                            <Award className="w-4 h-4 inline text-yellow-500 mr-1" />
                                            <span className="text-gray-400">Premiações:</span>
                                            <span className="ml-2">{film['Festivais/Premiações']}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {film['Elenco'] && (
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-2">Elenco</h3>
                                <p className="text-gray-300 text-sm">{film['Elenco']}</p>
                            </div>
                        )}

                        {film['Palavras-chaves'] && (
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-2">Palavras-chave</h3>
                                <div className="flex flex-wrap gap-2">
                                    {film['Palavras-chaves'].split(',').map((keyword, i) => (
                                        <span key={i} className="bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full text-sm">
                                            {keyword.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {film['Link (ANTIGO)'] && (
                            <div className="mt-6 pt-6 border-t border-gray-700">
                                <a
                                    href={film['Link (ANTIGO)']}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    <Video className="w-5 h-5" />
                                    Assistir Online
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}