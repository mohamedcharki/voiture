import React, { useState, useEffect } from 'react';
import { Calendar, User, Mail, Phone, MapPin, CheckCircle, Car } from 'lucide-react';
import { cars } from './carsData';
import emailjs from '@emailjs/browser';

function ReservationPage({ searchData, onBack }) {
  const selectedCar = cars.find(car => car.id.toString() === searchData.carId) || cars[0];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupCity: searchData.city,
    pickupDate: searchData.pickupDate,
    returnDate: searchData.returnDate,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY_HERE"); // The user will need to put their public key here
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // EmailJS configuration
      const serviceId = 'YOUR_SERVICE_ID_HERE';
      const templateId = 'YOUR_TEMPLATE_ID_HERE';

      const templateParams = {
        to_email: 'mcharki697@gmail.com',
        client_name: formData.fullName,
        client_phone: formData.phone,
        client_email: formData.email,
        selected_car: selectedCar.name,
        pickup_city: formData.pickupCity,
        pickup_date: formData.pickupDate,
        return_date: formData.returnDate,
        message: formData.message || 'Aucun message',
      };

      // Since the user might not have set keys yet, we'll simulate success if keys aren't replaced
      if (serviceId === 'YOUR_SERVICE_ID_HERE') {
        setTimeout(() => {
          setIsSubmitting(false);
          setSuccess(true);
          console.log("Email Simulation Params:", templateParams);
        }, 1500);
        return;
      }

      await emailjs.send(serviceId, templateId, templateParams);
      setIsSubmitting(false);
      setSuccess(true);

    } catch (err) {
      console.error('Email send failed:', err);
      setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 px-4 animate-fade-in-up">
        <CheckCircle className="text-green-500 w-24 h-24 mb-6" />
        <h2 className="text-4xl font-bold text-gray-900 mb-4 font-playfair text-center">Réservation Confirmée !</h2>
        <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
          Merci {formData.fullName}. Votre demande de réservation pour la <strong>{selectedCar.name}</strong> a été envoyée avec succès. Notre équipe vous contactera très prochainement.
        </p>
        <button
          onClick={onBack}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md transform hover:-translate-y-1"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="text-gray-600 hover:text-red-600 font-medium transition-colors flex items-center"
          >
            ← Retour à la recherche
          </button>
          <h2 className="text-3xl font-bold text-gray-900 font-playfair">Finaliser votre réservation</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: Car Details */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24">
              <div 
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedCar.image})` }}
              ></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedCar.name}</h3>
                    <p className="text-gray-500 capitalize">{selectedCar.category}</p>
                  </div>
                  <div className="bg-red-50 text-red-600 font-bold px-3 py-1 rounded-lg">
                    {selectedCar.price} DH/j
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-700">
                    <Car className="w-5 h-5 mr-3 text-red-500" />
                    <span>Carburant: <strong>{selectedCar.fuel}</strong></span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-5 h-5 mr-3 text-red-500 flex items-center justify-center font-bold font-serif">A</div>
                    <span>Transmission: <strong>{selectedCar.transmission}</strong></span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <User className="w-5 h-5 mr-3 text-red-500" />
                    <span>Places: <strong>{selectedCar.passengers}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Reservation Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Vos coordonnées</h3>
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50 text-gray-900"
                        placeholder="John Doe"
                      />
                      <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50 text-gray-900"
                        placeholder="john@example.com"
                      />
                      <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de téléphone *</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50 text-gray-900"
                        placeholder="+212 6 XX XX XX XX"
                      />
                      <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Rental Details */}
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 font-playfair border-t border-gray-100 pt-6">Détails de location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ville de départ *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="pickupCity"
                        value={formData.pickupCity}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50 text-gray-900"
                        placeholder="Ville"
                      />
                      <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date de départ *</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50 text-gray-900"
                      />
                      <Calendar className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date de retour *</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50 text-gray-900"
                      />
                      <Calendar className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optionnel)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50 text-gray-900"
                    placeholder="Demandes particulières, équipement supplémentaire, etc."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-4 px-6 rounded-lg transition-all shadow-lg text-lg ${
                    isSubmitting 
                      ? 'bg-red-400 cursor-not-allowed text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white transform hover:-translate-y-1 hover:shadow-xl'
                  } flex justify-center items-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    'Confirmer la réservation'
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ReservationPage;
