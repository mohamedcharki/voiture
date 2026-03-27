import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import api from '../config/api';

const CATEGORIES = ['all', 'économique', 'berline', 'SUV', 'sport', 'luxe', 'utilitaire'];

function FleetSection({ onReserve }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  const fetchCars = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/cars');
      setCars(data.cars || []);
    } catch (e) {
      setError('Impossible de charger les véhicules. Veuillez vérifier votre connexion.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredCars = filter === 'all'
    ? cars
    : cars.filter(car => car.category === filter);

  // Map backend car to the format CarCard expects
  const mapCar = (car) => ({
    id: car._id,
    name: car.name,
    brand: car.brand,
    price: car.price,
    fuel: car.fuel,
    transmission: car.transmission,
    passengers: String(car.seats || 5),
    category: car.category,
    image: car.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80',
    availability: car.availability,
  });

  return (
    <section id="flotte" className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-['Poppins']">
            Notre{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Flotte
            </span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Découvrez notre sélection exclusive de véhicules premium avec différentes catégories
            pour tous vos besoins de déplacement au Maroc.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {CATEGORIES.map((category, index) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg capitalize backdrop-blur-sm ${
                filter === category
                  ? 'bg-gradient-to-r from-yellow-400 to-red-500 text-white shadow-lg shadow-yellow-400/30'
                  : 'border border-white/20 text-gray-300 hover:text-white hover:border-yellow-400/50 bg-white/5 hover:bg-white/10'
              }`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {category === 'all' ? 'Tous les véhicules' : category}
            </button>
          ))}
        </div>

        {/* State Handling */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 animate-pulse">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-red-500/20 border-b-red-500 rounded-full animate-spin-slow"></div>
              </div>
            </div>
            <p className="mt-8 text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">
              Chargement de la flotte...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
              <span className="text-4xl text-red-500">!</span>
            </div>
            <p className="text-red-400 mb-8 text-lg max-w-md mx-auto">{error}</p>
            <button
              onClick={fetchCars}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20 hover:border-yellow-400/50"
            >
              Réessayer
            </button>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Aucun véhicule disponible dans cette catégorie pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => (
              <div
                key={car._id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CarCard car={mapCar(car)} onReserve={onReserve} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FleetSection;
