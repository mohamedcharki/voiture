import React from 'react';
import { DollarSign, TrendingUp, Calendar, Car } from 'lucide-react';
import { AreaChart, Area, CartesianGrid, ResponsiveContainer } from 'recharts';

const StatsTab = () => {
  const chartData = [
    { name: 'Jour 1', value: 1050 },
    { name: 'Jour 2', value: 1100 },
    { name: 'Jour 3', value: 1300 },
    { name: 'Jour 4', value: 1400 },
    { name: 'Jour 5', value: 1350 },
    { name: 'Jour 6', value: 1150 },
    { name: 'Jour 7', value: 900 }, 
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="bg-white p-8 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 mb-1 tracking-tight">Aperçu des performances</h1>
          <p className="text-[15px] text-gray-500">Analysez vos indicateurs clés en temps réel.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-[1rem]">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
          <span className="text-sm font-medium text-gray-600">Live</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-green-50/50 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
              <DollarSign size={24} strokeWidth={2} />
            </div>
            <span className="bg-green-50 text-green-600 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">↑ +12%</span>
          </div>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">1.615 <span className="text-xl font-bold">DH</span></h3>
          <p className="text-[13px] text-gray-500 font-medium mt-1">Revenu Mensuel</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50/50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <TrendingUp size={24} strokeWidth={2} />
            </div>
            <span className="bg-green-50 text-green-600 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">↑ +4.3%</span>
          </div>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">285 <span className="text-xl font-bold">DH</span></h3>
          <p className="text-[13px] text-gray-500 font-medium mt-1">Revenu Hebdo</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-50/50 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
              <Calendar size={24} strokeWidth={2} />
            </div>
            <span className="bg-green-50 text-green-600 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">↑ +2</span>
          </div>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">2</h3>
          <p className="text-[13px] text-gray-500 font-medium mt-1">Réservations (Total)</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-50/50 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
              <Car size={24} strokeWidth={2} />
            </div>
            <span className="bg-green-50 text-green-600 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">↑ Max</span>
          </div>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">9 / 9</h3>
          <p className="text-[13px] text-gray-500 font-medium mt-1">Voitures Disponibles</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        
        {/* Evolution Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col">
          <h2 className="text-[17px] font-bold text-gray-900 mb-8">Évolution (7 derniers jours)</h2>
          
          <div className="h-[220px] w-full relative flex-1">
            {/* Custom Fake Y-Axis to match picture perfectly */}
            <div className="absolute left-0 top-0 h-[180px] flex flex-col justify-between z-10 w-12 pt-2">
              <div className="text-[11px] font-semibold text-gray-400 text-center leading-tight">1400<br/>DH</div>
              <div className="text-[11px] font-semibold text-gray-400 text-center leading-tight">1050<br/>DH</div>
            </div>
            
            {/* Custom Fake Right-Axis mapping to 1 and 0.75 */}
            <div className="absolute right-0 top-0 h-[180px] flex flex-col justify-between z-10 w-12 pt-2">
              <div className="text-[11px] font-semibold text-emerald-500 text-center leading-tight">1</div>
              <div className="text-[11px] font-semibold text-emerald-500 text-center leading-tight">0.75</div>
            </div>

            {/* Dotted Lines for visual match */}
            <div className="absolute left-14 right-14 top-[18px] border-t-2 border-dashed border-gray-200 z-0"></div>
            <div className="absolute left-14 right-14 bottom-[38px] border-t-2 border-dashed border-gray-200 z-0"></div>

            <div className="pl-14 pr-14 h-[180px] relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f3f4f6" stopOpacity={1}/>
                      <stop offset="95%" stopColor="#f3f4f6" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#d1d5db" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    dot={false}
                    activeDot={{ r: 6, fill: "#fff", stroke: "#d1d5db", strokeWidth: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Répartition des statuts */}
        <div className="bg-white p-8 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col">
          <h2 className="text-[17px] font-bold text-gray-900 mb-8 items-start">Répartition des statuts</h2>
          <div className="flex-1 flex flex-col items-center justify-center gap-10">
            
            <div className="text-center w-full">
              <span className="text-[52px] font-black text-gray-900 leading-none">82<span className="text-3xl ml-1">%</span></span>
              <p className="text-[13px] font-medium text-gray-400 mt-2">Taux d'occupation</p>
            </div>
            
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-gray-900 w-[82%] rounded-full"></div>
            </div>
            
            <div className="text-center w-full">
              <span className="text-[26px] font-bold text-gray-900 leading-none">16°C</span>
              <p className="text-[13px] font-medium text-gray-400 mt-2">Météo actuelle</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default StatsTab;
