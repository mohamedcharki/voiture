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
    <section 
      id="accueil" 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden pt-16"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=2000&q=80')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent opacity-80"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 md:px-8 max-w-7xl mx-auto py-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white leading-tight font-playfair animate-fade-in-up">
          Louez votre voiture <span className="text-red-500">au Maroc</span>
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          Une flotte de véhicules premium avec service haut de gamme. Réservation facile, tarifs compétitifs et livraison partout au Maroc.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <button
            onClick={() => onOpenModal()}
            className="bg-red-500 hover:bg-red-600 text-white text-lg font-semibold px-8 py-4 rounded transition-all transform hover:-translate-y-1 hover:shadow-lg"
          >
            Réserver maintenant
          </button>
          <button
            onClick={() => document.getElementById('flotte').scrollIntoView()}
            className="border-2 border-white text-white text-lg hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 rounded transition-all transform hover:-translate-y-1"
          >
            Voir nos véhicules
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
