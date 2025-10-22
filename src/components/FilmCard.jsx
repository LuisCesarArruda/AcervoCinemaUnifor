import React from 'react';
import { Film, Calendar, Clock, Video } from 'lucide-react';

export default function FilmCard({ film, onClick }) {
    return (
        <div
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-all cursor-pointer hover:scale-105"
            onClick={() => onClick(film)}
        >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 h-48 flex items-center justify-center">
                <Film className="w-16 h-16 text-white/50" />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{film['Título']}</h3>
                <div className="space-y-1 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{film['Ano']}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Film className="w-4 h-4" />
                        <span>{film['Gênero']}</span>
                    </div>
                    {film['Duração'] && (
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{film['Duração']}</span>
                        </div>
                    )}
                </div>
                {(film['Link (ANTIGO)'] || film['Armazenamento']) && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                        <Video className="w-4 h-4 text-green-500 inline mr-2" />
                        <span className="text-xs text-green-400">Disponível</span>
                    </div>
                )}
            </div>
        </div>
    );
}