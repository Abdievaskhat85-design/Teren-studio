import React from 'react';
import { TESTIMONIALS_DATA } from '../config/siteConfig';
import { Language } from '../types';
import { Star, MessageSquareQuote, CheckCircle, Video } from 'lucide-react';

interface TestimonialsProps {
  lang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#141414]/40 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A45C] font-semibold mb-3">
            <MessageSquareQuote className="w-4 h-4" />
            <span>REAL CLIENT EXPERIENCES</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            {lang === 'kk' ? (
              <>
                Көз жасы мен шынайы қуаныш: <span className="text-gold-metallic">тапсырыс берушілер пікірі</span>
              </>
            ) : (
              <>
                Слезы радости и восторг: <span className="text-gold-metallic">отзывы наших клиентов</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#A5A5A5] leading-relaxed max-w-2xl">
            {lang === 'kk'
              ? 'Той төрінде қойылған фильмдеріміз мыңдаған қонақтың жүрегін елжіретіп келеді. Клиенттеріміздің шынайы лебізі біз үшін ең үлкен марапат.'
              : 'Фильмы студии вызывают самые искренние чувства в банкетных залах по всей стране. Настоящие эмоции — наша главная гордость.'}
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-[#080808] border border-[#C9A45C]/25 hover:border-[#C9A45C]/60 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#C9A45C]/10"
            >
              <div>
                {/* Rating & Service tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-[#C9A45C]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#C9A45C]" />
                    ))}
                  </div>

                  <span className="text-[11px] font-mono text-[#E5CD91] px-2.5 py-0.5 rounded bg-[#141414] border border-white/5">
                    {lang === 'kk' ? item.serviceTypeKk : item.serviceTypeRu}
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-sm text-[#F7F4EF]/90 italic leading-relaxed mb-6">
                  «{lang === 'kk' ? item.commentKk : item.commentRu}»
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-serif text-base font-bold text-white">
                    <span>{lang === 'kk' ? item.authorKk : item.authorRu}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-xs text-[#A5A5A5]">
                    {lang === 'kk' ? item.locationKk : item.locationRu} · {item.date}
                  </span>
                </div>

                {item.hasVideo && (
                  <div className="flex items-center gap-1 text-[11px] text-[#C9A45C] bg-[#141414] px-2 py-1 rounded border border-[#C9A45C]/20">
                    <Video className="w-3 h-3" />
                    <span>{lang === 'kk' ? 'Видео-пікір' : 'Видео'}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
