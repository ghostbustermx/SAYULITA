'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function SwiperDeck({
  slides,
  spaceBetween = 24,
  slidesPerView = 1,
  autoplayDelay = 6000,
  className = '',
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
      breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      className={className}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
}
