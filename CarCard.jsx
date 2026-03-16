import React from 'react';

function CarCard({ car, onReserve }) {
  return (
    <div className="bg-gray-800/80 border border-red-500/20 rounded-lg overflow-hidden hover:border-red-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group cursor-pointer">
      <div className="h-64 flex items-center justify-center overflow-hidden bg-gray-900 border-b border-white/10">
        <img 
          src={car.image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&q=80"} 
          alt={car.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
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
