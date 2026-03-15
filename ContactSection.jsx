import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

function ContactSection() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Message envoyé avec succès!');
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">
            Nous <span className="text-red-500">Contacter</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="text-gray-300 block mb-2 text-sm font-semibold">Nom</label>
              <input
                type="text"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                required
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="text-gray-300 block mb-2 text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                required
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition"
                placeholder="Votre email"
              />
            </div>
            <div>
              <label className="text-gray-300 block mb-2 text-sm font-semibold">Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={contactForm.phone}
                onChange={handleContactChange}
                required
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition"
                placeholder="Votre téléphone"
              />
            </div>
            <div>
              <label className="text-gray-300 block mb-2 text-sm font-semibold">Message</label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                required
                rows="5"
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition resize-none"
                placeholder="Votre message"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition-all transform hover:-translate-y-1">
              Envoyer
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-3 text-white">
                <Phone className="text-red-500" size={20} /> Téléphone
              </h3>
              <p className="text-gray-400 text-sm">+212 6 00 00 00 00</p>
              <p className="text-gray-400 text-sm">+212 5 22 22 22 22</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-3 text-white">
                <Mail className="text-red-500" size={20} /> Email
              </h3>
              <p className="text-gray-400 text-sm">contact@luxcar.ma</p>
              <p className="text-gray-400 text-sm">reservations@luxcar.ma</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-3 text-white">
                <MapPin className="text-red-500" size={20} /> Adresse
              </h3>
              <p className="text-gray-400 text-sm">Avenue Mohammed V<br />Casablanca, Maroc</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-white">
                <Clock className="text-red-500" size={20} /> Horaires
              </h3>
              <p className="text-gray-400 text-sm">Lun - Ven: 8h00 - 20h00</p>
              <p className="text-gray-400 text-sm">Sam - Dim: 9h00 - 18h00</p>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 rounded-lg overflow-hidden h-96 bg-gradient-to-br from-red-500/20 to-red-900/20 border border-red-500/30 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="text-4xl text-red-500 mx-auto mb-4" size={64} />
            <p className="text-gray-300">Carte Google Maps</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
