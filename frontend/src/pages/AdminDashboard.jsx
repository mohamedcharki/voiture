import React, { useState } from 'react';
import Sidebar from '../components/admin/ui/Sidebar';
import StatsTab from '../components/admin/StatsTab';
import ReservationsTab from '../components/admin/ReservationsTab';
import CarsTab from '../components/admin/CarsTab';
import DestinationsTab from '../components/admin/DestinationsTab';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');

  const renderContent = () => {
    switch(activeTab) {
      case 'stats': return <StatsTab key="stats" />;
      case 'reservations': return <ReservationsTab key="reservations" />;
      case 'cars': return <CarsTab key="cars" />;
      case 'destinations': return <DestinationsTab key="destinations" />;
      default: return <StatsTab key="stats" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans flex text-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 lg:ml-[260px] min-h-screen p-8 lg:p-12 overflow-x-hidden">
        <div className="max-w-6xl mx-auto h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
