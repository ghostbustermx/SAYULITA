import { motion } from 'framer-motion';
import './SectionHeader.css';

export default function SectionHeader({ label, title, subtitle, align = 'center', light = false }) {
  return (
    <motion.div
      className={`section-header section-header--${align} ${light ? 'section-header--light' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {label && <span className="section-header__label">{label}</span>}
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </motion.div>
  );
}
