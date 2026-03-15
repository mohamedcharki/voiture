import React, { useState } from 'react';

function HeroSection({ onOpenModal }) {
  const [formData, setFormData] = useState({
    city: '',
    pickupDate: '',
    returnDate: ''
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert('Recherche en cours pour: ' + formData.city);
    onOpenModal();
  };

  return (
    <section id="accueil" className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden pt-16">
      {/* Background SVG Car */}
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 1400 900" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#e8f4f8', stopOpacity: 0.95}} />
              <stop offset="100%" style={{stopColor: '#c0e8f0', stopOpacity: 0.9}} />
            </linearGradient>
          </defs>
          <rect width="1400" height="900" fill="url(#heroGrad)" />
          <ellipse cx="1050" cy="500" rx="180" ry="25" fill="rgba(0,0,0,0.25)" />
          <path d="M 850 450 L 900 380 L 1200 380 L 1250 450 L 1250 550 Q 1250 580 1220 580 L 880 580 Q 850 580 850 550 Z" fill="rgba(52,152,219,0.95)" stroke="rgba(52,152,219,1)" strokeWidth="3" />
          <path d="M 920 380 L 970 300 L 1130 300 L 1180 380" fill="rgba(52,152,219,1)" stroke="rgba(52,152,219,1)" strokeWidth="2" />
          <path d="M 935 378 L 1000 320 L 1050 370 L 980 410" fill="rgba(135,206,235,0.5)" stroke="rgba(52,152,219,0.7)" strokeWidth="1.5" />
          <path d="M 1080 375 L 1160 320 L 1190 410 L 1120 420" fill="rgba(135,206,235,0.5)" stroke="rgba(52,152,219,0.7)" strokeWidth="1.5" />
          <circle cx="920" cy="580" r="45" fill="rgba(20,20,20,0.95)" stroke="rgba(100,100,100,0.9)" strokeWidth="3" />
          <circle cx="1180" cy="580" r="45" fill="rgba(20,20,20,0.95)" stroke="rgba(100,100,100,0.9)" strokeWidth="3" />
          <ellipse cx="860" cy="480" rx="15" ry="20" fill="rgba(255,200,0,0.9)" />
          <ellipse cx="1050" cy="420" rx="80" ry="45" fill="rgba(255,255,255,0.2)" />
        </svg>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent opacity-95"></div>

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col justify-center px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white leading-tight font-playfair animate-fade-in-up">
          Louez votre voiture <span className="text-red-500">au Maroc</span>
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          Une flotte de véhicules premium avec service haut de gamme. Réservation facile, tarifs compétitifs et livraison partout au Maroc.
        </p>

        {/* Reservation Form */}
        <div className="bg-gray-800/90 backdrop-blur-md rounded-lg border border-red-500/30 p-6 md:p-8 max-w-4xl mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-gray-300 text-sm uppercase font-semibold block mb-2">Ville de départ</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleFormChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition"
              >
                <option value="">Sélectionner</option>
                <option value="casablanca">Casablanca</option>
                <option value="rabat">Rabat</option>
                <option value="fes">Fès</option>
                <option value="marrakech">Marrakech</option>
                <option value="agadir">Agadir</option>
                <option value="tangier">Tanger</option>
              </select>
            </div>
            <div>
              <label className="text-gray-300 text-sm uppercase font-semibold block mb-2">Date de départ</label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleFormChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm uppercase font-semibold block mb-2">Date de retour</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleFormChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition"
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold uppercase text-sm px-6 py-2 rounded transition-all transform hover:-translate-y-1 hover:shadow-lg"
            >
              Rechercher
            </button>
          </form>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <button
            onClick={() => onOpenModal()}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 md:px-8 py-3 rounded transition-all transform hover:-translate-y-1 hover:shadow-lg"
          >
            Réserver maintenant
          </button>
          <button
            onClick={() => document.getElementById('flotte').scrollIntoView()}
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-6 md:px-8 py-3 rounded transition-all transform hover:-translate-y-1"
          >
            Voir nos véhicules
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
