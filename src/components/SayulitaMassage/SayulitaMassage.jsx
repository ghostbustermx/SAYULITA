import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiStar, FiMapPin, FiHeart, FiX, FiArrowRight
} from 'react-icons/fi';
import { MdOutlineSpa, MdOutlineSelfImprovement, MdOutlineFaceRetouchingNatural } from 'react-icons/md';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import './SayulitaMassage.css';

const IMG_MASSAGE = 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80';
const IMG_FACIAL = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80';
const IMG_AMBIENCE = 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80';
const IMG_RELAX = 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80';
const IMG_MOVEMENT = 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80';
const IMG_LUNA_SPA = '/luna_spa_home_massage_1.webp';

const entries = [
  {
    id: 'luna-spa',
    name: 'Luna Spa',
    category: 'spa',
    categoryLabel: { ENG: 'Spa & Rituals', ESP: 'Spa y rituales' },
    zone: 'inhome',
    zoneLabel: { ENG: 'In-home', ESP: 'A domicilio' },
    rating: 4.9,
    reviews: 48,
    tag: { ENG: 'Spa & Rituals', ESP: 'Spa y rituales' },
    image: IMG_LUNA_SPA,
    imagePosition: 'center bottom',
    imageAlt: { ENG: 'Calm spa treatment room', ESP: 'Sala tranquila de tratamientos de spa' },
    desc: {
      ENG: 'Wellness rituals, body treatments and a relaxing experience tailored to what you need.',
      ESP: 'Rituales de bienestar, tratamientos corporales y una experiencia relajante adaptada a tus necesidades.'
    },
    keywords: 'spa facial rituals body treatments relaxation treatment'
  },
  {
    id: 'sayulita-sports-massage',
    name: 'Sayulita Sports Massage',
    category: 'massage',
    categoryLabel: { ENG: 'Massage', ESP: 'Masaje' },
    zone: 'inhome',
    zoneLabel: { ENG: 'In-home', ESP: 'A domicilio' },
    rating: 4.8,
    reviews: 36,
    tag: { ENG: 'Sports Massage', ESP: 'Masaje deportivo' },
    image: IMG_MASSAGE,
    imageAlt: { ENG: 'Therapeutic massage session', ESP: 'Sesión de masaje terapéutico' },
    desc: {
      ENG: 'Techniques focused on releasing muscle tension, supporting recovery and promoting relaxation.',
      ESP: 'Técnicas enfocadas en liberar tensión muscular, apoyar la recuperación y favorecer la relajación.'
    },
    keywords: 'massage sports deep tissue pain recovery relaxation Shiatsu'
  },
  {
    id: 'alma-facial-studio',
    name: 'Alma Facial Studio',
    category: 'spa',
    categoryLabel: { ENG: 'Facials', ESP: 'Faciales' },
    zone: 'north',
    zoneLabel: { ENG: 'North Zone', ESP: 'Zona norte' },
    rating: 4.7,
    reviews: 29,
    tag: { ENG: 'Facial Care', ESP: 'Cuidado facial' },
    image: IMG_FACIAL,
    imageAlt: { ENG: 'Facial treatment', ESP: 'Tratamiento facial' },
    desc: {
      ENG: 'Personalized facials to care for your skin and enjoy a moment entirely for yourself.',
      ESP: 'Tratamientos faciales personalizados para cuidar la piel y disfrutar de un momento para ti.'
    },
    keywords: 'facial skin care cleansing rejuvenation'
  },
  {
    id: 'serena-bodywork',
    name: 'Serena Bodywork',
    category: 'therapy',
    categoryLabel: { ENG: 'Therapy', ESP: 'Terapia' },
    zone: 'downtown',
    zoneLabel: { ENG: 'Downtown', ESP: 'Zona centro' },
    rating: 5.0,
    reviews: 21,
    tag: { ENG: 'Holistic Therapy', ESP: 'Terapia holística' },
    image: IMG_AMBIENCE,
    imageAlt: { ENG: 'Serene setting for therapy', ESP: 'Ambiente sereno para terapia' },
    desc: {
      ENG: 'Bodywork and guided breathwork to encourage a deeper mind-body connection.',
      ESP: 'Trabajo corporal y acompañamiento con respiración para fomentar la conexión cuerpo-mente.'
    },
    keywords: 'therapy breathwork bodywork holistic stress'
  },
  {
    id: 'brisa-massage',
    name: 'Brisa Massage',
    category: 'massage',
    categoryLabel: { ENG: 'Massage', ESP: 'Masaje' },
    zone: 'inhome',
    zoneLabel: { ENG: 'Beach & In-home', ESP: 'Playa y domicilio' },
    rating: 4.6,
    reviews: 18,
    tag: { ENG: 'At Your Space', ESP: 'En tu espacio' },
    image: IMG_RELAX,
    imageAlt: { ENG: 'Setting up a relaxing massage', ESP: 'Preparación para masaje relajante' },
    desc: {
      ENG: 'Relaxing massages in the comfort of your accommodation or in a setting by the sea.',
      ESP: 'Masajes relajantes en la comodidad de tu alojamiento o en un entorno junto al mar.'
    },
    keywords: 'massage relaxing beach house hotel home aromatherapy'
  },
  {
    id: 'raiz-terapia-integral',
    name: 'Raíz Terapia Integral',
    category: 'therapy',
    categoryLabel: { ENG: 'Therapy', ESP: 'Terapia' },
    zone: 'south',
    zoneLabel: { ENG: 'South Zone', ESP: 'Zona sur' },
    rating: 4.8,
    reviews: 25,
    tag: { ENG: 'Holistic Therapy', ESP: 'Terapia integral' },
    image: IMG_MOVEMENT,
    imageAlt: { ENG: 'Movement and wellbeing practice', ESP: 'Práctica de movimiento y bienestar' },
    desc: {
      ENG: 'Care centered on movement, mobility and support toward your personal goals.',
      ESP: 'Atención centrada en el movimiento, la movilidad y el acompañamiento de objetivos personales.'
    },
    keywords: 'therapy movement mobility pain rehabilitation integral'
  }
];

const i18n = {
  ENG: {
    heroEyebrow: 'Pause · Breathe · Reset',
    heroTitle: 'Find Your Wellness Moment in Sayulita',
    heroSubtitle: 'Explore massages, spas and holistic therapies to rest, recharge and reconnect with yourself.',
    searchPlaceholder: 'Search by name, treatment or area…',
    searchBtn: 'Search services',
    searchLabel: 'Search services',
    dirEyebrow: 'Local Directory',
    dirTitle: 'Massages, Spas & Therapies',
    dirSubtitle: 'Discover wellness options in Sayulita. From relaxing massages to full body treatments and specialized therapies.',
    filtersLabel: 'Filter services',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'massage', label: 'Massages' },
      { id: 'spa', label: 'Spas & Facials' },
      { id: 'therapy', label: 'Therapies' },
      { id: 'inhome', label: 'In-home' }
    ],
    sortLabel: 'Sort by',
    sortOptions: [
      { value: 'recommended', label: 'Recommended' },
      { value: 'name', label: 'Name A–Z' },
      { value: 'rating', label: 'Top rated' }
    ],
    reviewsLabel: 'reviews',
    resultsOne: 'place',
    resultsMany: 'places',
    detailsLink: 'View details',
    saveLabel: 'Save',
    emptyTitle: 'No results found',
    emptyText: 'Try another word or pick a different category.',
    clearFilters: 'Clear filters',
    promoEyebrow: 'For wellness professionals',
    promoTitle: 'Do you have a business in Sayulita?',
    promoText: 'Show your services to people looking for massages, treatments and wellness experiences in the area.',
    promoBtn: 'List my business',
    modalDetailsTitle: 'More information',
    modalDetailsText: 'Leave us your details and we will share more information with you.',
    modalBusinessTitle: 'List your business',
    modalBusinessText: 'Tell us about your business and our team will get back to you within 24 hours.',
    fieldBusinessName: 'Business Name',
    fieldContactName: 'Contact Name',
    fieldPhone: 'WhatsApp / Phone',
    fieldEmail: 'Email',
    fieldNeed: 'Approximate Need',
    submitBtn: 'Send request',
    sending: 'Sending…',
    successTitle: 'Request sent!',
    successText: 'We will get back to you shortly.',
    errorText: 'Something went wrong. Please try again.',
    requiredError: 'Please fill in all the fields.'
  },
  ESP: {
    heroEyebrow: 'Pausa · Respira · Renueva',
    heroTitle: 'Encuentra tu momento de bienestar en Sayulita',
    heroSubtitle: 'Explora masajes, spas y terapias holísticas para descansar, recuperar energía y reconectar contigo.',
    searchPlaceholder: 'Busca por nombre, tratamiento o zona…',
    searchBtn: 'Buscar servicios',
    searchLabel: 'Buscar servicios',
    dirEyebrow: 'Directorio local',
    dirTitle: 'Masajes, spa y terapias',
    dirSubtitle: 'Conoce opciones de bienestar en Sayulita. Desde masajes relajantes hasta tratamientos corporales y terapias especializadas.',
    filtersLabel: 'Filtrar servicios',
    filters: [
      { id: 'all', label: 'Todos' },
      { id: 'massage', label: 'Masajes' },
      { id: 'spa', label: 'Spa y faciales' },
      { id: 'therapy', label: 'Terapias' },
      { id: 'inhome', label: 'A domicilio' }
    ],
    sortLabel: 'Ordenar por',
    sortOptions: [
      { value: 'recommended', label: 'Recomendados' },
      { value: 'name', label: 'Nombre A–Z' },
      { value: 'rating', label: 'Mejor calificación' }
    ],
    reviewsLabel: 'reseñas',
    resultsOne: 'lugar',
    resultsMany: 'lugares',
    detailsLink: 'Ver detalles',
    saveLabel: 'Guardar',
    emptyTitle: 'No encontramos resultados',
    emptyText: 'Prueba con otra palabra o selecciona una categoría diferente.',
    clearFilters: 'Limpiar filtros',
    promoEyebrow: 'Para profesionales del bienestar',
    promoTitle: '¿Tienes un negocio en Sayulita?',
    promoText: 'Presenta tus servicios a personas que buscan masajes, tratamientos y experiencias de bienestar en la zona.',
    promoBtn: 'Quiero anunciarme',
    modalDetailsTitle: 'Más información',
    modalDetailsText: 'Déjanos tus datos y te compartiremos más información.',
    modalBusinessTitle: 'Anuncia tu negocio',
    modalBusinessText: 'Cuéntanos sobre tu negocio y nuestro equipo te responderá en menos de 24 horas.',
    fieldBusinessName: 'Nombre de empresa',
    fieldContactName: 'Nombre del contacto',
    fieldPhone: 'WhatsApp / teléfono',
    fieldEmail: 'Email',
    fieldNeed: 'Necesidad aproximada',
    submitBtn: 'Enviar solicitud',
    sending: 'Enviando…',
    successTitle: '¡Solicitud enviada!',
    successText: 'En breve te responderemos.',
    errorText: 'Ocurrió un error. Intenta de nuevo.',
    requiredError: 'Completa todos los campos.'
  }
};

export default function SayulitaMassage({ language = 'ENG' }) {
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

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = entries.filter((entry) => {
      const matchesFilter =
        activeFilter === 'all' ||
        entry.category === activeFilter ||
        (activeFilter === 'inhome' && entry.zone === 'inhome');
      const haystack = [
        entry.name,
        entry.category,
        entry.zone,
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
    if (sort === 'rating') return [...filtered].sort((a, b) => b.rating - a.rating);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const required = ['BusinessName', 'ContactName', 'Phone', 'Email', 'Need'];

    if (required.some((field) => !String(fd.get(field) || '').trim())) {
      setStatus('invalid');
      return;
    }

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

  return (
    <div className="smw-page smw-fade-in">
      {/* Hero */}
      <section className="smw-hero">
        <div className="smw-hero__bg">
          <img
            src={IMG_AMBIENCE}
            alt=""
            className="smw-hero__bg-img"
            width={478}
            height={602}
            fetchPriority="high"
          />
          <div className="smw-hero__overlay" />
        </div>

        <div className="smw-hero__content container">
          <motion.div
            className="smw-hero__text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="smw-eyebrow smw-eyebrow--light">{t.heroEyebrow}</span>
            <h1 className="smw-hero__title">{t.heroTitle}</h1>
            <p className="smw-hero__subtitle">{t.heroSubtitle}</p>
          </motion.div>

          <motion.form
            className="smw-searchbar"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById('smw-directory')?.scrollIntoView({ behavior: 'smooth' });
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <div className="smw-searchbar__field">
              <FiSearch className="smw-searchbar__icon" aria-hidden="true" />
              <input
                type="search"
                className="smw-searchbar__input"
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
      <section className="smw-section" id="smw-directory">
        <div className="container">
          <SectionHeader
            label={t.dirEyebrow}
            title={t.dirTitle}
            subtitle={t.dirSubtitle}
            align="left"
          />

          <div className="smw-toolbar">
            <div className="smw-filters" role="group" aria-label={t.filtersLabel}>
              {t.filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`smw-chip ${activeFilter === f.id ? 'smw-chip--active' : ''}`}
                  aria-pressed={activeFilter === f.id}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="smw-sort">
              <label className="smw-sort__label" htmlFor="smw-sort-select">
                {t.sortLabel}
              </label>
              <select
                id="smw-sort-select"
                className="smw-sort__select"
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

          <p className="smw-count" role="status" aria-live="polite">
            {results.length} {results.length === 1 ? t.resultsOne : t.resultsMany}
          </p>

          {results.length > 0 ? (
            <div className="smw-grid">
              {results.map((entry, idx) => (
                <motion.article
                  key={entry.id}
                  className="smw-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.06, 0.3) }}
                  whileHover={{ y: -6 }}
                >
                  <div className="smw-card__media">
                    <img
                      src={entry.image}
                      alt={entry.imageAlt[language] || entry.imageAlt.ENG}
                      loading="lazy"
                      className="smw-card__img"
                      style={entry.imagePosition ? { objectPosition: entry.imagePosition } : undefined}
                    />
                    <span className="smw-card__tag">{entry.tag[language] || entry.tag.ENG}</span>
                    <button
                      type="button"
                      onClick={() => toggleSaved(entry.id)}
                      className={`smw-card__heart ${isOpen(entry.id) ? 'smw-card__heart--saved' : ''}`}
                      aria-pressed={isOpen(entry.id)}
                      aria-label={`${t.saveLabel}: ${entry.name}`}
                    >
                      <FiHeart fill={isOpen(entry.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="smw-card__body">
                    <p className="smw-card__meta">
                      {entry.categoryLabel[language] || entry.categoryLabel.ENG}
                      <span className="smw-card__dot">·</span>
                      {entry.zoneLabel[language] || entry.zoneLabel.ENG}
                    </p>
                    <h3 className="smw-card__title">{entry.name}</h3>
                    <p className="smw-card__rating">
                      <FiStar className="smw-card__star" aria-hidden="true" />
                      <b>{entry.rating.toFixed(1)}</b>
                      <span>({entry.reviews} {t.reviewsLabel})</span>
                    </p>
                    <p className="smw-card__desc">{entry.desc[language] || entry.desc.ENG}</p>
                    <div className="smw-card__foot">
                      <span className="smw-card__location">
                        <FiMapPin aria-hidden="true" />
                        {entry.zoneLabel[language] || entry.zoneLabel.ENG}
                      </span>
                      <button
                        type="button"
                        className="smw-link"
                        onClick={() => setModal({ mode: 'details', entry })}
                      >
                        {t.detailsLink} <FiArrowRight aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="smw-empty">
              <MdOutlineSpa className="smw-empty__icon" aria-hidden="true" />
              <h3 className="smw-empty__title">{t.emptyTitle}</h3>
              <p className="smw-empty__text">{t.emptyText}</p>
              <Button type="button" variant="outline" onClick={resetFilters}>
                {t.clearFilters}
              </Button>
            </div>
          )}

          {/* Promo */}
          <section className="smw-promo">
            <div className="smw-promo__text">
              <span className="smw-eyebrow">{t.promoEyebrow}</span>
              <h2 className="smw-promo__title">{t.promoTitle}</h2>
              <p className="smw-promo__desc">{t.promoText}</p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setModal({ mode: 'business' })}
            >
              {t.promoBtn} <FiArrowRight aria-hidden="true" />
            </Button>
          </section>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="smw-modal-overlay"
            style={{ alignItems: 'flex-start', paddingTop: modalTop }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="smw-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="smw-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="smw-modal__close" onClick={closeModal} aria-label="Close">
                <FiX />
              </button>

              {status === 'sent' ? (
                <div className="smw-modal__success">
                  <MdOutlineSelfImprovement className="smw-modal__success-icon" aria-hidden="true" />
                  <h3 className="smw-modal__success-title">{t.successTitle}</h3>
                  <p className="smw-modal__success-text">{t.successText}</p>
                </div>
              ) : (
                <>
                  <h2 className="smw-modal__title" id="smw-modal-title">
                    {modal.mode === 'business' ? t.modalBusinessTitle : modal.entry?.name || t.modalDetailsTitle}
                  </h2>
                  <p className="smw-modal__subtitle">
                    {modal.mode === 'business' ? t.modalBusinessText : t.modalDetailsText}
                  </p>

                  {modal.mode === 'details' && (
                    <p className="smw-modal__entry">
                      <MdOutlineFaceRetouchingNatural aria-hidden="true" />
                      {modal.entry.desc[language] || modal.entry.desc.ENG}
                    </p>
                  )}

                  <form className="smw-modal__form" onSubmit={handleSubmit}>
                    <div className="smw-modal__row">
                      <div className="smw-modal__field">
                        <label className="smw-modal__label" htmlFor="smw-business">
                          {t.fieldBusinessName}
                        </label>
                        <input
                          id="smw-business"
                          name="BusinessName"
                          type="text"
                          className="smw-modal__input"
                          required
                        />
                      </div>
                      <div className="smw-modal__field">
                        <label className="smw-modal__label" htmlFor="smw-contact">
                          {t.fieldContactName}
                        </label>
                        <input
                          id="smw-contact"
                          name="ContactName"
                          type="text"
                          className="smw-modal__input"
                          required
                        />
                      </div>
                    </div>
                    <div className="smw-modal__row">
                      <div className="smw-modal__field">
                        <label className="smw-modal__label" htmlFor="smw-phone">
                          {t.fieldPhone}
                        </label>
                        <input
                          id="smw-phone"
                          name="Phone"
                          type="tel"
                          className="smw-modal__input"
                          required
                        />
                      </div>
                      <div className="smw-modal__field">
                        <label className="smw-modal__label" htmlFor="smw-email">
                          {t.fieldEmail}
                        </label>
                        <input
                          id="smw-email"
                          name="Email"
                          type="email"
                          className="smw-modal__input"
                          required
                        />
                      </div>
                    </div>
                    <div className="smw-modal__field">
                      <label className="smw-modal__label" htmlFor="smw-need">
                        {t.fieldNeed}
                      </label>
                      <textarea
                        id="smw-need"
                        name="Need"
                        rows={4}
                        className="smw-modal__input smw-modal__textarea"
                        required
                      />
                    </div>

                    {status === 'invalid' && <p className="smw-modal__error">{t.requiredError}</p>}
                    {status === 'error' && <p className="smw-modal__error">{t.errorText}</p>}

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
