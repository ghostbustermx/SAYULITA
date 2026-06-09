'use client';

import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import SurfLessonsPage from '@/components/SurfLessonsPage/SurfLessonsPage';

export default function SurfLessons() {
  const { language } = useLanguage();
  return <SurfLessonsPage language={language} />;
}
