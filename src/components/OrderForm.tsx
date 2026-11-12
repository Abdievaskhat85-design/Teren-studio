import React, { useState } from 'react';
import { PRICING_CONFIG, STUDIO_CONFIG } from '../config/siteConfig';
import { Language } from '../types';
import { Send, Sparkles, Calendar, Phone, User, Film, Clock, FileText, CheckCircle2, MessageCircle, ExternalLink } from 'lucide-react';
import { OrderFormValues, getDirectWhatsAppUrl } from '../utils/whatsapp';

interface OrderFormProps {
  lang: Language;
  onSubmitOrder: (values: OrderFormValues) => void;
  preselectedService?: string;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  lang,
  onSubmitOrder,
  preselectedService,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [filmType, setFilmType] = useState(preselectedService || PRICING_CONFIG.filmTypes[0].id);
  const [duration, setDuration] = useState('3');
  const [eventDate, setEventDate] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const errs: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      errs.name = lang === 'kk' ? 'Атыңызды енгізіңіз' : 'Введите ваше имя';
    }
    if (!phone.trim() || phone.replace(/[^\d]/g, '').length < 8) {
      errs.phone = lang === 'kk' ? 'Дұрыс телефон нөмірін енгізіңіз' : 'Введите корректный номер телефона';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const filmTypeObj = PRICING_CONFIG.filmTypes.find((f) => f.id === filmType);
    const filmTypeLabel = lang === 'kk' ? filmTypeObj?.labelKk || filmType : filmTypeObj?.labelRu || filmType;

    const values: OrderFormValues = {
      name: name.trim(),
      phone: phone.trim(),
      filmType: filmTypeLabel,
      duration: `${duration} ${lang === 'kk' ? 'минут' : 'минут'}`,
      eventDate: eventDate.trim(),
      details: details.trim(),
    };

    onSubmitOrder(values);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#080808] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A45C] font-semibold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>DIRECT ORDER</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            {lang === 'kk' ? (
              <>
                Өз фильміңізге <span className="text-gold-metallic">тапсырыс беріңіз</span>
              </>
            ) : (
              <>
                Закажите свой <span className="text-gold-metallic">персональный фильм</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#A5A5A5] leading-relaxed">
            {lang === 'kk'
              ? 'Форманы толтырыңыз — біз сізбен байланысып, оқиғаңыз бен суреттеріңізді қабылдаймыз.'
              : 'Заполните форму — мы свяжемся с вами, чтобы обсудить сюжет и принять архивные фото.'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#141414] border border-[#C9A45C]/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A45C] font-semibold mb-2">
                  <User className="w-3.5 h-3.5" />
                  <span>{lang === 'kk' ? 'Атыңыз' : 'Ваше имя'} *</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'kk' ? 'Мысалы: Айгүл немесе Бауыржан' : 'Например: Айгуль или Бауржан'}
                  className={`w-full px-4 py-3 rounded-xl bg-[#080808] border text-white text-sm placeholder-[#A5A5A5]/50 focus:outline-none focus:ring-1 transition-all ${
                    errors.name ? 'border-rose-500/80 focus:ring-rose-500' : 'border-white/10 focus:border-[#C9A45C] focus:ring-[#C9A45C]'
                  }`}
                />
                {errors.name && <p className="text-rose-400 text-xs mt-1.5">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A45C] font-semibold mb-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'kk' ? 'Телефон нөміріңіз' : 'Номер телефона'} *</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (7XX) XXX-XX-XX"
                  className={`w-full px-4 py-3 rounded-xl bg-[#080808] border text-white text-sm placeholder-[#A5A5A5]/50 focus:outline-none focus:ring-1 transition-all ${
                    errors.phone ? 'border-rose-500/80 focus:ring-rose-500' : 'border-white/10 focus:border-[#C9A45C] focus:ring-[#C9A45C]'
                  }`}
                />
                {errors.phone && <p className="text-rose-400 text-xs mt-1.5">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Film Type */}
              <div>
                <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A45C] font-semibold mb-2">
                  <Film className="w-3.5 h-3.5" />
                  <span>{lang === 'kk' ? 'Қандай фильм қажет?' : 'Какой фильм вам нужен?'}</span>
                </label>
                <select
                  value={filmType}
                  onChange={(e) => setFilmType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A45C] focus:ring-1 focus:ring-[#C9A45C] transition-all"
                >
                  {PRICING_CONFIG.filmTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {lang === 'kk' ? type.labelKk : type.labelRu}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A45C] font-semibold mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{lang === 'kk' ? 'Фильм ұзақтығы' : 'Длительность фильма'}</span>
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A45C] focus:ring-1 focus:ring-[#C9A45C] transition-all"
                >
                  <option value="1">1 {lang === 'kk' ? 'минут' : 'минута'}</option>
                  <option value="2">2 {lang === 'kk' ? 'минут' : 'минуты'}</option>
                  <option value="3">3 {lang === 'kk' ? 'минут (Ұсынылатын)' : 'минуты (Рекомендуется)'}</option>
                  <option value="5">5 {lang === 'kk' ? 'минут (Толық метраж)' : 'минут (Полный метр)'}</option>
                </select>
              </div>
            </div>

            {/* Event Date */}
            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A45C] font-semibold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{lang === 'kk' ? 'Мерекенің күні' : 'Дата мероприятия'}</span>
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A45C] focus:ring-1 focus:ring-[#C9A45C] transition-all"
              />
            </div>

            {/* Additional info */}
            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A45C] font-semibold mb-2">
                <FileText className="w-3.5 h-3.5" />
                <span>{lang === 'kk' ? 'Қосымша ақпарат немесе тілектеріңіз' : 'Дополнительная информация и пожелания'}</span>
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={lang === 'kk' ? 'Тойдың өтетін орны, кейіпкерлер туралы қысқаша мәлімет немесе арнайы өтініштер...' : 'Место проведения, кратко о героях, важные памятные детали или пожелания по стилю...'}
                className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-white text-sm placeholder-[#A5A5A5]/50 focus:outline-none focus:border-[#C9A45C] focus:ring-1 focus:ring-[#C9A45C] transition-all resize-none"
              />
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A45C] via-[#E5CD91] to-[#C9A45C] text-[#080808] font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-xl shadow-[#C9A45C]/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send className="w-4 h-4 text-[#080808]" />
                <span>{lang === 'kk' ? 'WhatsApp арқылы тапсырыс беру' : 'Заказать через WhatsApp'}</span>
              </button>
            </div>

            {/* Direct WhatsApp Link directly under the button */}
            <div className="pt-2 text-center flex flex-col sm:flex-row items-center justify-center gap-2">
              <span className="text-xs text-[#A5A5A5]">
                {lang === 'kk' ? 'WhatsApp-қа тікелей өту:' : 'Прямая ссылка на WhatsApp:'}
              </span>
              <a
                href={getDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080808] hover:bg-[#1f2922] border border-[#25D366]/50 text-[#25D366] hover:text-[#4ade80] text-xs font-mono font-semibold transition-all shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current text-[#25D366]" />
                <span>87760920212</span>
                <span className="text-[#A5A5A5] font-sans text-[11px]">(+7 776 092 02 12)</span>
                <ExternalLink className="w-3 h-3 text-[#A5A5A5]" />
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-[#A5A5A5] pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>
                {lang === 'kk'
                  ? 'Деректеріңіз құпия сақталады және тек фильм сценарийі үшін пайдаланылады'
                  : 'Ваши данные конфиденциальны и используются только для сценария фильма'}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
