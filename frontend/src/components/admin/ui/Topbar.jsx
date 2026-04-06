import React, { useState } from 'react';
import { Search, Bell, Settings, LogOut, User, CheckCircle2, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

function Topbar({ onNavigate, isDarkMode, toggleTheme, adminData, onOpenSettings }) {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => { logout(); onNavigate('home'); };

  return (
    <header className="sticky top-0 z-30 h-[72px] bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl border-b border-gray-200 dark:border-[#1f2937] px-6 lg:px-8 flex items-center justify-between shadow-sm transition-colors duration-300 hidden md:flex">
      
      {/* Search Bar */}
      <div className="relative w-full max-w-md group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Rechercher (ex: Réservation #1024)..." 
          className="w-full pl-11 pr-4 py-2 bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-[#1f2937] rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all shadow-inner"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex gap-1">
           <kbd className="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-[#374151] text-gray-400 px-1.5 py-0.5 rounded text-[10px] font-mono shadow-sm">⌘K</kbd>
        </div>
      </div>
      
      {/* Top Right Actions */}
      <div className="flex items-center gap-4 relative">
        
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl transition-all text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-[#1f2937]/50"
          title="Basculer le thème"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            onBlur={() => setTimeout(() => setShowNotifications(false), 200)}
            className={`relative p-2.5 rounded-xl transition-all ${showNotifications ? 'bg-gray-100 dark:bg-[#1f2937] text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1f2937]/50'}`}
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
                className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1f2937] rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden z-50 origin-top-right"
              >
                <div className="p-4 border-b border-gray-100 dark:border-[#1f2937] flex justify-between items-center bg-gray-50 dark:bg-[#0f172a]/50">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Notifications</h3>
                  <span className="text-[10px] font-bold bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">2 nouvelles</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <button className="w-full text-left p-4 border-b border-gray-100 dark:border-[#1f2937] hover:bg-gray-50 dark:hover:bg-[#1f2937]/50 transition-colors flex gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 flex items-center justify-center shrink-0">
                      <Bell size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">Nouvelle réservation en attente</p>
                      <p className="text-xs text-gray-500 mt-0.5">Il y a 10 min</p>
                    </div>
                  </button>
                  <button className="w-full text-left p-4 border-b border-gray-100 dark:border-[#1f2937] hover:bg-gray-50 dark:hover:bg-[#1f2937]/50 transition-colors flex gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-500 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">Réservation #1024 terminée</p>
                      <p className="text-xs text-gray-500 mt-0.5">Il y a 2 heures</p>
                    </div>
                  </button>
                </div>
                <div className="p-3 text-center bg-gray-50 dark:bg-[#0f172a]/50">
                  <button className="text-sm font-medium text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">Tout marquer comme lu</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative h-full flex items-center border-l border-gray-200 dark:border-[#1f2937] pl-4">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            onBlur={() => setTimeout(() => setShowProfile(false), 200)}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-[#1f2937]/50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-white overflow-hidden shadow-md border border-white/10 shrink-0">
              {adminData?.image ? (
                <img src={adminData.image} alt={adminData.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-sm">{adminData?.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">{adminData?.name}</p>
              <p className="text-xs text-gray-500 mt-1 leading-none">{adminData?.role || 'Admin'}</p>
            </div>
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-14 mt-2 w-56 bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1f2937] rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden z-50 origin-top-right"
              >
                <div className="p-4 border-b border-gray-100 dark:border-[#1f2937] bg-gray-50 dark:bg-[#0f172a]/50">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{adminData?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{adminData?.email}</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={onOpenSettings}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1f2937] transition-colors"
                  >
                    <User size={16} /> Mon Profil
                  </button>
                  <button 
                    onClick={onOpenSettings}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1f2937] transition-colors"
                  >
                    <Settings size={16} /> Paramètres
                  </button>
                </div>
                <div className="p-2 border-t border-gray-100 dark:border-[#1f2937]">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
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
