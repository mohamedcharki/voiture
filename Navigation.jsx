import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';

function Navigation({ onOpenModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md z-50 border-b border-red-500/20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold font-playfair">
          LUX<span className="text-red-500">CAR</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#accueil" className="text-gray-300 hover:text-white transition text-sm font-medium">Accueil</a>
          <a href="#flotte" className="text-gray-300 hover:text-white transition text-sm font-medium">Flotte</a>
          <a href="#destinations" className="text-gray-300 hover:text-white transition text-sm font-medium">Destinations</a>
          <a href="#services" className="text-gray-300 hover:text-white transition text-sm font-medium">Services</a>
          <a href="#contact" className="text-gray-300 hover:text-white transition text-sm font-medium">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="tel:+212600000000" className="hidden md:flex text-gray-300 items-center gap-2 hover:text-red-500 text-sm">
            <Phone size={18} /> +212 6 00 00 00 00
          </a>
          <button
            onClick={() => onOpenModal()}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded transition-all transform hover:-translate-y-1"
          >
            Réserver
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-red-500/20">
          <div className="flex flex-col gap-4 p-4">
            <a href="#accueil" className="text-gray-300 hover:text-white text-sm">Accueil</a>
            <a href="#flotte" className="text-gray-300 hover:text-white text-sm">Flotte</a>
            <a href="#destinations" className="text-gray-300 hover:text-white text-sm">Destinations</a>
            <a href="#services" className="text-gray-300 hover:text-white text-sm">Services</a>
            <a href="#contact" className="text-gray-300 hover:text-white text-sm">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
