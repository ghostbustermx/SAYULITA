'use client';

import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import HotelsPage from '@/components/HotelsPage/HotelsPage';

export default function Hotels() {
  const { language } = useLanguage();
  return <HotelsPage language={language} />;
}
