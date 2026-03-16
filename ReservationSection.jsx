import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

function ReservationSection({ onOpenModal }) {
  const [formData, setFormData] = useState({
    differentReturnLoc: false,
    pickupLocation: 'FES CENTRE-VILLE',
    returnLocation: '',
    pickupDate: '',
    returnDate: '',
    pickupTime: '08:00',
    returnTime: '08:00',
    promoCode: ''
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onOpenModal();
  };

  return (
    <section className="bg-white py-16 px-4 md:px-8 -mt-24 relative z-20 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-2xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-playfair">
          Réserver un véhicule
        </h2>
        <p className="text-gray-500">
          Sélectionnez vos dates et agences pour trouver le véhicule idéal
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Checkbox */}
        <div className="flex items-center">
             <div className="relative flex items-center">
                 <input 
                     type="checkbox" 
                     id="differentReturnLoc" 
                     name="differentReturnLoc"
                     checked={formData.differentReturnLoc}
                     onChange={handleChange}
                     className="w-5 h-5 text-red-500 bg-white border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                 />
                 <label htmlFor="differentReturnLoc" className="ml-3 text-sm font-medium text-gray-600 cursor-pointer">
                     Restituer dans une agence différente
                 </label>
             </div>
        </div>

        {/* Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Agence de départ</label>
            <div className="relative">
              <select
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white text-gray-700"
              >
                <option value="FES CENTRE-VILLE">FES CENTRE-VILLE</option>
                <option value="AÉROPORT FÈS-SAÏSS">AÉROPORT FÈS-SAÏSS</option>
                <option value="CASABLANCA">CASABLANCA</option>
                <option value="MARRAKECH">MARRAKECH</option>
              </select>
               <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                <MapPin size={18} />
              </div>
            </div>
          </div>
          {formData.differentReturnLoc && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Agence de retour</label>
              <div className="relative">
                <select
                  name="returnLocation"
                  value={formData.returnLocation}
                  onChange={handleChange}
                  className="w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white text-gray-700"
                >
                  <option value="">Sélectionner une agence</option>
                  <option value="FES CENTRE-VILLE">FES CENTRE-VILLE</option>
                  <option value="AÉROPORT FÈS-SAÏSS">AÉROPORT FÈS-SAÏSS</option>
                  <option value="CASABLANCA">CASABLANCA</option>
                  <option value="MARRAKECH">MARRAKECH</option>
                </select>
                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                  <MapPin size={18} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dates & Times */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Date de départ</label>
            <div className="relative">
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                required
                className="w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-700"
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                <Calendar size={18} />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Heure de départ</label>
            <div className="relative">
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                required
                className="w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-700 appearance-none bg-white"
              />
               <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500 bg-white mr-1 my-1">
                <Clock size={18} />
              </div>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-600 mb-2">Date de retour</label>
             <div className="relative">
               <input
                 type="date"
                 name="returnDate"
                 value={formData.returnDate}
                 onChange={handleChange}
                 required
                 className="w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-700"
               />
               <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                 <Calendar size={18} />
               </div>
             </div>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-600 mb-2">Heure de retour</label>
             <div className="relative">
               <input
                 type="time"
                 name="returnTime"
                 value={formData.returnTime}
                 onChange={handleChange}
                 required
                 className="w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-700 appearance-none bg-white"
               />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500 bg-white mr-1 my-1">
                 <Clock size={18} />
               </div>
             </div>
           </div>
        </div>

        {/* Promo Code & Submit Button (aligned) */}
         <div className="flex flex-col md:flex-row gap-6 mt-6 items-end">
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-2">Code promo</label>
                <input
                  type="text"
                  name="promoCode"
                  value={formData.promoCode}
                  onChange={handleChange}
                  placeholder="Entrez votre code promo"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-700"
                />
            </div>
            <div className="w-full md:w-auto self-stretch md:self-end flex">
                 <button
                   type="submit"
                   className="w-full md:w-[250px] bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg h-[50px] mt-auto"
                 >
                   Rechercher
                 </button>
            </div>
        </div>
      </form>
    </section>
  );
}

export default ReservationSection;
