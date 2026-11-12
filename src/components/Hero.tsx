import React from 'react';
import { ASSETS } from '../config/siteConfig';
import { Language } from '../types';
import { Play, Sparkles, Heart, Film, ArrowDown } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenOrder: () => void;
  onScrollToPortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenOrder,
  onScrollToPortfolio,
}) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#080808]">
      {/* Background Cinematic Montage & Gradient Scrim */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src={ASSETS.hero}
          alt="TEREN STUDIO Cinematic Family Animation"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transform motion-safe:animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim: Deep luxury vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />
        
        {/* Subtle Gold Dust Glow Overlay */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#C9A45C]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Subtle Studio Emblem & Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414]/90 border border-[#C9A45C]/35 text-[#E5CD91] text-xs uppercase tracking-[0.2em] font-medium mb-6 backdrop-blur-md shadow-lg shadow-black/50">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>TEREN STUDIO · AI CINEMATIC ANIMATION</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F7F4EF] leading-[1.08] mb-6 [text-wrap:balance]">
            {lang === 'kk' ? (
              <>
                Сіздің тарихыңыз — <span className="text-gold-metallic">біздің өнеріміз.</span>
              </>
            ) : (
              <>
                Ваша история — <span className="text-gold-metallic">наше искусство.</span>
              </>
            )}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-[#F7F4EF]/85 font-light leading-relaxed mb-10 max-w-2xl [text-wrap:balance]">
            {lang === 'kk'
              ? 'Өміріңіздегі ең қымбат сәттерді ерекше мультфильм мен әсерлі киноға айналдырамыз.'
              : 'Превращаем самые дорогие моменты вашей жизни в уникальный мультфильм и трогательное кино.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenOrder}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C9A45C] via-[#E5CD91] to-[#C9A45C] text-[#080808] font-semibold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-xl shadow-[#C9A45C]/25 flex items-center justify-center gap-2.5"
            >
              <span>{lang === 'kk' ? 'Тапсырыс беру' : 'Заказать фильм'}</span>
              <Sparkles className="w-4 h-4 text-[#080808]" />
            </button>

            <button
              type="button"
              onClick={onScrollToPortfolio}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#141414]/80 hover:bg-[#141414] text-[#F7F4EF] hover:text-[#E5CD91] border border-[#C9A45C]/35 font-medium text-sm sm:text-base tracking-wide transition-all duration-300 hover:border-[#C9A45C]/70 backdrop-blur-md flex items-center justify-center gap-2.5"
            >
              <Play className="w-4 h-4 fill-current text-[#C9A45C]" />
              <span>{lang === 'kk' ? 'Біздің жұмыстар' : 'Наши работы'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Claim-to-Proof Adjacency Strip Below Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 pt-8 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3">
            <div className="flex items-center justify-center gap-2 text-[#C9A45C] mb-1">
              <Film className="w-4 h-4" />
              <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">100% Жеке</span>
            </div>
            <p className="text-xs text-[#A5A5A5]">
              {lang === 'kk' ? 'Сіздің шынайы фото мен тарихыңыз' : 'По вашим реальным фото и истории'}
            </p>
          </div>

          <div className="p-3">
            <div className="flex items-center justify-center gap-2 text-[#C9A45C] mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">4K Ultra HD</span>
            </div>
            <p className="text-xs text-[#A5A5A5]">
              {lang === 'kk' ? 'Үлкен LED экрандарға арнайы сапа' : 'Формат для больших LED-экранов'}
            </p>
          </div>

          <div className="p-3">
            <div className="flex items-center justify-center gap-2 text-[#C9A45C] mb-1">
              <Heart className="w-4 h-4" />
              <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">Шынайы эмоция</span>
            </div>
            <p className="text-xs text-[#A5A5A5]">
              {lang === 'kk' ? 'Той төріндегі көз жасы мен махаббат' : 'Искренние слезы радости гостей'}
            </p>
          </div>

          <div className="p-3">
            <div className="flex items-center justify-center gap-2 text-[#C9A45C] mb-1">
              <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">3-7 Күнде</span>
            </div>
            <p className="text-xs text-[#A5A5A5]">
              {lang === 'kk' ? 'Кез келген қалаға онлайн дайындау' : 'Онлайн изготовление в любой город'}
            </p>
          </div>
        </div>

        {/* Subtle scroll cue */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onScrollToPortfolio}
            className="text-[#A5A5A5] hover:text-[#C9A45C] transition-colors p-2"
            aria-label="Төмен сырғыту"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
