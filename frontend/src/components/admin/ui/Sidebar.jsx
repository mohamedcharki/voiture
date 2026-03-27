import React, { useState } from 'react';
import { LayoutDashboard, Car, Calendar, MapPin, LogOut, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 'stats', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { id: 'reservations', label: 'Réservations', icon: Calendar },
  { id: 'cars', label: 'Flotte', icon: Car },
  { id: 'destinations', label: 'Destinations', icon: MapPin },
];

function Sidebar({ activeTab, setActiveTab, onNavigate, user, logout }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => { logout(); onNavigate('home'); };

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? '80px' : '280px' }}
      className="bg-[#111827] border-r border-[#1f2937] flex-col hidden lg:flex fixed h-screen z-40 transition-all duration-300"
    >
      {/* Logo Area */}
      <div className="p-6 flex items-center justify-between border-b border-[#1f2937] h-20 shrink-0">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
             <motion.button 
               initial={{ opacity: 0, w: 0 }}
               animate={{ opacity: 1, w: 'auto' }}
               exit={{ opacity: 0, w: 0 }}
               onClick={() => onNavigate('home')} 
               className="text-2xl font-bold font-playfair text-white text-left group whitespace-nowrap overflow-hidden"
             >
               LUX<span className="text-red-500 group-hover:text-red-400 transition-colors">CAR</span>
             </motion.button>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1.5 rounded-lg bg-[#1f2937] text-gray-400 hover:text-white transition-colors flex-shrink-0 mx-auto"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      {/* Navigation Area */}
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto w-full overflow-x-hidden">
        {!isCollapsed && <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-4">Menu Principal</p>}
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            title={isCollapsed ? label : ''}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 relative group overflow-hidden ${
              activeTab === id 
                ? 'bg-red-500/10 text-red-500' 
                : 'text-gray-400 hover:bg-[#1f2937] hover:text-white'
            }`}
          >
            {activeTab === id && (
              <motion.div layoutId="activeTabIndicator" className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-r-md" />
            )}
            <Icon size={20} className={`shrink-0 ${activeTab === id ? 'text-red-500' : 'text-gray-500 group-hover:text-gray-300'}`} strokeWidth={activeTab === id ? 2.5 : 2} />
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -10 }}
                  className="whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </nav>
      
      {/* User Profile Area */}
      <div className="p-4 border-t border-[#1f2937] bg-[#0f172a]/50 shrink-0">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-4`}>
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg border border-white/10 shrink-0">
               {user?.name?.charAt(0).toUpperCase()}
             </div>
             {!isCollapsed && (
               <div className="overflow-hidden">
                 <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                 <p className="text-xs text-green-400 font-medium flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> En ligne</p>
               </div>
             )}
           </div>
           {!isCollapsed && (
             <button className="text-gray-500 hover:text-white p-2 rounded-lg hover:bg-[#1f2937] transition-all shrink-0">
               <Settings size={18} />
             </button>
           )}
        </div>
        <button 
          onClick={handleLogout} 
          title={isCollapsed ? 'Déconnexion' : ''}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-center gap-2'} bg-transparent hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-transparent hover:border-red-500/20 text-sm font-semibold transition-all px-4 py-2.5 rounded-xl group`}
        >
          <LogOut size={18} className="group-hover:text-red-400 transition-colors shrink-0" />
          {!isCollapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
