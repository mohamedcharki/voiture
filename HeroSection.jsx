import React, { useState, useEffect } from 'react';

const BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=2000&q=80', // BMW
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2000&q=80', // Mercedes
  'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=2000&q=80', // Audi
  'https://images.unsplash.com/photo-1629897048514-3dd74152e9fc?auto=format&fit=crop&w=2000&q=80', // Toyota
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=2000&q=80', // Lamborghini
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80', // Porsche
];

function HeroSection({ onOpenModal }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % BACKGROUND_IMAGES.length
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="accueil" 
      className="min-h-screen relative overflow-hidden pt-16 bg-gray-900"
    >
      {/* Background Slideshow */}
      {BACKGROUND_IMAGES.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            currentImageIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${img}')` }}
        />
      ))}

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
