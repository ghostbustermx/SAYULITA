'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SwiperDeck = dynamic(() => import('./SwiperDeck'), { ssr: false });

export default function LazySwiper({
  slides,
  spaceBetween = 24,
  autoplayDelay = 6000,
  className = '',
}) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || active || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [active]);

  if (active) {
    return (
      <div ref={containerRef}>
        <SwiperDeck
          slides={slides}
          spaceBetween={spaceBetween}
          autoplayDelay={autoplayDelay}
          className={className}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`swiper lazy-swiper ${className}`.trim()}>
      <div className="swiper-wrapper" style={{ gap: `${spaceBetween}px` }}>
        {slides.map((slide, i) => (
          <div className="swiper-slide" key={i}>
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}
