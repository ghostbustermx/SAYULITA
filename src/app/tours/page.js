'use client';

import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import ToursPage from '@/components/ToursPage/ToursPage';

export default function Tours() {
  const { language } = useLanguage();
  return <ToursPage language={language} />;
}
