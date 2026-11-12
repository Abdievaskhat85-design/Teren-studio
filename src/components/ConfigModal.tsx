import React, { useState } from 'react';
import { STUDIO_CONFIG } from '../config/siteConfig';
import { Language } from '../types';
import { Instagram, Copy, Check, ExternalLink, X, MessageSquare, AlertCircle } from 'lucide-react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  prefilledMessage?: string;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  lang,
  prefilledMessage = '',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (prefilledMessage) {
      navigator.clipboard.writeText(prefilledMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#141414] border border-[#C9A45C]/30 rounded-2xl p-6 sm:p-8 text-[#F7F4EF] shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A5A5A5] hover:text-[#F7F4EF] transition-colors p-2 rounded-lg"
          aria-label="Жабу"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 text-[#C9A45C]">
          <div className="w-10 h-10 rounded-full bg-[#C9A45C]/10 flex items-center justify-center border border-[#C9A45C]/30">
            <Instagram className="w-5 h-5 text-[#C9A45C]" />
          </div>
          <div>
            <span className="text-xs tracking-wider uppercase text-[#E5CD91]/80 font-medium">
              {lang === 'kk' ? 'Байланыс орнату' : 'Прямая связь со студией'}
            </span>
            <h3 className="text-lg font-serif font-bold text-white">
              {lang === 'kk' ? 'Instagram Direct арқылы жазыңыз' : 'Свяжитесь через Instagram Direct'}
            </h3>
          </div>
        </div>

        <p className="text-sm text-[#A5A5A5] leading-relaxed mb-4">
          {lang === 'kk'
            ? 'Студияның ресми WhatsApp нөмірі сайт баптауында жаңартылуда. Тапсырысыңызды жедел талқылау үшін ресми Instagram парақшамызға Direct хабарлама жіберіңіз!'
            : 'Официальный номер WhatsApp находится в процессе настройки. Для оперативной консультации и расчета напишите нам в Direct официального Instagram!'}
        </p>

        {prefilledMessage && (
          <div className="mb-5 bg-[#080808] border border-white/10 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#C9A45C] flex items-center gap-1.5 font-medium">
                <MessageSquare className="w-3.5 h-3.5" />
                {lang === 'kk' ? 'Сіздің дайын хабарламаңыз:' : 'Ваше готовое сообщение:'}
              </span>
              <button
                onClick={handleCopy}
                className="text-xs flex items-center gap-1 text-[#A5A5A5] hover:text-white transition-colors px-2 py-0.5 rounded bg-white/5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (lang === 'kk' ? 'Көшірілді' : 'Скопировано') : (lang === 'kk' ? 'Көшіріп алу' : 'Копировать')}
              </button>
            </div>
            <p className="text-xs text-white/80 whitespace-pre-line line-clamp-4 font-mono bg-black/40 p-2 rounded">
              {prefilledMessage}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={STUDIO_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#C9A45C] to-[#E5CD91] text-[#080808] font-semibold text-sm hover:opacity-95 transition-all shadow-lg shadow-[#C9A45C]/20"
          >
            <Instagram className="w-4 h-4" />
            <span>{lang === 'kk' ? 'Instagram-ға өту' : 'Открыть Instagram'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-[#F7F4EF] font-medium transition-colors"
          >
            {lang === 'kk' ? 'Жабу' : 'Закрыть'}
          </button>
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 flex items-start gap-2 text-[11px] text-[#A5A5A5]">
          <AlertCircle className="w-3.5 h-3.5 text-[#C9A45C] shrink-0 mt-0.5" />
          <span>
            {lang === 'kk'
              ? 'Студия әкімшісі: WhatsApp нөмірін `src/config/siteConfig.ts` ішіндегі `whatsappNumber` айнымалысына енгізуге болады.'
              : 'Для администратора: номер WhatsApp можно указать в файле `src/config/siteConfig.ts` в поле `whatsappNumber`.'}
          </span>
        </div>
      </div>
    </div>
  );
};
