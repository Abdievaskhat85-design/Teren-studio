import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  const textClasses = {
    sm: { main: 'text-[11px] tracking-[0.2em]', sub: 'text-[6px] tracking-[0.3em]' },
    md: { main: 'text-[13px] tracking-[0.22em]', sub: 'text-[7px] tracking-[0.35em]' },
    lg: { main: 'text-[22px] tracking-[0.25em]', sub: 'text-[10px] tracking-[0.4em]' },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official circular black badge with gold lettering */}
      <div 
        className={`relative ${sizeClasses[size]} rounded-full bg-[#080808] border border-[#C9A45C]/60 flex flex-col items-center justify-center shadow-lg shadow-black/80 p-1 shrink-0 group transition-transform duration-300 hover:scale-105`}
      >
        {/* Subtle inner concentric ring */}
        <div className="absolute inset-[2px] rounded-full border border-[#C9A45C]/25 pointer-events-none" />
        
        {/* TEREN lettering */}
        <span className={`font-serif font-bold text-gold-metallic select-none leading-none pl-[2px] ${textClasses[size].main}`}>
          TEREN
        </span>
        
        {/* STUDIO subtext */}
        <span className={`font-sans font-semibold text-[#E5CD91]/80 select-none leading-none uppercase mt-[2px] pl-[2px] ${textClasses[size].sub}`}>
          STUDIO
        </span>
      </div>

      {/* Optional side wordmark on desktop */}
      <div className="hidden sm:flex flex-col">
        <span className="font-serif text-lg font-bold tracking-[0.18em] text-[#F7F4EF] leading-tight group-hover:text-[#E5CD91] transition-colors">
          TEREN STUDIO
        </span>
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A45C]/90 font-medium">
          Personalized Cinema
        </span>
      </div>
    </div>
  );
};
