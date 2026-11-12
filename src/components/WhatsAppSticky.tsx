import React, { useState } from 'react';
import { Language } from '../types';
import { MessageCircle } from 'lucide-react';

interface WhatsAppStickyProps {
  lang: Language;
  onOpen: () => void;
}

export const WhatsAppSticky: React.FC<WhatsAppStickyProps> = ({ lang, onOpen }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
      {/* Tooltip bubble on desktop */}
      {showTooltip && (
        <div className="hidden sm:block bg-[#141414] border border-[#25D366]/40 text-[#F7F4EF] text-xs px-3.5 py-2 rounded-xl shadow-2xl animate-fade-in pointer-events-none">
          <div className="flex items-center gap-1.5 font-semibold text-[#25D366]">
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>8 776 092 02 12</span>
          </div>
          <p className="text-[11px] text-[#A5A5A5]">
            {lang === 'kk' ? 'WhatsApp арқылы кеңес алу' : 'Консультация в WhatsApp'}
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={onOpen}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#080808]"
        aria-label="WhatsApp"
      >
        {/* Subtle Shimmer Ring */}
        <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-25 pointer-events-none" />
        
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </div>
  );
};
