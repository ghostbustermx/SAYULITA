import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import './FAQ.css';

const i18n = {
  ENG: {
    title: "Frequently Asked Questions About Sayulita Vacation Rentals",
    subtitle: "Everything you need to know before booking.",
    faqs: [
      {
        question: 'How do I book a vacation rental in Sayulita without paying Airbnb fees?',
        answer: "Simple: search for your dates and property type here, contact the owner or manager directly through our platform — which charges zero service fees. The owner sets the price. You pay the owner directly. We don't add anything on top.",
      },
      {
        question: 'What is the cancellation policy for Sayulita rentals?',
        answer: "Each property sets its own cancellation policy — you'll see it clearly before you confirm any booking. Most owners offer a moderate policy (full refund if cancelled 14 days before arrival) and a strict policy for high-season dates (Christmas, Spring Break, Easter week). We recommend travel insurance for bookings over 7 nights or during peak season.",
      },
      {
        question: 'Are Sayulita vacation rentals pet-friendly?',
        answer: 'Many are. Use the "Pet-friendly" filter in the search to see only properties that accept dogs and cats. Owners usually ask for a small pet deposit that is refunded after checkout. If you have a large dog or multiple pets, message the owner directly before booking.',
      },
      {
        question: 'How far in advance should I book a Sayulita rental?',
        answer: 'For December 20 – January 5 and Semana Santa: book 4–6 months ahead. For February–April: 2–3 months ahead is comfortable. For May–October (low season): 4–6 weeks is usually fine, and you\'ll find availability even last-minute. If you have a specific property or group size in mind, earlier is always better.',
      },
      {
        question: "What's included in a Sayulita vacation rental?",
        answer: 'Most rentals include: fully equipped kitchen, WiFi (confirmed and speed-tested), air conditioning in bedrooms, linens and towels, and weekly cleaning for stays over 7 nights. What\'s not usually included: airport transfers, grocery stocking, daily housekeeping — these can be arranged through the owner at extra cost.',
      },
      {
        question: 'Is it safe to pay for a Sayulita rental online?',
        answer: "Yes — SayulitaTravel does not charge customers for rentals, receive commissions, referral fees, or other compensation from Service Providers listed on the Platform. We are solely an intermediary platform that connects Users with property owners, experience providers, and local businesses. The owner sets the price. You pay the owner directly. We don't add anything on top.",
      },
    ],
  },
  ESP: {
    title: "Preguntas Frecuentes Sobre Rentas Vacacionales en Sayulita",
    subtitle: "Todo lo que necesitas saber antes de reservar.",
    faqs: [
      {
        question: '¿Cómo reservo una renta vacacional en Sayulita sin pagar comisiones de Airbnb?',
        answer: 'Simple: busca tus fechas y tipo de propiedad aquí, contacta al dueño o administrador directamente a través de nuestra plataforma — que no cobra comisiones. El dueño fija el precio. Tú pagas el precio directo al dueño. Nosotros no agregamos nada adicional.',
      },
      {
        question: '¿Cuál es la política de cancelación para las rentas en Sayulita?',
        answer: 'Cada propiedad establece su propia política de cancelación — la verás claramente antes de confirmar cualquier reserva. La mayoría de los dueños ofrecen una política moderada (reembolso total si cancelas 14 días antes de la llegada) y una política estricta para fechas de temporada alta (Navidad, Spring Break, Semana Santa). Recomendamos seguro de viaje para reservas de más de 7 noches o durante temporada alta.',
      },
      {
        question: '¿Las rentas vacacionales en Sayulita admiten mascotas?',
        answer: 'Muchas sí. Usa el filtro "Pet-friendly" en la búsqueda para ver solo las propiedades que aceptan perros y gatos. Los dueños usualmente piden un depósito pequeño por mascota que se reembolsa después del check-out. Si tienes un perro grande o varias mascotas, envía un mensaje al dueño directamente antes de reservar.',
      },
      {
        question: '¿Con cuánta anticipación debo reservar una renta en Sayulita?',
        answer: 'Para el 20 de diciembre – 5 de enero y Semana Santa: reserva con 4–6 meses de anticipación. Para febrero–abril: 2–3 meses es suficiente. Para mayo–octubre (temporada baja): 4–6 semanas suele estar bien, y encontrarás disponibilidad incluso de último minuto. Si tienes una propiedad específica o un grupo grande en mente, mientras antes mejor.',
      },
      {
        question: '¿Qué incluye una renta vacacional en Sayulita?',
        answer: 'La mayoría de las rentas incluyen: cocina totalmente equipada, WiFi (confirmado y con prueba de velocidad), aire acondicionado en recámaras, ropa de cama y toallas, y limpieza semanal para estancias de más de 7 noches. Lo que generalmente no incluye: traslados al aeropuerto, despensa de supermercado, limpieza diaria — estos servicios se pueden coordinar con el dueño por un costo adicional.',
      },
      {
        question: '¿Es seguro pagar por una renta en Sayulita en línea?',
        answer: 'Sí — Sayulita Travel no cobra a los clientes por renta, no recibe comisiones, ni honorarios por referencia u otra compensación de los Proveedores de Servicios listados en la Plataforma, somos únicamente una plataforma intermediaria que conecta a los Usuarios con propietarios de inmuebles, proveedores de experiencias y negocios locales. El dueño fija el precio. Tú pagas el precio directo al dueño. Nosotros no agregamos nada adicional.',
      },
    ],
  },
};

export default function FAQ({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq section" id="faq">
      <div className="container">
        <SectionHeader
          title={t.title}
          subtitle={t.subtitle}
        />

        <div className="faq__list">
          {t.faqs.map((faq, i) => (
            <motion.div
              key={i}
              className={`faq__item ${openIndex === i ? 'faq__item--open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              id={`faq-${i}`}
            >
              <button
                className="faq__question"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                aria-expanded={openIndex === i}
                id={`faq-btn-${i}`}
              >
                <span className="faq__question-text">{faq.question}</span>
                <span className="faq__question-icon">
                  {openIndex === i ? <FiMinus /> : <FiPlus />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    className="faq__answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="faq__answer-text">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
