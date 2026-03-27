import React from 'react';
import { Fuel, Settings, Users, Star, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

function CarCard({ car, onReserve }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(car.id));
  }, [car.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    if (favorites.includes(car.id)) {
      newFavorites = favorites.filter(id => id !== car.id);
    } else {
      newFavorites = [...favorites, car.id];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer">
      <div
        className="relative bg-gray-900 h-64 flex items-center justify-center overflow-hidden bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
        style={{ backgroundImage: `url(${car.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80'})` }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {!car.availability && (
          <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            Indisponible
          </div>
        )}

        <button
          onClick={toggleFavorite}
          className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
            isFavorite 
              ? 'bg-red-500 border-red-500 text-white' 
              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          }`}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Price badge */}
        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-yellow-400 to-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg transform group-hover:scale-110 transition-transform">
          {car.price} DH/j
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white font-['Poppins'] group-hover:text-yellow-400 transition-colors">
            {car.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="text-yellow-400 text-sm font-semibold">4.8</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <Fuel size={20} className="text-yellow-400" />
            <span className="text-gray-300 text-xs uppercase tracking-wider">{car.fuel}</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <Settings size={20} className="text-yellow-400" />
            <span className="text-gray-300 text-xs uppercase tracking-wider">{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <Users size={20} className="text-yellow-400" />
            <span className="text-gray-300 text-xs uppercase tracking-wider">{car.passengers} places</span>
          </div>
        </div>

        <button
          onClick={() => onReserve(car.id)}
          className="w-full bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30 flex items-center justify-center gap-2 group/btn"
        >
          <span>Réserver maintenant</span>
          <span className="text-sm group-hover/btn:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
}

export default CarCard;
