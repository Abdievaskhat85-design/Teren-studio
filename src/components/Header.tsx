import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenOrder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onOpenOrder,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#portfolio', labelKk: 'Біздің жұмыстар', labelRu: 'Портфолио' },
    { href: '#how-it-works', labelKk: 'Қалай жасаймыз?', labelRu: 'Процесс' },
    { href: '#pricing', labelKk: 'Бағалар', labelRu: 'Калькулятор' },
    { href: '#reviews', labelKk: 'Пікірлер', labelRu: 'Отзывы' },
    { href: '#contact', labelKk: 'Байланыс', labelRu: 'Контакты' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#C9A45C]/20 shadow-xl py-3'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 md:gap-8">
            {/* Zone 1: Brand wordmark & circular emblem */}
            <a
              href="#hero"
              className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A45C]"
              aria-label="TEREN STUDIO"
            >
              <Logo size="sm" />
            </a>

            {/* Zone 2: 4-5 clean single-line nav links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-[#F7F4EF]/80 hover:text-[#C9A45C] transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A45C] hover:after:w-full after:transition-all after:duration-300"
                >
                  {lang === 'kk' ? item.labelKk : item.labelRu}
                </a>
              ))}
            </nav>

            {/* Zone 3: 1 primary action + Language Switcher */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Language Switcher */}
              <div className="flex items-center bg-[#141414] border border-[#C9A45C]/30 rounded-full p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => onLanguageChange('kk')}
                  className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                    lang === 'kk'
                      ? 'bg-[#C9A45C] text-[#080808] font-bold shadow-sm'
                      : 'text-[#A5A5A5] hover:text-white'
                  }`}
                  aria-label="Қазақша"
                >
                  ҚАЗ
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('ru')}
                  className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                    lang === 'ru'
                      ? 'bg-[#C9A45C] text-[#080808] font-bold shadow-sm'
                      : 'text-[#A5A5A5] hover:text-white'
                  }`}
                  aria-label="Русский"
                >
                  РУС
                </button>
              </div>

              {/* Primary Action CTA */}
              <button
                type="button"
                onClick={onOpenOrder}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-[#C9A45C] to-[#E5CD91] text-[#080808] hover:opacity-95 transition-all shadow-md shadow-[#C9A45C]/20 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
              >
                <span>{lang === 'kk' ? 'Тапсырыс беру' : 'Заказать фильм'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#F7F4EF] hover:text-[#C9A45C] hover:bg-white/5 transition-colors"
                aria-label={mobileMenuOpen ? 'Мәзірді жабу' : 'Мәзірді ашу'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#080808]/95 backdrop-blur-xl pt-24 px-6 pb-8 flex flex-col justify-between animate-fade-in">
          <nav className="flex flex-col gap-5 pt-4">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-xl font-serif text-[#F7F4EF] hover:text-[#C9A45C] transition-colors py-1 border-b border-white/5"
              >
                {lang === 'kk' ? item.labelKk : item.labelRu}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-[#C9A45C] to-[#E5CD91] text-[#080808] flex items-center justify-center gap-2 shadow-lg shadow-[#C9A45C]/20"
            >
              <span>{lang === 'kk' ? 'Тапсырыс беру' : 'Заказать фильм'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="text-center text-xs text-[#A5A5A5]">
              TEREN STUDIO · {lang === 'kk' ? 'Естеліктерді өнерге айналдырамыз' : 'Превращаем воспоминания в искусство'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
