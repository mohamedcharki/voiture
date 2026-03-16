import React, { useState } from 'react';
import CarCard from './CarCard';

function FleetSection({ onReserve }) {
  const [filter, setFilter] = useState('all');

  const cars = [
    { id: 1, name: 'Dacia Sandero', price: 120, fuel: 'Essence', transmission: 'Manuelle', passengers: '5', category: 'economique', image: 'https://images.unsplash.com/photo-1620601955074-ce441c2aeb38?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Dacia Duster', price: 200, fuel: 'Diesel', transmission: 'Manuelle', passengers: '5', category: 'confort', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Renault Clio 5', price: 150, fuel: 'Essence', transmission: 'Automatique', passengers: '5', category: 'economique', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Mercedes C-Class', price: 380, fuel: 'Diesel', transmission: 'Automatique', passengers: '5', category: 'premium', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Audi A4', price: 330, fuel: 'Diesel', transmission: 'Automatique', passengers: '5', category: 'premium', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0b17?auto=format&fit=crop&w=400&q=80' },
    { id: 6, name: 'Toyota Corolla', price: 180, fuel: 'Hybride', transmission: 'Automatique', passengers: '5', category: 'confort', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=400&q=80' },
  ];

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
