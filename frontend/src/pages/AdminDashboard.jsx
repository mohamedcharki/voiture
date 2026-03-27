import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

import Sidebar from '../components/admin/ui/Sidebar';
import Topbar from '../components/admin/ui/Topbar';

import StatsTab from '../components/admin/StatsTab';
import ReservationsTab from '../components/admin/ReservationsTab';
import CarsTab from '../components/admin/CarsTab';
import DestinationsTab from '../components/admin/DestinationsTab';

function AdminDashboard({ onNavigate }) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('stats');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
         <div className="text-center bg-[#111827] p-10 rounded-3xl border border-[#1f2937] shadow-2xl backdrop-blur-md">
            <AlertCircle className="text-red-500 mx-auto mb-6" size={80} strokeWidth={1.5} />
            <h2 className="text-3xl font-bold text-white mb-3 font-playfair">Accès restreint</h2>
            <p className="text-gray-400 mb-8 max-w-sm">Vous ne disposez pas des droits d'administration nécessaires pour consulter cette page.</p>
            <button onClick={() => onNavigate('login')} className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-red-500/25">
              Retour à la connexion
            </button>
         </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-[#0f172a] flex text-gray-200 selection:bg-red-500/30 font-sans">
      
      {/* Sidebar Component */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onNavigate={onNavigate} 
        user={user} 
        logout={logout}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content Area */}
      <main 
        className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden transition-all duration-300"
        style={{ marginLeft: isSidebarCollapsed ? '80px' : '280px' }}
      >
        {/* Top Navigation Component */}
        <Topbar onNavigate={onNavigate} />

        {/* Dynamic Page Content with Framer Motion Transitions */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -15 }}
               transition={{ duration: 0.3, ease: 'easeOut' }}
               className="h-full"
             >
                {renderContent()}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>
      
    </div>
  );
}

export default AdminDashboard;
