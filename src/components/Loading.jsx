import React from 'react';
import logo from "../assets/LogoLabomidiaVerticalLABOVermelho0.5xPNG.png"


export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
            <div className="text-center">
                <img src={logo} alt="" className="w-180 h-100 text-blue-500 mx-auto mb-4 animate-pulse"  />
                <p className="text-white text-xl">Carregando catálogo...</p>
            </div>
        </div>
    );
}