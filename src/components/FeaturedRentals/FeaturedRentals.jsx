import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import FloatingPalms from '../FloatingPalms/FloatingPalms';

import villaEmma from '../../assets/villa-emma.png';
import villaRosetta from '../../assets/villa-rosetta.png';
import casaAmigos from '../../assets/casa-amigos.png';
import beachHotel from '../../assets/beach-hotel.webp';

import './FeaturedRentals.css';

const i18n = {
  ENG: {
    label: "Sayulita's Best & Finest",
    title: "Featured Sayulita Vacation Rentals This Week",
    subtitle: "Hand-picked properties verified by our local team. Every listing is real, every price is final.",
    startsFrom: "Starts from",
    night: "/night",
    bookNow: "Book Now",
    bedroom: "Bedroom",
    bedrooms: "Bedrooms",
    cta: "See all 650+ rentals"
  },
  ESP: {
    label: "Lo Mejor de Sayulita",
    title: "Rentas Vacacionales Destacadas de Sayulita Esta Semana",
    subtitle: "Propiedades seleccionadas y verificadas por nuestro equipo local. Cada listado es real, cada precio es final.",
    startsFrom: "Desde",
    night: "/noche",
    bookNow: "Reservar Ahora",
    bedroom: "Recámara",
    bedrooms: "Recámaras",
    cta: "Ver todas las 650+ rentas"
  }
};

const rentals = [
  {
    id: 1,
    name: 'Villa Emma',
    image: villaEmma.src,
    price: 600,
    bedrooms: 5,
    location: 'North Shore',
    features: ['Pool', 'Ocean View', 'Staff'],
    badge: 'Featured',
  },
  {
    id: 2,
    name: 'Villa Rosetta',
    image: villaRosetta.src,
    price: 495,
    bedrooms: 4,
    location: 'Hilltop',
    features: ['Pool', 'Garden', 'BBQ'],
    badge: 'Popular',
  },
  {
    id: 3,
    name: 'Casa Amigos',
    image: casaAmigos.src,
    price: 495,
    bedrooms: 3,
    location: 'Town Center',
    features: ['Pool', 'Ocean View'],
    badge: null,
  },
  {
    id: 4,
    name: 'AzulPlayita Beach Hotel',
    image: beachHotel.src,
    price: 115,
    bedrooms: 1,
    location: 'Beachfront',
    features: ['Pool', 'Beach Access'],
    badge: 'Best Value',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function FeaturedRentals({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  return (
    <section className="featured-rentals section" id="featured-rentals">
      <FloatingPalms />
      <div className="container">
        <SectionHeader
          label={t.label}
          title={t.title}
          subtitle={t.subtitle}
        />

        <div className="featured-rentals__grid">
          {rentals.map((rental, i) => (
            <motion.article
              key={rental.id}
              className="rental-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              id={`rental-card-${rental.id}`}
            >
              <div className="rental-card__image-wrap">
                <img src={rental.image} alt={rental.name} className="rental-card__image" />
                <div className="rental-card__image-overlay" />
                {rental.badge && (
                  <span className={`rental-card__badge rental-card__badge--${rental.badge.toLowerCase().replace(' ', '-')}`}>
                    {rental.badge}
                  </span>
                )}
              </div>
              <div className="rental-card__body">
                <h3 className="rental-card__name">{rental.name}</h3>
                <div className="rental-card__meta">
                  <span className="rental-card__meta-item">
                    <HiOutlineLocationMarker size={14} /> {rental.location}
                  </span>
                  <span className="rental-card__meta-item">
                    <IoBedOutline size={14} /> {rental.bedrooms} {rental.bedrooms === 1 ? t.bedroom : t.bedrooms}
                  </span>
                </div>
                <div className="rental-card__features">
                  {rental.features.map((f) => (
                    <span key={f} className="rental-card__feature">{f}</span>
                  ))}
                </div>
                <div className="rental-card__footer">
                  <div className="rental-card__price">
                    <span className="rental-card__price-label">{t.startsFrom}</span>
                    <span className="rental-card__price-amount">${rental.price}<span>{t.night}</span></span>
                  </div>
                  <button className="rental-card__book-btn" id={`book-${rental.id}`}>
                    {t.bookNow}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="featured-rentals__cta">
          <Button variant="outline" size="lg" icon={<FiArrowRight />} href="#all-rentals">
            {t.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
