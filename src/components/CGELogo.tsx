import React from 'react';
import logoImg from '../logo.png';

interface CGELogoProps {
  className?: string;
  height?: number;
  showText?: boolean;
  light?: boolean;
}

export default function CGELogo({ className = '', height = 40, showText = true, light = false }: CGELogoProps) {
  // Brand color classes based on whether the logo is rendered on light or dark background
  const textCgeClass = light ? 'text-white' : 'text-brand-red';
  const textBusinessClass = light ? 'text-brand-coral' : 'text-brand-dark-blue';
  const subTextClass = light ? 'text-blue-100/80' : 'text-gray-500';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} style={{ height: `${height}px` }}>
      {/* Official CGE Flame Logo Image */}
      <img 
        src={logoImg} 
        alt="CGE Logo" 
        style={{ height: '100%', width: 'auto' }}
        className="shrink-0 drop-shadow-sm object-contain"
      />

      {showText && (
        <div className="flex flex-col justify-center leading-none pl-0.5">
          <div className="flex items-baseline gap-1">
            <span 
              className={`font-black tracking-tighter uppercase ${textCgeClass}`}
              style={{ fontSize: `${height * 0.48}px` }}
            >
              CGE
            </span>
            <span 
              className={`font-extrabold tracking-tight uppercase ${textBusinessClass}`}
              style={{ fontSize: `${height * 0.36}px` }}
            >
              Business Energy
            </span>
          </div>
          <span 
            className={`font-bold tracking-widest uppercase mt-0.5 block whitespace-nowrap ${subTextClass}`}
            style={{ fontSize: `${height * 0.16}px` }}
          >
            Commercial Gas & Electricity Services
          </span>
        </div>
      )}
    </div>
  );
}
