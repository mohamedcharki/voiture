import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Calendar, Check, X, Clock, RefreshCw, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../config/api';
import Skeleton from './ui/Skeleton';
import Badge from './ui/Badge';

const STATUS_LABELS = {
  en_attente: { label: 'En attente', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  confirmée: { label: 'Confirmée', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  annulée: { label: 'Annulée', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  terminée: { label: 'Terminée', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
};

function StatusBadge({ status }) {
  const s = STATUS_LABELS[status] || { label: status, color: 'bg-gray-500/20 text-gray-400' };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${s.color}`}>{s.label}</span>;
}

function ReservationsTab() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [updating, setUpdating] = useState(null);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/reservations');
      setReservations(data.reservations || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReservations(); }, [fetchReservations]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await api.put(`/reservations/${id}/status`, { status });
      fetchReservations();
    } catch (e) {
      alert(e.response?.data?.message || 'Erreur lors de la mise à jour.');
    } finally {
      setUpdating(null);
    }
  };

  const filteredReservations = useMemo(() => {
    let filtered = reservations;
    if (filterStatus) {
      filtered = filtered.filter(r => r.status === filterStatus);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.user?.name?.toLowerCase().includes(q) || 
        r.car?.name?.toLowerCase().includes(q) || 
        r.car?.brand?.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [reservations, filterStatus, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage) || 1;
  const currentReservations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredReservations.slice(start, start + itemsPerPage);
  }, [filteredReservations, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [filterStatus, searchQuery]);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-[#111827] border border-[#1f2937] p-6 rounded-2xl backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white font-playfair mb-1">Réservations</h2>
          <p className="text-sm text-gray-400">Gérez les réservations de vos clients.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Rechercher client ou voiture..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0f172a] border border-[#1f2937] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-sans"
            />
          </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 sm:flex-none bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all hover:bg-gray-700"
          >
            <option value="">Tous les statuts</option>
            {Object.entries(STATUS_LABELS).map(([val, { label }]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          <button onClick={fetchReservations} className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded-xl transition-all shadow-sm">
            <RefreshCw size={18} />
          </button>
        </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
        </div>
      ) : reservations.length === 0 ? (
        <div className="text-center bg-[#111827] rounded-2xl border border-[#1f2937] py-16">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
            <Calendar size={32} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Aucune réservation</h3>
          <p className="text-gray-400">Il n'y a pas de réservations correspondant à ce statut.</p>
        </div>
      ) : (
        <div className="bg-[#111827] border border-[#1f2937] rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0f172a] border-b border-[#1f2937] text-xs uppercase tracking-wider text-gray-400">
                  <th className="p-4 font-semibold w-1/4">Client</th>
                  <th className="p-4 font-semibold w-1/4">Véhicule & Dates</th>
                  <th className="p-4 font-semibold text-center w-[15%]">Montant</th>
                  <th className="p-4 font-semibold text-center w-[15%]">Statut</th>
                  <th className="p-4 font-semibold text-right w-[20%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2937]">
                {currentReservations.map((r) => (
                  <tr key={r._id} className="hover:bg-[#1f2937]/50 transition-colors group">
                    {/* Client Info */}
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0">
                          <span className="font-bold text-gray-300">{r.user?.name?.charAt(0) || 'C'}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">{r.user?.name || 'Client inconnu'}</p>
                          <p className="text-xs text-gray-400 truncate w-32 md:w-48" title={r.user?.email}>{r.user?.email}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{r.user?.phone}</p>
                        </div>
                      </div>
                    </td>

                    {/* Car & Dates */}
                    <td className="p-4 align-middle">
                      <p className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                        {r.car?.name || 'Voiture inconnue'}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                        <Calendar size={12} className="text-yellow-400" />
                        <span>{new Date(r.startDate).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short' })}</span>
                        <span className="text-gray-600">→</span>
                        <span>{new Date(r.endDate).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short' })}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4 align-middle text-center">
                      <p className="text-sm font-bold text-white bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1.5 rounded-lg inline-block">
                        {r.totalPrice?.toLocaleString('fr-MA')} DH
                      </p>
                    </td>

                    {/* Status */}
                    <td className="p-4 align-middle text-center">
                      <StatusBadge status={r.status} />
                    </td>

                    {/* Actions */}
                    <td className="p-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        {r.status === 'en_attente' && (
                          <>
                            <button
                              onClick={() => updateStatus(r._id, 'confirmée')}
                              disabled={updating === r._id}
                              className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white flex items-center justify-center transition disabled:opacity-50 border border-green-500/30"
                              title="Confirmer"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => updateStatus(r._id, 'annulée')}
                              disabled={updating === r._id}
                              className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition disabled:opacity-50 border border-red-500/30"
                              title="Annuler"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                        {r.status === 'confirmée' && (
                          <button
                            onClick={() => updateStatus(r._id, 'terminée')}
                            disabled={updating === r._id}
                            className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition disabled:opacity-50 flex items-center gap-1 shadow-sm"
                          >
                            <Check size={14} /> Terminer
                          </button>
                        )}
                        {['annulée', 'terminée'].includes(r.status) && (
                           <span className="text-xs text-gray-600 italic">Aucune action</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#1f2937] bg-[#0f172a]/50">
              <span className="text-sm text-gray-400">
                Affichage {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredReservations.length)} sur {filteredReservations.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-[#374151] bg-[#111827] text-gray-400 hover:text-white hover:bg-[#1f2937] disabled:opacity-50 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors border ${
                        currentPage === page
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-[#111827] text-gray-400 border-[#374151] hover:bg-[#1f2937] hover:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-[#374151] bg-[#111827] text-gray-400 hover:text-white hover:bg-[#1f2937] disabled:opacity-50 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ReservationsTab;
