import React, { useState } from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
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
import ReservationPage from './ReservationPage';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');
  
  // Manage the global state regarding search
  const [searchData, setSearchData] = useState(null);

  const handleOpenModal = (carName = '') => {
    setSelectedCar(carName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar('');
  };

  const handleSearchSubmit = (data) => {
    setSearchData(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSearchData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen overflow-x-hidden">
      <Navigation onOpenModal={handleOpenModal} />
      
      {!searchData ? (
        <>
          <HeroSection onSearchSubmit={handleSearchSubmit} />
          <FleetSection onReserve={handleOpenModal} />
          <DestinationsSection />
          <StatsSection />
          <ServicesSection />
          <ReviewsSection />
          <AboutSection />
          <ContactSection />
        </>
      ) : (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
          <ReservationPage 
            searchData={searchData} 
            onBack={handleBackToHome} 
          />
        </React.Suspense>
      )}

      <Footer />
      <WhatsAppButton />
      <ReservationModal isOpen={isModalOpen} onClose={handleCloseModal} carName={selectedCar} />
    </div>
  );
}

export default App;
