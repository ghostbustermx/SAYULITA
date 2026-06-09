import { motion } from 'framer-motion';
import { FiDollarSign, FiMessageCircle, FiShield, FiCheck } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import FloatingPalms from '../FloatingPalms/FloatingPalms';
import './WhyBookDirect.css';

const i18n = {
  ENG: {
    label: "Save Up to 20%",
    title: "Why Book Direct? Save vs Airbnb Fees",
    subtitle: "On a $200/night rental for one week, Airbnb fees add up to $196–$280 extra — before taxes. That's a night's stay you're giving away for nothing.",
    compHeader: "7-Night Stay Cost Comparison",
    compBase: "Base rate: $200/night × 7 = $1,400",
    compAirbnb: "Airbnb 1 week ($200/night)",
    compST: "SayulitaTravel",
    compSavings: "You save",
    compSavingsVal: "$196 – $280",
    compSavingsEnd: "on every booking",
    pillar1Title: "No Service Fees, No Booking Fees — Ever",
    pillar1Desc: "Every rental listed here has a real, final price — set by the owner. There's no 14% \"service fee\" added at checkout. No \"guest fee\" invented at the last step. What you see in the search results is what you pay.",
    pillar1Badge: "Zero Fees",
    pillar2Title: "Direct Contact With the Property Owner",
    pillar2Desc: "Once you find a rental you like, you communicate directly with the owner or their local manager — before you commit to anything. No chat bots. No support tickets. A real person in Sayulita who knows the property.",
    pillar2Badge: "Owner Direct",
    pillar3Title: "Verified Listings — Zero Scams",
    pillar3Desc: "Every property on SayulitaTravel is physically verified by our local team, owner-confirmed with documented proof, and reviewed by past guests.",
    pillar3Badge: "Verified",
    trust1: "Physically verified properties",
    trust2: "20,000+ real reviews",
    trust3: "Local team in Sayulita",
    trust4: "100,000+ secure transactions"
  },
  ESP: {
    label: "Ahorra Hasta un 20%",
    title: "¿Por Qué Reservar Directo? Ahorra vs Comisiones de Airbnb",
    subtitle: "En una renta de $200/noche por una semana, las comisiones de Airbnb suman $196–$280 extra — antes de impuestos. Eso es una noche de estancia que regalas por nada.",
    compHeader: "Comparación de Costo: Estancia de 7 Noches",
    compBase: "Tarifa base: $200/noche × 7 = $1,400",
    compAirbnb: "Airbnb 1 semana ($200/noche)",
    compST: "SayulitaTravel",
    compSavings: "Ahorras",
    compSavingsVal: "$196 – $280",
    compSavingsEnd: "en cada reservación",
    pillar1Title: "Sin Cargos por Servicio, Sin Comisiones — Nunca",
    pillar1Desc: "Cada renta listada aquí tiene un precio real y final — establecido por el dueño. No hay \"cargo por servicio\" del 14% añadido al pagar. Sin \"cargos de huésped\" inventados. Lo que ves en los resultados de búsqueda es lo que pagas.",
    pillar1Badge: "Sin Comisiones",
    pillar2Title: "Contacto Directo con el Dueño de la Propiedad",
    pillar2Desc: "Una vez que encuentras una renta que te gusta, te comunicas directamente con el dueño o su administrador local — antes de comprometerte a nada. Sin chatbots. Sin tickets de soporte. Una persona real en Sayulita que conoce la propiedad.",
    pillar2Badge: "Directo con Dueño",
    pillar3Title: "Listados Verificados — Cero Estafas",
    pillar3Desc: "Cada propiedad en SayulitaTravel es verificada físicamente por nuestro equipo local, confirmada por el dueño con prueba documentada y revisada por huéspedes anteriores.",
    pillar3Badge: "Verificado",
    trust1: "Propiedades verificadas físicamente",
    trust2: "Más de 20,000 reseñas reales",
    trust3: "Equipo local en Sayulita",
    trust4: "Más de 100,000 transacciones seguras"
  }
};

const savings = [
  { label: 'Airbnb 1 week ($200/night)', fee: '$196 – $280', color: '#dc3545' },
  { label: 'SayulitaTravel', fee: '$0', color: '#2c694e' },
];

export default function WhyBookDirect({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  return (
    <section className="why-book section" id="why-book-direct">
      <FloatingPalms />
      <div className="container">
        <SectionHeader
          label={t.label}
          title={t.title}
          subtitle={t.subtitle}
        />

        {/* Fee comparison */}
        <motion.div
          className="why-book__comparison"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="comparison-card">
            <div className="comparison-card__header">
              <span className="comparison-card__label">{t.compHeader}</span>
              <span className="comparison-card__base">{t.compBase}</span>
            </div>
            {savings.map((s) => (
              <div key={s.label} className="comparison-card__row">
                <span className="comparison-card__platform">{s.label === 'Airbnb 1 week ($200/night)' ? t.compAirbnb : t.compST}</span>
                <div className="comparison-card__bar-wrap">
                  <motion.div
                    className="comparison-card__bar"
                    style={{ backgroundColor: s.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: s.fee === '$0' ? '8px' : '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
                <span className="comparison-card__fee" style={{ color: s.color }}>
                  {s.fee === '$0' ? (
                    <span className="comparison-card__free">
                      <FiCheck /> $0
                    </span>
                  ) : (
                    `+ ${s.fee}`
                  )}
                </span>
              </div>
            ))}
            <div className="comparison-card__savings">
              {t.compSavings} <strong>{t.compSavingsVal}</strong> {t.compSavingsEnd}
            </div>
          </div>
        </motion.div>

        {/* Three pillars */}
        <div className="why-book__pillars">
          <motion.div
            className="pillar-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.5 }}
            whileHover={{ y: -4 }}
            id="pillar-0"
          >
            <div className="pillar-card__icon"><FiDollarSign /></div>
            <span className="pillar-card__badge">{t.pillar1Badge}</span>
            <h3 className="pillar-card__title">{t.pillar1Title}</h3>
            <p className="pillar-card__desc">{t.pillar1Desc}</p>
          </motion.div>
          <motion.div
            className="pillar-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            whileHover={{ y: -4 }}
            id="pillar-1"
          >
            <div className="pillar-card__icon"><FiMessageCircle /></div>
            <span className="pillar-card__badge">{t.pillar2Badge}</span>
            <h3 className="pillar-card__title">{t.pillar2Title}</h3>
            <p className="pillar-card__desc">{t.pillar2Desc}</p>
          </motion.div>
          <motion.div
            className="pillar-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ y: -4 }}
            id="pillar-2"
          >
            <div className="pillar-card__icon"><FiShield /></div>
            <span className="pillar-card__badge">{t.pillar3Badge}</span>
            <h3 className="pillar-card__title">{t.pillar3Title}</h3>
            <p className="pillar-card__desc">{t.pillar3Desc}</p>
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          className="why-book__trust-strip"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="trust-badge">
            <FiShield className="trust-badge__icon" />
            <span>{t.trust1}</span>
          </div>
          <div className="trust-badge">
            <FiCheck className="trust-badge__icon" />
            <span>{t.trust2}</span>
          </div>
          <div className="trust-badge">
            <FiMessageCircle className="trust-badge__icon" />
            <span>{t.trust3}</span>
          </div>
          <div className="trust-badge">
            <FiDollarSign className="trust-badge__icon" />
            <span>{t.trust4}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
