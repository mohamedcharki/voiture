import React, { useState } from 'react';
import { X } from 'lucide-react';

function ReservationModal({ isOpen, onClose, carName }) {
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupDate: '',
    returnDate: ''
  });

  const handleReservationChange = (e) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value
    });
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    alert('Réservation confirmée pour ' + carName + '!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full border border-red-500/20 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-playfair">Réservez votre voiture</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleReservationSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300 block mb-2 text-sm font-semibold">Voiture</label>
            <input
              type="text"
              value={carName}
              readOnly
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-gray-300"
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-2 text-sm font-semibold">Nom complet</label>
            <input
              type="text"
              name="name"
              value={reservationData.name}
              onChange={handleReservationChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-2 text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={reservationData.email}
              onChange={handleReservationChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition"
              placeholder="Votre email"
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-2 text-sm font-semibold">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={reservationData.phone}
              onChange={handleReservationChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition"
              placeholder="Votre téléphone"
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-2 text-sm font-semibold">Date de départ</label>
            <input
              type="date"
              name="pickupDate"
              value={reservationData.pickupDate}
              onChange={handleReservationChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-2 text-sm font-semibold">Date de retour</label>
            <input
              type="date"
              name="returnDate"
              value={reservationData.returnDate}
              onChange={handleReservationChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition"
            />
          </div>
          <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition-all transform hover:-translate-y-1">
            Confirmer la réservation
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReservationModal;
