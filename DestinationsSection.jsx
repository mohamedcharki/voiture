import React from 'react';

function DestinationsSection() {
  const destinations = [
    { name: 'Casablanca', desc: 'La plus grande ville du Maroc avec ses attractions modernes', color: 'from-red-500 to-red-700' },
    { name: 'Marrakech', desc: 'La ville ocre avec ses souks traditionnels', color: 'from-amber-600 to-yellow-700' },
    { name: 'Rabat', desc: 'La capitale avec ses jardins et monuments', color: 'from-blue-400 to-blue-600' },
    { name: 'Tanger', desc: 'La porte du Maroc avec ses plages', color: 'from-cyan-400 to-blue-500' },
    { name: 'Agadir', desc: 'Station balnéaire avec plages dorées', color: 'from-yellow-300 to-orange-500' },
    { name: 'Fès', desc: 'Médina ancienne et rues historiques', color: 'from-orange-400 to-red-500' },
  ];

  return (
    <section id="destinations" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">
            Explorez le <span className="text-red-500">Maroc</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Louez une voiture et découvrez les plus belles destinations du Maroc
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div key={index} className={`relative h-80 rounded-lg overflow-hidden group cursor-pointer hover:scale-105 transition-transform`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${destination.color} brightness-60 group-hover:brightness-75 transition-all`}></div>
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2 font-playfair">{destination.name}</h3>
                <p className="text-gray-200 text-sm mb-4">{destination.desc}</p>
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded text-sm w-fit transition-all transform hover:-translate-y-1">
                  Louer une voiture
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DestinationsSection;
