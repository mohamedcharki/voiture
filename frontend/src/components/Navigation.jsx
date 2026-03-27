import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, LogOut, LayoutDashboard, CalendarDays, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Navigation({ onReserve, onNavigate }) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['accueil', 'flotte', 'destinations', 'services', 'tarifs', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    onNavigate('home');
  };

  const navLinks = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#flotte', label: 'Flotte' },
    { href: '#destinations', label: 'Destinations' },
    { href: '#services', label: 'Services' },
    { href: '#tarifs', label: 'Tarifs' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      onNavigate('home');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = href;
        }
      }, 100);
    } else {
      window.location.href = href;
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
        : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center transition-all duration-300 hover:scale-105 group"
          style={{ filter: 'drop-shadow(0 0 0px rgba(229,57,53,0))' }}
          onMouseEnter={e => e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(229,57,53,0.6))'}
          onMouseLeave={e => e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(229,57,53,0))'}
          title="Enjoy Rent Car — Accueil"
        >
          <img
            src="/logo-nobg.png"
            alt="Enjoy Rent Car Logo"
            className="h-[50px] md:h-[70px] w-auto object-contain py-1 pr-4"
            loading="eager"
          />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`relative text-sm font-medium transition-all duration-300 hover:text-yellow-400 ${activeSection === href.slice(1)
                  ? 'text-yellow-400'
                  : 'text-white/80'
                }`}
            >
              {label}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-red-500 transition-all duration-300 ${activeSection === href.slice(1) ? 'w-full' : 'group-hover:w-full'
                }`}></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:0774174031"
            className="hidden lg:flex text-white/80 items-center gap-2 hover:text-yellow-400 text-sm transition-colors"
          >
            <Phone size={16} />
            0774 17 40 31
          </a>

          {/* Auth buttons */}
          {user ? (
            <>
              {user.role === 'admin' ? (
                <button
                  onClick={() => onNavigate('admin')}
                  className="hidden sm:flex items-center gap-2 text-sm text-white/80 hover:text-yellow-400 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  <LayoutDashboard size={16} />
                  Admin
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('my-reservations')}
                  className="hidden sm:flex items-center gap-2 text-sm text-white/80 hover:text-yellow-400 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  <CalendarDays size={16} />
                  Mes réservations
                </button>
              )}
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  title="Déconnexion"
                  className="text-white/60 hover:text-red-400 transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate('login')}
                className="hidden sm:flex items-center gap-2 text-sm text-white/80 hover:text-yellow-400 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <LogIn size={16} />
                Connexion
              </button>
              <button
                onClick={() => { if (onReserve) onReserve(); else onNavigate('login'); }}
                className="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white font-semibold px-6 py-2 text-sm rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                <span>Réserver</span>
                <span className="text-xs">→</span>
              </button>
            </>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-yellow-400 transition-colors p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 animate-fade-in-up shadow-2xl">
          <div className="flex flex-col gap-2 p-6">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`text-sm py-3 px-4 rounded-xl transition-all duration-300 ${activeSection === href.slice(1)
                    ? 'text-yellow-400 bg-white/10'
                    : 'text-white/80 hover:text-yellow-400 hover:bg-white/5'
                  }`}
              >
                {label}
              </a>
            ))}
            <hr className="border-white/10 my-4" />
            {user ? (
              <>
                <span className="text-white/60 text-xs px-4 pt-2">Connecté : {user.name}</span>
                {user.role === 'admin' ? (
                  <button
                    onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                    className="text-left text-sm text-white/80 hover:text-yellow-400 py-3 px-4 rounded-xl hover:bg-white/5 flex items-center gap-3 transition-all"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard Admin
                  </button>
                ) : (
                  <button
                    onClick={() => { onNavigate('my-reservations'); setMobileMenuOpen(false); }}
                    className="text-left text-sm text-white/80 hover:text-yellow-400 py-3 px-4 rounded-xl hover:bg-white/5 flex items-center gap-3 transition-all"
                  >
                    <CalendarDays size={18} />
                    Mes réservations
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="text-left text-sm text-red-400 py-3 px-4 rounded-xl hover:bg-red-500/10 flex items-center gap-3 transition-all"
                >
                  <LogOut size={18} />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }}
                  className="text-left text-sm text-white/80 hover:text-yellow-400 py-3 px-4 rounded-xl hover:bg-white/5 flex items-center gap-3 transition-all"
                >
                  <LogIn size={18} />
                  Se connecter
                </button>
                <button
                  onClick={() => { onNavigate('register'); setMobileMenuOpen(false); }}
                  className="text-left text-sm text-white/80 hover:text-yellow-400 py-3 px-4 rounded-xl hover:bg-white/5 flex items-center gap-3 transition-all"
                >
                  <UserPlus size={18} />
                  S'inscrire
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;



