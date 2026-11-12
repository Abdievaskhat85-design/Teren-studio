/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { HowItWorks } from './components/HowItWorks';
import { PricingCalculator } from './components/PricingCalculator';
import { OrderForm } from './components/OrderForm';
import { Testimonials } from './components/Testimonials';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { ConfigModal } from './components/ConfigModal';
import { WhatsAppSticky } from './components/WhatsAppSticky';

import { Language, PortfolioItem, ServiceItem } from './types';
import {
  isWhatsAppConfigured,
  buildWhatsAppUrl,
  generateServiceOrderMessage,
  generatePortfolioOrderMessage,
  generateCalculatorMessage,
  generateOrderFormMessage,
  OrderFormValues,
  PricingCalculatorValues,
} from './utils/whatsapp';

export default function App() {
  const [lang, setLang] = useState<Language>('kk');
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  // Core WhatsApp dispatch handler
  const handleOpenWhatsAppWithMessage = (message: string) => {
    if (isWhatsAppConfigured()) {
      const url = buildWhatsAppUrl(message);
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setPrefilledMessage(message);
      setIsConfigModalOpen(true);
    }
  };

  // 1. General order / Consultation click
  const handleGeneralOrder = () => {
    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 2. Scroll to portfolio
  const handleScrollToPortfolio = () => {
    const portfolioElem = document.querySelector('#portfolio');
    if (portfolioElem) {
      portfolioElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3. Order similar film from Portfolio
  const handleOrderSimilar = (item: PortfolioItem) => {
    setSelectedVideo(null);
    const title = lang === 'kk' ? item.titleKk : item.titleRu;
    const msg = generatePortfolioOrderMessage(title, lang);
    handleOpenWhatsAppWithMessage(msg);
  };

  // 4. Order specific service
  const handleOrderService = (service: ServiceItem) => {
    setPreselectedService(service.categoryKey);
    const title = lang === 'kk' ? service.titleKk : service.titleRu;
    const msg = generateServiceOrderMessage(title, lang);
    handleOpenWhatsAppWithMessage(msg);
  };

  // 5. Calculator Quote Request
  const handleCalculatorQuote = (values: PricingCalculatorValues) => {
    const msg = generateCalculatorMessage(values, lang);
    handleOpenWhatsAppWithMessage(msg);
  };

  // 6. Full Order Form submission
  const handleOrderFormSubmit = (values: OrderFormValues) => {
    const msg = generateOrderFormMessage(values, lang);
    handleOpenWhatsAppWithMessage(msg);
  };

  // 7. General WhatsApp button click
  const handleGeneralWhatsApp = () => {
    const msg = lang === 'kk'
      ? 'Сәлеметсіз бе, TEREN STUDIO! Мен жеке фильмге тапсырыс беру және бағасын білу бойынша кеңес алғым келеді.'
      : 'Здравствуйте, TEREN STUDIO! Я хочу получить консультацию по заказу персонального фильма.';
    handleOpenWhatsAppWithMessage(msg);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F7F4EF] selection:bg-[#C9A45C]/30 selection:text-[#E5CD91]">
      {/* Top Bar Navigation */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        onOpenOrder={handleGeneralOrder}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Cinematic Hero */}
        <Hero
          lang={lang}
          onOpenOrder={handleGeneralOrder}
          onScrollToPortfolio={handleScrollToPortfolio}
        />

        {/* 2. Portfolio Showcase */}
        <Portfolio
          lang={lang}
          onSelectVideo={setSelectedVideo}
          onOrderSimilar={handleOrderSimilar}
        />

        {/* 3. Production Workflow */}
        <HowItWorks lang={lang} />

        {/* 5. Pricing & Interactive Estimator */}
        <PricingCalculator
          lang={lang}
          onSendQuoteRequest={handleCalculatorQuote}
        />

        {/* 6. Authentic Reviews & Feedback */}
        <Testimonials lang={lang} />

        {/* 7. Official Instagram Channel */}
        <InstagramSection lang={lang} />

        {/* 8. Direct Order Form */}
        <OrderForm
          lang={lang}
          onSubmitOrder={handleOrderFormSubmit}
          preselectedService={preselectedService}
        />
      </main>

      {/* Elegant Black & Gold Footer */}
      <Footer
        lang={lang}
        onSelectService={handleOrderService}
        onOpenWhatsApp={handleGeneralWhatsApp}
      />

      {/* Video Modal Player */}
      <VideoModal
        item={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        lang={lang}
        onOrderSimilar={handleOrderSimilar}
      />

      {/* Configuration & Instagram Fallback Modal */}
      <ConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        lang={lang}
        prefilledMessage={prefilledMessage}
      />

      {/* Sticky WhatsApp Floating Contact Button */}
      <WhatsAppSticky
        lang={lang}
        onOpen={handleGeneralWhatsApp}
      />
    </div>
  );
}
