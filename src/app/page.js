'use client';

import { useLanguage } from '@/components/LanguageProvider/LanguageProvider';
import Hero from '@/components/Hero/Hero';
import RentalCategories from '@/components/RentalCategories/RentalCategories';
import RentalTypes from '@/components/RentalTypes/RentalTypes';
import WhyBookDirect from '@/components/WhyBookDirect/WhyBookDirect';
import FeaturedRentals from '@/components/FeaturedRentals/FeaturedRentals';
import Testimonials from '@/components/Testimonials/Testimonials';
import PlanningGuide from '@/components/PlanningGuide/PlanningGuide';
import FAQ from '@/components/FAQ/FAQ';
import ExploreSection from '@/components/ExploreSection/ExploreSection';

export default function HomePage() {
  const { language } = useLanguage();

  return (
    <>
      <Hero language={language} />
      <RentalCategories language={language} />
      <RentalTypes language={language} />
      <WhyBookDirect language={language} />
      <FeaturedRentals language={language} />
      <Testimonials language={language} />
      <PlanningGuide language={language} />
      <FAQ language={language} />
      <ExploreSection language={language} />
    </>
  );
}
