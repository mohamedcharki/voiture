import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, Check, X, Car, TrendingUp, DollarSign, Activity, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import api from '../../config/api';
import Skeleton from './ui/Skeleton';

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6366F1'];

function StatsTab() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get('/reservations/stats');
      setStats(data.stats);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="w-full h-24" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-[350px]" />
          <Skeleton className="h-[350px]" />
        </div>
      </div>
    );
  }

  const kpis = [
    { label: 'Revenu Mensuel', value: `${stats?.revenue?.monthly?.toLocaleString('fr-MA') || 0} DH`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', trend: '+12%', trendUp: true },
    { label: 'Revenu Hebdo', value: `${stats?.revenue?.weekly?.toLocaleString('fr-MA') || 0} DH`, icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', trend: '+4.3%', trendUp: true },
    { label: 'Réservations (Total)', value: stats?.totalReservations || 0, icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', trend: '+18', trendUp: true },
    { label: 'Voitures Disponibles', value: `${stats?.availableCars || 0} / ${stats?.totalCars || 0}`, icon: Car, color: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/20', trend: '-2', trendUp: false },
  ];

  const pieData = [
    { name: 'Confirmées', value: stats?.confirmedReservations || 0, color: '#10B981' },
    { name: 'En attente', value: stats?.pendingReservations || 0, color: '#F59E0B' },
    { name: 'Annulées', value: stats?.cancelledReservations || 0, color: '#EF4444' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-2xl">
          <p className="text-gray-300 mb-2 font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'Revenu' ? `${entry.value} DH` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#111827] border border-[#1f2937] p-6 rounded-2xl backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white font-playfair mb-1">Aperçu des performances</h2>
          <p className="text-sm text-gray-400">Analysez vos indicateurs clés en temps réel.</p>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          <Activity className="text-yellow-400 animate-pulse" size={18} />
          <span className="text-sm font-medium text-white">Live</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className={`bg-[#111827] border border-[#1f2937] p-6 rounded-2xl backdrop-blur-sm hover:bg-[#1f2937]/50 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300 group`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.border} border group-hover:scale-110 transition-transform`}>
                <kpi.icon className={kpi.color} size={24} />
              </div>
              <span className={`text-[11px] font-bold px-2 py-1 rounded-full border ${kpi.trendUp ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                {kpi.trendUp ? '↑' : '↓'} {kpi.trend}
              </span>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{kpi.value}</h3>
              <p className="text-sm font-medium text-gray-400">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Area Chart - Timeline */}
        <div className="lg:col-span-2 bg-[#111827] border border-[#1f2937] p-6 rounded-2xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-6">Évolution (7 derniers jours)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.timeline || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val} DH`} />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenu" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Line yAxisId="right" type="monotone" dataKey="count" name="Réservations" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Pie Chart */}
        <div className="bg-[#111827] border border-[#1f2937] p-6 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center relative">
          <h3 className="text-lg font-bold text-white mb-2 self-start w-full">Répartition des statuts</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1500}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                    return percent > 0 ? (
                      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    ) : null;
                  }}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      className="hover:opacity-80 transition-opacity duration-300 cursor-pointer drop-shadow-md" 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }} 
                  itemStyle={{ color: '#fff' }}
                  cursor={{ fill: 'transparent' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Custom Legend */}
          <div className="mt-6 w-full flex flex-col gap-3">
            {pieData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center justify-between w-full px-2">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: entry.color }}></span>
                  <span className="text-sm font-medium text-gray-300">{entry.name}</span>
                </div>
                <span className="text-sm font-bold text-white">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Cars Bar Chart */}
        <div className="lg:col-span-1 bg-[#111827] border border-[#1f2937] p-6 rounded-2xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-6">Voitures les plus louées</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.topCars || []} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.75rem' }}
                />
                <Bar dataKey="count" name="Locations" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-[#111827] border border-[#1f2937] p-6 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Activité Récente</h3>
            <button className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
              Voir tout <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {stats?.recentActivity?.length > 0 ? stats.recentActivity.map((activity) => (
              <div key={activity._id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0 border border-gray-600">
                  {activity.user?.image ? (
                    <img src={activity.user.image} alt={activity.user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-gray-300">{activity.user?.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {activity.user?.name || 'Client inconnu'} <span className="text-gray-400 font-normal">a réservé</span> {activity.car?.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {new Date(activity.createdAt).toLocaleDateString('fr-MA', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    activity.status === 'confirmée' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    activity.status === 'en_attente' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    activity.status === 'annulée' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {activity.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500">Aucune activité récente.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default StatsTab;
