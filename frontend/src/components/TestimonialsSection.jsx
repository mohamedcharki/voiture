import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Yassine El Mansouri",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150",
    text: "Une expérience exceptionnelle avec LUXCAR. La Mercedes Classe S était dans un état irréprochable. Le service de livraison à l'aéroport était ponctuel et professionnel.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Bensouda",
    role: "Designer UX",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150",
    text: "Le processus de réservation est d'une simplicité déconcertante. J'ai loué une Tesla Model 3 pour un week-end, et tout était parfait. Je repasserai par eux sans hésiter.",
    rating: 5
  },
  {
    id: 3,
    name: "Karim Tazi",
    role: "Directeur Marketing",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&h=150",
    text: "LUXCAR redéfinit la location de prestige au Maroc. Un choix de véhicules incroyable et un support client réactif. La Range Rover était parfaite pour notre voyage en famille.",
    rating: 5
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Expatriée",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=150&h=150",
    text: "Service client au top. Ils ont su répondre à mes besoins spécifiques pour une location longue durée. Les voitures sont récentes et très bien entretenues.",
    rating: 5
  }
];

// High-quality SVG logos served from reliable CDNs — white/light versions for dark bg
const LOGOS = [
  {
    name: "Ferrari",
    glowColor: "rgba(220, 38, 38, 0.6)",
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <text x="0" y="32" fontFamily="'Poppins', serif" fontSize="28" fontWeight="700" fill="white" letterSpacing="2">FERRARI</text>
      </svg>
    ),
  },
  {
    name: "BMW",
    glowColor: "rgba(30, 144, 255, 0.55)",
    svg: (
      <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
        <circle cx="40" cy="20" r="19" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M40 1 L40 20 L21 20" fill="white" fillOpacity="0.15"/>
        <path d="M40 39 L40 20 L59 20" fill="white" fillOpacity="0.15"/>
        <path d="M40 1 L40 20 L59 20" fill="white" fillOpacity="0.6"/>
        <path d="M40 39 L40 20 L21 20" fill="white" fillOpacity="0.6"/>
        <text x="40" y="24" textAnchor="middle" fontFamily="'Poppins', sans-serif" fontSize="9" fontWeight="700" fill="white">BMW</text>
      </svg>
    ),
  },
  {
    name: "Mercedes-Benz",
    glowColor: "rgba(192, 192, 192, 0.5)",
    svg: (
      <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
        <circle cx="40" cy="20" r="18" stroke="white" strokeWidth="1.5" fill="none"/>
        <path d="M40 2 L40 20 M40 20 L24.4 29 M40 20 L55.6 29" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <text x="40" y="37" textAnchor="middle" fontFamily="'Poppins', sans-serif" fontSize="6" fontWeight="600" fill="white" letterSpacing="1">MERCEDES-BENZ</text>
      </svg>
    ),
  },
  {
    name: "Range Rover",
    glowColor: "rgba(34, 197, 94, 0.45)",
    svg: (
      <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <text x="0" y="30" fontFamily="'Poppins', sans-serif" fontSize="20" fontWeight="700" fill="white" letterSpacing="3">RANGE ROVER</text>
      </svg>
    ),
  },
  {
    name: "Bentley",
    glowColor: "rgba(168, 145, 68, 0.55)",
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M10 8 Q20 0 30 8 L30 32 Q20 40 10 32 Z" fill="none" stroke="white" strokeWidth="1.5"/>
        <text x="36" y="28" fontFamily="'Poppins', sans-serif" fontSize="22" fontWeight="700" fill="white" letterSpacing="2">BENTLEY</text>
      </svg>
    ),
  },
  {
    name: "Tesla",
    glowColor: "rgba(229, 57, 53, 0.5)",
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M60 4 L48 10 C52 10 56 11 60 14 C64 11 68 10 72 10 Z" fill="white"/>
        <path d="M60 14 L60 38" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <path d="M44 10 C36 10 30 13 28 18 C36 18 44 14 48 10 Z" fill="white" fillOpacity="0.5"/>
        <path d="M76 10 C84 10 90 13 92 18 C84 18 76 14 72 10 Z" fill="white" fillOpacity="0.5"/>
        <text x="60" y="38" textAnchor="middle" fontFamily="'Poppins', sans-serif" fontSize="9" fontWeight="600" fill="white" letterSpacing="3">TESLA</text>
      </svg>
    ),
  },
  {
    name: "Porsche",
    glowColor: "rgba(251, 191, 36, 0.5)",
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M8 8 L8 32 L18 32 L18 24 L24 32 L34 32 L26 22 C30 20 32 16 30 12 C28 8 24 8 8 8 Z M18 14 L22 14 C26 14 26 20 22 20 L18 20 Z" fill="white" fillOpacity="0.9"/>
        <text x="38" y="28" fontFamily="'Poppins', sans-serif" fontSize="18" fontWeight="700" fill="white" letterSpacing="2">PORSCHE</text>
      </svg>
    ),
  },
  {
    name: "Audi",
    glowColor: "rgba(200, 200, 200, 0.45)",
    svg: (
      <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-auto">
        {[0, 22, 44, 66].map((x, i) => (
          <circle key={i} cx={20 + x} cy="20" r="16" stroke="white" strokeWidth="2" fill="none"/>
        ))}
        <text x="80" y="38" textAnchor="middle" fontFamily="'Poppins', sans-serif" fontSize="8" fontWeight="600" fill="white" letterSpacing="3">AUDI</text>
      </svg>
    ),
  },
];

function LogoCard({ logo }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative flex-shrink-0 w-44 mx-3 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={logo.name}
    >
      {/* Glassmorphism card */}
      <div
        className="relative flex items-center justify-center h-20 rounded-2xl border border-white/10 backdrop-blur-md transition-all duration-500 cursor-pointer overflow-hidden"
        style={{
          background: hovered
            ? `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))`
            : `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`,
          boxShadow: hovered
            ? `0 0 28px 4px ${logo.glowColor}, 0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)`
            : `0 2px 16px rgba(0,0,0,0.3)`,
          transform: hovered ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
          borderColor: hovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
        }}
      >
        {/* Glow spot */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${logo.glowColor} 0%, transparent 70%)`,
            opacity: hovered ? 0.4 : 0,
          }}
        />
        {/* Logo SVG */}
        <div className="px-4 py-2 transition-all duration-300 filter"
          style={{ filter: hovered ? 'brightness(1)' : 'brightness(0.65)' }}>
          {logo.svg}
        </div>
        {/* Reflection */}
        <div
          className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none rounded-b-2xl"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.04))',
          }}
        />
      </div>
      {/* Tooltip */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest text-white/70 bg-white/10 backdrop-blur-sm border border-white/10 pointer-events-none whitespace-nowrap transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(4px)',
        }}
      >
        {logo.name}
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-['Poppins']">
            Ce que disent <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">nos clients</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto rounded-full"></div>
        </div>

        {/* Testimonials Slider */}
        <div className="mb-24">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonials-swiper pb-16"
          >
            {TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="h-full bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:border-yellow-400/50 transition-all duration-500 group relative">
                  <div className="absolute top-6 right-8 text-yellow-400/20">
                    <Quote size={60} />
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400/50"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black rounded-full p-1 border-2 border-black">
                        <Star size={10} fill="currentColor" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ═══════════════ BRAND LOGOS CAROUSEL ═══════════════ */}
        <div ref={sectionRef} className="pt-14 border-t border-white/5">

          {/* Animated title */}
          <div className="text-center mb-12">
            <p
              className={`uppercase font-bold text-xs text-transparent bg-clip-text bg-gradient-to-r from-yellow-400/70 via-white/60 to-yellow-400/70 ${visible ? 'animate-brand-title' : 'opacity-0'}`}
              style={{ letterSpacing: '0.35em' }}
            >
              ILS NOUS FONT CONFIANCE
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent mx-auto mt-4 rounded-full" />
          </div>

          {/* Glassmorphism backdrop of the carousel */}
          <div
            className="relative rounded-3xl overflow-hidden py-6"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, black, transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, black, transparent)' }} />

            {/* Scrolling track */}
            <div className="overflow-hidden">
              <div className="animate-scroll-right pause-on-hover flex items-center py-4">
                {[...LOGOS, ...LOGOS].map((logo, index) => (
                  <LogoCard key={`${logo.name}-${index}`} logo={logo} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* ══════════════════════════════════════════════════════ */}

      </div>

      <style>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
          width: 10px;
          height: 10px;
          opacity: 1;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: #fbbf24;
          width: 30px;
          border-radius: 5px;
          transition: width 0.3s;
        }
        .testimonials-swiper .swiper-button-next,
        .testimonials-swiper .swiper-button-prev {
          color: #fbbf24;
          background: rgba(255, 255, 255, 0.05);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(4px);
        }
        .testimonials-swiper .swiper-button-next:after,
        .testimonials-swiper .swiper-button-prev:after {
          font-size: 1.2rem;
          font-weight: bold;
        }
        .testimonials-swiper .swiper-button-next:hover,
        .testimonials-swiper .swiper-button-prev:hover {
          background: rgba(251, 191, 36, 0.1);
          border-color: rgba(251, 191, 36, 0.5);
        }
        @media (max-width: 640px) {
          .testimonials-swiper .swiper-button-next,
          .testimonials-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

export default TestimonialsSection;
