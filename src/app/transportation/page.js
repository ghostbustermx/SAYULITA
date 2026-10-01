'use client';

import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import TransportationPage from '@/components/TransportationPage/TransportationPage';

export default function Transportation() {
  const { language } = useLanguage();
  return <TransportationPage language={language} />;
}
