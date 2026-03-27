import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Car, MapPin, Search, Shield, Clock, Award } from 'lucide-react';
import api from '../config/api';
import Autocomplete from './Autocomplete';
import { Filter, ChevronDown } from 'lucide-react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1555353540-64fd1b19584a?q=80&w=2000&auto=format&fit=crop', // BMW
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000&auto=format&fit=crop', // Mercedes
  'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2000&auto=format&fit=crop', // Audi
  'https://images.unsplash.com/photo-1620882813838-518337deade3?q=80&w=2000&auto=format&fit=crop', // Toyota
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2000&auto=format&fit=crop', // Lamborghini
  'https://images.unsplash.com/photo-1503376710356-be616bb1e72e?q=80&w=2000&auto=format&fit=crop'  // Porsche
];

const DEFAULT_CITIES = ['Casablanca', 'Marrakech', 'Rabat', 'Tanger', 'Fès', 'Meknès'];

const TrustBadge = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
    <Icon size={16} className="text-yellow-400" />
    <span className="text-white text-sm font-medium">{text}</span>
  </div>
);

const PopularCarCard = ({ car, onSelect }) => (
  <div
    onClick={() => onSelect(car)}
    className="group cursor-pointer bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
  >
    <div className="aspect-video rounded-lg overflow-hidden mb-3">
      <img
        src={car.image || 'https://images.unsplash.com/photo-1549399735-cef2e2c3f638?q=80&w=400&auto=format&fit=crop'}
        alt={car.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <h3 className="text-white font-semibold text-sm mb-1">{car.name}</h3>
    <p className="text-yellow-400 font-bold text-lg">{car.price} DH/j</p>
  </div>
);

function HeroSection({ onSearchSubmit }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableCities, setAvailableCities] = useState(DEFAULT_CITIES);
  const [formData, setFormData] = useState({
    city: '',
    carName: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    transmission: '',
    fuel: '',
    pickupDate: '',
    returnDate: ''
  });
  const [popularCars, setPopularCars] = useState([]);
  const [carNames, setCarNames] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchSelectData = async () => {
      try {
        const { data } = await api.get('/destinations');
        if (data.destinations && data.destinations.length > 0) {
          const names = data.destinations.map(d => d.name);
          setAvailableCities(names);
          setFormData(prev => ({ ...prev, city: prev.city && names.includes(prev.city) ? prev.city : names[0] }));
        }
      } catch (e) {
        console.error('Erreur chargement destinations:', e);
      }
    };
    fetchSelectData();
  }, []);

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        const { data } = await api.get('/cars?all=true');
        const fetchedCars = data.cars || [];
        setCars(fetchedCars);
        setCarNames([...new Set(fetchedCars.map(c => c.name))]);
        setPopularCars(fetchedCars.slice(0, 4));
      } catch (err) {
        console.error('Erreur lors du chargement des voitures:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCarsData();
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    onSearchSubmit(formData);
  };

  const handleCarSelect = (car) => {
    setFormData(prev => ({ ...prev, carId: car._id }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 7000); // Changed to 7 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="accueil"
      className="min-h-screen relative overflow-hidden pt-16 flex flex-col"
    >
      {/* Enhanced Background Slideshow with Parallax */}
      <div ref={sliderRef} className="absolute inset-0">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-2000 ease-in-out transform ${
              index === currentImageIndex
                ? 'opacity-100 scale-105'
                : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url('${img}')`,
              transform: index === currentImageIndex ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        ))}
      </div>

      {/* Enhanced Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-0"></div>

      {/* Content Container */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 md:px-8 max-w-7xl mx-auto py-12">
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in-up">
          <TrustBadge icon={Shield} text="Réservation Sécurisée" />
          <TrustBadge icon={Clock} text="Livraison Rapide" />
          <TrustBadge icon={Award} text="Service Premium" />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight text-center animate-fade-in-up font-['Poppins']" style={{ animationDelay: '0.1s' }}>
          Louez votre voiture{' '}
          <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            au Maroc
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto text-center leading-relaxed animate-fade-in-up font-['Inter']" style={{ animationDelay: '0.2s' }}>
          Découvrez notre flotte exclusive de véhicules premium. Réservation instantanée,
          tarifs transparents et service de qualité supérieure partout au Maroc.
        </p>

        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6 md:p-8 mx-auto w-full max-w-6xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <form className="space-y-6" onSubmit={handleSearchClick}>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 items-end">
              {/* City Selection */}
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider">Ville</label>
                <Autocomplete
                  suggestions={availableCities}
                  value={formData.city}
                  onChange={(val) => setFormData({ ...formData, city: val })}
                  placeholder="Où partez-vous ?"
                  icon={MapPin}
                />
              </div>

              {/* Car Name autocomplete */}
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider">Modèle</label>
                <Autocomplete
                  suggestions={carNames}
                  value={formData.carName}
                  onChange={(val) => setFormData({ ...formData, carName: val })}
                  placeholder="Ex: Mercedes, Tesla..."
                  icon={Car}
                />
              </div>

              {/* Category Dropdown */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider">Catégorie</label>
                <div className="relative group">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 pl-11 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all hover:bg-white/30"
                  >
                    <option value="" className="bg-gray-900">Toutes</option>
                    <option value="SUV" className="bg-gray-900">SUV</option>
                    <option value="luxe" className="bg-gray-900">Luxe</option>
                    <option value="sport" className="bg-gray-900">Sport</option>
                    <option value="berline" className="bg-gray-900">Berline</option>
                    <option value="économique" className="bg-gray-900">Économique</option>
                  </select>
                  <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 pointer-events-none" />
                </div>
              </div>

              {/* Dates */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider">Départ</label>
                <div className="relative">
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 [&::-webkit-calendar-picker-indicator]:invert"
                  />
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
                </div>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider">Retour</label>
                <div className="relative">
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 [&::-webkit-calendar-picker-indicator]:invert"
                  />
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="lg:col-span-1">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  <Search size={20} className="group-hover:rotate-12 transition-transform" />
                  <span>C'est parti</span>
                </button>
              </div>
            </div>

            {/* Price Range & Filters Row */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4 text-sm text-white/70">
                <span>Prix:</span>
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min (DH)"
                  value={formData.minPrice}
                  onChange={handleFormChange}
                  className="w-24 bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white focus:ring-1 focus:ring-yellow-400 outline-none"
                />
                <span>-</span>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max (DH)"
                  value={formData.maxPrice}
                  onChange={handleFormChange}
                  className="w-24 bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white focus:ring-1 focus:ring-yellow-400 outline-none"
                />
              </div>

              <div className="flex items-center gap-4 text-sm text-white/70">
                <span>Vitesse:</span>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleFormChange}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white focus:ring-1 focus:ring-yellow-400 outline-none"
                >
                  <option value="" className="bg-gray-900">Toutes</option>
                  <option value="automatique" className="bg-gray-900">Auto</option>
                  <option value="manuelle" className="bg-gray-900">Manuelle</option>
                </select>
              </div>

              <div className="flex items-center gap-4 text-sm text-white/70 ml-auto">
                <span className="flex items-center gap-2">
                  <Shield size={14} className="text-yellow-400" /> Annulation gratuite
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-yellow-400" /> Support 24/7
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* Popular Cars Section */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 font-['Poppins']">
            Véhicules Populaires
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {popularCars.map((car) => (
              <PopularCarCard key={car._id} car={car} onSelect={handleCarSelect} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
