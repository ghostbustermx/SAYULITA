'use client';

import LanguageProvider, { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

function LayoutContent({ children }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="app">
      <Navbar language={language} setLanguage={setLanguage} />
      <main>{children}</main>
      <Footer language={language} />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
}

export default function ClientLayout({ children }) {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
}
