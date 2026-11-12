import React from 'react';
import { Logo } from './Logo';
import { STUDIO_CONFIG, SERVICES_DATA } from '../config/siteConfig';
import { Language, ServiceItem } from '../types';
import { Instagram, MessageCircle, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onSelectService,
  onOpenWhatsApp,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-[#C9A45C]/25 text-[#F7F4EF] pt-16 pb-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#C9A45C]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column (Col 1-5) */}
          <div className="lg:col-span-5 space-y-5">
            <a href="#hero" className="inline-block" aria-label="TEREN STUDIO">
              <Logo size="md" />
            </a>

            <p className="font-serif text-xl sm:text-2xl text-gold-metallic font-semibold italic">
              «{lang === 'kk' ? STUDIO_CONFIG.footerQuoteKk : STUDIO_CONFIG.footerQuoteRu}»
            </p>

            <p className="text-xs text-[#A5A5A5] leading-relaxed max-w-sm">
              {lang === 'kk'
                ? 'Қазақстан бойынша және бүкіл әлемге арналған жеке анимациялық фильмдер мен кинематографиялық видео өндірісі.'
                : 'Производство персональных анимационных фильмов и кинематографических видеоисторий по всему Казахстану и миру.'}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={STUDIO_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#141414] border border-[#C9A45C]/30 hover:border-[#C9A45C] flex items-center justify-center text-[#E5CD91] hover:text-white transition-colors shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="w-10 h-10 rounded-full bg-[#141414] border border-[#C9A45C]/30 hover:border-[#C9A45C] flex items-center justify-center text-[#E5CD91] hover:text-white transition-colors shadow-md"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Services Column (Col 6-9) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-4">
              {lang === 'kk' ? 'Басты бағыттар' : 'Направления'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A5A5A5]">
              {SERVICES_DATA.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="hover:text-white hover:underline transition-colors text-left"
                  >
                    {lang === 'kk' ? service.titleKk : service.titleRu}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column (Col 10-12) */}
          <div className="lg:col-span-3 space-y-4 text-xs">
            <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-4">
              {lang === 'kk' ? 'Байланыс және жұмыс' : 'Связь со студией'}
            </h4>

            <div>
              <span className="text-[#A5A5A5] block mb-1">{lang === 'kk' ? 'Ресми Instagram:' : 'Официальный Instagram:'}</span>
              <a
                href={STUDIO_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#C9A45C] font-mono transition-colors"
              >
                {STUDIO_CONFIG.instagramHandle}
              </a>
            </div>

            <div>
              <span className="text-[#A5A5A5] block mb-1">{lang === 'kk' ? 'Қызмет көрсету аймағы:' : 'География заказов:'}</span>
              <span className="text-white/80">
                {lang === 'kk' ? STUDIO_CONFIG.cityKk : STUDIO_CONFIG.cityRu}
              </span>
            </div>

            <div className="pt-2 space-y-1.5">
              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-[#C9A45C]/30 text-xs text-[#E5CD91] font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>{lang === 'kk' ? 'WhatsApp арқылы кеңес алу' : 'Консультация в WhatsApp'}</span>
              </button>

              <a
                href="https://wa.me/77760920212"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs font-mono text-[#25D366] hover:text-[#4ade80] transition-colors pt-0.5"
              >
                WhatsApp: 87760920212 (+7 776 092 02 12)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A5A5A5]">
          <div>
            © {new Date().getFullYear()} {STUDIO_CONFIG.brandName}. {lang === 'kk' ? 'Барлық құқықтар қорғалған.' : 'Все права защищены.'}
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <span>{lang === 'kk' ? 'Махаббатпен жасалған' : 'Сделано с любовью'}</span>
              <Heart className="w-3.5 h-3.5 text-[#C9A45C] fill-current" />
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#A5A5A5] hover:text-[#C9A45C] transition-colors"
              aria-label="Жоғарыға өту"
            >
              <span>{lang === 'kk' ? 'Жоғарыға' : 'Наверх'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
