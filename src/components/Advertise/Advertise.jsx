import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiTrendingUp, FiImage, 
  FiMessageSquare, FiUsers, FiCheck, FiShield, FiChevronDown, 
  FiChevronUp, FiArrowRight, FiAward, FiStar
} from 'react-icons/fi';
import { BiBuildingHouse, BiStore, BiPhoneCall } from 'react-icons/bi';
import FloatingPalms from '../FloatingPalms/FloatingPalms';
import './Advertise.css';
import beachHotel from '../../assets/beach-hotel.webp';

const i18n = {
  ENG: {
    heroBadge: "B2B Partnership",
    heroTitle: <>Reach the People Already <br /><span className="text-highlight">Looking for You</span> in Sayulita</>,
    heroSubtitle: "Every day, more than 2,000 people search for vacation rentals, restaurants, tours, and services in Sayulita — and can land on SayulitaTravel. They're ready to book. They just need to find you.",
    heroBtnRental: "List your rental",
    heroBtnBusiness: "List your business",
    whoTitle: "Who Advertises With Us",
    whoSubtitle: "SayulitaTravel is where Sayulita's entire tourism economy lives online. If your business depends on visitors coming to Sayulita, this is where you need to be.",
    whoCard1Title: "Vacation Rental Owners",
    whoCard1Text1: "You own a house, villa, condo, or boutique stay in Sayulita. You want bookings — direct bookings, with guests who respect the property and pay without drama.",
    whoCard1Text2: "Maybe you're tired of Airbnb/Vrbo commissions eating into your margins, or want a channel you control. SayulitaTravel gives you a direct line to guests searching for exactly what you have.",
    whoCard1Link: "List your vacation rental",
    whoCard2Title: "Local Businesses",
    whoCard2Text1: "You run a restaurant, surf school, yoga studio, tour company, spa, photography, or catering business. It's not about having followers, but about having clients who are ready to buy next week.",
    whoCard2Text2: "We can connect you with people interested in your business.",
    whoCard2Categories: "Listed categories:",
    whoCard2More: "more",
    whoCard2Link: "List your business",
    whoCard3Title: "Agents & Developers",
    whoCard3Text1: 'Buyers searching "Sayulita real estate" and "casas en venta en Sayulita" can land on SayulitaTravel',
    whoCard3Text2: "If you have properties to sell or a development to promote, your agency and listings belong in our dedicated real estate directories.",
    whoCard3Link: "List your real estate",
    categories: ['restaurants', 'bars', 'surf schools', 'private chefs', 'yoga & wellness', 'tours & excursions', 'fishing charters', 'wedding planners', 'florists', 'DJs', 'photographers', 'car rentals', 'transportation', 'retail & boutiques', 'real estate agencies'],
    benefitsTitle: "What You Get With a SayulitaTravel Listing",
    benefitsSubtitle: "A listing on SayulitaTravel isn't just a banner ad. It's a complete presence on the platform that will be one of the most-visited in Sayulita on the internet.",
    valueProps: [
      { icon: "FiImage", title: "Your Own Page on the Platform that Will Become #1 in Sayulita", desc: "Each listing gets a dedicated page — not a row in a table. A real page with a professional photo gallery (up to 40 photos), availability calendar, direct contact form, WhatsApp button, map location, guest reviews, and direct links to your website." },
      { icon: "FiTrendingUp", title: "Google Visibility You Can't Build Alone", desc: "We will appear on the first pages of Google for searches like 'Sayulita vacation rentals' and 'restaurants in Sayulita'. List with us and leverage domain authority, placing you in front of travelers without you spending years of SEO investment." },
      { icon: "FiMessageSquare", title: "Leads That Come Directly to You", desc: "Every inquiry made through your listing goes directly to you by email, WhatsApp, or phone. No third-party inbox, no communication filters, and absolutely zero commission. You respond directly, you close directly." },
      { icon: "FiAward", title: "The Sayulita Trust Signal", desc: "Twenty-eight years of real experience in Tourism have built something valuable: travelers trust listings in the Sayulita region. That trust transfers to you the moment your property or business goes live." },
      { icon: "FiUsers", title: "A Team in Sayulita — Not a Support Ticket", desc: "When you have questions or want to optimize your listing, you can even contact a real person physically located in Sayulita. We know the town, the travelers, and exactly what makes a listing convert." }
    ],
    statsTitle: "The Numbers — Why This Works",
    statsSubtitle: "We don't ask you to take this on faith. Here are the platform footprints in Sayulita.",
    stats: [
      { value: "2,000+", label: "Unique daily visitors", desc: "People actively planning or booking a Sayulita trip" },
      { value: "650+", label: "Vacation rentals", desc: "Actively generating commission-free bookings" },
      { value: "300+", label: "Local businesses", desc: "Across restaurants, wellness, charters, and more" },
      { value: "20,000+", label: "Verified guest reviews", desc: "Visible data from platforms on Google Reviews" },
      { value: "Since 1998", label: "20+ Years of local trust", desc: "Deep community roots" },
      { value: "#1", label: "Leading travel platforms", desc: "Very comprehensive and visited portals of Sayulita" }
    ],
    howTitle: "How It Works",
    howSubtitle: "From sign-up to your first lead. Most advertisers are live within 48 hours.",
    steps: [
      { number: "01", title: "Tell us about your property or business", desc: "Fill out our listing form with your details, photos, and contact information. If you need help with photos or copy, our team is right here to assist and we can connect you with specialized local photographers in Sayulita if you need them." },
      { number: "02", title: "We verify and approve your listing", desc: "Every listing on SayulitaTravel is reviewed by our local team before going live. This maintains the quality and trust that travelers expect." },
      { number: "03", title: "Your page goes live on SayulitaTravel", desc: "Your listing appears in the relevant search results — and starts being indexed by Google." },
      { number: "04", title: "Leads can come directly to you", desc: "Inquiries, booking requests, and messages go straight to your email or phone. You handle guests and payments your way." },
      { number: "05", title: "Optimize as you go", desc: "Update your photos, adjust pricing, and add seasonal promos. Your listing is yours to manage, with our support team available anytime." }
    ],
    pricingTitle: "Listing Plans & Options",
    pricingSubtitle: "We offer plans for every type of advertiser — from a single vacation rental to a full resort property or local business. No commissions, no transaction fees, just a flat annual rate.",
    plans: [
      { name: "Basic Plan", price: "$199", period: "USD per year", desc: "Special Launch Promotion: Get features of our Featured and Premium plans for a flat Basic annual rate!", features: ["Dedicated listing page with photos & description", "Direct contact form & WhatsApp integration", "Appearance in category search results", "Google indexing through SayulitaTravel domain", "Guest review system", "Access to self-service dashboard", "Local support team in Sayulita", "Priority placement & Featured badge on list cards", "Homepage placement & spotlight promotion", "Inclusion in SayulitaTravel email newsletters", "1-on-1 listing optimization advice"], promo: true, badge: "Special Launch Promo", cta: "Get Started Now", featuresTitle: "What's included:" },
      { name: "Featured Plan", price: "$349", period: "USD per year", desc: "Elevates visibility and drives consistent bookings.", features: ["All Basic Plan features", "Priority placement in category search results", "Featured badge on list cards", "Inclusion in SayulitaTravel email newsletters", "Enhanced SEO page optimization", "Quarterly performance report"], locked: true, badge: "Locked during launch", cta: "Currently Unavailable", featuresTitle: "What's included:" },
      { name: "Premium Plan", price: "$599", period: "USD per year", desc: "Maximum exposure across the entire platform and social channels.", features: ["All Featured Plan features", "Homepage placement & spotlight promotion", "Social media feature posts (15k+ followers)", "Priority support & photography audit", "Monthly performance report", "1-on-1 listing optimization advice"], locked: true, badge: "Locked during launch", cta: "Currently Unavailable", featuresTitle: "What's included:" }
    ],
    pricingMeta1: "No commission. No per-booking fees. A flat annual rate — that's it.",
    pricingMeta2: "Whatever you earn from bookings or customers is yours entirely.",
    pricingMetaCta: "Talk to us first",
    guaranteeTitle: "The 100% Results Guarantee",
    guaranteeText: "We're confident enough in what we deliver to back it up. If your listing doesn't generate results — within the first 90 days, we'll extend your listing to the next year at no cost.",
    guaranteeSubtext: 'No fine print. No complicated definitions of "results." We will offer this guarantee to new customers, and we will rarely have to use it because the platforms work. It completely removes the risk of trying us.',
    airbnbTitle: "Why Not Just Stay on Airbnb?",
    airbnbSubtitle: "Airbnb works, but it has severe limitations that eat into your profits and control.",
    airbnbDisTitle: "Airbnb's Disadvantages",
    airbnbDisItems: [
      "They charge guests 14–20% extra: A guest looking at your $200/night home pays up to $240. They might choose a cheaper stay just to avoid that platform markup.",
      "They own your guest relationships: You can't email guests directly post-checkout or build a repeat-booking client database.",
      "Algorithm dependency: A policy shift or one bad review can tank your search rankings overnight. You have zero control.",
      "They host 100,000 destinations: Guests browse globally. On SayulitaTravel, every single visitor is specifically looking for Sayulita."
    ],
    airbnbAdvTitle: "The SayulitaTravel Advantage",
    airbnbAdvText1: "We're not asking you to leave Airbnb. Many of our hosts run listings on both channels.",
    airbnbAdvText2: "We are asking you to own a marketing channel that works for you, not against you. By generating direct bookings, you retain 100% of your earnings, build direct relationships, and establish long-term asset value.",
    airbnbAdvBtn: "Establish Direct Channel",
    testimonialTitle: "What Advertisers Say",
    testimonialSubtitle: "Join hundreds of successful owners and businesses who have advertised on platforms since 2004.",
    testimonials: [
      { quote: '"I was skeptical. I\'ve paid for online advertising before and gotten nothing. Within the first month I had three direct bookings — all from people who said they found me online. The listing paid for itself in the first week."', author: "David K., vacation rental owner" },
      { quote: '"My restaurant gets walk-in traffic from people who tell me they found us online specifically. They\'re not lost tourists — they\'ve done their research and they\'re ready to spend. That\'s a different kind of customer."', author: "Fernanda R., restaurant owner" },
      { quote: '"I was paying Airbnb nearly $8,000 in commissions last year. I moved half my inventory to direct bookings through online. My revenue per booking went up, and I finally have a relationship with my guests."', author: "Mike T., villa owner · 3 properties listed" },
      { quote: '"The team helped me set up my listing from scratch — I\'m not technical at all. They rewrote my description, told me which photos to use, and explained how guests search. It felt like having a local partner, not a vendor."', author: "Ana P., surf school owner" }
    ],
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about listing on SayulitaTravel.",
    faqs: [
      { q: "How is SayulitaTravel different from Airbnb or Vrbo?", a: "We're a listing platform, not a booking agent. Guests find you here and contact you directly — there are no commissions, no fees added to the guest's checkout, and no platform sitting between you and your client. Airbnb and Vrbo earn a percentage of every transaction. We charge a flat annual listing fee — regardless of how much business you generate." },
      { q: "Do I need a professional photographer before I can list?", a: "No. You can start with your own photos and upgrade later. That said, listings with professional photography receive significantly more inquiries — we can connect you with local photographers who specialize in Sayulita properties if you need them." },
      { q: "How quickly will I start getting leads?", a: "Most listings receive their first inquiry within the first two weeks of going live, sometimes faster if you're in a high-demand category (beachfront rentals, restaurants on the main plaza). Results vary by season, category, and listing quality — but the 90-day results guarantee means we'll extend your listing to the next year at no cost." },
      { q: "Can I list on SayulitaTravel and Airbnb at the same time?", a: "Absolutely. Most of our advertisers do. Many use SayulitaTravel as their primary direct-booking channel and keep Airbnb as a secondary source to fill remaining availability. Over time, many shift the balance as they build their own guest database." },
      { q: "I'm not based in Sayulita full-time. Can I still list?", a: "Yes. Many of our property owners manage their Sayulita rental from the US or Canada. As long as you have a local property manager or contact in Sayulita for guest arrivals, you can list and manage everything remotely through your dashboard." },
      { q: "What happens if a guest has a problem with my property?", a: "That's between you and the guest — as it should be. We're not an OTA and we don't mediate disputes. What we do provide is a platform for you to advertise to potential clients, which incentivizes good practice on both sides." },
      { q: "How do I update my listing once it's live?", a: "You have access to a full listing dashboard where you can update photos, description, pricing, availability, and contact details at any time. No need to contact us for routine updates." }
    ],
    finalTitle: "Ready to Start Getting Direct Leads?",
    finalText: "Over 650 properties and 300 local businesses in Sayulita already list on Online Platforms. If you're not listed, you're invisible to 2,000 high-intent visitors daily.",
    finalSubtext: "Setup takes less than 48 hours. Our Results Guarantee completely removes your financial risk.",
    finalBtnRental: "List Vacation Rental",
    finalBtnBusiness: "List Local Business",
    finalBtnTeam: "Talk to our team",
    finalOffice: 'Questions? Our team is in Sayulita — reach us at <a href="mailto:info@sayulitatravel.com">info@sayulitatravel.com</a>.'
  },
  ESP: {
    heroBadge: "Asociación B2B",
    heroTitle: <>Llega a las Personas que Ya te <br /><span className="text-highlight">Buscan</span> en Sayulita</>,
    heroSubtitle: "Cada día, más de 2,000 personas buscan rentas vacacionales, restaurantes, tours y servicios en Sayulita — y pueden llegar a SayulitaTravel. Están listos para reservar. Solo necesitan encontrarte.",
    heroBtnRental: "Anuncia tu renta",
    heroBtnBusiness: "Anuncia tu negocio",
    whoTitle: "Quién Anuncia Con Nosotros",
    whoSubtitle: "SayulitaTravel es donde toda la economía turística de Sayulita vive en línea. Si tu negocio depende de visitantes que vienen a Sayulita, aquí es donde debes estar.",
    whoCard1Title: "Dueños de Rentas Vacacionales",
    whoCard1Text1: "Tienes una casa, villa, condominio o estancia boutique en Sayulita. Quieres reservaciones — reservaciones directas, con huéspedes que respeten la propiedad y paguen sin complicaciones.",
    whoCard1Text2: "Tal vez estás cansado de que las comisiones de Airbnb/Vrbo reduzcan tus ganancias, o quieres un canal que controles. SayulitaTravel te da una línea directa con huéspedes que buscan exactamente lo que ofreces.",
    whoCard1Link: "Anuncia tu renta vacacional",
    whoCard2Title: "Negocios Locales",
    whoCard2Text1: "Tienes un restaurante, escuela de surf, estudio de yoga, tour operadora, spa, fotografía o servicio de catering. No se trata de tener seguidores, sino de contar con clientes que estén preparados para comprar la próxima semana.",
    whoCard2Text2: "Te podemos enlazar con personas interesadas en tu negocio.",
    whoCard2Categories: "Categorías listadas:",
    whoCard2More: "más",
    whoCard2Link: "Anuncia tu negocio",
    whoCard3Title: "Agentes & Desarrolladores",
    whoCard3Text1: 'Compradores que buscan "Sayulita real estate" y "casas en venta en Sayulita" pueden llegar a SayulitaTravel',
    whoCard3Text2: "Si tienes propiedades para vender o un desarrollo para promover, tu agencia y listados pertenecen a nuestros directorios especializados de bienes raíces.",
    whoCard3Link: "Anuncia tu propiedad",
    categories: ['restaurantes', 'bares', 'escuelas de surf', 'chefs privados', 'yoga & bienestar', 'tours & excursiones', 'chart de pesca', 'organizadores de bodas', 'florerías', 'DJs', 'fotógrafos', 'renta de autos', 'transporte', 'tiendas & boutiques', 'agencias inmobiliarias'],
    benefitsTitle: "Lo que Obtienes con un Listado en SayulitaTravel",
    benefitsSubtitle: "Un listado en SayulitaTravel no es solo un anuncio publicitario. Es una presencia completa en la plataforma que será de las más visitadas de Sayulita en internet.",
    valueProps: [
      { icon: "FiImage", title: "Tu Propia Página en la Plataforma que llegará a ser #1 de Sayulita", desc: "Cada listado obtiene una página dedicada, no una fila en una tabla. Una página real con galería profesional (hasta 40 fotos), calendario de disponibilidad, formulario de contacto directo, botón de WhatsApp, ubicación en mapa, reseñas de huéspedes y enlaces directos a tu sitio web." },
      { icon: "FiTrendingUp", title: "Visibilidad en Google que No Puedes Construir Solo", desc: "Apareceremos en las primeras páginas de Google para búsquedas como 'rentas vacacionales en Sayulita' y 'restaurantes en Sayulita'. Anunciate con nosotros y aprovecha la autoridad de dominio, colocándote frente a viajeros sin que gastes años de inversión en SEO." },
      { icon: "FiMessageSquare", title: "Clientes Potenciales que Llegan Directamente a Ti", desc: "Cada consulta hecha a través de tu listado llega directamente a ti por correo electrónico, WhatsApp o teléfono. Sin bandeja de entrada de terceros, sin filtros de comunicación y cero comisiones. Tú respondes directamente, tú cierras directamente." },
      { icon: "FiAward", title: "La Señal de Confianza de Sayulita", desc: "Veinte y ocho años de experiencia reales en Turismo han construido algo valioso: los viajeros confían en los listados de la región de Sayulita. Esa confianza se transfiere a ti en el momento en que tu propiedad o negocio se publica." },
      { icon: "FiUsers", title: "Un Equipo en Sayulita — No un Ticket de Soporte", desc: "Cuando tienes preguntas o quieres optimizar tu listado, incluso puedes contactar a una persona real ubicada físicamente en Sayulita. Conocemos el pueblo, los viajeros y exactamente lo que hace que un listado convierta." }
    ],
    statsTitle: "Los Números — Por Qué Funciona",
    statsSubtitle: "No te pedimos que lo aceptes por fe. Aquí están las huellas de plataformas en Sayulita.",
    stats: [
      { value: "2,000+", label: "Visitantes diarios únicos", desc: "Personas planeando o reservando un viaje a Sayulita" },
      { value: "650+", label: "Rentas vacacionales", desc: "Generando reservaciones sin comisiones activamente" },
      { value: "300+", label: "Negocios locales", desc: "Restaurantes, bienestar, charters y más" },
      { value: "20,000+", label: "Reseñas verificadas", desc: "Datos visibles desde plataformas en Google Reviews" },
      { value: "Since 1998", label: "20+ Años de confianza local", desc: "Raíces comunitarias profundas" },
      { value: "#1", label: "Plataformas turísticas líder", desc: "Portales muy completos y visitados de Sayulita" }
    ],
    howTitle: "Cómo Funciona",
    howSubtitle: "Desde el registro hasta tu primer cliente potencial. La mayoría de los anunciantes están en línea en 48 horas.",
    steps: [
      { number: "01", title: "Cuéntanos sobre tu propiedad o negocio", desc: "Completa nuestro formulario con tus datos, fotos e información de contacto. Si necesitas ayuda con fotos o contenido, nuestro equipo está aquí para ayudarte y podemos conectarte con fotógrafos locales especializados de Sayulita si los necesitas." },
      { number: "02", title: "Verificamos y aprobamos tu listado", desc: "Cada listado en SayulitaTravel es revisado por nuestro equipo local antes de publicarse. Esto mantiene la calidad y confianza que los viajeros esperan." },
      { number: "03", title: "Tu página se publica en SayulitaTravel", desc: "Tu listado aparece en los resultados de búsqueda relevantes — y comienza a ser indexado por Google." },
      { number: "04", title: "Los clientes potenciales pueden llegar directamente a ti", desc: "Las consultas, solicitudes de reserva y mensajes van directamente a tu correo o teléfono. Tú manejas huéspedes y pagos a tu manera." },
      { number: "05", title: "Optimiza sobre la marcha", desc: "Actualiza tus fotos, ajusta precios y agrega promociones de temporada. Tu listado es tuyo para administrar, con nuestro equipo de soporte disponible en cualquier momento." }
    ],
    pricingTitle: "Planes y Opciones de Listado",
    pricingSubtitle: "Ofrecemos planes para cada tipo de anunciante — desde una renta vacacional hasta una propiedad de resort o negocio local. Sin comisiones, sin tarifas por transacción, solo una tarifa anual fija.",
    plans: [
      { name: "Plan Básico", price: "$199", period: "USD por año", desc: "Promoción Especial de Lanzamiento: ¡Obtén características de nuestros planes Destacado y Premium por una tarifa básica anual!", features: ["Página de listado dedicada con fotos y descripción", "Formulario de contacto directo e integración de WhatsApp", "Aparición en resultados de búsqueda por categoría", "Indexación en Google a través del dominio SayulitaTravel", "Sistema de reseñas de huéspedes", "Acceso al panel de autogestión", "Equipo de soporte local en Sayulita", "Ubicación prioritaria e insignia Destacado", "Colocación en portada y promoción destacada", "Inclusión en boletines de SayulitaTravel", "Asesoría personalizada de optimización"], promo: true, badge: "Promo Especial de Lanzamiento", cta: "Comienza Ahora", featuresTitle: "Incluye:" },
      { name: "Plan Destacado", price: "$349", period: "USD por año", desc: "Eleva la visibilidad y genera reservaciones consistentes.", features: ["Todas las características del Plan Básico", "Ubicación prioritaria en resultados de búsqueda", "Insignia Destacado en tarjetas de listado", "Inclusión en boletines de SayulitaTravel", "Optimización SEO de página mejorada", "Reporte trimestral de rendimiento"], locked: true, badge: "Bloqueado durante lanzamiento", cta: "No Disponible", featuresTitle: "Incluye:" },
      { name: "Plan Premium", price: "$599", period: "USD por año", desc: "Máxima exposición en toda la plataforma y canales sociales.", features: ["Todas las características del Plan Destacado", "Colocación en portada y promoción destacada", "Publicaciones en redes sociales (15k+ seguidores)", "Soporte prioritario y auditoría de fotografía", "Reporte mensual de rendimiento", "Asesoría personalizada de optimización"], locked: true, badge: "Bloqueado durante lanzamiento", cta: "No Disponible", featuresTitle: "Incluye:" }
    ],
    pricingMeta1: "Sin comisión. Sin tarifas por reservación. Una tarifa anual fija — eso es todo.",
    pricingMeta2: "Todo lo que ganes con reservaciones o clientes es completamente tuyo.",
    pricingMetaCta: "Habla con nosotros",
    guaranteeTitle: "La Garantía de Resultados 100%",
    guaranteeText: "Tenemos suficiente confianza en lo que ofrecemos para respaldarlo. Si tu listado no genera resultados — dentro de los primeros 90 días, extenderemos tu listado al siguiente año por nuestra cuenta sin costo.",
    guaranteeSubtext: 'Sin letra chiquita. Sin definiciones complicadas de "resultados". Ofreceremos esta garantía a clientes nuevos, y rara vez tendremos que usarla porque las plataformas funcionan. Elimina completamente el riesgo de probarnos.',
    airbnbTitle: "¿Por Qué No Quedarte Solo en Airbnb?",
    airbnbSubtitle: "Airbnb funciona, pero tiene limitaciones severas que reducen tus ganancias y control.",
    airbnbDisTitle: "Desventajas de Airbnb",
    airbnbDisItems: [
      "Le cobran 14–20% extra a los huéspedes: Un huésped que ve tu casa de $200/noche paga hasta $240. Podrían elegir una estancia más barata solo para evitar ese margen de la plataforma.",
      "Son dueños de tus relaciones con huéspedes: No puedes enviar correos electrónicos directamente a los huéspedes después del check-out ni construir una base de datos de clientes recurrentes.",
      "Dependencia del algoritmo: Un cambio de política o una mala reseña puede hundir tu ranking de búsqueda de la noche a la mañana. Tienes cero control.",
      "Albergan 100,000 destinos: Los huéspedes navegan globalmente. En SayulitaTravel, cada visitante está específicamente buscando Sayulita."
    ],
    airbnbAdvTitle: "La Ventaja de SayulitaTravel",
    airbnbAdvText1: "No te pedimos que dejes Airbnb. Muchos de nuestros anfitriones tienen listados en ambos canales.",
    airbnbAdvText2: "Te pedimos que tengas un canal de marketing que funcione para ti, no en tu contra. Al generar reservaciones directas, retienes el 100% de tus ganancias, construyes relaciones directas y estableces valor patrimonial a largo plazo.",
    airbnbAdvBtn: "Establece un Canal Directo",
    testimonialTitle: "Lo Que Dicen los Anunciantes",
    testimonialSubtitle: "Únete a cientos de propietarios y negocios exitosos que se han anunciado en plataformas desde 2004.",
    testimonials: [
      { quote: '"Era escéptico. He pagado por publicidad en línea antes y no he obtenido nada. En el primer mes tuve tres reservaciones directas — todas de personas que dijeron haberme encontrado en línea. El listado se pagó solo en la primera semana."', author: "David K., dueño de renta vacacional" },
      { quote: '"Mi restaurante recibe clientes que me dicen que nos encontraron específicamente en línea. No son turistas perdidos — han hecho su investigación y están listos para gastar. Ese es un tipo diferente de cliente."', author: "Fernanda R., dueña de restaurante" },
      { quote: '"El año pasado le pagaba a Airbnb casi $8,000 en comisiones. Moví la mitad de mi inventario a reservaciones directas a través de en línea. Mis ingresos por reservación aumentaron, y finalmente tengo una relación con mis huéspedes."', author: "Mike T., dueño de villa · 3 propiedades listadas" },
      { quote: '"El equipo me ayudó a configurar mi listado desde cero — no soy nada técnico. Reescribieron mi descripción, me dijeron qué fotos usar y explicaron cómo buscan los huéspedes. Se sintió como tener un socio local, no un proveedor."', author: "Ana P., dueña de escuela de surf" }
    ],
    faqTitle: "Preguntas Frecuentes",
    faqSubtitle: "Todo lo que necesitas saber sobre anunciarte en SayulitaTravel.",
    faqs: [
      { q: "¿En qué se diferencia SayulitaTravel de Airbnb o Vrbo?", a: "Somos una plataforma de listados, no una agencia de reservaciones. Los huéspedes te encuentran aquí y te contactan directamente — no hay comisiones, ni tarifas añadidas al checkout del huésped, ni plataforma interpuesta entre tú y tu cliente. Airbnb y Vrbo ganan un porcentaje de cada transacción. Nosotros cobramos una tarifa anual fija — sin importar cuánto negocio generes." },
      { q: "¿Necesito un fotógrafo profesional antes de poder listarme?", a: "No. Puedes comenzar con tus propias fotos y actualizarlas después. Dicho esto, los listados con fotografía profesional reciben significativamente más consultas — podemos conectarte con fotógrafos locales especializados en propiedades de Sayulita si los necesitas." },
      { q: "¿Qué tan rápido empezaré a recibir clientes potenciales?", a: "La mayoría de los listados reciben su primera consulta dentro de las primeras dos semanas de publicarse, a veces más rápido si estás en una categoría de alta demanda (rentas frente al mar, restaurantes en la plaza principal). Los resultados varían según temporada, categoría y calidad del listado — pero la garantía de resultados de 90 días significa que extenderemos tu listado al siguiente año por nuestra cuenta sin costo." },
      { q: "¿Puedo listarme en SayulitaTravel y Airbnb al mismo tiempo?", a: "Absolutamente. La mayoría de nuestros anunciantes lo hacen. Muchos usan SayulitaTravel como su canal principal de reservación directa y mantienen Airbnb como fuente secundaria para llenar la disponibilidad restante. Con el tiempo, muchos equilibran la balanza mientras construyen su propia base de datos de huéspedes." },
      { q: "No vivo en Sayulita tiempo completo. ¿Aún puedo listarme?", a: "Sí. Muchos de nuestros propietarios administran su renta en Sayulita desde EE.UU. o Canadá. Siempre que tengas un administrador de propiedad local o contacto en Sayulita para la llegada de huéspedes, puedes listar y administrar todo de forma remota a través de tu panel." },
      { q: "¿Qué pasa si un huésped tiene un problema con mi propiedad?", a: "Eso es entre tú y el huésped — como debería ser. No somos una OTA y no mediamos disputas. Lo que proporcionamos es una plataforma para anunciarte con clientes potenciales, que incentiva buenas prácticas en ambos lados." },
      { q: "¿Cómo actualizo mi listado una vez que está publicado?", a: "Tienes acceso a un panel completo donde puedes actualizar fotos, descripción, precios, disponibilidad y datos de contacto en cualquier momento. No necesitas contactarnos para actualizaciones de rutina." }
    ],
    finalTitle: "¿Listo para Empezar a Recibir Clientes Directos?",
    finalText: "Más de 650 propiedades y 300 negocios locales en Sayulita ya se anuncian en Plataformas Online. Si no estás listado, eres invisible para 2,000 visitantes de alta intención al día.",
    finalSubtext: "La configuración toma menos de 48 horas. Nuestra Garantía de Resultados elimina completamente tu riesgo financiero.",
    finalBtnRental: "Anuncia Renta Vacacional",
    finalBtnBusiness: "Anuncia Negocio Local",
    finalBtnTeam: "Habla con nuestro equipo",
    finalOffice: '¿Preguntas? Nuestro equipo está en Sayulita — contáctanos en <a href="mailto:info@sayulitatravel.com">info@sayulitatravel.com</a>.'
  }
};

let autoModalShown = false;

export default function Advertise({ language = 'ENG' }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTop] = useState(90);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const t = i18n[language] || i18n.ENG;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('openModal') === 'true') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const timer = setTimeout(() => setShowModal(true), 550);
      return () => clearTimeout(timer);
    }

    const navEntry = performance.getEntriesByType('navigation')[0];
    const landedDirectly = !navEntry
      || new URL(navEntry.name, window.location.href).pathname === window.location.pathname;

    if (landedDirectly && window.location.pathname === '/advertise' && !autoModalShown) {
      const timer = setTimeout(() => {
        autoModalShown = true;
        setShowModal(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const iconMap = {
    FiImage: <FiImage size={24} />,
    FiTrendingUp: <FiTrendingUp size={24} />,
    FiMessageSquare: <FiMessageSquare size={24} />,
    FiAward: <FiAward size={24} />,
    FiUsers: <FiUsers size={24} />
  };

  const valueProps = t.valueProps.map(p => ({ ...p, icon: iconMap[p.icon] }));

  const categories = t.categories;
  const stats = t.stats;
  const steps = t.steps;
  const plans = t.plans;
  const faqs = t.faqs;

  return (
    <div className="advertise-page animate-fade-in">
      {/* Hero Section */}
      <section className="adv-hero">
        <div className="adv-hero__bg">
          <img
        src={beachHotel.src}
        alt="Sayulita Tropical Vibe"
        className="adv-hero__bg-img"
        width={1024}
        height={1024}
        fetchPriority="high"
      />
          <div className="adv-hero__overlay" />
        </div>
        <div className="adv-hero__content container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="adv-hero__text-box"
          >
            <span className="adv-hero__badge">{t.heroBadge}</span>
            <h1 className="adv-hero__title">{t.heroTitle}</h1>
            <p className="adv-hero__subtitle">{t.heroSubtitle}</p>
            <div className="adv-hero__ctas">
              <button onClick={() => scrollToSection('pricing')} className="adv-btn adv-btn--primary">
                {t.heroBtnRental} <FiArrowRight />
              </button>
              <button onClick={() => scrollToSection('pricing')} className="adv-btn adv-btn--secondary">
                {t.heroBtnBusiness} <FiArrowRight />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro section: Who Advertises With Us */}
      <section className="adv-section adv-section--grey" id="who-advertises">
        <FloatingPalms />
        <div className="container">
          <div className="adv-section-header text-center">
            <h2 className="adv-section-title">{t.whoTitle}</h2>
            <p className="adv-section-subtitle">{t.whoSubtitle}</p>
          </div>

          <div className="adv-grid adv-grid--3">
            {/* Card 1: Vacation Rentals */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="adv-card adv-card--white"
            >
              <div className="adv-card__icon-wrapper adv-card__icon-wrapper--orange">
                <FiHome size={28} />
              </div>
              <h3 className="adv-card__title">{t.whoCard1Title}</h3>
              <p className="adv-card__text">{t.whoCard1Text1}</p>
              <p className="adv-card__text">{t.whoCard1Text2}</p>
              <button onClick={() => scrollToSection('pricing')} className="adv-card__link">
                {t.whoCard1Link} <FiArrowRight />
              </button>
            </motion.div>

            {/* Card 2: Local Businesses */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="adv-card adv-card--white"
            >
              <div className="adv-card__icon-wrapper adv-card__icon-wrapper--green">
                <BiStore size={28} />
              </div>
              <h3 className="adv-card__title">{t.whoCard2Title}</h3>
              <p className="adv-card__text">{t.whoCard2Text1}</p>
              <p className="adv-card__text">{t.whoCard2Text2}</p>
              <div className="adv-card__tags">
                <strong>{t.whoCard2Categories}</strong>
                <div className="adv-tags-list">
                  {categories.slice(0, 8).map(c => <span key={c} className="adv-tag-item">{c}</span>)}
                  <span className="adv-tag-item adv-tag-item--more">+{categories.length - 8} {t.whoCard2More}</span>
                </div>
              </div>
              <button onClick={() => scrollToSection('pricing')} className="adv-card__link">
                {t.whoCard2Link} <FiArrowRight />
              </button>
            </motion.div>

            {/* Card 3: Real Estate */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="adv-card adv-card--white"
            >
              <div className="adv-card__icon-wrapper adv-card__icon-wrapper--blue">
                <BiBuildingHouse size={28} />
              </div>
              <h3 className="adv-card__title">{t.whoCard3Title}</h3>
              <p className="adv-card__text">{t.whoCard3Text1}</p>
              <p className="adv-card__text">{t.whoCard3Text2}</p>
              <button onClick={() => scrollToSection('pricing')} className="adv-card__link">
                {t.whoCard3Link} <FiArrowRight />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="adv-section" id="benefits">
        <FloatingPalms />
        <div className="container">
          <div className="adv-section-header text-center">
            <h2 className="adv-section-title">{t.benefitsTitle}</h2>
            <p className="adv-section-subtitle">{t.benefitsSubtitle}</p>
          </div>

          <div className="adv-list-props">
            {valueProps.map((prop, idx) => (
              <div key={idx} className="adv-prop-item">
                <div className="adv-prop-item__icon-container">
                  {prop.icon}
                </div>
                <div className="adv-prop-item__content">
                  <h3 className="adv-prop-item__title">{prop.title}</h3>
                  <p className="adv-prop-item__desc">{prop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Numbers Section */}
      <section className="adv-section adv-section--green-bg text-white" id="stats">
        <FloatingPalms />
        <div className="container">
          <div className="adv-section-header text-center">
            <h2 className="adv-section-title text-white">{t.statsTitle}</h2>
            <p className="adv-section-subtitle text-white-opacity">{t.statsSubtitle}</p>
          </div>

          <div className="adv-stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="adv-stat-card">
                <div className="adv-stat-card__value">{stat.value}</div>
                <div className="adv-stat-card__label">{stat.label}</div>
                <div className="adv-stat-card__desc">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="adv-section" id="process">
        <FloatingPalms />
        <div className="container">
          <div className="adv-section-header text-center">
            <h2 className="adv-section-title">{t.howTitle}</h2>
            <p className="adv-section-subtitle">{t.howSubtitle}</p>
          </div>

          <div className="adv-steps-timeline">
            {steps.map((step, idx) => (
              <div key={idx} className="adv-step-row">
                <div className="adv-step-number">{step.number}</div>
                <div className="adv-step-content">
                  <h3 className="adv-step-title">{step.title}</h3>
                  <p className="adv-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing and Plans Section */}
      <section className="adv-section adv-section--grey" id="pricing">
        <FloatingPalms />
        <div className="container">
          <div className="adv-section-header text-center">
            <h2 className="adv-section-title">{t.pricingTitle}</h2>
            <p className="adv-section-subtitle">{t.pricingSubtitle}</p>
          </div>

          <div className="adv-plans-grid">
            {plans.map((plan, idx) => {
              const isLocked = plan.locked;
              const isPromo = plan.promo;

              return (
                <div 
                  key={idx} 
                  className={`adv-plan-card ${isPromo ? 'adv-plan-card--promo' : ''} ${isLocked ? 'adv-plan-card--locked' : ''}`}
                >
                  {isPromo && <span className="adv-plan-card__badge adv-plan-card__badge--promo">{plan.badge}</span>}
                  {isLocked && <span className="adv-plan-card__badge adv-plan-card__badge--locked">{plan.badge}</span>}
                  
                  <h3 className="adv-plan-card__name">{plan.name}</h3>
                  <div className="adv-plan-card__price-box">
                    <span className={`adv-plan-card__price ${isLocked ? 'adv-plan-card__price--striked' : ''}`}>{plan.price}</span>
                    <span className="adv-plan-card__period">/{plan.period}</span>
                  </div>
                  <p className="adv-plan-card__desc">{plan.desc}</p>
                  
                  <div className="adv-plan-card__features-title">{plan.featuresTitle}</div>
                  <ul className="adv-plan-card__features">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="adv-plan-card__feature-item">
                        <FiCheck className="feature-check" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    disabled={isLocked}
                    onClick={isPromo ? () => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setTimeout(() => setShowModal(true), 550);
                    } : undefined}
                    className={`adv-btn-plan ${isPromo ? 'adv-btn-plan--promo' : isLocked ? 'adv-btn-plan--locked' : 'adv-btn-plan--outline'}`}
                  >
                    {isLocked ? (
                      <>
                        <FiShield size={14} style={{ marginRight: '6px' }} />
                        {plan.cta}
                      </>
                    ) : (
                      plan.cta
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="adv-plans-meta text-center">
            <p className="adv-plans-meta__main">
              <strong>{t.pricingMeta1}</strong>
            </p>
            <p className="adv-plans-meta__sub">{t.pricingMeta2}</p>
            <div className="adv-plans-meta__ctas">
              <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => setShowModal(true), 550); }} className="adv-btn adv-btn--primary">{t.pricingMetaCta}</button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Guarantee Section */}
      <section className="adv-section adv-section--guarantee">
        <FloatingPalms />
        <div className="container">
          <div className="adv-guarantee-box">
            <div className="adv-guarantee-box__icon-wrapper">
              <FiShield size={48} />
            </div>
            <div className="adv-guarantee-box__content">
              <h2 className="adv-guarantee-box__title">{t.guaranteeTitle}</h2>
              <p className="adv-guarantee-box__text">{t.guaranteeText}</p>
              <p className="adv-guarantee-box__subtext">{t.guaranteeSubtext}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Not Stay on Airbnb Section */}
      <section className="adv-section adv-section--airbnb" id="why-not-airbnb">
        <FloatingPalms />
        <div className="container">
          <div className="adv-section-header text-center">
            <h2 className="adv-section-title">{t.airbnbTitle}</h2>
            <p className="adv-section-subtitle">{t.airbnbSubtitle}</p>
          </div>

          <div className="adv-grid adv-grid--2">
            <div className="airbnb-card">
              <h3 className="airbnb-card__title">{t.airbnbDisTitle}</h3>
              <ul className="airbnb-list">
                {t.airbnbDisItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className="airbnb-card airbnb-card--highlight">
              <h3 className="airbnb-card__title text-highlight">{t.airbnbAdvTitle}</h3>
              <p className="airbnb-card__text">{t.airbnbAdvText1}</p>
              <p className="airbnb-card__text">{t.airbnbAdvText2}</p>
              <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => setShowModal(true), 550); }} className="adv-btn adv-btn--primary mt-4">
                {t.airbnbAdvBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="adv-section adv-section--grey" id="testimonials">
        <FloatingPalms />
        <div className="container">
          <div className="adv-section-header text-center">
            <h2 className="adv-section-title">{t.testimonialTitle}</h2>
            <p className="adv-section-subtitle">{t.testimonialSubtitle}</p>
          </div>

          <div className="adv-grid adv-grid--2">
            {t.testimonials.map((item, idx) => (
              <div key={idx} className="adv-testimonial-card">
                <div className="adv-testimonial-card__stars">
                  {[...Array(5)].map((_, i) => <FiStar key={i} className="star-icon" />)}
                </div>
                <p className="adv-testimonial-card__quote">{item.quote}</p>
                <div className="adv-testimonial-card__author">{item.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="adv-section" id="faqs">
        <FloatingPalms />
        <div className="container">
          <div className="adv-section-header text-center">
            <h2 className="adv-section-title">{t.faqTitle}</h2>
            <p className="adv-section-subtitle">{t.faqSubtitle}</p>
          </div>

          <div className="adv-faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className={`adv-faq-item ${isOpen ? 'adv-faq-item--open' : ''}`}>
                  <button onClick={() => toggleFaq(idx)} className="adv-faq-item__trigger">
                    <span className="adv-faq-item__question">{faq.q}</span>
                    <span className="adv-faq-item__icon-box">
                      {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="adv-faq-item__answer-wrapper"
                      >
                        <div className="adv-faq-item__answer">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="adv-section adv-section--final-cta">
        <FloatingPalms />
        <div className="container">
          <div className="adv-final-cta-box text-center">
            <h2 className="adv-final-cta-box__title">{t.finalTitle}</h2>
            <p className="adv-final-cta-box__text">{t.finalText}</p>
            <p className="adv-final-cta-box__subtext">{t.finalSubtext}</p>
            <div className="adv-final-cta-box__buttons">
              <button onClick={() => scrollToSection('pricing')} className="adv-btn adv-btn--primary">
                {t.finalBtnRental}
              </button>
              <button onClick={() => scrollToSection('pricing')} className="adv-btn adv-btn--primary">
                {t.finalBtnBusiness}
              </button>
              <a href="tel:+523221368611" className="adv-btn adv-btn--secondary">
                <BiPhoneCall size={20} /> {t.finalBtnTeam}
              </a>
            </div>
            <div className="adv-final-cta-box__office" dangerouslySetInnerHTML={{ __html: t.finalOffice }}></div>
          </div>
        </div>
      </section>
      {/* Contact Form Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="adv-modal-overlay"
            style={{ alignItems: 'flex-start', paddingTop: modalTop }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="adv-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="adv-modal__close" onClick={() => setShowModal(false)}>
                &times;
              </button>
              <h3 className="adv-modal__title">
                {language === 'ENG' ? 'Get Started with SayulitaTravel' : 'Comienza con SayulitaTravel'}
              </h3>
              <p className="adv-modal__subtitle">
                {language === 'ENG'
                  ? 'Fill out the form below and our team will get back to you within 24 hours.'
                  : 'Completa el formulario y nuestro equipo te responderá en menos de 24 horas.'}
              </p>
              {formSubmitted ? (
                <div className="adv-modal__success">
                  <FiCheck size={48} style={{ color: 'var(--color-primary)' }} />
                  <h4>{language === 'ENG' ? 'Message sent!' : '¡Mensaje enviado!'}</h4>
                  <p>{language === 'ENG' ? 'We will get back to you shortly.' : 'En breve te responderemos.'}</p>
                </div>
              ) : (
                <form className="adv-modal__form" onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const fd = new FormData(form);
                  try {
                    const res = await fetch('/api/send-lead.php', {
                      method: 'POST',
                      body: fd
                    });
                    if (!res.ok) throw new Error(await res.text());
                    setFormSubmitted(true);
                    setTimeout(() => {
                      setShowModal(false);
                      setFormSubmitted(false);
                      form.reset();
                    }, 3000);
                  } catch {
                    alert(language === 'ENG' ? 'An error occurred. Please try again.' : 'Ocurrió un error. Intenta de nuevo.');
                  }
                }}>
                  <div className="adv-modal__row">
                    <div className="adv-modal__field">
                      <label className="adv-modal__label">
                        {language === 'ENG' ? 'Business Name' : 'Nombre de empresa'}
                      </label>
                      <input type="text" name="BusinessName" className="adv-modal__input" required />
                    </div>
                    <div className="adv-modal__field">
                      <label className="adv-modal__label">
                        {language === 'ENG' ? 'Contact Name' : 'Nombre del contacto'}
                      </label>
                      <input type="text" name="ContactName" className="adv-modal__input" required />
                    </div>
                  </div>
                  <div className="adv-modal__row">
                    <div className="adv-modal__field">
                      <label className="adv-modal__label">
                        {language === 'ENG' ? 'WhatsApp / Phone' : 'WhatsApp / teléfono'}
                      </label>
                      <input type="tel" name="Phone" className="adv-modal__input" required />
                    </div>
                    <div className="adv-modal__field">
                      <label className="adv-modal__label">
                        {language === 'ENG' ? 'Email' : 'Email'}
                      </label>
                      <input type="email" name="Email" className="adv-modal__input" required />
                    </div>
                  </div>
                  <div className="adv-modal__field">
                    <label className="adv-modal__label">
                      {language === 'ENG' ? 'Approximate Need' : 'Necesidad aproximada'}
                    </label>
                    <textarea name="Need" className="adv-modal__input adv-modal__textarea" rows={4} required></textarea>
                  </div>
                  <button type="submit" className="adv-btn adv-btn--primary adv-modal__submit">
                    {language === 'ENG' ? 'Send Message' : 'Enviar Mensaje'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
