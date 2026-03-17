import React, { useState } from 'react';
import CarCard from './CarCard';
import { cars } from './carsData';

function FleetSection({ onReserve }) {
  const [filter, setFilter] = useState('all');

  const filteredCars = filter === 'all' ? cars : cars.filter(car => car.category === filter);

  return (
    <section id="flotte" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">
            Notre <span className="text-red-500">Flotte</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Découvrez notre sélection de véhicules premium avec différentes catégories pour tous les besoins.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {['all', 'economique', 'confort', 'premium'].map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded font-semibold uppercase text-sm transition-all ${
                filter === category
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'border border-red-500/30 text-gray-300 hover:text-white hover:border-red-500'
              }`}
            >
              {category === 'all' ? 'Tous les véhicules' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} onReserve={onReserve} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FleetSection;
