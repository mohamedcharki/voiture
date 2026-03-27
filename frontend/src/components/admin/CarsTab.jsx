import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Car, Plus, Trash2, Edit2, Search } from 'lucide-react';
import api from '../../config/api';
import Skeleton from './ui/Skeleton';

function CarsTab() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', brand: '', price: '', category: 'berline', fuel: 'essence', transmission: 'manuelle', seats: 5, image: '' });
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/cars?all=true&limit=1000');
      setCars(data.cars || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCars(); }, [fetchCars]);

  const handleToggleAvailability = async (id, currentStatus) => {
    try {
      await api.put(`/cars/${id}`, { availability: !currentStatus });
      fetchCars();
    } catch (e) {
      alert(e.response?.data?.message || 'Erreur lors de la mise à jour de la disponibilité.');
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), seats: Number(form.seats) };
      if (editId) {
        await api.put(`/cars/${editId}`, payload);
      } else {
        await api.post('/cars', payload);
      }
      setShowForm(false);
      setEditId(null);
      setForm({ name: '', brand: '', price: '', category: 'berline', fuel: 'essence', transmission: 'manuelle', seats: 5, image: '' });
      fetchCars();
    } catch (e) {
      alert(e.response?.data?.message || 'Erreur lors de l\'enregistrement.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirmer la suppression de cette voiture ?')) return;
    setDeleting(id);
    try {
      await api.delete(`/cars/${id}`);
      fetchCars();
    } catch (e) {
      alert(e.response?.data?.message || 'Erreur lors de la suppression.');
    } finally {
      setDeleting(null);
    }
  };

  const filteredCars = useMemo(() => {
    if (!searchQuery.trim()) return cars;
    const q = searchQuery.toLowerCase();
    return cars.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.brand.toLowerCase().includes(q)
    );
  }, [cars, searchQuery]);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#111827] border border-[#1f2937] p-6 rounded-2xl backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white font-playfair mb-1">Flotte Automobile</h2>
          <p className="text-sm text-gray-400">Gérez les véhicules de votre parc.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Rechercher un modèle ou marque..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0f172a] border border-[#1f2937] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-sans"
            />
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ name: '', brand: '', price: '', category: 'berline', fuel: 'essence', transmission: 'manuelle', seats: 5, image: '' }); }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold px-5 py-2 rounded-xl transition-all shadow-lg shadow-red-500/20 whitespace-nowrap"
          >
            <Plus size={18} /> <span className="hidden sm:inline">Ajouter</span>
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAddCar} className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl animate-fade-in-up">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-[#1f2937] pb-4">{editId ? 'Modifier la voiture' : 'Nouvelle voiture'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'name', label: 'Modèle *', placeholder: 'ex: Classe S' },
              { name: 'brand', label: 'Marque *', placeholder: 'ex: Mercedes' },
              { name: 'price', label: 'Prix / jour (DH) *', placeholder: '1500', type: 'number' },
              { name: 'seats', label: 'Nombre de places', placeholder: '5', type: 'number' },
              { name: 'image', label: 'URL de l\'image (Optionnel)', placeholder: 'https://...', colSpan: true },
            ].map(({ name, label, placeholder, type = 'text', colSpan }) => (
              <div key={name} className={colSpan ? 'md:col-span-2 lg:col-span-3' : ''}>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 bg-[#0f172a] border border-[#1f2937] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-['Inter']"
                />
              </div>
            ))}
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Catégorie</label>
              <select name="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 bg-[#0f172a] border border-[#1f2937] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all">
                {['économique', 'berline', 'SUV', 'sport', 'luxe', 'utilitaire'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Carburant</label>
              <select name="fuel" value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value })} className="w-full px-4 py-3 bg-[#0f172a] border border-[#1f2937] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all">
                {['essence', 'diesel', 'électrique', 'hybride'].map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Transmission</label>
              <select name="transmission" value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })} className="w-full px-4 py-3 bg-[#0f172a] border border-[#1f2937] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all">
                {['manuelle', 'automatique'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-4 pt-8 mt-4 border-t border-[#1f2937]">
            <button type="submit" disabled={saving} className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
              {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Plus size={18} /> {editId ? 'Mettre à jour' : 'Ajouter'}</>}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-[#1f2937] hover:bg-gray-700 border border-[#374151] text-white font-semibold py-3 px-8 rounded-xl transition-all">
              Annuler
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <Skeleton className="w-full h-80" />
          <Skeleton className="w-full h-80" />
          <Skeleton className="w-full h-80" />
        </div>
      ) : filteredCars.length === 0 ? (
        <div className="text-center bg-[#111827] rounded-2xl border border-[#1f2937] py-16">
          <div className="w-16 h-16 bg-[#1f2937] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#374151]">
            <Car size={32} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Aucun véhicule trouvé</h3>
          <p className="text-gray-400">Essayez de modifier votre recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car._id} className="bg-[#111827] border border-[#1f2937] rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-300 group backdrop-blur-sm shadow-xl hover:shadow-red-500/5">
              <div className="h-48 bg-[#0f172a] overflow-hidden relative">
                {car.image ? (
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-700"><Car size={48} /></div>
                )}
                {/* Gradient overlay for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90"></div>
                
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border ${car.availability ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                  {car.availability ? 'Disponible' : 'Indisponible'}
                </span>
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <h3 className="font-bold text-white text-xl">{car.name}</h3>
                    <p className="text-sm text-gray-300">{car.brand}</p>
                  </div>
                  <span className="text-red-400 font-bold text-lg">{car.price} DH/j</span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="bg-[#1f2937] border border-[#374151] text-gray-300 text-xs px-2.5 py-1 rounded-lg capitalize">{car.category}</span>
                  <span className="bg-[#1f2937] border border-[#374151] text-gray-300 text-xs px-2.5 py-1 rounded-lg capitalize">{car.fuel}</span>
                  <span className="bg-[#1f2937] border border-[#374151] text-gray-300 text-xs px-2.5 py-1 rounded-lg capitalize">{car.transmission}</span>
                </div>
                
                <div className="flex items-center gap-2 pt-4 border-t border-[#1f2937]">
                  <button
                    onClick={() => {
                      setForm({ ...car, image: car.image || '' });
                      setEditId(car._id);
                      setShowForm(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-3 py-2 rounded-xl transition-all text-sm font-semibold"
                  >
                    <Edit2 size={16} /> Éditer
                  </button>
                  <button
                    onClick={() => handleToggleAvailability(car._id, car.availability)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#1f2937] hover:bg-gray-700 text-gray-300 border border-[#374151] px-3 py-2 rounded-xl transition-all text-sm font-semibold"
                  >
                    {car.availability ? 'Désactiver' : 'Activer'}
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    disabled={deleting === car._id}
                    className="w-10 h-10 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl transition-all disabled:opacity-50 shrink-0"
                    title="Supprimer"
                  >
                    {deleting === car._id ? <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" /> : <Trash2 size={16} />}
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

export default CarsTab;
