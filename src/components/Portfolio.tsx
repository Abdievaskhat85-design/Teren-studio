import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../config/siteConfig';
import { PortfolioItem, Language } from '../types';
import { Play, Sparkles, Film, ArrowRight } from 'lucide-react';

interface PortfolioProps {
  lang: Language;
  onSelectVideo: (item: PortfolioItem) => void;
  onOrderSimilar: (item: PortfolioItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  lang,
  onSelectVideo,
  onOrderSimilar,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', labelKk: 'Барлығы', labelRu: 'Все работы' },
    { key: 'kyz_uzatu', labelKk: 'Қыз ұзату', labelRu: 'Кыз узату' },
    { key: 'mereytoi', labelKk: 'Мерейтой', labelRu: 'Юбилей' },
    { key: 'sundet_toi', labelKk: 'Сүндет той', labelRu: 'Сундет той' },
    { key: 'lovestory', labelKk: 'Love Story', labelRu: 'Love Story' },
    { key: 'eske_alu', labelKk: 'Еске алу', labelRu: 'Еске алу' },
    { key: 'otbasylyk', labelKk: 'Отбасылық мультфильм', labelRu: 'Семейный фильм' },
  ];

  const filteredItems = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A45C] font-semibold mb-3">
            <Film className="w-4 h-4" />
            <span>TEREN STUDIO SHOWCASE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            {lang === 'kk' ? (
              <>
                Біздің жүрекке жеткен <span className="text-gold-metallic">туындыларымыз</span>
              </>
            ) : (
              <>
                Наши работы, <span className="text-gold-metallic">покорившие сердца</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#A5A5A5] leading-relaxed max-w-2xl">
            {lang === 'kk'
              ? 'Әрбір фильм — шынайы отбасылық фотосуреттер мен естеліктерге негізделген жеке анимациялық шедевр. Тойдағы ең әсерлі сәтті бірге жасайық.'
              : 'Каждый проект — индивидуальный анимационный шедевр, созданный по реальным фотографиям и воспоминаниям заказчиков.'}
          </p>
        </div>

        {/* Working Category Filters (Interactive Segmented Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap shrink-0 transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-[#C9A45C] text-[#080808] font-bold shadow-md shadow-[#C9A45C]/20'
                  : 'bg-[#141414] text-[#A5A5A5] hover:text-[#F7F4EF] hover:bg-[#1f1f1f] border border-white/5'
              }`}
            >
              {lang === 'kk' ? cat.labelKk : cat.labelRu}
            </button>
          ))}
        </div>

        {/* Cinematic Grid with Large Video Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#141414] border border-[#C9A45C]/20 hover:border-[#C9A45C]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#C9A45C]/10 flex flex-col justify-between"
            >
              {/* Media Card Preview */}
              <div 
                className="relative aspect-video overflow-hidden cursor-pointer bg-black"
                onClick={() => onSelectVideo(item)}
              >
                <img
                  src={item.thumbnail}
                  alt={lang === 'kk' ? item.titleKk : item.titleRu}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Duration & Views Metadata (Clean typography with separators) */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[11px] font-mono text-[#E5CD91] border border-white/10">
                  <span>{item.duration}</span>
                  {item.viewsCount && (
                    <>
                      <span className="text-white/40">·</span>
                      <span>{item.viewsCount} views</span>
                    </>
                  )}
                </div>

                {/* Central Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#C9A45C]/90 text-[#080808] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>

                {/* Category label bottom-left */}
                <div className="absolute bottom-3 left-3 text-xs uppercase tracking-widest text-[#E5CD91] font-semibold">
                  {lang === 'kk' ? item.categoryLabelKk : item.categoryLabelRu}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => onSelectVideo(item)}
                    className="font-serif text-xl font-bold text-white mb-2 cursor-pointer hover:text-[#C9A45C] transition-colors leading-snug"
                  >
                    {lang === 'kk' ? item.titleKk : item.titleRu}
                  </h3>

                  <p className="text-xs text-[#A5A5A5] leading-relaxed line-clamp-2 mb-4">
                    {lang === 'kk' ? item.storyContextKk : item.storyContextRu}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectVideo(item)}
                    className="text-xs font-medium text-[#A5A5A5] hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>{lang === 'kk' ? 'Көру' : 'Смотреть'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOrderSimilar(item)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#C9A45C]/15 hover:bg-[#C9A45C] text-[#E5CD91] hover:text-[#080808] border border-[#C9A45C]/40 transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'kk' ? 'Осындай фильм' : 'Такой же фильм'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice & Studio Real Media Guidance */}
        <div className="mt-12 p-4 rounded-xl bg-[#141414]/60 border border-white/5 text-center text-xs text-[#A5A5A5]">
          <span>
            {lang === 'kk'
              ? '✨ Барлық туындылар — TEREN STUDIO авторлық жобалары. Жеке фильмге тапсырыс беру үшін WhatsApp немесе Instagram арқылы хабарласыңыз.'
              : '✨ Все проекты — авторские работы TEREN STUDIO. Для заказа свяжитесь с нами через WhatsApp или Instagram.'}
          </span>
        </div>
      </div>
    </section>
  );
};
