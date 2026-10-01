import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { MdBeachAccess, MdPool, MdFamilyRestroom, MdGroups, MdLaptop } from 'react-icons/md';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import FloatingPalms from '../FloatingPalms/FloatingPalms';

import villaEmma from '../../assets/villa-emma.webp';
import categoryBeachfront from '../../assets/category-beachfront.webp';
import villaRosetta from '../../assets/villa-rosetta.webp';
import casaAmigos from '../../assets/casa-amigos.webp';
import beachHotel from '../../assets/beach-hotel.webp';

import './RentalTypes.css';

const rentalTypes = [
  {
    icon: <MdBeachAccess />,
    image: categoryBeachfront.src,
    href: '#beachfront',
  },
  {
    icon: <MdPool />,
    image: villaEmma.src,
    href: '#luxury',
  },
  {
    icon: <MdFamilyRestroom />,
    image: villaRosetta.src,
    href: '#family',
  },
  {
    icon: <MdGroups />,
    image: casaAmigos.src,
    href: '#groups',
  },
  {
    icon: <MdLaptop />,
    image: beachHotel.src,
    href: '#long-term',
  },
];

const i18nTypeData = {
  ENG: [
    {
      title: 'Beachfront Houses in Sayulita',
      description: 'Wake up to the Pacific. These properties sit steps from the sand, with ocean views and direct beach access. They book early — especially December through April.',
      details: [
        'Ideal for: couples, families, honeymoons',
        'Most come with: private pool, outdoor kitchen, ocean terrace',
        'Typical size: 2 to 6 bedrooms',
      ],
      cta: 'Browse beachfront rentals',
    },
    {
      title: 'Luxury Villas in Sayulita',
      description: "Private pools, full staff, chef-ready kitchens and the kind of space where everyone has room to breathe. Sayulita's luxury villas are priced well below comparable Caribbean options — and the setting is hard to beat.",
      details: [
        'From: 3 to 10+ bedrooms',
        'Features: private pool, concierge support, ocean views',
        'Perfect for: milestone celebrations, group getaways, weddings',
      ],
      cta: 'Browse luxury villas',
    },
    {
      title: 'Family-Friendly Rentals in Sayulita',
      description: "Sayulita is one of the best family beach destinations in Mexico — safe town, calm surf beach, no crowds. These rentals are selected for practical things: gated entrances, extra bunk beds, full kitchens so you're not eating out every meal, and space for kids to actually run around.",
      details: [
        'Cots and high chairs available at many properties',
        'Neighborhoods close to the main plaza and the kids\' surf beach',
        'Properties verified for family use — not just labeled',
      ],
      cta: 'Browse family rentals',
    },
    {
      title: 'Sayulita Rentals for Groups & Events',
      description: 'Bachelorette weekends, surf retreats, yoga groups, family reunions — Sayulita handles groups well. These are multi-unit complexes and large villas with shared pools, multiple kitchens, and enough bedrooms to keep everyone together without stepping on each other.',
      details: [
        'Sleeps 10 to 30+ guests',
        'Shared outdoor spaces and pool areas',
        'Many include event permits and catering support',
      ],
      cta: 'Browse group rentals',
    },
    {
      title: 'Monthly Rentals — Digital Nomads Welcome',
      description: "One of the best-kept secrets in remote work: renting in Sayulita by the month costs a fraction of what you'd pay in Tulum or Puerto Escondido — with solid fiber internet, a surf beach outside your door, and a tight-knit expat community.",
      details: [
        'From 30-day stays to 6-month leases',
        'Fast WiFi confirmed at each listing',
        'Best value: book outside high season (May–October)',
      ],
      cta: 'Browse long-term rentals',
    },
  ],
  ESP: [
    {
      title: 'Casas Frente al Mar en Sayulita',
      description: 'Despierta con el Pacífico. Estas propiedades están a pasos de la arena, con vistas al océano y acceso directo a la playa. Se reservan temprano — especialmente de diciembre a abril.',
      details: [
        'Ideal para: parejas, familias, lunas de miel',
        'La mayoría incluye: alberca privada, cocina exterior, terraza con vista al mar',
        'Tamaño típico: 2 a 6 recámaras',
      ],
      cta: 'Ver rentas frente al mar',
    },
    {
      title: 'Villas de Lujo en Sayulita',
      description: 'Albercas privadas, servicio completo, cocinas equipadas y el espacio que todos necesitan para respirar. Las villas de lujo de Sayulita tienen precios muy por debajo de opciones comparables en el Caribe — y el entorno es difícil de superar.',
      details: [
        'Desde: 3 hasta 10+ recámaras',
        'Incluye: alberca privada, servicio de concierge, vistas al mar',
        'Perfecto para: celebraciones, reuniones grupales, bodas',
      ],
      cta: 'Ver villas de lujo',
    },
    {
      title: 'Rentas Familiares en Sayulita',
      description: 'Sayulita es uno de los mejores destinos familiares de playa en México — pueblo seguro, playa tranquila para surfear, sin multitudes. Estas rentas están seleccionadas por aspectos prácticos: entradas con reja, camas extras, cocinas completas para no comer fuera en cada comida, y espacio para que los niños corran.',
      details: [
        'Cunas y periqueras disponibles en muchas propiedades',
        'Vecindarios cerca de la plaza principal y la playa de surf para niños',
        'Propiedades verificadas para uso familiar — no solo etiquetadas',
      ],
      cta: 'Ver rentas familiares',
    },
    {
      title: 'Rentas en Sayulita para Grupos y Eventos',
      description: 'Despedidas de soltera, retiros de surf, grupos de yoga, reuniones familiares — Sayulita recibe bien a los grupos. Son complejos de múltiples unidades y villas grandes con albercas compartidas, varias cocinas y suficientes recámaras para mantener a todos juntos.',
      details: [
        'Capacidad: 10 a 30+ huéspedes',
        'Espacios exteriores y áreas de alberca compartidas',
        'Muchos incluyen permisos para eventos y apoyo de catering',
      ],
      cta: 'Ver rentas para grupos',
    },
    {
      title: 'Rentas Mensuales — Nómadas Digitales Bienvenidos',
      description: 'Uno de los secretos mejor guardados del trabajo remoto: rentar en Sayulita por mes cuesta una fracción de lo que pagarías en Tulum o Puerto Escondido — con internet de fibra sólido, una playa de surf afuera de tu puerta y una comunidad de expatriados unida.',
      details: [
        'Desde estancias de 30 días hasta contratos de 6 meses',
        'WiFi rápido confirmado en cada anuncio',
        'Mejor valor: reserva fuera de temporada alta (mayo–octubre)',
      ],
      cta: 'Ver rentas a largo plazo',
    },
  ],
};

const i18n = {
  ENG: {
    sectionTitle: "Types of Sayulita Vacation Rentals",
    sectionSubtitle: "Whether you're coming with family, a group of friends, or just your partner — Sayulita has a rental that fits. Here's how to find yours fast.",
    types: i18nTypeData.ENG,
  },
  ESP: {
    sectionTitle: "Tipos de Rentas Vacacionales en Sayulita",
    sectionSubtitle: "Ya sea que vengas con familia, un grupo de amigos o solo con tu pareja — Sayulita tiene una renta ideal. Así encuentras la tuya rápido.",
    types: i18nTypeData.ESP,
  },
};

export default function RentalTypes({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  return (
    <section className="rental-types section" id="rental-types">
      <FloatingPalms />
      <div className="container">
        <SectionHeader
          title={t.sectionTitle}
          subtitle={t.sectionSubtitle}
        />

        <div className="rental-types__list">
          {rentalTypes.map((type, i) => {
            const data = t.types[i];
            return (
              <motion.div
                key={i}
                className={`rental-type ${i % 2 !== 0 ? 'rental-type--reverse' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                id={`rental-type-${i}`}
              >
                <div className="rental-type__image-wrap">
                  <img src={type.image} alt={data.title} className="rental-type__image" loading="lazy" decoding="async" />
                  <div className="rental-type__image-badge">
                    {type.icon}
                  </div>
                </div>
                <div className="rental-type__content">
                  <h3 className="rental-type__title">{data.title}</h3>
                  <p className="rental-type__desc">{data.description}</p>
                  <ul className="rental-type__details">
                    {data.details.map((d) => (
                      <li key={d} className="rental-type__detail">{d}</li>
                    ))}
                  </ul>
                  <Button variant="ghost" icon={<FiArrowRight />} href={type.href}>
                    {data.cta} →
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
