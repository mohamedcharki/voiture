import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import FleetSection from './components/FleetSection';
import DestinationsSection from './components/DestinationsSection';
import StatsSection from './components/StatsSection';
import ServicesSection from './components/ServicesSection';
import ReviewsSection from './components/ReviewsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ReservationModal from './components/ReservationModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');

  const handleOpenModal = (carName = '') => {
    setSelectedCar(carName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar('');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen overflow-x-hidden">
      <Navigation onOpenModal={handleOpenModal} />
      <HeroSection onOpenModal={handleOpenModal} />
      <FleetSection onReserve={handleOpenModal} />
      <DestinationsSection />
      <StatsSection />
      <ServicesSection />
      <ReviewsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <ReservationModal isOpen={isModalOpen} onClose={handleCloseModal} carName={selectedCar} />
    </div>
  );
}

export default App;
