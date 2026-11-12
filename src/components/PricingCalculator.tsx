import React, { useState } from 'react';
import { PRICING_CONFIG } from '../config/siteConfig';
import { Language } from '../types';
import { Calculator, Sparkles, MessageCircle, Clock, Users, Mic, Zap, ShieldCheck, ExternalLink } from 'lucide-react';
import { PricingCalculatorValues, getDirectWhatsAppUrl } from '../utils/whatsapp';

interface PricingCalculatorProps {
  lang: Language;
  onSendQuoteRequest: (values: PricingCalculatorValues) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  lang,
  onSendQuoteRequest,
}) => {
  const [selectedFilmType, setSelectedFilmType] = useState(PRICING_CONFIG.filmTypes[0].id);
  const [selectedDuration, setSelectedDuration] = useState(PRICING_CONFIG.durations[2].value); // 3 min default
  const [selectedCharacters, setSelectedCharacters] = useState(PRICING_CONFIG.characterOptions[0].value); // 1-2 default
  const [selectedVoiceover, setSelectedVoiceover] = useState(PRICING_CONFIG.voiceoverOptions[0].value); // with voiceover
  const [selectedDelivery, setSelectedDelivery] = useState(PRICING_CONFIG.deliveryOptions[0].value); // standard

  const currentFilmTypeObj = PRICING_CONFIG.filmTypes.find((f) => f.id === selectedFilmType);
  const currentDurationObj = PRICING_CONFIG.durations.find((d) => d.value === selectedDuration);
  const currentCharactersObj = PRICING_CONFIG.characterOptions.find((c) => c.value === selectedCharacters);
  const currentVoiceoverObj = PRICING_CONFIG.voiceoverOptions.find((v) => v.value === selectedVoiceover);
  const currentDeliveryObj = PRICING_CONFIG.deliveryOptions.find((d) => d.value === selectedDelivery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const values: PricingCalculatorValues = {
      filmType: lang === 'kk' ? currentFilmTypeObj?.labelKk || '' : currentFilmTypeObj?.labelRu || '',
      duration: lang === 'kk' ? currentDurationObj?.labelKk || '' : currentDurationObj?.labelRu || '',
      characters: lang === 'kk' ? currentCharactersObj?.labelKk || '' : currentCharactersObj?.labelRu || '',
      voiceover: lang === 'kk' ? currentVoiceoverObj?.labelKk || '' : currentVoiceoverObj?.labelRu || '',
      delivery: lang === 'kk' ? currentDeliveryObj?.labelKk || '' : currentDeliveryObj?.labelRu || '',
    };
    onSendQuoteRequest(values);
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#141414]/40 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A45C] font-semibold mb-3">
            <Calculator className="w-4 h-4" />
            <span>INTERACTIVE ESTIMATION</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            {lang === 'kk' ? (
              <>
                Фильм параметрлерін таңдап, <span className="text-gold-metallic">құнын есептеңіз</span>
              </>
            ) : (
              <>
                Выберите параметры фильма и <span className="text-gold-metallic">получите расчет</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#A5A5A5] leading-relaxed max-w-2xl">
            {lang === 'kk' ? PRICING_CONFIG.subNoticeKk : PRICING_CONFIG.subNoticeRu}
          </p>
        </div>

        {/* Calculator Main Layout */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Options Selection */}
          <div className="lg:col-span-8 bg-[#080808] border border-[#C9A45C]/25 rounded-2xl p-6 sm:p-8 space-y-7 shadow-xl">
            {/* 1. Film Type */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C9A45C] font-semibold mb-3">
                1. {lang === 'kk' ? 'Фильм бағыты' : 'Направление фильма'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PRICING_CONFIG.filmTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedFilmType(type.id)}
                    className={`p-3 rounded-xl text-xs text-left transition-all duration-200 border ${
                      selectedFilmType === type.id
                        ? 'bg-[#C9A45C]/20 border-[#C9A45C] text-white font-semibold shadow-sm'
                        : 'bg-[#141414] border-white/5 text-[#A5A5A5] hover:text-white hover:border-white/20'
                    }`}
                  >
                    {lang === 'kk' ? type.labelKk : type.labelRu}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Duration */}
            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A45C] font-semibold mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>2. {lang === 'kk' ? 'Фильм ұзақтығы' : 'Длительность фильма'}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PRICING_CONFIG.durations.map((dur) => (
                  <button
                    key={dur.value}
                    type="button"
                    onClick={() => setSelectedDuration(dur.value)}
                    className={`p-3 rounded-xl text-xs text-left transition-all duration-200 border ${
                      selectedDuration === dur.value
                        ? 'bg-[#C9A45C]/20 border-[#C9A45C] text-white font-semibold'
                        : 'bg-[#141414] border-white/5 text-[#A5A5A5] hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="font-serif text-lg font-bold text-[#E5CD91] mb-0.5">
                      {dur.value} мин
                    </div>
                    <div className="text-[11px] opacity-80 truncate">
                      {lang === 'kk' ? dur.labelKk.split('(')[1]?.replace(')', '') : dur.labelRu.split('(')[1]?.replace(')', '')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Number of Characters */}
            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A45C] font-semibold mb-3">
                <Users className="w-3.5 h-3.5" />
                <span>3. {lang === 'kk' ? 'Басты кейіпкерлер саны' : 'Количество персонажей'}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {PRICING_CONFIG.characterOptions.map((char) => (
                  <button
                    key={char.value}
                    type="button"
                    onClick={() => setSelectedCharacters(char.value)}
                    className={`p-3 rounded-xl text-xs text-left transition-all duration-200 border ${
                      selectedCharacters === char.value
                        ? 'bg-[#C9A45C]/20 border-[#C9A45C] text-white font-semibold'
                        : 'bg-[#141414] border-white/5 text-[#A5A5A5] hover:text-white hover:border-white/20'
                    }`}
                  >
                    {lang === 'kk' ? char.labelKk : char.labelRu}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Voiceover & Sound */}
            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A45C] font-semibold mb-3">
                <Mic className="w-3.5 h-3.5" />
                <span>4. {lang === 'kk' ? 'Дыбыстау және диктор' : 'Озвучка и саунд-дизайн'}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PRICING_CONFIG.voiceoverOptions.map((voice) => (
                  <button
                    key={voice.value}
                    type="button"
                    onClick={() => setSelectedVoiceover(voice.value)}
                    className={`p-3 rounded-xl text-xs text-left transition-all duration-200 border ${
                      selectedVoiceover === voice.value
                        ? 'bg-[#C9A45C]/20 border-[#C9A45C] text-white font-semibold'
                        : 'bg-[#141414] border-white/5 text-[#A5A5A5] hover:text-white hover:border-white/20'
                    }`}
                  >
                    {lang === 'kk' ? voice.labelKk : voice.labelRu}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Delivery Speed */}
            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A45C] font-semibold mb-3">
                <Zap className="w-3.5 h-3.5" />
                <span>5. {lang === 'kk' ? 'Дайындау мерзімі' : 'Сроки изготовления'}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PRICING_CONFIG.deliveryOptions.map((speed) => (
                  <button
                    key={speed.value}
                    type="button"
                    onClick={() => setSelectedDelivery(speed.value)}
                    className={`p-3 rounded-xl text-xs text-left transition-all duration-200 border ${
                      selectedDelivery === speed.value
                        ? 'bg-[#C9A45C]/20 border-[#C9A45C] text-white font-semibold'
                        : 'bg-[#141414] border-white/5 text-[#A5A5A5] hover:text-white hover:border-white/20'
                    }`}
                  >
                    {lang === 'kk' ? speed.labelKk : speed.labelRu}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Estimate Summary Box */}
          <div className="lg:col-span-4 bg-[#080808] border border-[#C9A45C]/40 rounded-2xl p-6 sm:p-7 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <span className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold">
                {lang === 'kk' ? 'Есептеу қорытындысы' : 'Итог расчета'}
              </span>
              <Sparkles className="w-4 h-4 text-[#C9A45C]" />
            </div>

            {/* Official Notice: Custom Calculation */}
            <div className="mb-6 p-4 rounded-xl bg-[#141414] border border-[#C9A45C]/20 text-center">
              <span className="text-xs text-[#A5A5A5] block mb-1">
                {lang === 'kk' ? 'Ресми баға саясаты' : 'Ценовая политика'}
              </span>
              <div className="font-serif text-2xl font-bold text-gold-metallic">
                {lang === 'kk' ? PRICING_CONFIG.noticeKk : PRICING_CONFIG.noticeRu}
              </div>
              <p className="text-[11px] text-[#A5A5A5] mt-2 leading-relaxed">
                {lang === 'kk'
                  ? 'Бағасы кейіпкерлердің күрделілігіне, сюжет көлеміне және жеке тілектеріңізге байланысты нақтыланады.'
                  : 'Стоимость формируется с учетом сложности персонажей, хронометража и ваших индивидуальных пожеланий.'}
              </p>
            </div>

            {/* Selected Spec Overview */}
            <div className="space-y-3 mb-6 text-xs border-b border-white/10 pb-5">
              <div className="flex justify-between items-center text-[#A5A5A5]">
                <span>{lang === 'kk' ? 'Бағыты:' : 'Направление:'}</span>
                <span className="text-white font-medium">
                  {lang === 'kk' ? currentFilmTypeObj?.labelKk : currentFilmTypeObj?.labelRu}
                </span>
              </div>
              <div className="flex justify-between items-center text-[#A5A5A5]">
                <span>{lang === 'kk' ? 'Ұзақтығы:' : 'Длительность:'}</span>
                <span className="text-white font-medium">{selectedDuration} мин</span>
              </div>
              <div className="flex justify-between items-center text-[#A5A5A5]">
                <span>{lang === 'kk' ? 'Кейіпкерлер:' : 'Персонажи:'}</span>
                <span className="text-white font-medium">{selectedCharacters}</span>
              </div>
              <div className="flex justify-between items-center text-[#A5A5A5]">
                <span>{lang === 'kk' ? 'Дыбыстау:' : 'Озвучка:'}</span>
                <span className="text-white font-medium">
                  {selectedVoiceover === 'with' ? (lang === 'kk' ? 'Диктор' : 'Диктор') : (lang === 'kk' ? 'Әуен' : 'Музыка')}
                </span>
              </div>
              <div className="flex justify-between items-center text-[#A5A5A5]">
                <span>{lang === 'kk' ? 'Мерзімі:' : 'Срок:'}</span>
                <span className="text-white font-medium">
                  {selectedDelivery === 'standard' ? (lang === 'kk' ? '7-10 күн' : '7-10 дней') : (lang === 'kk' ? '3-5 күн' : '3-5 дней')}
                </span>
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A45C] via-[#E5CD91] to-[#C9A45C] text-[#080808] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-xl shadow-[#C9A45C]/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 text-[#080808]" />
              <span>{lang === 'kk' ? 'WhatsApp арқылы бағаны білу' : 'Узнать точную стоимость в WhatsApp'}</span>
            </button>

            {/* Direct link under the button */}
            <div className="pt-2 text-center">
              <a
                href={getDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:text-[#4ade80] font-mono font-medium transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp: 87760920212</span>
                <ExternalLink className="w-3 h-3 text-[#A5A5A5]" />
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-[#A5A5A5]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>{lang === 'kk' ? 'Тегін кеңес және жеке есеп' : 'Бесплатная консультация и расчет'}</span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
