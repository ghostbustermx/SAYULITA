import { motion } from 'framer-motion';
import SearchBar from '../SearchBar/SearchBar';
import heroBgLandscape from '../../assets/hero-bg-landscape.webp';
import heroBgPortrait from '../../assets/hero-bg-portrait.webp';
import './Hero.css';

const i18n = {
  ENG: {
    title: <>Sayulita Vacation Rentals<span className="hero__title-accent"> — No Booking Fees,</span><br />Best Prices Guaranteed</>,
    subtitle: "The price you see is the price you pay. No service fees. No Airbnb surcharges. Just the best Sayulita rentals at the real price — booked directly with the owner.",
    tagsLabel: "Popular searches:",
    popularTags: ['Beachfront', 'Villas with pool', 'Family-friendly', 'Pet-friendly', 'Long-term']
  },
  ESP: {
    title: <>Rentas Vacacionales en Sayulita<span className="hero__title-accent"> — Sin Comisiones,</span><br />Mejores Precios Garantizados</>,
    subtitle: "El precio que ves es el precio que pagas. Sin cargos por servicio. Sin recargos de Airbnb. Solo las mejores rentas en Sayulita al precio real — reservadas directamente con el dueño.",
    tagsLabel: "Búsquedas populares:",
    popularTags: ['Frente al mar', 'Villas con alberca', 'Familiares', 'Mascotas permitidas', 'Larga estancia']
  }
};

export default function Hero({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  const popularTags = t.popularTags;
  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <picture>
          <source media="(max-width: 768px)" srcSet={heroBgPortrait.src} />
          <img
            src={heroBgLandscape.src}
            alt="Sayulita Beach Panoramic View"
            className="hero__bg-img"
            width={1024}
            height={544}
            fetchPriority="high"
          />
        </picture>
        <div className="hero__overlay" />
      </div>

      <div className="hero__content container">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <h1 className="hero__title" id="hero-title">{t.title}</h1>
          <p className="hero__subtitle">{t.subtitle}</p>
        </motion.div>

        <motion.div
          className="hero__search"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          <SearchBar />
        </motion.div>

        <motion.div
          className="hero__tags"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="hero__tags-label">{t.tagsLabel}</span>
          {popularTags.map((tag) => (
            <a key={tag} href={`#${tag.toLowerCase().replace(/\s/g, '-')}`} className="hero__tag">
              {tag}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="hero__scroll-dot"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
