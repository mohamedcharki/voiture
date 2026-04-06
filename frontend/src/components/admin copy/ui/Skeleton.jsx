import React from 'react';

/**
 * Composant Skeleton générique pour remplacer les spinners (loaders)
 * Utilise l'animation animate-pulse de Tailwind
 */
const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse bg-slate-800/50 rounded-lg ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
