import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import FloatingPalms from '../FloatingPalms/FloatingPalms';
import './ExploreSection.css';

const exploreItems = [
  { icon: '🌮', href: '/businesses', color: '#f9a825' },
  { icon: '🏄‍♂️', href: '/tours', color: '#006399' },
  { icon: '🚐', href: '/transportation', color: '#2c694e' },
  { icon: '🏡', href: '/real-estate', color: '#835400' },
  { icon: '🌴', href: '#about', color: '#12533a' },
];

const i18n = {
  ENG: {
    label: "Plan Your Vacation",
    title: "Explore Sayulita — Your Best Local Guide Online",
    subtitle: "SayulitaTravel isn't just a rental platform. Together we will make it the most complete Sayulita resource on the internet — built by people who live here.",
    items: [
      { title: 'Restaurants & Bars', desc: '300+ local spots reviewed and updated' },
      { title: 'Things to Do', desc: 'Surf, yoga, whale watching, turtle rescue and more' },
      { title: 'Getting Here', desc: 'Transport options from Puerto Vallarta explained clearly' },
      { title: 'Real Estate', desc: 'Buying in Sayulita? 170+ properties listed' },
      { title: 'About Sayulita', desc: 'Safety, weather, local culture, travel tips — all current' },
    ],
  },
  ESP: {
    label: "Planifica tus Vacaciones",
    title: "Explora Sayulita — Tu Mejor Guía Local Online",
    subtitle: "SayulitaTravel no es solo una plataforma de rentas. Juntos haremos que sea el recurso más completo de Sayulita en internet — construido por personas que viven aquí.",
    items: [
      { title: 'Restaurantes y Bares', desc: '300+ lugares locales reseñados y actualizados' },
      { title: 'Qué Hacer', desc: 'Surf, yoga, avistamiento de ballenas, rescate de tortugas y más' },
      { title: 'Cómo Llegar', desc: 'Opciones de transporte desde Puerto Vallarta explicadas claramente' },
      { title: 'Bienes Raíces', desc: '¿Comprar en Sayulita? Más de 170 propiedades listadas' },
      { title: 'Acerca de Sayulita', desc: 'Seguridad, clima, cultura local, consejos de viaje — todo actualizado' },
    ],
  },
};

export default function ExploreSection({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  return (
    <section className="explore section" id="explore">
      <FloatingPalms />
      <div className="container">
        <SectionHeader
          label={t.label}
          title={t.title}
          subtitle={t.subtitle}
        />

        <div className="explore__grid">
          {exploreItems.map((item, i) => {
            const data = t.items[i];
            return (
              <motion.a
                key={i}
                href={item.href}
                className="explore-card"
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
                id={`explore-${i}`}
              >
                <div 
                  className="explore-card__icon-wrap"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <span className="explore-card__icon">{item.icon}</span>
                </div>
                <div className="explore-card__content">
                  <h3 className="explore-card__title">{data.title}</h3>
                  <p className="explore-card__desc">{data.desc}</p>
                </div>
                <FiArrowRight className="explore-card__arrow" style={{ color: item.color }} />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
