'use client';

import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import SayulitaMassage from '@/components/SayulitaMassage/SayulitaMassage';

export default function SayulitaMassagePage() {
  const { language } = useLanguage();
  return <SayulitaMassage language={language} />;
}
