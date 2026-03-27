import React, { useEffect, useState } from 'react';

/**
 * LogoLoader — Branded loading screen with Enjoy Rent Car logo animation.
 * Fades in the logo, pulses it, then fades out the entire overlay.
 * Parent should unmount this component after `onDone` is called.
 */
function LogoLoader({ onDone }) {
  const [phase, setPhase] = useState('enter'); // enter | pulse | exit

  useEffect(() => {
    // Phase sequence: enter (0.6s) → hold + pulse (1s) → exit (0.5s)
    const t1 = setTimeout(() => setPhase('pulse'), 600);
    const t2 = setTimeout(() => setPhase('exit'), 1800);
    const t3 = setTimeout(() => { if (onDone) onDone(); }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0f172a]"
      style={{
        opacity: phase === 'exit' ? 0 : 1,
        transition: phase === 'exit' ? 'opacity 0.5s ease-out' : 'opacity 0.4s ease-in',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* Logo */}
      <div
        style={{
          transform: phase === 'enter' ? 'scale(0.85) translateY(8px)' : 'scale(1) translateY(0)',
          opacity: phase === 'enter' ? 0 : 1,
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out',
          filter: phase === 'pulse'
            ? 'drop-shadow(0 0 18px rgba(229,57,53,0.7))'
            : 'drop-shadow(0 0 4px rgba(229,57,53,0.3))',
        }}
      >
        <img
          src="/logo-nobg.png"
          alt="Enjoy Rent Car Logo"
          style={{ width: '260px', height: 'auto' }}
          loading="eager"
        />
      </div>

      {/* Loading bar */}
      <div className="mt-10 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-600 via-red-400 to-red-600"
          style={{
            width: phase === 'enter' ? '0%' : phase === 'pulse' ? '70%' : '100%',
            transition: phase === 'enter'
              ? 'width 0.1s'
              : phase === 'pulse'
              ? 'width 1.2s ease-out'
              : 'width 0.4s ease-in',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s linear infinite',
          }}
        />
      </div>

      {/* Tagline */}
      <p
        className="mt-5 text-xs uppercase tracking-[0.4em] text-white/30 font-medium"
        style={{
          opacity: phase === 'enter' ? 0 : 0.6,
          transition: 'opacity 0.8s ease-out 0.3s',
        }}
      >
        Location de voitures premium
      </p>
    </div>
  );
}

export default LogoLoader;
