import React, { useState } from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import ReservationSection from './ReservationSection';
import FleetSection from './FleetSection';
import DestinationsSection from './DestinationsSection';
import StatsSection from './StatsSection';
import ServicesSection from './ServicesSection';
import ReviewsSection from './ReviewsSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import ReservationModal from './ReservationModal';

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
      <ReservationSection onOpenModal={handleOpenModal} />
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
