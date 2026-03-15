import React from 'react';

function CarCard({ car, onReserve }) {
  return (
    <div className="bg-gray-800/80 border border-red-500/20 rounded-lg overflow-hidden hover:border-red-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group cursor-pointer">
      <div className="bg-gradient-to-br from-cyan-300 to-cyan-500 h-64 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 400 300" className="w-96 h-64 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="270" rx="140" ry="20" fill="rgba(0,0,0,0.2)" />
          <path d="M 80 170 L 120 110 L 280 110 L 320 170 L 320 230 Q 320 260 290 260 L 110 260 Q 80 260 80 230 Z" fill="rgba(52,152,219,0.95)" stroke="rgba(52,152,219,1)" strokeWidth="2" />
          <path d="M 130 110 L 165 60 L 235 60 L 270 110" fill="rgba(52,152,219,1)" />
          <path d="M 140 108 L 190 70 L 220 105 L 170 140" fill="rgba(100,150,200,0.4)" />
          <path d="M 230 105 L 275 70 L 290 140 L 240 150" fill="rgba(100,150,200,0.4)" />
          <circle cx="130" cy="260" r="32" fill="rgba(20,20,20,0.95)" stroke="rgba(80,80,80,0.8)" strokeWidth="2" />
          <circle cx="270" cy="260" r="32" fill="rgba(20,20,20,0.95)" stroke="rgba(80,80,80,0.8)" strokeWidth="2" />
          <ellipse cx="90" cy="190" rx="12" ry="16" fill="rgba(255,200,0,0.85)" />
        </svg>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 font-playfair">{car.name}</h3>
        <div className="text-2xl text-red-500 font-bold mb-4">{car.price} DH/jour</div>
        <div className="flex flex-wrap gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <i className="fas fa-gas-pump text-red-500"></i> {car.fuel}
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <i className="fas fa-cog text-red-500"></i> {car.transmission}
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <i className="fas fa-users text-red-500"></i> {car.passengers}
          </div>
        </div>
        <button
          onClick={() => onReserve(car.name)}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition-all transform hover:-translate-y-1 hover:shadow-lg"
        >
          Réserver
        </button>
      </div>
    </div>
  );
}

export default CarCard;
