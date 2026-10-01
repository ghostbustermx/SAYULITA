import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiStar, FiMapPin, FiHeart, FiX, FiArrowRight, FiExternalLink
} from 'react-icons/fi';
import {
  MdOutlineDirectionsCar, MdOutlineFlightTakeoff, MdOutlineLuggage
} from 'react-icons/md';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import logoSayulitaTransportation from '../../assets/sayulita-transportation-logo.webp';
import logoAmanecer from '../../assets/amanecer-logo.webp';
import './TransportationPage.css';

const IMG_HERO = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85';
const IMG_SAYULITA_TRANSPORTATION = '/sayulita_transportation.webp';
const IMG_AMANECER_TRANSPORTATION = '/amanecer_transportation.webp';

const entries = [
  {
    id: 'sayulita-transportation',
    name: 'Sayulita Transportation',
    category: 'airport',
    categoryLabel: { ENG: 'Airport', ESP: 'Aeropuerto' },
    service: 'private',
    serviceLabel: { ENG: 'Private transfer', ESP: 'Traslado privado' },
    rating: 4.9,
    tag: { ENG: 'PVR airport transfers', ESP: 'Traslados del aeropuerto PVR' },
    image: IMG_SAYULITA_TRANSPORTATION,
    imageAlt: {
      ENG: 'Private airport transfer from Puerto Vallarta to Sayulita',
      ESP: 'Traslado privado del aeropuerto de Puerto Vallarta a Sayulita'
    },
    overlayLogo: logoSayulitaTransportation.src,
    overlayLogoAlt: { ENG: 'Sayulita Transportation', ESP: 'Sayulita Transportation' },
    desc: {
      ENG: 'Private transfers from Puerto Vallarta airport (PVR) straight to your accommodation in Sayulita, 37 km away. Your driver is a named person waiting in arrivals with a sign, and they track your flight in real time. Fixed price, no hidden fees.',
      ESP: 'Traslados privados del aeropuerto de Puerto Vallarta (PVR) directo a tu alojamiento en Sayulita, a 37 km. Tu chofer te espera identificado en la zona de llegadas y monitorea tu vuelo en tiempo real. Precio fijo, sin cargos ocultos.'
    },
    features: [
      { ENG: '25+ years on the route', ESP: 'Más de 25 años en la ruta' },
      { ENG: 'Flight monitoring', ESP: 'Monitoreo de vuelo' },
      { ENG: 'From $88 USD', ESP: 'Desde $88 USD' }
    ],
    location: { ENG: 'PVR Airport → Sayulita', ESP: 'Aeropuerto PVR → Sayulita' },
    keywords: 'airport transfer pvr private driver flight monitoring fixed rate door to door 25 years',
    website: 'https://sayulitatransportation.com/'
  },
  {
    id: 'sayulita-airport-transfers',
    name: 'Sayulita Airport Transfers',
    category: 'airport',
    categoryLabel: { ENG: 'Airport', ESP: 'Aeropuerto' },
    service: 'private',
    serviceLabel: { ENG: 'Private', ESP: 'Privado' },
    rating: 4.9,
    tag: { ENG: 'Airport transfer', ESP: 'Traslado al aeropuerto' },
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80',
    imageAlt: {
      ENG: 'Vehicle ready for an airport transfer',
      ESP: 'Vehículo listo para un traslado al aeropuerto'
    },
    desc: {
      ENG: 'Private transfers between Puerto Vallarta airport, Sayulita and destinations across the Riviera Nayarit.',
      ESP: 'Traslados privados entre el aeropuerto de Puerto Vallarta, Sayulita y destinos de la Riviera Nayarit.'
    },
    features: [
      { ENG: 'Private service', ESP: 'Servicio privado' },
      { ENG: 'Luggage', ESP: 'Equipaje' }
    ],
    location: { ENG: 'Sayulita / Puerto Vallarta', ESP: 'Sayulita / Puerto Vallarta' },
    keywords: 'airport transfer private suburban luggage family pvr'
  },
  {
    id: 'amanecer-transportation',
    name: 'Amanecer Transportation',
    category: 'airport',
    categoryLabel: { ENG: 'Airport', ESP: 'Aeropuerto' },
    service: 'private',
    serviceLabel: { ENG: 'Private transfer', ESP: 'Traslado privado' },
    rating: 4.9,
    ratingNote: { ENG: 'rating on their site', ESP: 'calificación en su sitio' },
    tag: { ENG: 'PVR → Riviera Nayarit', ESP: 'PVR → Riviera Nayarit' },
    image: IMG_AMANECER_TRANSPORTATION,
    imageAlt: {
      ENG: 'Sayulita sunset over the Malecón',
      ESP: 'Atardecer sobre el malecón de Sayulita'
    },
    overlayLogo: logoAmanecer.src,
    overlayLogoAlt: { ENG: 'Amanecer Transportation', ESP: 'Amanecer Transportation' },
    overlayLogoFit: 'portrait',
    desc: {
      ENG: 'Private, pre-booked transfers from PVR Airport to Sayulita and deep into the Riviera Nayarit — San Pancho, Punta Mita and Nuevo Vallarta. No shared vans, no waiting, no surprises. Your driver meets you just outside arrivals holding a sign with your name, and adjusts automatically if your flight is delayed.',
      ESP: 'Traslados privados y pre-reservados del aeropuerto PVR a Sayulita y hasta el interior de la Riviera Nayarit — San Pancho, Punta Mita y Nuevo Vallarta. Sin vans compartidas, sin esperas, sin sorpresas. Tu chofer te espera justo afuera de llegadas con un letrero con tu nombre, y se ajusta solo si tu vuelo se retrasa.'
    },
    features: [
      { ENG: 'No shared vans', ESP: 'Sin vans compartidas' },
      { ENG: 'Flight tracking', ESP: 'Monitoreo de vuelo' },
      { ENG: '24/7 WhatsApp', ESP: 'WhatsApp 24/7' }
    ],
    location: { ENG: 'PVR Airport → Riviera Nayarit', ESP: 'Aeropuerto PVR → Riviera Nayarit' },
    keywords:
      'private transfer pvr sayulita san pancho punta mita nuevo vallarta no shared vans flight tracking riviera nayarit pre-booked',
    website: 'https://amanecertransportation.com/'
  },
  {
    id: 'ramos-private-transportation',
    name: 'Ramos Private Transportation',
    category: 'taxi',
    categoryLabel: { ENG: 'Taxi', ESP: 'Taxi' },
    service: 'private',
    serviceLabel: { ENG: 'Private driver', ESP: 'Chofer privado' },
    rating: 4.8,
    tag: { ENG: 'Private driver', ESP: 'Chofer privado' },
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80',
    imageAlt: { ENG: 'Private car', ESP: 'Automóvil privado' },
    desc: {
      ENG: 'Private rides for families and groups, with local service and transfers to nearby towns.',
      ESP: 'Viajes privados para familias y grupos, con servicio local y traslados a poblaciones cercanas.'
    },
    features: [
      { ENG: 'Groups', ESP: 'Grupos' },
      { ENG: 'Local trips', ESP: 'Viajes locales' }
    ],
    location: { ENG: 'Sayulita & surroundings', ESP: 'Sayulita y alrededores' },
    keywords: 'taxi private driver family groups local trips nearby towns'
  },
  {
    id: 'ocean-golf-carts',
    name: 'Ocean Golf Carts',
    category: 'golfcarts',
    categoryLabel: { ENG: 'Golf cart rental', ESP: 'Renta de carritos' },
    service: 'rental',
    serviceLabel: { ENG: 'Rental', ESP: 'Renta' },
    rating: 4.7,
    tag: { ENG: 'Golf cart rental', ESP: 'Renta de carrito' },
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80',
    imageAlt: { ENG: 'Recreational vehicle', ESP: 'Vehículo recreativo' },
    desc: {
      ENG: 'A practical way to get around Sayulita during your stay. Ask about models and availability.',
      ESP: 'Una alternativa práctica para moverte por Sayulita durante tu estancia. Consulta modelos y disponibilidad.'
    },
    features: [
      { ENG: 'Period rental', ESP: 'Renta por periodo' },
      { ENG: 'Local mobility', ESP: 'Movilidad local' }
    ],
    location: { ENG: 'Sayulita', ESP: 'Sayulita' },
    keywords: 'golf cart rent rental mobility town vacation'
  },
  {
    id: 'riviera-car-rental',
    name: 'Riviera Car Rental',
    category: 'carrental',
    categoryLabel: { ENG: 'Car rental', ESP: 'Renta de autos' },
    service: 'rental',
    serviceLabel: { ENG: 'Cars', ESP: 'Automóviles' },
    rating: 4.6,
    tag: { ENG: 'Car rental', ESP: 'Renta de auto' },
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
    imageAlt: { ENG: 'Car available for rent', ESP: 'Automóvil para renta' },
    desc: {
      ENG: 'Explore car options to reach beaches, small towns and regional attractions at your own pace.',
      ESP: 'Explora opciones de automóvil para recorrer playas, pueblos y atractivos de la región a tu ritmo.'
    },
    features: [
      { ENG: 'Flexible trips', ESP: 'Viajes flexibles' },
      { ENG: 'Multiple destinations', ESP: 'Varios destinos' }
    ],
    location: { ENG: 'Riviera Nayarit', ESP: 'Riviera Nayarit' },
    keywords: 'car rental rent vehicle delivery hotel road trip'
  },
  {
    id: 'sayulita-adventure-tours',
    name: 'Sayulita Adventure Tours',
    category: 'tours',
    categoryLabel: { ENG: 'Tours', ESP: 'Tours' },
    service: 'excursions',
    serviceLabel: { ENG: 'Excursions', ESP: 'Excursiones' },
    rating: 4.9,
    tag: { ENG: 'Tours & excursions', ESP: 'Tours y excursiones' },
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    imageAlt: { ENG: 'Excursion landscape', ESP: 'Paisaje de excursión' },
    desc: {
      ENG: 'Organize routes and departures to discover beaches, nearby towns and hidden corners of the region.',
      ESP: 'Organiza recorridos y salidas para conocer playas, localidades vecinas y rincones de la región.'
    },
    features: [
      { ENG: 'Local experiences', ESP: 'Experiencias locales' },
      { ENG: 'Groups', ESP: 'Grupos' }
    ],
    location: { ENG: 'Sayulita & surroundings', ESP: 'Sayulita y alrededores' },
    keywords: 'tours excursions trips san pancho punta mita adventure'
  },
  {
    id: 'comfort-private-rides',
    name: 'Comfort Private Rides',
    category: 'airport',
    categoryLabel: { ENG: 'Airport', ESP: 'Aeropuerto' },
    service: 'executive',
    serviceLabel: { ENG: 'Executive', ESP: 'Ejecutivo' },
    rating: 4.8,
    tag: { ENG: 'Executive service', ESP: 'Servicio ejecutivo' },
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80',
    imageAlt: { ENG: 'Executive vehicle', ESP: 'Vehículo ejecutivo' },
    desc: {
      ENG: 'Scheduled transfers and private rides with personal attention for your arrival or departure.',
      ESP: 'Traslados programados y viajes privados con atención personalizada para tu llegada o salida.'
    },
    features: [
      { ENG: 'Scheduled trips', ESP: 'Viajes programados' },
      { ENG: 'Personal attention', ESP: 'Atención personal' }
    ],
    location: { ENG: 'Puerto Vallarta / Sayulita', ESP: 'Puerto Vallarta / Sayulita' },
    keywords: 'airport executive transfer suburban bilingual driver private'
  }
];

const i18n = {
  ENG: {
    heroEyebrow: 'Move with peace of mind',
    heroTitle: 'Find Reliable Transportation in Sayulita',
    heroSubtitle:
      'Explore taxis, private transfers, airport transportation and options to get around Sayulita and nearby destinations.',
    trust: '6 local transportation providers in Sayulita and the Riviera Nayarit',
    slogan: 'Your Local Connection!',
    searchPlaceholder: 'Search airport, taxi, car rental…',
    searchBtn: 'Search transportation',
    searchLabel: 'Search transportation',
    dirEyebrow: 'Local directory',
    dirTitle: 'Transportation & mobility',
    dirSubtitle:
      'Compare options to get here, move around the area or discover the surroundings. Contact the provider to confirm availability, rates and details.',
    filtersLabel: 'Filter providers',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'airport', label: 'Airport' },
      { id: 'taxi', label: 'Private taxi' },
      { id: 'carrental', label: 'Car rental' },
      { id: 'golfcarts', label: 'Golf carts' },
      { id: 'tours', label: 'Tours & excursions' }
    ],
    sortLabel: 'Sort by',
    sortOptions: [
      { value: 'recommended', label: 'Recommended' },
      { value: 'name', label: 'Name A–Z' },
      { value: 'rating', label: 'Top rated' }
    ],
    resultsOne: 'provider',
    resultsMany: 'providers',
    ratingNote: 'demo rating',
    detailsLink: 'Inquire',
    websiteLink: 'Visit website',
    saveLabel: 'Save',
    emptyTitle: 'No options found',
    emptyText: 'Try another search or pick a different category.',
    clearFilters: 'Clear filters',
    promoEyebrow: 'Do you offer transportation in the area?',
    promoTitle: 'Connect with travelers visiting Sayulita',
    promoText:
      'Present your taxi, transfer, vehicle rental or tour service to people planning their trip.',
    promoBtn: 'List my business',
    modalDetailsText:
      'Leave us your details and the provider will get back to you with availability, rates and route options.',
    modalBusinessTitle: 'List your business',
    modalBusinessText:
      'Tell us about your transportation business and our team will get back to you within 24 hours.',
    fieldBusinessName: 'Business / Service',
    fieldContactName: 'Contact Name',
    fieldPhone: 'WhatsApp / Phone',
    fieldEmail: 'Email',
    fieldDate: 'Estimated date',
    fieldRoute: 'Route or service',
    fieldNeed: 'Details',
    fieldNeedDetails: 'Passengers, luggage, schedule…',
    fieldNeedBusiness: 'Tell us about your service and coverage area',
    submitBtn: 'Send inquiry',
    sending: 'Sending…',
    successTitle: 'Inquiry sent!',
    successText: 'We will get back to you shortly.',
    errorText: 'Something went wrong. Please try again.',
    requiredError: 'Please fill in all the required fields.'
  },
  ESP: {
    heroEyebrow: 'Muévete con tranquilidad',
    heroTitle: 'Encuentra transporte confiable en Sayulita',
    heroSubtitle:
      'Explora taxis, traslados privados, transporte al aeropuerto y opciones para recorrer Sayulita y los destinos cercanos.',
    trust: '6 proveedores de transporte en Sayulita y la Riviera Nayarit',
    slogan: '¡Tu Conexión Local!',
    searchPlaceholder: 'Busca aeropuerto, taxi, renta de auto…',
    searchBtn: 'Buscar transporte',
    searchLabel: 'Buscar transporte',
    dirEyebrow: 'Directorio local',
    dirTitle: 'Transporte y movilidad',
    dirSubtitle:
      'Compara opciones para llegar, moverte por la zona o descubrir los alrededores. Contacta al proveedor para confirmar disponibilidad, tarifas y detalles.',
    filtersLabel: 'Filtrar proveedores',
    filters: [
      { id: 'all', label: 'Todos' },
      { id: 'airport', label: 'Aeropuerto' },
      { id: 'taxi', label: 'Taxi privado' },
      { id: 'carrental', label: 'Renta de autos' },
      { id: 'golfcarts', label: 'Carritos de golf' },
      { id: 'tours', label: 'Tours y excursiones' }
    ],
    sortLabel: 'Ordenar por',
    sortOptions: [
      { value: 'recommended', label: 'Recomendados' },
      { value: 'name', label: 'Nombre A–Z' },
      { value: 'rating', label: 'Mejor calificación' }
    ],
    resultsOne: 'proveedor',
    resultsMany: 'proveedores',
    ratingNote: 'calificación demostrativa',
    detailsLink: 'Consultar',
    websiteLink: 'Ir al sitio web',
    saveLabel: 'Guardar',
    emptyTitle: 'No encontramos opciones',
    emptyText: 'Prueba otra búsqueda o selecciona una categoría diferente.',
    clearFilters: 'Limpiar filtros',
    promoEyebrow: '¿Ofreces transporte en la zona?',
    promoTitle: 'Conecta con viajeros que visitan Sayulita',
    promoText:
      'Presenta tu servicio de taxi, traslados, renta de vehículos o tours a personas que están organizando su viaje.',
    promoBtn: 'Quiero anunciarme',
    modalDetailsText:
      'Déjanos tus datos y el proveedor te responderá con disponibilidad, tarifas y opciones de ruta.',
    modalBusinessTitle: 'Anuncia tu negocio',
    modalBusinessText:
      'Cuéntanos sobre tu negocio de transporte y nuestro equipo te responderá en menos de 24 horas.',
    fieldBusinessName: 'Negocio / Servicio',
    fieldContactName: 'Nombre del contacto',
    fieldPhone: 'WhatsApp / teléfono',
    fieldEmail: 'Email',
    fieldDate: 'Fecha estimada',
    fieldRoute: 'Ruta o servicio',
    fieldNeed: 'Detalles',
    fieldNeedDetails: 'Pasajeros, equipaje, horario…',
    fieldNeedBusiness: 'Cuéntanos sobre tu servicio y zona de cobertura',
    submitBtn: 'Enviar consulta',
    sending: 'Enviando…',
    successTitle: '¡Consulta enviada!',
    successText: 'En breve te responderemos.',
    errorText: 'Ocurrió un error. Intenta de nuevo.',
    requiredError: 'Completa todos los campos obligatorios.'
  }
};

export default function TransportationPage({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sort, setSort] = useState('recommended');
  const [saved, setSaved] = useState([]);
  const [modal, setModal] = useState(null);
  const [status, setStatus] = useState('idle');
  const [modalTop, setModalTop] = useState(90);

  useEffect(() => {
    if (!modal) return;

    const measure = () => {
      const header = document.querySelector('.header-wrapper');
      const height = header ? header.getBoundingClientRect().height : 0;
      setModalTop(Math.round(Math.max(16, height + 16)));
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [modal]);

  useEffect(() => {
    if (!modal) return undefined;

    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      setModal(null);
      setStatus('idle');
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [modal]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = entries.filter((entry) => {
      const matchesFilter = activeFilter === 'all' || entry.category === activeFilter;
      const haystack = [
        entry.name,
        entry.category,
        entry.service,
        entry.keywords,
        entry.tag.ENG,
        entry.tag.ESP,
        entry.desc.ENG,
        entry.desc.ESP
      ]
        .join(' ')
        .toLowerCase();
      return matchesFilter && (!q || haystack.includes(q));
    });

    if (sort === 'name') return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'rating') return [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return filtered;
  }, [query, activeFilter, sort]);

  const toggleSaved = (id) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const resetFilters = () => {
    setActiveFilter('all');
    setQuery('');
  };

  const closeModal = () => {
    setModal(null);
    setStatus('idle');
  };

  const openDetails = (entry) => {
    setStatus('idle');
    setModal({ mode: 'details', entry });
  };

  const openBusiness = () => {
    setStatus('idle');
    setModal({ mode: 'business' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const required = ['BusinessName', 'ContactName', 'Phone', 'Email', 'Need'];
    if (required.some((field) => !String(fd.get(field) || '').trim())) {
      setStatus('invalid');
      return;
    }

    const route = String(fd.get('Route') || '').trim();
    const date = String(fd.get('Date') || '').trim();
    const extras = [];
    if (route) extras.push(`Route: ${route}`);
    if (date) extras.push(`Date: ${date}`);
    if (extras.length) fd.set('Need', `${String(fd.get('Need')).trim()}\n${extras.join('\n')}`);

    setStatus('sending');
    try {
      const res = await fetch('/api/send-lead.php', { method: 'POST', body: fd });
      if (!res.ok) throw new Error(await res.text());
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  const isOpen = (id) => saved.includes(id);
  const isDetails = modal?.mode === 'details';

  return (
    <div className="trp-page trp-fade-in">
      {/* Hero */}
      <section className="trp-hero">
        <div className="trp-hero__bg">
          <img
            src={IMG_HERO}
            alt=""
            className="trp-hero__bg-img"
            width={1800}
            height={1000}
            fetchPriority="high"
          />
          <div className="trp-hero__overlay" />
        </div>

        <div className="trp-hero__content container">
          <motion.div
            className="trp-hero__text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="trp-eyebrow trp-eyebrow--light">{t.heroEyebrow}</span>
            <h1 className="trp-hero__title">{t.heroTitle}</h1>
            <p className="trp-hero__subtitle">{t.heroSubtitle}</p>
            <p className="trp-hero__trust">
              <MdOutlineDirectionsCar aria-hidden="true" />
              {t.trust}
            </p>
            <p className="trp-slogan">
              <span className="trp-slogan__brand">Sayulita Travels</span>
              <span className="trp-slogan__tagline">{t.slogan}</span>
            </p>
          </motion.div>

          <motion.form
            className="trp-searchbar"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById('trp-directory')?.scrollIntoView({ behavior: 'smooth' });
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <div className="trp-searchbar__field">
              <FiSearch className="trp-searchbar__icon" aria-hidden="true" />
              <input
                type="search"
                className="trp-searchbar__input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchLabel}
              />
            </div>
            <Button type="submit" variant="primary" size="md">
              {t.searchBtn} <FiArrowRight aria-hidden="true" />
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Directory */}
      <section className="trp-section" id="trp-directory">
        <div className="container">
          <SectionHeader
            label={t.dirEyebrow}
            title={t.dirTitle}
            subtitle={t.dirSubtitle}
            align="left"
          />

          <div className="trp-toolbar">
            <div className="trp-filters" role="group" aria-label={t.filtersLabel}>
              {t.filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`trp-chip ${activeFilter === f.id ? 'trp-chip--active' : ''}`}
                  aria-pressed={activeFilter === f.id}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="trp-sort">
              <label className="trp-sort__label" htmlFor="trp-sort-select">
                {t.sortLabel}
              </label>
              <select
                id="trp-sort-select"
                className="trp-sort__select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label={t.sortLabel}
              >
                {t.sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="trp-count" role="status" aria-live="polite">
            {results.length} {results.length === 1 ? t.resultsOne : t.resultsMany}
          </p>

          {results.length > 0 ? (
            <div className="trp-grid">
              {results.map((entry, idx) => (
                <motion.article
                  key={entry.id}
                  className={`trp-card ${entry.website ? 'trp-card--linked' : ''}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.06, 0.3) }}
                  whileHover={{ y: -6 }}
                >
                  {entry.website && (
                    <a
                      className="trp-card__link"
                      href={entry.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${entry.name} — ${t.websiteLink}`}
                    />
                  )}
                  <div className="trp-card__media">
                    <img
                      src={entry.image}
                      alt={entry.imageAlt[language] || entry.imageAlt.ENG}
                      loading="lazy"
                      className="trp-card__img"
                    />
                    {entry.overlayLogo && (
                      <span
                        className={`trp-card__logo ${entry.overlayLogoFit === 'portrait' ? 'trp-card__logo--portrait' : ''}`}
                      >
                        <img
                          src={entry.overlayLogo}
                          alt={entry.overlayLogoAlt?.[language] || entry.overlayLogoAlt?.ENG || ''}
                          className="trp-card__logo-img"
                        />
                      </span>
                    )}
                    <span className="trp-card__tag">{entry.tag[language] || entry.tag.ENG}</span>
                    <button
                      type="button"
                      onClick={() => toggleSaved(entry.id)}
                      className={`trp-card__heart ${isOpen(entry.id) ? 'trp-card__heart--saved' : ''}`}
                      aria-pressed={isOpen(entry.id)}
                      aria-label={`${t.saveLabel}: ${entry.name}`}
                    >
                      <FiHeart fill={isOpen(entry.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="trp-card__body">
                    <p className="trp-card__meta">
                      {entry.categoryLabel[language] || entry.categoryLabel.ENG}
                      <span className="trp-card__dot">·</span>
                      {entry.serviceLabel[language] || entry.serviceLabel.ENG}
                    </p>
                    <h3 className="trp-card__title">{entry.name}</h3>
                    {entry.rating && (
                      <p className="trp-card__rating">
                        <FiStar className="trp-card__star" aria-hidden="true" />
                        <b>{entry.rating.toFixed(1)}</b>
                        <span>
                          {(entry.ratingNote?.[language] || entry.ratingNote?.ENG) || t.ratingNote}
                        </span>
                      </p>
                    )}
                    <p className="trp-card__desc">{entry.desc[language] || entry.desc.ENG}</p>
                    <ul className="trp-card__features">
                      {entry.features.map((f) => (
                        <li key={f.ENG} className="trp-card__feature">
                          {f[language] || f.ENG}
                        </li>
                      ))}
                    </ul>
                    <div className="trp-card__foot">
                      <span className="trp-card__location">
                        <FiMapPin aria-hidden="true" />
                        {entry.location[language] || entry.location.ENG}
                      </span>
                      {entry.website ? (
                        <span className="trp-link">
                          {t.websiteLink} <FiExternalLink aria-hidden="true" />
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="trp-link"
                          onClick={() => openDetails(entry)}
                        >
                          {t.detailsLink} <FiArrowRight aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="trp-empty">
              <MdOutlineDirectionsCar className="trp-empty__icon" aria-hidden="true" />
              <h3 className="trp-empty__title">{t.emptyTitle}</h3>
              <p className="trp-empty__text">{t.emptyText}</p>
              <Button type="button" variant="outline" onClick={resetFilters}>
                {t.clearFilters}
              </Button>
            </div>
          )}

          {/* Promo for providers */}
          <section className="trp-promo">
            <div className="trp-promo__text">
              <span className="trp-eyebrow">{t.promoEyebrow}</span>
              <h2 className="trp-promo__title">{t.promoTitle}</h2>
              <p className="trp-promo__desc">{t.promoText}</p>
            </div>
            <Button variant="primary" size="lg" onClick={openBusiness}>
              {t.promoBtn} <FiArrowRight aria-hidden="true" />
            </Button>
          </section>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="trp-modal-overlay"
            style={{ alignItems: 'flex-start', paddingTop: modalTop }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="trp-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="trp-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="trp-modal__close" onClick={closeModal} aria-label="Close">
                <FiX />
              </button>

              {status === 'sent' ? (
                <div className="trp-modal__success">
                  <MdOutlineDirectionsCar className="trp-modal__success-icon" aria-hidden="true" />
                  <h3 className="trp-modal__success-title">{t.successTitle}</h3>
                  <p className="trp-modal__success-text">{t.successText}</p>
                </div>
              ) : (
                <>
                  <h2 className="trp-modal__title" id="trp-modal-title">
                    {isDetails ? modal.entry?.name : t.modalBusinessTitle}
                  </h2>
                  <p className="trp-modal__subtitle">
                    {isDetails ? t.modalDetailsText : t.modalBusinessText}
                  </p>

                  {isDetails && (
                    <p className="trp-modal__entry">
                      <MdOutlineFlightTakeoff aria-hidden="true" />
                      {modal.entry.desc[language] || modal.entry.desc.ENG}
                    </p>
                  )}

                  <form className="trp-modal__form" onSubmit={handleSubmit}>
                    <div className="trp-modal__field">
                      <label className="trp-modal__label" htmlFor="trp-business">
                        {t.fieldBusinessName}
                      </label>
                      <input
                        id="trp-business"
                        name="BusinessName"
                        type="text"
                        className="trp-modal__input"
                        defaultValue={isDetails ? modal.entry?.name : ''}
                        key={`business-${modal.entry?.id ?? 'new'}`}
                        required
                      />
                    </div>

                    <div className="trp-modal__row">
                      <div className="trp-modal__field">
                        <label className="trp-modal__label" htmlFor="trp-contact">
                          {t.fieldContactName}
                        </label>
                        <input
                          id="trp-contact"
                          name="ContactName"
                          type="text"
                          className="trp-modal__input"
                          required
                        />
                      </div>
                      <div className="trp-modal__field">
                        <label className="trp-modal__label" htmlFor="trp-phone">
                          {t.fieldPhone}
                        </label>
                        <input
                          id="trp-phone"
                          name="Phone"
                          type="tel"
                          className="trp-modal__input"
                          required
                        />
                      </div>
                    </div>

                    <div className="trp-modal__row">
                      <div className="trp-modal__field">
                        <label className="trp-modal__label" htmlFor="trp-email">
                          {t.fieldEmail}
                        </label>
                        <input
                          id="trp-email"
                          name="Email"
                          type="email"
                          className="trp-modal__input"
                          required
                        />
                      </div>
                      <div className="trp-modal__field">
                        <label className="trp-modal__label" htmlFor="trp-date">
                          {t.fieldDate}
                        </label>
                        <input
                          id="trp-date"
                          name="Date"
                          type="date"
                          className="trp-modal__input"
                        />
                      </div>
                    </div>

                    {isDetails && (
                      <div className="trp-modal__field">
                        <label className="trp-modal__label" htmlFor="trp-route">
                          <MdOutlineLuggage aria-hidden="true" /> {t.fieldRoute}
                        </label>
                        <input
                          id="trp-route"
                          name="Route"
                          type="text"
                          className="trp-modal__input"
                          placeholder="Airport → Sayulita"
                        />
                      </div>
                    )}

                    <div className="trp-modal__field">
                      <label className="trp-modal__label" htmlFor="trp-need">
                        {t.fieldNeed}
                      </label>
                      <textarea
                        id="trp-need"
                        name="Need"
                        rows={4}
                        className="trp-modal__input trp-modal__textarea"
                        placeholder={isDetails ? t.fieldNeedDetails : t.fieldNeedBusiness}
                        required
                      />
                    </div>

                    {status === 'invalid' && <p className="trp-modal__error">{t.requiredError}</p>}
                    {status === 'error' && <p className="trp-modal__error">{t.errorText}</p>}

                    <Button type="submit" variant="primary" size="lg" disabled={status === 'sending'}>
                      {status === 'sending' ? t.sending : t.submitBtn}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
