import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import FloatingPalms from '../FloatingPalms/FloatingPalms';
import categoryBeachfront from '../../assets/category-beachfront.webp';
import villaEmma from '../../assets/villa-emma.webp';
import casaAmigos from '../../assets/casa-amigos.webp';
import villaRosetta from '../../assets/villa-rosetta.webp';
import beachHotel from '../../assets/beach-hotel.webp';
import './RentalCategories.css';

const i18n = {
  ENG: {
    label: "Popular Categories",
    title: "Explore Sayulita by Category",
    subtitle: "Quick-access tiles to find exactly what you're looking for."
  },
  ESP: {
    label: "Categorías Populares",
    title: "Explora Sayulita por Categoría",
    subtitle: "Acceso rápido para encontrar exactamente lo que buscas."
  }
};

const categories = [
  { name: 'Luxury Villas', image: villaEmma.src, count: '85+', href: '#luxury-villas' },
  { name: 'Beachfront', image: categoryBeachfront.src, count: '120+', href: '#beachfront' },
  { name: 'Family Friendly', image: villaRosetta.src, count: '200+', href: '#family' },
  { name: 'Restaurants', image: casaAmigos.src, count: '300+', href: '#restaurants' },
  { name: 'Surfing', image: beachHotel.src, count: '40+', href: '#surfing' },
];

export default function RentalCategories({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  return (
    <section className="rental-categories section" id="rental-categories">
      <FloatingPalms />
      <div className="container">
        <SectionHeader
          label={t.label}
          title={t.title}
          subtitle={t.subtitle}
        />

        <div className="rental-categories__grid">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href={cat.href}
              className="category-tile"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03 }}
              id={`category-${cat.name.toLowerCase().replace(/\s/g, '-')}`}
            >
              <img src={cat.image} alt={cat.name} className="category-tile__image" loading="lazy" decoding="async" />
              <div className="category-tile__overlay" />
              <div className="category-tile__content">
                <span className="category-tile__name">{cat.name}</span>
                <span className="category-tile__count">{cat.count} listings</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
