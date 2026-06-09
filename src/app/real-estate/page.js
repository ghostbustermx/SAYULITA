'use client';

import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import RealEstatePage from '@/components/RealEstatePage/RealEstatePage';

export default function RealEstate() {
  const { language } = useLanguage();
  return <RealEstatePage language={language} />;
}
