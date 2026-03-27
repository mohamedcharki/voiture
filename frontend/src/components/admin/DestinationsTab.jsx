import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Plus, Check, Edit2, Trash2 } from 'lucide-react';
import api from '../../config/api';
import Skeleton from './ui/Skeleton';

function DestinationsTab() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', desc: '', image: '', isActive: true });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [editId, setEditId] = useState(null);

  const fetchDestinations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/destinations?all=true');
      setDestinations(data.destinations || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDestinations(); }, [fetchDestinations]);

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await api.put(`/destinations/${id}`, { isActive: !currentStatus });
      fetchDestinations();
    } catch (e) {
      alert('Erreur lors de la mise à jour.');
    }
  };

  const handleAddDestination = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/destinations/${editId}`, form);
      } else {
        await api.post('/destinations', form);
      }
      setShowForm(false);
      setEditId(null);
      setForm({ name: '', desc: '', image: '', isActive: true });
      fetchDestinations();
    } catch (e) {
      alert(e.response?.data?.message || `Erreur lors de l'enregistrement.`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirmer la suppression de cette destination ?')) return;
    setDeleting(id);
    try {
      await api.delete(`/destinations/${id}`);
      fetchDestinations();
    } catch (e) {
      alert('Erreur lors de la suppression.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center bg-[#111827] border border-[#1f2937] p-6 rounded-2xl backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white font-playfair mb-1">Destinations</h2>
          <p className="text-sm text-gray-400">Gérez les emplacements disponibles.</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ name: '', desc: '', image: '', isActive: true }); }}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-red-500/20"
        >
          <Plus size={18} /> <span className="hidden sm:inline">Ajouter</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddDestination} className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl animate-fade-in-up md:w-2/3 xl:w-1/2">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-[#1f2937] pb-4">{editId ? 'Modifier la destination' : 'Nouvelle destination'}</h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Nom de la ville *</label>
              <input type="text" name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="w-full px-4 py-3 bg-[#0f172a] border border-[#1f2937] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="ex: Tanger" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Description courte *</label>
              <textarea name="desc" value={form.desc} onChange={(e) => setForm({...form, desc: e.target.value})} required className="w-full px-4 py-3 bg-[#0f172a] border border-[#1f2937] rounded-xl text-white h-24 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none" placeholder="Description attractive..." />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">URL de l'image *</label>
              <input type="url" name="image" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} required className="w-full px-4 py-3 bg-[#0f172a] border border-[#1f2937] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="https://..." />
              {form.image && (
                <div className="mt-4 h-36 rounded-xl overflow-hidden border border-[#1f2937] relative group">
                  <img src={form.image} alt="Aperçu" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => e.target.style.display = 'none'} />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-semibold flex items-center gap-2"><MapPin/> Aperçu</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-8 mt-6 border-t border-[#1f2937]">
            <button type="submit" disabled={saving} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
              {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Check size={18} /> Enregistrer</>}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-[#1f2937] hover:bg-gray-700 border border-[#374151] text-white font-semibold py-3 px-8 rounded-xl transition-all">
              Annuler
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Skeleton className="w-full h-80" />
          <Skeleton className="w-full h-80" />
          <Skeleton className="w-full h-80" />
          <Skeleton className="w-full h-80" />
        </div>
      ) : destinations.length === 0 ? (
        <div className="text-center bg-[#111827] rounded-2xl border border-[#1f2937] py-16">
          <div className="w-16 h-16 bg-[#1f2937] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#374151]">
            <MapPin size={32} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Aucune destination</h3>
          <p className="text-gray-400">Aucune ville n'a été ajoutée pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations.map(dest => (
            <div key={dest._id} className="bg-[#111827] border border-[#1f2937] rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-300 group backdrop-blur-sm shadow-xl hover:shadow-red-500/5">
              <div className="h-40 bg-[#0f172a] relative overflow-hidden">
                 <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
                 
                 <div className="absolute top-4 left-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg backdrop-blur-md border ${dest.isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                    {dest.isActive ? 'Active' : 'Désactivée'}
                  </span>
                 </div>
                 
                 <div className="absolute bottom-4 left-4 right-4">
                   <h3 className="font-bold text-white text-xl flex items-center gap-2">
                     <MapPin size={18} className="text-red-500" />
                     {dest.name}
                   </h3>
                 </div>
              </div>
              <div className="p-5">
                <p className="text-gray-400 text-sm line-clamp-2 h-10 mb-4">{dest.desc}</p>
                <div className="flex gap-2 pt-4 border-t border-[#1f2937]">
                  <button onClick={() => { setForm({ name: dest.name, desc: dest.desc, image: dest.image, isActive: dest.isActive }); setEditId(dest._id); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex-1 text-xs text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 py-2 rounded-lg border border-blue-500/30 flex items-center justify-center gap-1 transition font-semibold">
                    <Edit2 size={14} /> Éditer
                  </button>
                  <button onClick={() => handleToggleActive(dest._id, dest.isActive)} className="flex-1 text-xs text-gray-300 bg-[#1f2937] hover:bg-[#374151] py-2 rounded-lg border border-[#374151] transition font-semibold">
                    {dest.isActive ? 'Désactiver' : 'Activer'}
                  </button>
                  <button disabled={deleting === dest._id} onClick={() => handleDelete(dest._id)} className="w-[40px] text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 py-2 rounded-lg transition border border-red-500/30 flex items-center justify-center disabled:opacity-50">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DestinationsTab;
