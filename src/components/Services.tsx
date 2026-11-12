import React from 'react';
import { SERVICES_DATA } from '../config/siteConfig';
import { ServiceItem, Language } from '../types';
import { Sparkles, Crown, Smile, Heart, Flame, Users, Film, Image as ImageIcon, ArrowRight, Check } from 'lucide-react';

interface ServicesProps {
  lang: Language;
  onOrderService: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({
  lang,
  onOrderService,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#C9A45C]" />;
      case 'Crown': return <Crown className="w-5 h-5 text-[#C9A45C]" />;
      case 'Smile': return <Smile className="w-5 h-5 text-[#C9A45C]" />;
      case 'Heart': return <Heart className="w-5 h-5 text-[#C9A45C]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[#C9A45C]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#C9A45C]" />;
      case 'Film': return <Film className="w-5 h-5 text-[#C9A45C]" />;
      default: return <ImageIcon className="w-5 h-5 text-[#C9A45C]" />;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#141414]/50 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A45C] font-semibold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>TEREN STUDIO SERVICES</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            {lang === 'kk' ? (
              <>
                Мерекеңізге арналған <span className="text-gold-metallic">негізгі бағыттар</span>
              </>
            ) : (
              <>
                Направления для вашего <span className="text-gold-metallic">особенного торжества</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#A5A5A5] leading-relaxed max-w-2xl">
            {lang === 'kk'
              ? 'Әрбір қызметке ерекше көркемдік талғаммен, драматургиямен және отбасылық құндылықтарға терең құрметпен қараймыз.'
              : 'К каждому направлению мы подходим с высоким художественным вкусом, эмоциональной драматургией и уважением к традициям.'}
          </p>
        </div>

        {/* 8 Distinct Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="group bg-[#080808] border border-[#C9A45C]/20 hover:border-[#C9A45C]/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-[#C9A45C]/10 flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon & Recommended Duration */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#C9A45C]/30 flex items-center justify-center group-hover:border-[#C9A45C] transition-colors">
                    {getIcon(service.iconName)}
                  </div>

                  <span className="text-[11px] font-mono text-[#E5CD91] px-2.5 py-1 rounded bg-[#141414] border border-white/5">
                    {service.recommendedDuration}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#E5CD91] transition-colors">
                  {lang === 'kk' ? service.titleKk : service.titleRu}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-[#C9A45C] font-medium leading-relaxed mb-3">
                  {lang === 'kk' ? service.subtitleKk : service.subtitleRu}
                </p>

                {/* Description */}
                <p className="text-xs text-[#A5A5A5] leading-relaxed mb-5">
                  {lang === 'kk' ? service.descriptionKk : service.descriptionRu}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                  {(lang === 'kk' ? service.highlightsKk : service.highlightsRu).map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#F7F4EF]/80">
                      <Check className="w-3.5 h-3.5 text-[#C9A45C] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Button prefilled with this service */}
              <button
                type="button"
                onClick={() => onOrderService(service)}
                className="w-full py-3 px-4 rounded-xl bg-[#141414] hover:bg-[#C9A45C] text-[#E5CD91] hover:text-[#080808] border border-[#C9A45C]/35 hover:border-[#C9A45C] text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-md"
              >
                <span>{lang === 'kk' ? 'Тапсырыс беру' : 'Заказать этот фильм'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
