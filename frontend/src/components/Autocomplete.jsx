import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Car, Search } from 'lucide-react';

function Autocomplete({ options, value, onChange, placeholder, icon: Icon, type = 'text', suggestions = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange(val);
    
    if (val.length > 0) {
      const filtered = suggestions.filter(item => 
        item.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative group">
        <input
          type={type}
          value={value}
          onChange={handleInputChange}
          onFocus={() => value.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 pl-11 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all hover:bg-white/30"
        />
        {Icon && <Icon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />}
      </div>

      {isOpen && filteredSuggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto overflow-x-hidden py-2 animate-fade-in">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-3 text-white hover:bg-yellow-400/20 cursor-pointer transition-colors flex items-center gap-3"
            >
              {placeholder.toLowerCase().includes('ville') ? <MapPin size={16} className="text-yellow-400" /> : <Car size={16} className="text-yellow-400" />}
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
