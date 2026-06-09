'use client';

import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import HousesPage from '@/components/HousesPage/HousesPage';

export default function Houses() {
  const { language } = useLanguage();
  return <HousesPage language={language} />;
}
