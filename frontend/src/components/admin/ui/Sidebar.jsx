import React from 'react';
import { LayoutDashboard, Calendar, Car, MapPin } from 'lucide-react';

const TABS = [
  { id: 'stats', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { id: 'reservations', label: 'Réservations', icon: Calendar },
  { id: 'cars', label: 'Flotte', icon: Car },
  { id: 'destinations', label: 'Destinations', icon: MapPin },
];

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="bg-white border-r border-gray-100 flex-col hidden lg:flex h-screen z-40 fixed shadow-[1px_0_10px_rgba(0,0,0,0.02)] w-[260px]">
      <div className="py-10 px-6">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-6 ml-2">Menu Principal</p>
        <nav className="space-y-1.5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-[1rem] text-sm font-semibold transition-all relative overflow-hidden ${
                activeTab === id 
                  ? 'bg-red-50 text-red-600' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {activeTab === id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-red-500 rounded-r-md" />
              )}
              <Icon size={20} className={activeTab === id ? 'text-red-500' : 'text-gray-400'} strokeWidth={activeTab === id ? 2.5 : 2} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
