import React from 'react';
import { TIMELINE_STEPS } from '../config/siteConfig';
import { Language } from '../types';
import { MessageSquareText, FileEdit, UserCheck, Wand2, Headphones, Award, Sparkles } from 'lucide-react';

interface HowItWorksProps {
  lang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ lang }) => {
  const getStepIcon = (name: string) => {
    switch (name) {
      case 'MessageSquareText': return <MessageSquareText className="w-5 h-5 text-[#C9A45C]" />;
      case 'FileEdit': return <FileEdit className="w-5 h-5 text-[#C9A45C]" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-[#C9A45C]" />;
      case 'Wand2': return <Wand2 className="w-5 h-5 text-[#C9A45C]" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-[#C9A45C]" />;
      default: return <Award className="w-5 h-5 text-[#C9A45C]" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A45C] font-semibold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>PRODUCTION WORKFLOW</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            {lang === 'kk' ? (
              <>
                Идеядан дайын фильмге дейінгі <span className="text-gold-metallic">6 қадам</span>
              </>
            ) : (
              <>
                6 шагов от идеи до <span className="text-gold-metallic">готового шедевра</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#A5A5A5] leading-relaxed max-w-2xl">
            {lang === 'kk'
              ? 'Сіз тек суреттер мен тарихыңызды бөлісесіз — қалған барлық шығармашылық пен техникалық процесті TEREN STUDIO шеберлері орындайды.'
              : 'Вы делитесь историей и фотографиями — весь творческий и высокотехнологичный цикл реализует команда TEREN STUDIO.'}
          </p>
        </div>

        {/* 6 Step Interactive Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TIMELINE_STEPS.map((step) => (
            <div
              key={step.step}
              className="relative bg-[#141414] border border-[#C9A45C]/20 hover:border-[#C9A45C]/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-[#C9A45C]/10 flex flex-col justify-between"
            >
              <div>
                {/* Step Number & Duration */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-2xl font-bold text-gold-metallic">
                      0{step.step}.
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#080808] border border-[#C9A45C]/30 flex items-center justify-center">
                      {getStepIcon(step.iconName)}
                    </div>
                  </div>

                  <span className="text-xs font-mono text-[#E5CD91] px-2.5 py-1 rounded bg-[#080808] border border-white/5">
                    {lang === 'kk' ? step.durationKk : step.durationRu}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="font-serif text-xl font-bold text-white mb-2 leading-snug">
                  {lang === 'kk' ? step.titleKk : step.titleRu}
                </h3>

                {/* Step Description */}
                <p className="text-xs text-[#A5A5A5] leading-relaxed">
                  {lang === 'kk' ? step.descriptionKk : step.descriptionRu}
                </p>
              </div>

              {/* Progress indicator bar */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#C9A45C] rounded-full" 
                    style={{ width: `${(step.step / 6) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[#A5A5A5]">
                  {step.step}/6
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
