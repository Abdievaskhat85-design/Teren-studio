import { STUDIO_CONFIG } from '../config/siteConfig';
import { Language } from '../types';

export interface OrderFormValues {
  name: string;
  phone: string;
  filmType: string;
  duration: string;
  eventDate: string;
  details: string;
}

export interface PricingCalculatorValues {
  filmType: string;
  duration: string;
  characters: string;
  voiceover: string;
  delivery: string;
}

/**
 * Checks whether a valid studio WhatsApp phone number has been configured.
 */
export function isWhatsAppConfigured(): boolean {
  const num = STUDIO_CONFIG.whatsappNumber?.trim();
  return Boolean(num && num.length >= 8 && !num.includes('0000000'));
}

/**
 * Clean phone number for URL (handles KZ 8XXXXXXXXXX -> 7XXXXXXXXXX)
 */
export function sanitizePhone(phone: string): string {
  let cleaned = phone.replace(/[^\d]/g, '');
  if (cleaned.startsWith('8') && cleaned.length === 11) {
    cleaned = '7' + cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Direct WhatsApp chat URL without prefilled text
 */
export function getDirectWhatsAppUrl(): string {
  const phone = sanitizePhone(STUDIO_CONFIG.whatsappNumber || '77760920212');
  return `https://wa.me/${phone}`;
}

/**
 * Build WhatsApp click-to-chat URL
 */
export function buildWhatsAppUrl(messageText: string): string {
  const phone = sanitizePhone(STUDIO_CONFIG.whatsappNumber || '77760920212');
  const encoded = encodeURIComponent(messageText);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Message for ordering a specific service
 */
export function generateServiceOrderMessage(serviceTitle: string, lang: Language): string {
  if (lang === 'kk') {
    return `Сәлеметсіз бе, TEREN STUDIO! 👋\n\nМен «${serviceTitle}» фильміне тапсырыс беру бойынша ақпарат пен кеңес алғым келеді. Толығырақ айтып бересіз бе?`;
  }
  return `Здравствуйте, TEREN STUDIO! 👋\n\nЯ хочу узнать подробнее и заказать фильм «${serviceTitle}». Подскажите, пожалуйста, детали и сроки?`;
}

/**
 * Message for ordering a similar portfolio film
 */
export function generatePortfolioOrderMessage(filmTitle: string, lang: Language): string {
  if (lang === 'kk') {
    return `Сәлеметсіз бе, TEREN STUDIO! ✨\n\nСіздердің «${filmTitle}» жұмыстарыңызды көрдім. Біздің де мерекеге осыған ұқсас ерекше фильм жасағымыз келеді. Бағасы мен дайындау барысын білгім келеді.`;
  }
  return `Здравствуйте, TEREN STUDIO! ✨\n\nУвидел вашу работу «${filmTitle}». Хотим заказать похожий фильм для нашего торжества. Подскажите стоимость и процесс заказа.`;
}

/**
 * Message from Pricing Calculator
 */
export function generateCalculatorMessage(values: PricingCalculatorValues, lang: Language): string {
  if (lang === 'kk') {
    return `Сәлеметсіз бе, TEREN STUDIO! 🎬\n\nСайттағы калькулятор арқылы фильмнің бағасын есептегім келеді:\n` +
      `• Фильм түрі: ${values.filmType}\n` +
      `• Ұзақтығы: ${values.duration}\n` +
      `• Кейіпкерлер саны: ${values.characters}\n` +
      `• Дауыстау/диктор: ${values.voiceover}\n` +
      `• Мерзімі: ${values.delivery}\n\n` +
      `Осы талаптар бойынша құнын есептеп берсеңіздер. Рақмет!`;
  }
  return `Здравствуйте, TEREN STUDIO! 🎬\n\nХочу рассчитать стоимость фильма по моим параметрам:\n` +
    `• Тип фильма: ${values.filmType}\n` +
    `• Длительность: ${values.duration}\n` +
    `• Количество персонажей: ${values.characters}\n` +
    `• Озвучка/диктор: ${values.voiceover}\n` +
    `• Срок выполнения: ${values.delivery}\n\n` +
    `Подскажите, пожалуйста, индивидуальный расчет стоимости. Спасибо!`;
}

/**
 * Message from full Order Form
 */
export function generateOrderFormMessage(values: OrderFormValues, lang: Language): string {
  if (lang === 'kk') {
    return `Сәлеметсіз бе, TEREN STUDIO! ✨\nЖаңа фильмге ресми тапсырыс:\n\n` +
      `👤 Аты-жөні: ${values.name}\n` +
      `📞 Телефон: ${values.phone}\n` +
      `🎞 Фильм бағыты: ${values.filmType}\n` +
      `⏱ Ұзақтығы: ${values.duration}\n` +
      `📅 Мереке күні: ${values.eventDate || 'Әлі белгіленбеді'}\n` +
      `📝 Қосымша мәлімет: ${values.details || 'Жоқ'}\n\n` +
      `Тапсырысымды қабылдап, кеңес беруіңізді күтемін.`;
  }
  return `Здравствуйте, TEREN STUDIO! ✨\nЗаказ на создание фильма:\n\n` +
    `👤 Имя: ${values.name}\n` +
    `📞 Телефон: ${values.phone}\n` +
    `🎞 Направление фильма: ${values.filmType}\n` +
    `⏱ Длительность: ${values.duration}\n` +
    `📅 Дата мероприятия: ${values.eventDate || 'Пока не назначена'}\n` +
    `📝 Дополнительные пожелания: ${values.details || 'Нет'}\n\n` +
    `Жду обратной связи и консультации по заказу.`;
}
