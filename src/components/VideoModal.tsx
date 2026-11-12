import React, { useEffect, useState } from 'react';
import { PortfolioItem, Language } from '../types';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, MessageCircle, Quote } from 'lucide-react';

interface VideoModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  lang: Language;
  onOrderSimilar: (item: PortfolioItem) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  item,
  onClose,
  lang,
  onOrderSimilar,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Simulate progress when playing
  useEffect(() => {
    if (!isPlaying || !item) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.4));
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying, item]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-[#141414] border border-[#C9A45C]/35 rounded-2xl overflow-hidden shadow-2xl my-auto text-[#F7F4EF]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#080808]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold">
              {lang === 'kk' ? item.categoryLabelKk : item.categoryLabelRu}
            </span>
            <span className="text-white/30">·</span>
            <span className="text-xs text-[#A5A5A5] font-mono">{item.duration}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A5A5A5] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Жабу"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative aspect-video bg-black overflow-hidden group">
          {item.videoUrl && item.videoType === 'youtube' ? (
            <iframe
              src={`${item.videoUrl}?autoplay=1&rel=0`}
              title={lang === 'kk' ? item.titleKk : item.titleRu}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {/* Cinematic Studio Video Player Display */}
              <img
                src={item.thumbnail}
                alt={lang === 'kk' ? item.titleKk : item.titleRu}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? 'scale-105' : 'scale-100'
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Ambient lighting scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Studio Watermark */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-[#C9A45C]/30 text-[10px] tracking-widest font-serif text-[#E5CD91] uppercase">
                TEREN STUDIO CINEMA
              </div>

              {/* Center Play/Pause toggle on click */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors focus:outline-none"
                aria-label={isPlaying ? 'Тоқтату' : 'Ойнату'}
              >
                {!isPlaying && (
                  <div className="w-16 h-16 rounded-full bg-[#C9A45C] text-[#080808] flex items-center justify-center shadow-xl shadow-[#C9A45C]/40 transform hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                )}
              </button>

              {/* Player Overlay Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
                {/* Progress scrub bar */}
                <div 
                  className="w-full h-1.5 bg-white/20 rounded-full mb-3 cursor-pointer overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setProgress((clickX / rect.width) * 100);
                  }}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-[#C9A45C] to-[#E5CD91] rounded-full transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 hover:text-[#C9A45C] transition-colors"
                      aria-label="Ойнату/Тоқтату"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 hover:text-[#C9A45C] transition-colors"
                      aria-label="Дыбыс"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <span className="text-[11px] text-[#A5A5A5] font-mono">
                      {Math.floor((progress / 100) * 4)}:{String(Math.floor(((progress / 100) * 240) % 60)).padStart(2, '0')} / {item.duration}
                    </span>
                  </div>

                  <span className="text-[11px] text-[#C9A45C] font-medium tracking-wide">
                    4K ULTRA HD · 60 FPS
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Film Context & Story Details */}
        <div className="p-5 sm:p-7 bg-[#141414]">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                {lang === 'kk' ? item.titleKk : item.titleRu}
              </h2>

              <p className="text-sm text-[#A5A5A5] leading-relaxed mb-4">
                {lang === 'kk' ? item.storyContextKk : item.storyContextRu}
              </p>

              {/* Client Reaction Block */}
              <div className="bg-[#080808] border border-[#C9A45C]/20 rounded-xl p-4 relative">
                <Quote className="w-5 h-5 text-[#C9A45C]/40 absolute top-3 right-3" />
                <span className="text-xs uppercase tracking-wider text-[#C9A45C] font-semibold block mb-1">
                  {lang === 'kk' ? 'Тапсырыс берушінің әсері:' : 'Отзыв заказчика:'}
                </span>
                <p className="text-xs italic text-[#F7F4EF]/90 leading-relaxed">
                  {lang === 'kk' ? item.clientReactionKk : item.clientReactionRu}
                </p>
              </div>
            </div>

            {/* CTA action column */}
            <div className="md:w-64 shrink-0 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => onOrderSimilar(item)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#C9A45C] to-[#E5CD91] text-[#080808] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-[#C9A45C]/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'kk' ? 'Осыған ұқсас фильмге тапсырыс беру' : 'Заказать похожий фильм'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#A5A5A5] hover:text-white transition-colors text-center"
              >
                {lang === 'kk' ? 'Басқа жұмыстарды қарау' : 'Смотреть другие работы'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
