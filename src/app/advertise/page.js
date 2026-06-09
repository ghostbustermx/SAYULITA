'use client';

import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import Advertise from '@/components/Advertise/Advertise';

export default function AdvertisePage() {
  const { language } = useLanguage();
  return <Advertise language={language} />;
}
