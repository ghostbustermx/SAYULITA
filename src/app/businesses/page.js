'use client';

import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import BusinessesPage from '@/components/BusinessesPage/BusinessesPage';

export default function Businesses() {
  const { language } = useLanguage();
  return <BusinessesPage language={language} />;
}
