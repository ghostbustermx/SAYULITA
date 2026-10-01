import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import LazySwiper from '../ui/LazySwiper';
import SectionHeader from '../ui/SectionHeader';
import './Testimonials.css';

const reviewMeta = [
  { name: 'Sarah M.', location: 'Chicago', property: 'Casa Paloma', rating: 5 },
  { name: 'Tom R.', location: 'Vancouver', property: 'Casa Ballena', rating: 5 },
  { name: 'The Hendersons', location: 'Austin', property: 'Villa Mar Azul', rating: 5 },
  { name: 'Jennifer K.', location: 'Denver', property: 'Villa del Sol', rating: 5 },
  { name: 'Mike & Lisa', location: 'Portland', property: 'Casa Luna', rating: 5 },
];

const i18n = {
  ENG: {
    label: "Guest Reviews",
    title: "What Our Guests Say About Their Sayulita Stay",
    subtitle: "Discover what your guests could be reviewing about your property.",
    reviews: [
      {
        quote: "We saved almost $400 compared to what Airbnb quoted us for the same house. The owner answered my WhatsApp in under an hour. Booking was the easiest part of the whole trip.",
        date: 'March 2025',
      },
      {
        quote: "I was nervous about booking direct for the first time — I've been burned before on other platforms. SayulitaTravel's verification gave me the confidence to do it. The property was exactly as listed. Exactly.",
        date: 'January 2025',
      },
      {
        quote: "We've been coming to Sayulita for seven years. Always through SayulitaTravel. It's the only site where the Sayulita information is actually current and the rentals are real.",
        date: 'December 2024',
      },
      {
        quote: "The villa exceeded every expectation. The staff prepared breakfast every morning and the private pool overlooking the ocean was a dream. Best family vacation we've ever had.",
        date: 'February 2025',
      },
      {
        quote: "As digital nomads, we spent 3 months in Sayulita. The long-term rental we found through SayulitaTravel had fast WiFi, a great workspace, and was walking distance to the beach. Perfect setup.",
        date: 'November 2024',
      },
    ],
  },
  ESP: {
    label: "Reseñas de Huéspedes",
    title: "Lo Que Dicen Nuestros Huéspedes Sobre su Estancia en Sayulita",
    subtitle: "Descubre lo que tus huéspedes podrían estar reseñando de tu propiedad.",
    reviews: [
      {
        quote: "Ahorramos casi $400 en comparación con lo que Airbnb nos cotizó por la misma casa. El dueño respondió mi WhatsApp en menos de una hora. Reservar fue la parte más fácil de todo el viaje.",
        date: 'Marzo 2025',
      },
      {
        quote: "Estaba nervioso por reservar directo por primera vez — me había ido mal en otras plataformas. La verificación de SayulitaTravel me dio la confianza para hacerlo. La propiedad era exactamente como estaba anunciada. Exactamente.",
        date: 'Enero 2025',
      },
      {
        quote: "Hemos estado viniendo a Sayulita durante siete años. Siempre a través de SayulitaTravel. Es el único sitio donde la información de Sayulita está realmente actualizada y las rentas son reales.",
        date: 'Diciembre 2024',
      },
      {
        quote: "La villa superó todas las expectativas. El personal preparaba el desayuno cada mañana y la alberca privada con vista al océano fue un sueño. Las mejores vacaciones familiares que hemos tenido.",
        date: 'Febrero 2025',
      },
      {
        quote: "Como nómadas digitales, pasamos 3 meses en Sayulita. La renta a largo plazo que encontramos a través de SayulitaTravel tenía WiFi rápido, un excelente espacio de trabajo y estaba a poca distancia de la playa. Una configuración perfecta.",
        date: 'Noviembre 2024',
      },
    ],
  },
};

export default function Testimonials({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <SectionHeader
          label={t.label}
          title={t.title}
          subtitle={t.subtitle}
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <LazySwiper
            autoplayDelay={5000}
            className="testimonials__swiper"
            slides={t.reviews.map((review, i) => {
              const meta = reviewMeta[i];
              return (
                <div className="review-card" id={`review-${i}`} key={i}>
                  <div className="review-card__stars">
                    {Array.from({ length: meta.rating }).map((_, si) => (
                      <FiStar key={si} className="review-card__star" />
                    ))}
                  </div>
                  <blockquote className="review-card__quote">
                    "{review.quote}"
                  </blockquote>
                  <div className="review-card__author">
                    <div className="review-card__avatar">
                      {meta.name.charAt(0)}
                    </div>
                    <div className="review-card__info">
                      <span className="review-card__name">{meta.name}</span>
                      <span className="review-card__detail">{meta.location} · {meta.property} · {review.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          />
        </motion.div>
      </div>
    </section>
  );
}
