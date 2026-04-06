import React from 'react';
import { Calendar, Car, Plus, PieChart as PieIcon, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const DarkAdminDashboard = () => {
  const stats = {
    totalReservations: "2",
    newReservations: "1 + 2",
    availableCars: "9 / 9",
    statusDistribution: [
      { label: 'Confirmées', value: 75, color: 'bg-cyan-500', glow: 'shadow-[0_0_15px_rgba(34,211,238,0.5)]' },
      { label: 'En attente', value: 15, color: 'bg-gray-500', glow: 'shadow-[0_0_15px_rgba(156,163,175,0.3)]' },
      { label: 'Annulées', value: 10, color: 'bg-red-900/50', glow: '' },
    ]
  };

  const Card = ({ title, value, icon: Icon, color = "cyan" }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1E1E1E] border border-[#2A2A2A] p-6 rounded-2xl flex flex-col gap-4 backdrop-blur-sm relative overflow-hidden group"
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl bg-black/40 border border-[#333333] group-hover:border-${color}-500/50 transition-colors`}>
          <Icon className={`text-${color}-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]`} size={24} />
        </div>
      </div>
      <div>
        <p className="text-gray-500 font-medium text-sm mb-1 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold text-gray-200 tracking-tight">{value}</h3>
      </div>
      {/* Subtle background glow effect */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-${color}-500/5 blur-[60px] rounded-full group-hover:bg-${color}-500/10 transition-all`} />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-400 p-6 md:p-10 font-sans selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header - Minimalist */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight">Tableau de Bord</h1>
          <p className="text-gray-600 text-sm">Gestion des réservations et de la flotte</p>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            title="Total Réservations" 
            value={stats.totalReservations} 
            icon={Calendar} 
            color="cyan" 
          />
          <Card 
            title="Nouvelles Réservations" 
            value={stats.newReservations} 
            icon={Plus} 
            color="gray" 
          />
          <Card 
            title="Voitures Disponibles" 
            value={stats.availableCars} 
            icon={Car} 
            color="cyan" 
          />
        </div>

        {/* Bottom Section: Status Distribution */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1E1E1E] border border-[#2A2A2A] p-8 rounded-3xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-cyan-950/30 rounded-lg border border-cyan-800/30">
               <PieIcon className="text-cyan-400" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-200">Répartition des statuts</h2>
          </div>

          <div className="space-y-6">
            {stats.statusDistribution.map((status, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-500 uppercase tracking-widest">{status.label}</span>
                  <span className="text-gray-300">{status.value}%</span>
                </div>
                <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-[#2A2A2A]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${status.value}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 + (idx * 0.1) }}
                    className={`h-full ${status.color} ${status.glow} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Minimalist Legend/Info */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#2A2A2A]">
             <div className="flex items-center gap-2">
                <Activity size={14} className="text-cyan-500 animate-pulse" />
                <span className="text-xs text-gray-600 uppercase tracking-tighter">Live Updates</span>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DarkAdminDashboard;
