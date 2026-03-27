import React, { useState } from 'react';
import { Search, Bell, Settings, LogOut, User, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

function Topbar({ onNavigate }) {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => { logout(); onNavigate('home'); };

  return (
    <header className="sticky top-0 z-30 h-[72px] bg-[#0f172a]/90 backdrop-blur-xl border-b border-[#1f2937] px-6 lg:px-8 flex items-center justify-between shadow-sm hidden md:flex transition-all duration-300">
      
      {/* Search Bar */}
      <div className="relative w-full max-w-md group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Rechercher (ex: Réservation #1024)..." 
          className="w-full pl-11 pr-4 py-2 bg-[#111827] border border-[#1f2937] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all shadow-inner"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex gap-1">
           <kbd className="bg-[#1f2937] border border-[#374151] text-gray-400 px-1.5 py-0.5 rounded text-[10px] font-mono">⌘K</kbd>
        </div>
      </div>
      
      {/* Top Right Actions */}
      <div className="flex items-center gap-4 relative">
        
        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            onBlur={() => setTimeout(() => setShowNotifications(false), 200)}
            className={`relative p-2.5 rounded-xl transition-all ${showNotifications ? 'bg-[#1f2937] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1f2937]/50'}`}
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-[#0f172a]"></span>
            </span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-80 bg-[#111827] border border-[#1f2937] rounded-2xl shadow-2xl overflow-hidden z-50 origin-top-right"
              >
                <div className="p-4 border-b border-[#1f2937] flex justify-between items-center bg-[#0f172a]/50">
                  <h3 className="text-sm font-bold text-white">Notifications</h3>
                  <span className="text-[10px] font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">2 nouvelles</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <button className="w-full text-left p-4 border-b border-[#1f2937] hover:bg-[#1f2937]/50 transition-colors flex gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center shrink-0">
                      <Bell size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">Nouvelle réservation en attente</p>
                      <p className="text-xs text-gray-500 mt-0.5">Il y a 10 min</p>
                    </div>
                  </button>
                  <button className="w-full text-left p-4 border-b border-[#1f2937] hover:bg-[#1f2937]/50 transition-colors flex gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">Réservation #1024 terminée</p>
                      <p className="text-xs text-gray-500 mt-0.5">Il y a 2 heures</p>
                    </div>
                  </button>
                </div>
                <div className="p-3 text-center bg-[#0f172a]/50">
                  <button className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors">Tout marquer comme lu</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative h-full flex items-center border-l border-[#1f2937] pl-4">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            onBlur={() => setTimeout(() => setShowProfile(false), 200)}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-[#1f2937]/50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md border border-white/10 shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-white leading-none">{user?.name}</p>
              <p className="text-xs text-gray-500 mt-1 leading-none">Admin</p>
            </div>
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-14 mt-2 w-56 bg-[#111827] border border-[#1f2937] rounded-2xl shadow-2xl overflow-hidden z-50 origin-top-right"
              >
                <div className="p-4 border-b border-[#1f2937] bg-[#0f172a]/50">
                  <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1f2937] transition-colors">
                    <User size={16} /> Mon Profil
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1f2937] transition-colors">
                    <Settings size={16} /> Paramètres
                  </button>
                </div>
                <div className="p-2 border-t border-[#1f2937]">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={16} /> Déconnexion
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}

export default Topbar;
