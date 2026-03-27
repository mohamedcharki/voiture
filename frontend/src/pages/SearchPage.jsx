import React, { useState, useEffect } from 'react';
import { Filter, Search, X, ChevronDown, SlidersHorizontal, ArrowUpDown, Info } from 'lucide-react';
import api from '../config/api';
import CarCard from '../components/CarCard';

const CATEGORIES = ['économique', 'berline', 'SUV', 'sport', 'luxe', 'utilitaire'];
const FUELS = ['essence', 'diesel', 'électrique', 'hybride'];
const TRANSMISSIONS = ['manuelle', 'automatique'];

function SearchPage({ searchData, onBack, onReserve }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [filters, setFilters] = useState({
    city: searchData?.city || '',
    search: searchData?.carName || '', 
    category: searchData?.category || '',
    minPrice: searchData?.minPrice || '',
    maxPrice: searchData?.maxPrice || '',
    transmission: searchData?.transmission || '',
    fuel: searchData?.fuel || '',
    startDate: searchData?.pickupDate || '',
    endDate: searchData?.returnDate || '',
    sort: 'newest'
  });

  const [searchTerm, setSearchTerm] = useState(searchData?.carName || '');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchTerm }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.transmission) queryParams.append('transmission', filters.transmission);
      if (filters.fuel) queryParams.append('fuel', filters.fuel);
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.sort) queryParams.append('sort', filters.sort);

      const { data } = await api.get(`/cars?${queryParams.toString()}`);
      setCars(data.cars || []);
    } catch (err) {
      setError('Erreur lors du chargement des résultats.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [filters]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

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
    <div className="pt-24 pb-16 bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Poppins']">
              Résultats de recherche
            </h1>
            <p className="text-gray-400">
              {loading ? 'Chargement...' : `${cars.length} véhicule${cars.length > 1 ? 's' : ''} trouvé${cars.length > 1 ? 's' : ''}`}
              {filters.city && ` à ${filters.city}`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group flex-1 md:w-64">
              <input
                type="text"
                placeholder="Rechercher un modèle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all font-['Inter']"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            <button 
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden p-2.5 bg-yellow-400 text-black rounded-xl hover:scale-105 transition-all"
            >
              <SlidersHorizontal size={20} />
            </button>
            
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1 text-sm text-gray-300">
              <ArrowUpDown size={14} className="text-yellow-400" />
              <select 
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="bg-transparent border-none focus:ring-0 cursor-pointer py-1.5"
              >
                <option value="newest" className="bg-gray-900">Plus récents</option>
                <option value="price_asc" className="bg-gray-900">Prix croissant</option>
                <option value="price_desc" className="bg-gray-900">Prix décroissant</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR FILTERS (Desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-8 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Filter size={18} className="text-yellow-400" /> Filtres
                </h3>
                <button 
                  onClick={() => setFilters({
                    city: '', search: '', category: '', minPrice: '', maxPrice: '', transmission: '', fuel: '', startDate: '', endDate: '', sort: 'newest'
                  })}
                  className="text-xs text-yellow-500 hover:text-yellow-400 uppercase tracking-widest font-bold"
                >
                  Réinitialiser
                </button>
              </div>

              {/* Price filter */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Prix max (par jour)</label>
                <input 
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={filters.maxPrice || 500}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
                <div className="flex justify-between text-xs font-bold text-gray-500">
                  <span>0 DH</span>
                  <span className="text-yellow-400">{filters.maxPrice || 500} DH</span>
                </div>
              </div>

              {/* Category filter */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Catégorie</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => handleFilterChange('category', filters.category === cat ? '' : cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        filters.category === cat 
                          ? 'bg-yellow-400 border-yellow-400 text-black' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transmission filter */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Transmission</label>
                <div className="space-y-2">
                  {TRANSMISSIONS.map(trans => (
                    <label key={trans} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio"
                        name="transmission"
                        checked={filters.transmission === trans}
                        onChange={() => handleFilterChange('transmission', trans)}
                        className="w-4 h-4 rounded-full border-white/20 bg-transparent text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className={`text-sm transition-colors ${filters.transmission === trans ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}`}>
                        {trans === 'manuelle' ? 'Manuelle' : 'Automatique'}
                      </span>
                    </label>
                  ))}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio"
                      name="transmission"
                      checked={filters.transmission === ''}
                      onChange={() => handleFilterChange('transmission', '')}
                      className="w-4 h-4 rounded-full border-white/20 bg-transparent text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className={`text-sm transition-colors ${filters.transmission === '' ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}`}>
                      Toutes
                    </span>
                  </label>
                </div>
              </div>

              {/* Fuel filter */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Carburant</label>
                <div className="grid grid-cols-2 gap-2">
                  {FUELS.map(fuel => (
                    <button 
                      key={fuel}
                      onClick={() => handleFilterChange('fuel', filters.fuel === fuel ? '' : fuel)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border ${
                        filters.fuel === fuel 
                          ? 'bg-red-500 border-red-500 text-white' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {fuel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Banner/Info */}
              <div className="bg-gradient-to-br from-yellow-400/20 to-red-500/20 border border-yellow-400/30 p-4 rounded-xl mt-4">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <Info size={16} /> <span className="text-xs font-bold uppercase">Conseil</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Réservez tôt pour bénéficier des meilleurs tarifs et garantir la disponibilité du modèle souhaité.
                </p>
              </div>
            </div>
          </aside>

          {/* RESULTS GRID */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white/5 rounded-2xl h-96"></div>
                ))}
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-24 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} className="text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-['Poppins']">Aucun véhicule trouvé</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-8">
                  Nous n'avons pas trouvé de véhicules correspondant à vos critères de recherche. Essayez d'ajuster vos filtres.
                </p>
                <button 
                  onClick={() => setFilters({
                    city: '', search: '', category: '', minPrice: '', maxPrice: '', transmission: '', fuel: '', startDate: '', endDate: '', sort: 'newest'
                  })}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20"
                >
                  Voir tout le catalogue
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cars.map((car, index) => (
                  <div key={car._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CarCard car={mapCar(car)} onReserve={onReserve} />
                  </div>
                ))}
              </div>
            )}
            
            {!loading && cars.length > 0 && (
              <div className="mt-12 p-8 border border-white/5 rounded-3xl text-center bg-white/5">
                <p className="text-gray-400 mb-4 font-medium italic">
                  Vous ne trouvez pas votre bonheur ? Notre équipe est à votre disposition pour vous trouver le véhicule idéal.
                </p>
                <button className="text-yellow-400 font-bold hover:underline">Nous contacter →</button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTERS MODAL */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col p-6 animate-fade-in lg:hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Filtres</h3>
            <button onClick={() => setShowMobileFilters(false)} className="p-2 text-gray-400 hover:text-white">
              <X size={32} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-8 pb-10">
            {/* Same filters as sidebar but optimized for mobile view */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Catégorie</label>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => handleFilterChange('category', filters.category === cat ? '' : cat)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                      filters.category === cat ? 'bg-yellow-400 border-yellow-400 text-black' : 'bg-white/10 border-white/20 text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Prix max</label>
              <input 
                type="range"
                min="0"
                max="500"
                value={filters.maxPrice || 500}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="text-xl font-bold text-yellow-400">{filters.maxPrice || 500} DH</div>
            </div>
            
            {/* ... other mobile filters ... */}
          </div>
          
          <button 
            onClick={() => setShowMobileFilters(false)}
            className="w-full bg-yellow-400 text-black font-bold py-4 rounded-2xl shadow-lg shadow-yellow-400/20 active:scale-95 transition-all"
          >
            Afficher {cars.length} résultats
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
