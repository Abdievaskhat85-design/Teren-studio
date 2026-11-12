import React from 'react';
import { STUDIO_CONFIG, INSTAGRAM_REELS } from '../config/siteConfig';
import { Language } from '../types';
import { Instagram, ExternalLink, Play, Eye, Heart } from 'lucide-react';

interface InstagramSectionProps {
  lang: Language;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ lang }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A45C] font-semibold mb-3">
              <Instagram className="w-4 h-4" />
              <span>OFFICIAL INSTAGRAM CHANNEL</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-3 [text-wrap:balance]">
              {lang === 'kk' ? (
                <>
                  Бізді <span className="text-gold-metallic">Instagram-нан көріңіз</span>
                </>
              ) : (
                <>
                  Смотрите нас в <span className="text-gold-metallic">Instagram</span>
                </>
              )}
            </h2>

            <p className="text-sm text-[#A5A5A5] leading-relaxed">
              {lang === 'kk'
                ? `Ресми парақшамызға жазылып, жаңа жұмыстарды, процесті және қонақтардың эмоциясын тамашалаңыз: ${STUDIO_CONFIG.instagramHandle}`
                : `Подписывайтесь на официальный аккаунт ${STUDIO_CONFIG.instagramHandle}, чтобы первыми видеть новые работы и отзывы гостей.`}
            </p>
          </div>

          {/* Prominent Follow Button */}
          <a
            href={STUDIO_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#C9A45C] to-[#E5CD91] text-[#080808] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-[#C9A45C]/20 shrink-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Instagram className="w-4 h-4" />
            <span>{lang === 'kk' ? 'Instagram-ға жазылу' : 'Подписаться на @teren___studio'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Instagram Reel Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTAGRAM_REELS.map((reel) => (
            <a
              key={reel.id}
              href={reel.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#141414] border border-[#C9A45C]/20 hover:border-[#C9A45C]/60 transition-all duration-300 shadow-xl flex flex-col justify-end p-4"
            >
              <img
                src={reel.thumbnail}
                alt={lang === 'kk' ? reel.titleKk : reel.titleRu}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

              {/* Instagram icon & views top-bar */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10">
                <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10">
                  <Instagram className="w-3.5 h-3.5 text-[#E5CD91]" />
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[11px] font-mono text-white/90">
                  <Eye className="w-3 h-3 text-[#C9A45C]" />
                  <span>{reel.views}</span>
                </div>
              </div>

              {/* Center Play Icon on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-[#C9A45C] text-[#080808] flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Reel Caption */}
              <div className="relative z-10">
                <p className="text-xs font-medium text-white line-clamp-2 mb-2 group-hover:text-[#E5CD91] transition-colors leading-snug">
                  {lang === 'kk' ? reel.titleKk : reel.titleRu}
                </p>

                <div className="flex items-center justify-between text-[11px] text-[#A5A5A5] pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-400 fill-current" />
                    <span>{reel.likes}</span>
                  </span>
                  <span className="text-[#C9A45C] font-mono font-medium">Reel</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
