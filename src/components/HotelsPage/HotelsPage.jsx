import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FiCalendar, FiSearch, FiStar, FiHeart, FiPlus, FiMinus,
  FiChevronLeft, FiChevronRight, FiArrowRight, FiCheck,
  FiShield, FiDollarSign, FiMessageCircle
} from 'react-icons/fi';
import {
  MdPool, MdBeachAccess, MdAcUnit, MdPets, MdRestaurant,
  MdOutlineHotel, MdOutlineLocationOn
} from 'react-icons/md';
import { IoBedOutline } from 'react-icons/io5';
import { BsHouseDoor } from 'react-icons/bs';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

import hotelBoutique from '../../assets/hotel-boutique.png';
import hotelBeachfront from '../../assets/hotel-beachfront.png';
import hotelPool from '../../assets/hotel-pool.png';
import hostelBudget from '../../assets/hostel-budget.png';
import hotelAmor from '../../assets/hotel-amor.png';
import hotelSayulinda from '../../assets/hotel-sayulinda.png';
import villaEmma from '../../assets/villa-emma.png';
import villaRosetta from '../../assets/villa-rosetta.png';
import casaAmigos from '../../assets/casa-amigos.png';

import heroBg from '../../assets/hotels.png';
import FloatingPalms from '../FloatingPalms/FloatingPalms';
import './HotelsPage.css';

/* ═══════════════════════════════════════════
   BILINGUAL DATA
   ═══════════════════════════════════════════ */

const i18n = {
  ESP: {
    meta: {
      title: 'Hoteles en Sayulita, Nayarit — Reserva Directo, Sin Comisiones | SayulitaTravel',
      description: 'Los mejores hoteles en Sayulita, Nayarit: boutique, frente al mar, con alberca y económicos. Reserva directo con el hotel, sin comisiones de Booking. Verificados desde 2004.',
    },
    hero: {
      label: 'SayulitaTravel Hoteles',
      title: 'Hoteles en Sayulita — Reserva Directo,',
      accent: 'Sin Comisiones de Booking',
      subtitle1: 'Encuentra tu hotel en Sayulita al precio real del propietario.',
      subtitle2: 'Sin el 15% que Booking.com añade al checkout. Sin intermediarios. Sin sorpresas.',
      trust: 'Estamos ayudando a viajeros a reservar en Sayulita directamente con los dueños — y así seguirá siendo.',
    },
    search: {
      sectionTitle: 'Busca tu hotel en Sayulita por fechas, tipo y zona',
      arrive: 'Llegada',
      depart: 'Salida',
      typeLabel: 'Tipo de hotel',
      typeBoutique: 'Hotel boutique',
      typeBeachfront: 'Frente al mar',
      typePool: 'Con alberca',
      typeBudget: 'Económico / Hostal',
      zoneLabel: 'Cualquier zona',
      zoneCenter: 'Centro',
      zoneBeach: 'Playa',
      zoneNorth: 'Zona Norte',
      btnSearch: 'Buscar',
      tagsLabel: 'Búsquedas populares:',
      tags: [
        { label: 'Frente al mar', type: 'beachfront' },
        { label: 'Hotel boutique', type: 'boutique' },
        { label: 'Con alberca', type: 'pool' },
        { label: 'Económico', type: 'budget' },
        { label: 'Solo adultos', type: 'boutique' },
      ],
    },
    types: {
      label: 'Categorías de Hospedaje',
      title: 'Tipos de hoteles en Sayulita, Nayarit',
      subtitle: 'Sayulita no tiene grandes cadenas hoteleras ni resorts de 500 habitaciones. Lo que tiene es mejor: una selección de hospedajes con personalidad real, cada uno distinto del anterior. Aquí van las cuatro categorías que más buscan los viajeros.',
      cta: 'Ver',
      idealLabel: 'Ideal para:',
    },
    why: {
      label: 'Ahorra dinero, viaja inteligente',
      title: '¿Por qué reservar tu hotel en SayulitaTravel y no en Booking.com?',
      subtitle: 'Esta es la pregunta que vale dinero real. La respuesta es sencilla.',
      cards: [
        {
          icon: 'dollar',
          title: 'Sin comisión ni sobrecargo al checkout',
          text: 'El precio que aparece en nuestros listados es el precio del propietario, sin ningún cargo adicional de nuestra parte. Si un hotel boutique en Sayulita cuesta $2,400 MXN por noche y tiene 4 noches reservadas, en Booking.com podrías pagar hasta $1,632 MXN de comisión encima. Con nosotros, pagas $9,600 MXN — lo que cuesta la habitación, y punto.',
        },
        {
          icon: 'shield',
          title: 'Precio directo garantizado — si encuentras más barato, lo igualamos',
          text: 'Todos los hoteles listados en SayulitaTravel se comprometen a igualar o mejorar cualquier precio que encuentres en otro canal — Airbnb, Booking, Tripadvisor, la web del propio hotel. Si encuentras algo más barato con las mismas condiciones, escríbenos antes de reservar. Lo verificamos y lo igualamos.',
        },
        {
          icon: 'message',
          title: 'Hoteles verificados por nuestro equipo local en Sayulita',
          text: 'Cada hotel que aparece en SayulitaTravel ha sido visitado físicamente por alguien de nuestro equipo. No dependemos de fotos enviadas por el propietario. Conocemos al propietario del Amor Boutique, sabemos cómo es la habitación del segundo piso del AzulPitaya, y podemos decirte qué hotel tiene la mejor terraza para ver el atardecer.',
        },
      ],
    },
    featured: {
      title: "Sayulita's Best & Finest",
      sortLabel: 'Ordenar por:',
      sortRating: 'Mayor Valoración',
      sortPriceAsc: 'Precio: Menor → Mayor',
      sortPriceDesc: 'Precio: Mayor → Menor',
      filtersTitle: 'Filtros',
      amenitiesLabel: 'AMENITIES',
      priceLabel: 'PRECIO POR NOCHE (USD)',
      trustText: 'Reserva directo con los propietarios de SayulitaTravel y evita las tarifas infladas de Booking.com.',
      emptyText: 'Ningún hotel coincide con los filtros elegidos. Intenta modificar tus criterios.',
      priceFrom: 'Desde',
      pricePerNight: '/ noche',
      viewDetail: 'Ver Detalle',
      viewAll: 'Ver todos los 80+ hoteles en Sayulita',
    },
    zonesHeader: {
      label: 'Guía de vecindarios',
      title: '¿Dónde quedarse en Sayulita? Guía de zonas por tipo de viajero',
      subtitle: 'Sayulita es un pueblo pequeño — de punta a punta son menos de 20 minutos caminando. Pero eso no significa que da igual dónde te quedas. La zona sí importa, y mucho, dependiendo de lo que buscas.',
      prosLabel: '✓ Ventajas:',
      consLabel: '✗ Inconveniente:',
      idealLabel: 'Perfil ideal:',
      cta: 'Ver hoteles en esta zona',
    },
    reviewsHeader: {
      label: 'Reseñas de huéspedes',
      title: 'Lo que dicen los huéspedes de nuestros hoteles en Sayulita',
      subtitle: 'Descubre lo que tus visitantes podrían estar comentando sobre tu alojamiento al hacer una reserva directamente y evitando tarifas a través de nuestra plataforma.',
    },
    info: {
      label: 'Información local útil',
      title: 'Lo que debes saber antes de reservar un hotel en Sayulita',
      subtitle: 'Antes de que lo descubras al llegar, te lo contamos nosotros. Sayulita tiene su propia lógica — y quien llega con expectativas claras disfruta el doble.',
      cards: [
        {
          title: 'Sayulita no es Cancún: qué esperar',
          text: 'Los hoteles en Sayulita son pequeños por elección, no por limitación. Sus propietarios decidieron no vender a cadenas internacionales. El desayuno lo prepara alguien local y el dueño estará en recepción.\n\n<strong>Lo que no encontrarás:</strong> Animación de resort, pulseras todo incluido, grandes playas privadas cerradas.\n<strong>Lo que sí encontrarás:</strong> Hoteles con alma e historia, recomendaciones reales del pueblo y una convivencia real con la comunidad y surfistas.',
        },
        {
          title: '¿Hay hoteles todo incluido en Sayulita?',
          text: 'La respuesta directa: <strong>no</strong>. No hay resorts todo incluido en Sayulita. Este modelo requiere construcciones masivas y un tipo de turismo que Sayulita ha decidido no adoptar.\n\n<strong>Lo más cercano:</strong> Muchos hoteles boutique y algunos hostales incluyen el desayuno en la tarifa. La gastronomía local es tan buena y accesible que terminarás gastando menos comiendo en los mejores puestos de tacos del pueblo que lo que pagarías en un buffet tradicional de resort.',
        },
        {
          title: '¿Hotel o casa en renta en Sayulita?',
          text: '<strong>Elige un hotel si:</strong> Viajas en pareja o solo, no requieres cocina propia, tu estancia es corta (2 a 4 noches) y valoras el servicio diario de limpieza y atención personalizada.\n<strong>Elige una casa en renta si:</strong> Viajas con familia (niños) o grupo grande, planeas quedarte una semana o más y buscas cocina privada, alberca privada y un costo escalable por habitación.',
        },
        {
          title: 'Temporada alta vs temporada baja',
          text: '<strong>Temporada alta (Nov-Abr):</strong> Los hoteles se llenan rápido, los precios suben de 30% a 60%. Reserva con meses de anticipación.\n<strong>Temporada media (Mayo, Oct-Nov):</strong> El mejor balance. Precios más bajos, playa despejada y clima agradable.\n<strong>Temporada baja (Jun-Sep):</strong> Lluvias por las tardes y calor. Los precios son los más bajos del año y la energía es sumamente local y tranquila.',
        },
      ],
    },
    faq: {
      title: 'Preguntas frecuentes sobre hoteles en Sayulita, Nayarit',
      subtitle: 'Todo lo que necesitas saber resuelto de manera directa por expertos locales.',
    },
    explore: {
      label: 'Tu Mejor Guía Local Online',
      title: 'Explora Sayulita — Tu guía local',
      subtitle: 'Sayulita Travel no es solo un buscador de hoteles. Juntos haremos que sea el recurso más completo de Sayulita en internet — construido por personas que viven aquí.',
      count: '80+ hoteles verificados en Sayulita, Nayarit, México',
      links: [
        { label: 'Casas en renta en Sayulita', desc: 'Privacidad y espacio propio', href: '/rentals/houses', icon: '🏠' },
        { label: 'Restaurantes y bares', desc: '300+ opciones verificadas', href: '/businesses', icon: '🍽️' },
        { label: 'Qué hacer en Sayulita', desc: 'Surf, tours, bienestar', href: '/tours', icon: '🏄' },
        { label: 'Cómo llegar a Sayulita', desc: 'Transporte explicado sin rodeos', href: 'https://sayulitatransportation.com/', icon: '✈️' },
        { label: 'Real Estate en Sayulita', desc: 'Comprar una casa aquí', href: '/real-estate', icon: '🏡' },
      ],
    },
    hotels: [
      { id: 1, name: 'Villa Emma', rooms: '4 Recámaras', features: ['Alberca Privada'], badge: 'Beachfront' },
      { id: 2, name: 'Villa Rosetta', rooms: '3 Recámaras', features: ['Zona Norte'], badge: 'Popular' },
      { id: 3, name: 'AzulPitaya Beach Hotel', rooms: '1–2 Habitaciones', features: ['Desayuno Inc.'], badge: 'Boutique' },
      { id: 4, name: 'Casa Amigos', rooms: '5 Recámaras', features: ['Capacidad 12'], badge: 'Jungle View' },
      { id: 5, name: 'Hotel Amor Boutique', rooms: '8 Suites', features: ['Vista al Mar', 'Villas Privadas'], badge: 'Boutique' },
      { id: 6, name: 'Sayulinda Hotel', rooms: '12 Habitaciones', features: ['Alberca Infinita', 'Solo Adultos'], badge: 'Boutique' },
      { id: 7, name: 'Hotelito Los Sueños', rooms: '10 Habitaciones', features: ['Alberca Salada', 'Jardín'], badge: 'Popular' },
      { id: 8, name: 'ITH Surf Hostel', rooms: 'Privadas y Compartidas', features: ['Clases de Surf', 'Cocina Común'], badge: 'Económico' },
    ],
    hotelTypes: [
      {
        key: 'boutique',
        title: 'Hoteles boutique en Sayulita',
        subtitle: 'El alma del hospedaje en Sayulita',
        desc: 'Son el alma del hospedaje en Sayulita. Pequeños — entre 6 y 30 habitaciones — diseñados con materiales locales, dirigidos por sus propios dueños, y con un servicio que los grandes hoteles no pueden imitar porque no saben quién eres.',
        bullets: [
          'Arquitectura artesanal: adobe, madera, piedra volcánica, patios interiores con vegetación',
          'Máximo 30 habitaciones — nunca te sientes en un pasillo anónimo',
          'El propietario suele estar en la recepción y conoce cada rincón del pueblo',
          'Desayuno incluido en la mayoría de los casos (pregunta antes de reservar)',
          'Ubicación estratégica: cerca del centro pero suficientemente tranquilos',
        ],
        price: 'Precio orientativo: desde $1,800 hasta $6,000 MXN por noche, según temporada.',
        ideal: 'parejas, viajes de aniversario, primera vez en Sayulita, quien quiere experiencia auténtica.',
      },
      {
        key: 'beachfront',
        title: 'Hoteles frente al mar en Sayulita',
        subtitle: 'Los más buscados. Los primeros en llenarse.',
        desc: 'Despertar con el sonido de las olas, tomar el desayuno con vista al Pacífico, bajar a surfear en menos de dos minutos — eso no tiene equivalente. Los hoteles frente al mar en Sayulita son escasos precisamente porque el pueblo protege su línea de costa.',
        bullets: [
          'Acceso directo o acceso en menos de 60 segundos a la playa principal',
          'Terrazas o balcones con vista al océano',
          'Desayuno con vistas — uno de los mejores momentos del viaje',
          'Precios más altos que el resto, especialmente en temporada alta (diciembre, Semana Santa, primavera)',
        ],
        price: 'Recomendación: si quieres uno de estos hoteles para diciembre o Semana Santa, reserva con al menos 3 meses de antelación. No exageramos.',
        ideal: 'parejas, surfistas y amantes de la playa que priorizan la experiencia sobre el presupuesto.',
      },
      {
        key: 'pool',
        title: 'Hoteles con alberca en Sayulita',
        subtitle: 'Cuando el sol aprieta, una alberca marca la diferencia',
        desc: 'No todos los hoteles en Sayulita tienen alberca — y cuando la tienen, es uno de sus puntos más fuertes. En un destino donde el sol puede alcanzar los 34°C entre mayo y octubre, una alberca marca la diferencia.',
        bullets: [
          'Algunos hoteles tienen alberca de agua salada (más suave para la piel, muy valorada)',
          'Otros comparten alberca entre huéspedes de todo el hotel — confirma cuántas habitaciones tiene',
          'Los hoteles solo para adultos suelen tener las albercas más tranquilas',
          'Pregunta si la alberca tiene horario o si es de acceso libre las 24 horas',
        ],
        price: 'Precio orientativo: desde $1,800 hasta $5,000 MXN por noche.',
        ideal: 'familias con niños, parejas relajadas y viajes durante los meses calurosos de verano.',
      },
      {
        key: 'budget',
        title: 'Hostales y hospedajes económicos en Sayulita',
        subtitle: 'Escena hostelera sólida, limpia y social',
        desc: 'Sayulita tiene una escena hostelera sólida. No del tipo dormitorio ruidoso con taquillas desvencijadas — sino hostales limpios, bien ubicados, con ambientes sociales donde conocer a otros viajeros.',
        bullets: [
          'Habitaciones privadas (con baño propio en la mayoría) y dormitorios compartidos',
          'Áreas comunes con hamacas, terraza, cocina equipada',
          'Ambiente surfer y mochilero — gente interesante, conversaciones fáciles',
          'Ubicación céntrica: a menos de 5 minutos caminando de la playa y la plaza',
        ],
        price: 'Precio orientativo: desde $350 hasta $900 MXN por noche en habitación privada. Dormitorios desde $250 MXN.',
        ideal: 'viajeros solos, mochileros, parejas con presupuesto ajustado o estancias prolongadas.',
      },
    ],
    zones: [
      {
        title: 'Hoteles en el centro de Sayulita',
        key: 'center',
        subtitle: 'Para estar en medio de todo',
        pros: 'Lo tienes todo a pie. La playa está a 3 minutos. La plaza, a 1.',
        cons: 'En temporada alta hay ruido hasta pasada la medianoche. Lleva tapones.',
        ideal: 'Quienes van pocos días y quieren aprovechar cada hora, grupos de amigos, viajeros en su primera visita.',
        icon: '🏘️',
      },
      {
        title: 'Hoteles en la playa de Sayulita',
        key: 'beach',
        subtitle: 'Los más buscados, primeros en llenarse',
        pros: 'La experiencia más directa del destino. Te despiertas con las olas. Bajas a surfear antes del desayuno.',
        cons: 'Los más caros del inventario. Disponibilidad muy limitada en temporada alta.',
        ideal: 'Parejas, luna de miel, viajeros que priorizan la experiencia sobre el presupuesto.',
        icon: '🏖️',
      },
      {
        title: 'Hoteles boutique en la zona norte',
        key: 'north',
        subtitle: 'Vistas al mar, más tranquilidad',
        pros: 'Silencio real, vistas panorámicas, privacidad, aire más fresco.',
        cons: 'Hay que caminar 10-15 minutos para llegar al centro (un paseo agradable pero diario).',
        ideal: 'Parejas que buscan descanso de verdad, viajeros que ya conocen Sayulita y quieren una experiencia tranquila.',
        icon: '⛰️',
      },
    ],
    reviews: [
      {
        quote: 'Reservé el AzulPitaya a través de SayulitaTravel después de comparar el precio con Booking. La diferencia fue de casi $800 MXN por noche. Mismo hotel, mismo cuarto, precio real. Ya no vuelvo a reservar de otra forma.',
        name: 'Rodrigo M.',
        location: 'Guadalajara',
        property: 'AzulPitaya Beach Hotel',
        date: 'Febrero 2025',
        rating: 5,
      },
      {
        quote: 'Primera vez en Sayulita y llegué sin saber nada. El equipo de SayulitaTravel me explicó la diferencia entre quedarme en el centro y en la zona norte, y elegí un hotel boutique en la colina. Fue la mejor decisión del viaje.',
        name: 'Camila V.',
        location: 'Ciudad de México',
        property: 'Hotel Amor Boutique',
        date: 'Diciembre 2024',
        rating: 5,
      },
      {
        quote: 'Viajé sola y buscaba algo seguro, verificado y con buena ubicación. El hostal que elegí por aquí superó mis expectativas. La información de la página era exacta — no como en otras plataformas donde las fotos no tienen nada que ver.',
        name: 'Paola R.',
        location: 'Monterrey',
        property: 'ITH Surf Hostel',
        date: 'Enero 2025',
        rating: 5,
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta un hotel en Sayulita por noche?',
        a: 'Depende del tipo de alojamiento y la temporada. Una guía rápida:\n• Hostal / habitación económica: desde $350 hasta $900 MXN por noche\n• Hotel sencillo en el centro: entre $900 y $1,800 MXN por noche\n• Hotel boutique con alberca: entre $1,800 y $3,500 MXN por noche\n• Hotel frente al mar o boutique de lujo: desde $3,500 hasta $8,000+ MXN por noche\n\nEn temporada alta (diciembre, Semana Santa) estos rangos suben entre un 30% y un 60%. Reservar con tiempo es la única forma real de conseguir el mejor precio.',
      },
      {
        q: '¿Cuál es el mejor hotel boutique en Sayulita?',
        a: 'Depende de lo que buscas, pero algunos de los más valorados por nuestros huéspedes con reserva verificada son:\n• Amor Boutique Hotel — frente al mar, referencia de lujo en Sayulita, con villas individuales\n• AzulPitaya Beach Hotel — playa, desayuno incluido, diseño que respeta los árboles originales del terreno\n• Sayulinda Hotel — vista panorámica desde la colina, alberca desbordante, para parejas\n\nTodos están verificados por nuestro equipo local. Sus precios en SayulitaTravel son los mismos que si llamaras directamente al hotel, sin ningún cargo adicional.',
      },
      {
        q: '¿Los hoteles en Sayulita incluyen desayuno?',
        a: 'Muchos sí, pero no todos. La regla general:\n• Los hoteles boutique de gama media-alta suelen incluir desayuno en la tarifa base — especialmente si reservas directo con el propietario\n• Los hoteles económicos y hostales raramente lo incluyen, aunque algunos tienen cocina compartida\n• Algunos hoteles ofrecen desayuno como opción de pago adicional\n\nRevisa la descripción de cada listado en SayulitaTravel — siempre indicamos si el desayuno está incluido.',
      },
      {
        q: '¿Cómo llegar a Sayulita desde el aeropuerto de Puerto Vallarta?',
        a: 'Sayulita está a 45 minutos al norte del aeropuerto internacional de Puerto Vallarta (PVR). Las opciones principales:\n• Transporte privado: la forma más cómoda. Entre $600 y $900 MXN el trayecto completo.\n• Autobús público: económico y frecuente. Sale de la parada cerca del Walmart frente al aeropuerto. El trayecto tarda entre 1h 15min y 1h 45min.\n• Taxi colectivo / combi: precio intermedio, sale cuando se llena.\n\nEl hotel donde reserves puede orientarte sobre la mejor opción según tu horario de llegada.',
      },
      {
        q: '¿Es seguro Sayulita para los turistas?',
        a: 'Sí, para la gran mayoría de los visitantes Sayulita es un destino seguro. Es un pueblo pequeño donde la economía depende del turismo y la comunidad tiene un interés directo en que los visitantes se sientan bien. Las precauciones habituales aplican: no dejes objetos de valor en la playa, usa taxis de confianza (el hotel puede recomendarte) y no camines solo de madrugada por zonas alejadas del centro.',
      },
      {
        q: '¿Puedo reservar un hotel en Sayulita sin pagar comisión a Booking.com?',
        a: 'Sí, y es exactamente para eso que existe SayulitaTravel. Cada reserva que haces a través de nuestra plataforma va directamente al propietario del hotel. No somos intermediarios que cobran un porcentaje — somos el canal directo entre tú y quien te va a recibir en Sayulita. El precio que ves en el listado es el precio que pagas, sin el 12-17% que Booking añade silenciosamente.',
      },
    ],
  },
  ENG: {
    meta: {
      title: 'Hotels in Sayulita, Nayarit — Book Direct, No Booking Fees | SayulitaTravel',
      description: 'The best hotels in Sayulita, Nayarit: boutique, beachfront, with pools and budget stays. Book directly with the hotel, no Booking.com commissions. Verified since 2004.',
    },
    hero: {
      label: 'SayulitaTravel Hotels',
      title: 'Hotels in Sayulita — Book Direct,',
      accent: 'No Booking.com Fees',
      subtitle1: 'Find your hotel in Sayulita at the real owner\'s price.',
      subtitle2: 'Without the 15% that Booking.com adds at checkout. No middlemen. No surprises.',
      trust: 'We are helping travelers book in Sayulita directly with the owners — and that\'s not changing.',
    },
    search: {
      sectionTitle: 'Search your hotel in Sayulita by dates, type and zone',
      arrive: 'Arrive',
      depart: 'Depart',
      typeLabel: 'Hotel type',
      typeBoutique: 'Boutique hotel',
      typeBeachfront: 'Beachfront',
      typePool: 'With pool',
      typeBudget: 'Budget / Hostel',
      zoneLabel: 'Any zone',
      zoneCenter: 'Town Center',
      zoneBeach: 'Beachfront',
      zoneNorth: 'North Hill',
      btnSearch: 'Search',
      tagsLabel: 'Popular searches:',
      tags: [
        { label: 'Beachfront', type: 'beachfront' },
        { label: 'Boutique hotel', type: 'boutique' },
        { label: 'With pool', type: 'pool' },
        { label: 'Budget', type: 'budget' },
        { label: 'Adults only', type: 'boutique' },
      ],
    },
    types: {
      label: 'Accommodation Categories',
      title: 'Types of Hotels in Sayulita, Nayarit',
      subtitle: 'Sayulita has no large hotel chains or 500-room resorts. What it has is better: a curated selection of accommodations with real personality, each one distinct from the last. Here are the four categories travelers search for most.',
      cta: 'View',
      idealLabel: 'Ideal for:',
    },
    why: {
      label: 'Save money, travel smart',
      title: 'Why book your hotel on SayulitaTravel instead of Booking.com?',
      subtitle: 'This is the question worth real money. The answer is straightforward.',
      cards: [
        {
          icon: 'dollar',
          title: 'No commission or checkout surcharge',
          text: 'The price shown in our listings is the owner\'s price, with no additional charges from our end. If a boutique hotel in Sayulita costs $2,400 MXN per night for a 4-night stay, on Booking.com you could pay up to $1,632 MXN in commission on top. With us, you pay $9,600 MXN — the room rate, period.',
        },
        {
          icon: 'shield',
          title: 'Direct price guarantee — if you find it cheaper, we\'ll match it',
          text: 'Every hotel listed on SayulitaTravel commits to matching or beating any price you find on another channel — Airbnb, Booking, Tripadvisor, the hotel\'s own website. If you find something cheaper with the same conditions, write us before booking. We verify and match it.',
        },
        {
          icon: 'message',
          title: 'Hotels verified by our local team in Sayulita',
          text: 'Every hotel on SayulitaTravel has been physically visited by someone on our team. We don\'t rely on owner-submitted photos. We know the Amor Boutique owner personally, we know what the second-floor room at AzulPitaya looks like, and we can tell you which hotel has the best terrace for watching the sunset.',
        },
      ],
    },
    featured: {
      title: "Sayulita's Best & Finest",
      sortLabel: 'Sort by:',
      sortRating: 'Highest Rated',
      sortPriceAsc: 'Price: Low → High',
      sortPriceDesc: 'Price: High → Low',
      filtersTitle: 'Filters',
      amenitiesLabel: 'AMENITIES',
      priceLabel: 'PRICE PER NIGHT (USD)',
      trustText: 'Book directly with SayulitaTravel owners and avoid the inflated rates of Booking.com.',
      emptyText: 'No hotels match your current filters. Try adjusting your criteria.',
      priceFrom: 'From',
      pricePerNight: '/ night',
      viewDetail: 'View Detail',
      viewAll: 'See all 80+ hotels in Sayulita',
    },
    zonesHeader: {
      label: 'Neighborhood Guide',
      title: 'Where to Stay in Sayulita? Zone Guide by Traveler Type',
      subtitle: 'Sayulita is a small town — from end to end it\'s less than a 20-minute walk. But that doesn\'t mean it doesn\'t matter where you stay. The zone matters a lot, depending on what you\'re looking for.',
      prosLabel: '✓ Pros:',
      consLabel: '✗ Drawback:',
      idealLabel: 'Ideal profile:',
      cta: 'See hotels in this zone',
    },
    reviewsHeader: {
      label: 'Guest Reviews',
      title: 'What Guests Say About Our Hotels in Sayulita',
      subtitle: 'Discover what your visitors could be commenting about your accommodation when booking directly and avoiding fees through our platform.',
    },
    info: {
      label: 'Useful Local Info',
      title: 'What You Should Know Before Booking a Hotel in Sayulita',
      subtitle: 'Before you discover it on arrival, we\'ll tell you ourselves. Sayulita has its own logic — and those who arrive with clear expectations enjoy it twice as much.',
      cards: [
        {
          title: 'Sayulita is not Cancún: what to expect',
          text: 'Hotels in Sayulita are small by choice, not by limitation. Their owners chose not to sell to international chains. Breakfast is prepared by a local and the owner will be at reception.\n\n<strong>What you won\'t find:</strong> Resort animation, all-inclusive wristbands, large private gated beaches.\n<strong>What you will find:</strong> Hotels with soul and history, real town recommendations, and genuine community interaction with locals and surfers.',
        },
        {
          title: 'Are there all-inclusive hotels in Sayulita?',
          text: 'The direct answer: <strong>no</strong>. There are no all-inclusive resorts in Sayulita. This model requires massive constructions and a type of tourism that Sayulita has chosen not to adopt.\n\n<strong>The closest thing:</strong> Many boutique hotels and some hostels include breakfast in the rate. Local food is so good and affordable that you\'ll end up spending less eating at the best taco stands than you would at a traditional resort buffet.',
        },
        {
          title: 'Hotel or rental house in Sayulita?',
          text: '<strong>Choose a hotel if:</strong> You\'re traveling as a couple or solo, don\'t need your own kitchen, your stay is short (2 to 4 nights) and you value daily housekeeping and personalized service.\n<strong>Choose a rental house if:</strong> You\'re traveling with family (kids) or a large group, plan to stay a week or more, and want a private kitchen, private pool, and scalable cost per bedroom.',
        },
        {
          title: 'High season vs low season',
          text: '<strong>High season (Nov-Apr):</strong> Hotels fill up fast, prices rise 30% to 60%. Book months in advance.\n<strong>Mid season (May, Oct-Nov):</strong> The best balance. Lower prices, clear beach, and pleasant weather.\n<strong>Low season (Jun-Sep):</strong> Afternoon rains and heat. Prices are the lowest of the year and the energy is deeply local and tranquil.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions About Hotels in Sayulita, Nayarit',
      subtitle: 'Everything you need to know, answered directly by local experts.',
    },
    explore: {
      label: 'Your Best Local Guide Online',
      title: 'Explore Sayulita — Your Local Guide',
      subtitle: 'SayulitaTravel is not just a hotel search engine. Together we will make it the most comprehensive resource about Sayulita on the internet — built by people who live here.',
      count: '80+ verified hotels in Sayulita, Nayarit, Mexico',
      links: [
        { label: 'Houses for Rent in Sayulita', desc: 'Privacy and your own space', href: '/rentals/houses', icon: '🏠' },
        { label: 'Restaurants & Bars', desc: '300+ verified spots', href: '/businesses', icon: '🍽️' },
        { label: 'Things to Do in Sayulita', desc: 'Surf, tours, wellness', href: '/tours', icon: '🏄' },
        { label: 'How to Get to Sayulita', desc: 'Transport explained plainly', href: 'https://sayulitatransportation.com/', icon: '✈️' },
        { label: 'Real Estate in Sayulita', desc: 'Buy a home in paradise', href: '/real-estate', icon: '🏡' },
      ],
    },
    hotels: [
      { id: 1, name: 'Villa Emma', rooms: '4 Bedrooms', features: ['Private Pool'], badge: 'Beachfront' },
      { id: 2, name: 'Villa Rosetta', rooms: '3 Bedrooms', features: ['North Zone'], badge: 'Popular' },
      { id: 3, name: 'AzulPitaya Beach Hotel', rooms: '1-2 Rooms', features: ['Breakfast Inc.'], badge: 'Boutique' },
      { id: 4, name: 'Casa Amigos', rooms: '5 Bedrooms', features: ['Sleeps 12'], badge: 'Jungle View' },
      { id: 5, name: 'Hotel Amor Boutique', rooms: '8 Suites', features: ['Ocean View', 'Private Villas'], badge: 'Boutique' },
      { id: 6, name: 'Sayulinda Hotel', rooms: '12 Rooms', features: ['Infinity Pool', 'Adults Only'], badge: 'Boutique' },
      { id: 7, name: 'Hotelito Los Sueños', rooms: '10 Rooms', features: ['Saltwater Pool', 'Garden'], badge: 'Popular' },
      { id: 8, name: 'ITH Surf Hostel', rooms: 'Private & Shared', features: ['Surf Lessons', 'Shared Kitchen'], badge: 'Budget' },
    ],
    hotelTypes: [
      {
        key: 'boutique',
        title: 'Boutique Hotels in Sayulita',
        subtitle: 'The soul of Sayulita accommodation',
        desc: 'They are the soul of accommodation in Sayulita. Small — between 6 and 30 rooms — designed with local materials, run by their own owners, and with a service that large hotels cannot imitate because they don\'t know who you are.',
        bullets: [
          'Artisanal architecture: adobe, wood, volcanic stone, interior courtyards with greenery',
          'Maximum 30 rooms — you never feel like you\'re in an anonymous hallway',
          'The owner is usually at reception and knows every corner of the town',
          'Breakfast included in most cases (ask before booking)',
          'Strategic location: close to the center but quiet enough',
        ],
        price: 'Price guide: from $1,800 to $6,000 MXN per night, depending on season.',
        ideal: 'couples, anniversary trips, first-timers in Sayulita, anyone seeking authentic experience.',
      },
      {
        key: 'beachfront',
        title: 'Beachfront Hotels in Sayulita',
        subtitle: 'The most sought-after. The first to fill up.',
        desc: 'Waking up to the sound of waves, having breakfast with Pacific views, heading down to surf in less than two minutes — nothing compares. Beachfront hotels in Sayulita are scarce precisely because the town protects its coastline.',
        bullets: [
          'Direct access or under 60 seconds to the main beach',
          'Terraces or balconies with ocean views',
          'Breakfast with views — one of the best moments of the trip',
          'Higher prices than the rest, especially in high season (December, Easter, spring)',
        ],
        price: 'Recommendation: if you want one of these hotels for December or Easter, book at least 3 months in advance. We\'re not exaggerating.',
        ideal: 'couples, surfers, and beach lovers who prioritize experience over budget.',
      },
      {
        key: 'pool',
        title: 'Hotels with Pool in Sayulita',
        subtitle: 'When the sun hits hard, a pool makes all the difference',
        desc: 'Not all hotels in Sayulita have a pool — and when they do, it\'s one of their strongest selling points. In a destination where temperatures can reach 34°C between May and October, a pool makes the difference.',
        bullets: [
          'Some hotels have saltwater pools (softer on the skin, highly rated)',
          'Others share the pool among all hotel guests — confirm how many rooms the hotel has',
          'Adults-only hotels tend to have the quietest pools',
          'Ask if the pool has set hours or 24-hour open access',
        ],
        price: 'Price guide: from $1,800 to $5,000 MXN per night.',
        ideal: 'families with kids, relaxed couples, and trips during the hot summer months.',
      },
      {
        key: 'budget',
        title: 'Hostels & Budget Stays in Sayulita',
        subtitle: 'Solid, clean, and social hostel scene',
        desc: 'Sayulita has a solid hostel scene. Not the noisy-dorm-with-broken-lockers type — but clean, well-located hostels with social atmospheres where you can meet fellow travelers.',
        bullets: [
          'Private rooms (with en-suite bathroom in most) and shared dorms',
          'Common areas with hammocks, terrace, fully equipped kitchen',
          'Surfer and backpacker vibe — interesting people, easy conversations',
          'Central location: less than a 5-minute walk to the beach and plaza',
        ],
        price: 'Price guide: from $350 to $900 MXN per night for a private room. Dorms from $250 MXN.',
        ideal: 'solo travelers, backpackers, budget-conscious couples or extended stays.',
      },
    ],
    zones: [
      {
        title: 'Hotels in Sayulita Town Center',
        key: 'center',
        subtitle: 'In the middle of all the action',
        pros: 'Everything is walkable. The beach is 3 minutes away. The plaza is next door.',
        cons: 'In high season, music keeps things lively past midnight. Bring earplugs.',
        ideal: 'Those visiting for a few days who want to make the most of every hour, friend groups, first-time visitors.',
        icon: '🏘️',
      },
      {
        title: 'Beachfront Hotels in Sayulita',
        key: 'beach',
        subtitle: 'The most sought-after, first to fill up',
        pros: 'The most direct destination experience. You wake up to waves. You surf before breakfast.',
        cons: 'The most expensive in the inventory. Very limited availability in high season.',
        ideal: 'Couples, honeymoons, travelers who prioritize experience over budget.',
        icon: '🏖️',
      },
      {
        title: 'Boutique Hotels on the North Hill',
        key: 'north',
        subtitle: 'Ocean views and absolute quiet',
        pros: 'Real silence, panoramic views, privacy, cooler air.',
        cons: 'You need to walk 10-15 minutes to reach the center (a pleasant but daily walk).',
        ideal: 'Couples seeking genuine rest, returning Sayulita visitors wanting a quieter experience.',
        icon: '⛰️',
      },
    ],
    reviews: [
      {
        quote: 'I booked AzulPitaya through SayulitaTravel after comparing the price with Booking. The difference was nearly $800 MXN per night. Same hotel, same room, real price. I\'m never booking any other way.',
        name: 'Rodrigo M.',
        location: 'Guadalajara',
        property: 'AzulPitaya Beach Hotel',
        date: 'February 2025',
        rating: 5,
      },
      {
        quote: 'First time in Sayulita and I arrived knowing nothing. The SayulitaTravel team explained the difference between staying in the center vs the north zone, and I chose a boutique hotel on the hill. It was the best decision of the trip.',
        name: 'Camila V.',
        location: 'Mexico City',
        property: 'Hotel Amor Boutique',
        date: 'December 2024',
        rating: 5,
      },
      {
        quote: 'I traveled solo and was looking for something safe, verified, and well-located. The hostel I chose here exceeded my expectations. The information on the page was exact — unlike other platforms where the photos have nothing to do with reality.',
        name: 'Paola R.',
        location: 'Monterrey',
        property: 'ITH Surf Hostel',
        date: 'January 2025',
        rating: 5,
      },
    ],
    faqs: [
      {
        q: 'How much does a hotel in Sayulita cost per night?',
        a: 'It depends on the accommodation type and season. A quick guide:\n• Hostel / budget room: from $350 to $900 MXN per night\n• Simple center hotel: between $900 and $1,800 MXN per night\n• Boutique hotel with pool: between $1,800 and $3,500 MXN per night\n• Beachfront or luxury boutique: from $3,500 to $8,000+ MXN per night\n\nIn high season (December, Easter) these ranges increase by 30% to 60%. Booking early is the only real way to get the best price.',
      },
      {
        q: 'What is the best boutique hotel in Sayulita?',
        a: 'It depends on what you\'re looking for, but some of the highest-rated by our verified guests are:\n• Amor Boutique Hotel — beachfront, Sayulita\'s luxury benchmark, with individual villas\n• AzulPitaya Beach Hotel — beach, breakfast included, design that respects the original trees on the property\n• Sayulinda Hotel — panoramic hilltop views, infinity pool, for couples\n\nAll are verified by our local team. Their prices on SayulitaTravel are the same as calling the hotel directly, with no additional charges.',
      },
      {
        q: 'Do hotels in Sayulita include breakfast?',
        a: 'Many do, but not all. The general rule:\n• Mid-to-high-end boutique hotels usually include breakfast in the base rate — especially if you book directly with the owner\n• Budget hotels and hostels rarely include it, though some have a shared kitchen\n• Some hotels offer breakfast as an optional paid add-on\n\nCheck the description of each listing on SayulitaTravel — we always indicate whether breakfast is included.',
      },
      {
        q: 'How do I get to Sayulita from Puerto Vallarta airport?',
        a: 'Sayulita is 45 minutes north of Puerto Vallarta International Airport (PVR). The main options:\n• Private transfer: the most comfortable. Between $600 and $900 MXN for the full trip.\n• Public bus: affordable and frequent. Departs from the stop near Walmart opposite the airport. The trip takes between 1h 15min and 1h 45min.\n• Shared taxi / van: mid-range price, departs when full.\n\nYour hotel can guide you on the best option for your arrival time.',
      },
      {
        q: 'Is Sayulita safe for tourists?',
        a: 'Yes, for the vast majority of visitors Sayulita is a safe destination. It\'s a small town where the economy depends on tourism and the community has a direct interest in making visitors feel welcome. Standard precautions apply: don\'t leave valuables on the beach, use trusted taxis (your hotel can recommend), and don\'t walk alone late at night in areas far from the center.',
      },
      {
        q: 'Can I book a hotel in Sayulita without paying Booking.com commission?',
        a: 'Yes, and that\'s exactly what SayulitaTravel is for. Every booking you make through our platform goes directly to the hotel owner. We are not middlemen who charge a percentage — we are the direct channel between you and whoever will welcome you in Sayulita. The price you see on the listing is the price you pay, without the 12-17% that Booking silently adds.',
      },
    ],
  },
};

/* Base hotel data (language-independent) */
const baseHotels = [
  { id: 1, image: villaEmma.src, price: 600, rating: 4.9, type: 'beachfront', zone: 'north', badgeType: 'beachfront', amenities: ['beachfront', 'pool', 'ac'] },
  { id: 2, image: villaRosetta.src, price: 495, rating: 4.8, type: 'boutique', zone: 'north', badgeType: 'popular', amenities: ['pool', 'ac', 'petfriendly'] },
  { id: 3, image: hotelBeachfront.src, price: 115, rating: 4.7, type: 'beachfront', zone: 'beach', badgeType: 'boutique', amenities: ['beachfront', 'pool', 'ac', 'restaurant'] },
  { id: 4, image: casaAmigos.src, price: 750, rating: 5.0, type: 'pool', zone: 'center', badgeType: 'jungle-view', amenities: ['pool', 'ac', 'petfriendly'] },
  { id: 5, image: hotelAmor.src, price: 320, rating: 4.9, type: 'boutique', zone: 'beach', badgeType: 'boutique', amenities: ['beachfront', 'pool', 'ac', 'restaurant'] },
  { id: 6, image: hotelSayulinda.src, price: 280, rating: 4.8, type: 'boutique', zone: 'center', badgeType: 'boutique', amenities: ['pool', 'ac'] },
  { id: 7, image: hotelPool.src, price: 145, rating: 4.5, type: 'pool', zone: 'center', badgeType: 'popular', amenities: ['pool', 'ac'] },
  { id: 8, image: hostelBudget.src, price: 35, rating: 4.4, type: 'budget', zone: 'center', badgeType: 'jungle-view', amenities: ['petfriendly'] },
];

const hotelTypeImages = {
  boutique: hotelBoutique.src,
  beachfront: hotelBeachfront.src,
  pool: hotelPool.src,
  budget: hostelBudget.src,
};

const hotelTypeIcons = {
  boutique: <MdOutlineHotel size={28} />,
  beachfront: <MdBeachAccess size={28} />,
  pool: <MdPool size={28} />,
  budget: <IoBedOutline size={28} />,
};

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */

export default function HotelsPage({ language = 'ESP' }) {
  const t = i18n[language] || i18n.ESP;

  // Merge base hotel data with language-specific text
  const allHotels = useMemo(() =>
    baseHotels.map((base) => {
      const langData = t.hotels.find((h) => h.id === base.id) || {};
      return { ...base, ...langData };
    }),
    [t]
  );

  // SEO
  useEffect(() => {
    document.title = t.meta.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', t.meta.description);
  }, [t]);

  /* Buscador superior */
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hotelType, setHotelType] = useState('');
  const [searchZone, setSearchZone] = useState('');

  /* Filtros laterales */
  const [amenities, setAmenities] = useState({
    pool: false,
    beachfront: true,
    ac: false,
    petfriendly: false,
    restaurant: false,
  });
  const [priceRange, setPriceRange] = useState([100, 2500]);
  const [sortBy, setSortBy] = useState('rating');

  /* Paginación */
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  /* Favoritos */
  const [favorites, setFavorites] = useState([]);

  /* FAQ */
  const [openFaq, setOpenFaq] = useState(0);

  const toggleAmenity = (key) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
    setCurrentPage(1);
  };

  const toggleFav = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const getBadgeIcon = (type) => {
    if (type === 'beachfront') return <MdBeachAccess size={12} />;
    if (type === 'popular') return <FiStar size={12} style={{ fill: 'currentColor' }} />;
    if (type === 'boutique') return <MdOutlineHotel size={12} />;
    if (type === 'jungle-view') return <BsHouseDoor size={12} />;
    return null;
  };

  const getWhyIcon = (iconKey) => {
    if (iconKey === 'dollar') return <FiDollarSign size={24} />;
    if (iconKey === 'shield') return <FiShield size={24} />;
    if (iconKey === 'message') return <FiMessageCircle size={24} />;
    return null;
  };

  const filteredHotels = useMemo(() => {
    let list = [...allHotels];
    const activeAmenities = Object.entries(amenities)
      .filter(([, v]) => v)
      .map(([k]) => k);
    if (activeAmenities.length > 0) {
      list = list.filter((h) =>
        activeAmenities.every((a) => h.amenities.includes(a))
      );
    }
    list = list.filter(
      (h) => h.price >= priceRange[0] && h.price <= priceRange[1]
    );
    if (hotelType) {
      list = list.filter((h) => h.type === hotelType);
    }
    if (searchZone) {
      list = list.filter((h) => h.zone === searchZone);
    }
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [amenities, priceRange, sortBy, hotelType, searchZone, allHotels]);

  const totalPages = Math.max(1, Math.ceil(filteredHotels.length / perPage));
  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div className="hotels-page">
      {/* ═══ HERO ═══ */}
      <section className="hp-hero section" id="hotels-hero">
        <div className="hp-hero__bg">
          <img src={heroBg.src} alt="Sayulita Hotels" className="hp-hero__bg-img" />
          <div className="hp-hero__overlay" />
        </div>
        <div className="container">
          <motion.div
            className="hp-hero__content"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hp-hero__label">{t.hero.label}</span>
            <h1 className="hp-hero__title">
              {t.hero.title}{' '}
              <span className="hp-hero__accent">{t.hero.accent}</span>
            </h1>
            <p className="hp-hero__subtitle">
              {t.hero.subtitle1}<br />
              {t.hero.subtitle2}
            </p>
            <div className="hp-hero__trust">
              <FiShield size={18} />
              <span>{t.hero.trust}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ BUSCADOR ═══ */}
      <section className="hp-search section" id="hotels-search">
        <FloatingPalms />
        <div className="container">
          <SectionHeader title={t.search.sectionTitle} />
          <motion.div
            className="hp-search__bar"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="hp-search__field hp-search__field--dates">
              <div className="hp-search__icon"><FiCalendar size={18} /></div>
              <div className="hp-search__date-range">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText={t.search.arrive}
                  dateFormat="dd MMM"
                  minDate={new Date()}
                  id="hp-search-arrive"
                />
                <span className="hp-search__date-sep">–</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || new Date()}
                  placeholderText={t.search.depart}
                  dateFormat="dd MMM"
                  id="hp-search-depart"
                />
              </div>
            </div>
            <div className="hp-search__divider" />
            <div className="hp-search__field">
              <div className="hp-search__icon"><MdOutlineHotel size={18} /></div>
              <select
                className="hp-search__select"
                value={hotelType}
                onChange={(e) => { setHotelType(e.target.value); setCurrentPage(1); }}
                id="hp-search-type"
                aria-label={t.search.typeLabel}
              >
                <option value="">{t.search.typeLabel}</option>
                <option value="boutique">{t.search.typeBoutique}</option>
                <option value="beachfront">{t.search.typeBeachfront}</option>
                <option value="pool">{t.search.typePool}</option>
                <option value="budget">{t.search.typeBudget}</option>
              </select>
            </div>
            <div className="hp-search__divider" />
            <div className="hp-search__field">
              <div className="hp-search__icon"><MdOutlineLocationOn size={18} /></div>
              <select
                className="hp-search__select"
                value={searchZone}
                onChange={(e) => { setSearchZone(e.target.value); setCurrentPage(1); }}
                id="hp-search-zone"
                aria-label={t.search.zoneLabel}
              >
                <option value="">{t.search.zoneLabel}</option>
                <option value="center">{t.search.zoneCenter}</option>
                <option value="beach">{t.search.zoneBeach}</option>
                <option value="north">{t.search.zoneNorth}</option>
              </select>
            </div>
            <button
              className="hp-search__btn"
              id="hp-search-submit"
              onClick={() => {
                document.getElementById('hotels-featured')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <FiSearch size={18} /> <span>{t.search.btnSearch}</span>
            </button>
          </motion.div>
          <div className="hp-search__tags">
            <span className="hp-search__tags-label">{t.search.tagsLabel}</span>
            {t.search.tags.map((tag, idx) => (
              <button
                key={idx}
                className="hp-search__tag"
                onClick={() => {
                  setHotelType(tag.type);
                  setCurrentPage(1);
                  document.getElementById('hotels-featured')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATEGORÍAS ═══ */}
      <section className="hp-types section" id="hotels-types">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.types.label}
            title={t.types.title}
            subtitle={t.types.subtitle}
          />
          <div className="hp-types__grid">
            {t.hotelTypes.map((ht, i) => (
              <motion.div
                key={ht.key}
                className="hp-type-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                id={`hotel-type-${ht.key}`}
              >
                <div className="hp-type-card__image-wrap">
                  <img src={hotelTypeImages[ht.key]} alt={ht.title} className="hp-type-card__image" />
                  <div className="hp-type-card__image-overlay" />
                  <div className="hp-type-card__icon">{hotelTypeIcons[ht.key]}</div>
                </div>
                <div className="hp-type-card__body">
                  <h3 className="hp-type-card__title">{ht.title}</h3>
                  <p className="hp-type-card__subtitle">{ht.subtitle}</p>
                  <p className="hp-type-card__desc">{ht.desc}</p>
                  <ul className="hp-type-card__bullets">
                    {ht.bullets.map((b, bi) => (
                      <li key={bi}><FiCheck size={14} /> {b}</li>
                    ))}
                  </ul>
                  <div className="hp-type-card__footer">
                    <span className="hp-type-card__price">{ht.price}</span>
                    <span className="hp-type-card__ideal">
                      <strong>{t.types.idealLabel}</strong> {ht.ideal}
                    </span>
                  </div>
                  <button
                    className="hp-type-card__cta"
                    onClick={() => {
                      setHotelType(ht.key);
                      setCurrentPage(1);
                      document.getElementById('hotels-featured')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {t.types.cta} {ht.title} <FiArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ POR QUÉ RESERVAR DIRECTO ═══ */}
      <section className="hp-why section" id="hotels-why-book">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.why.label}
            title={t.why.title}
            subtitle={t.why.subtitle}
          />
          <div className="hp-why__grid">
            {t.why.cards.map((card, ci) => (
              <motion.div
                key={ci}
                className="hp-why__card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.45 }}
              >
                <div className="hp-why__card-icon">
                  {getWhyIcon(card.icon)}
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GRID DE HOTELES DESTACADOS ═══ */}
      <section className="hp-featured section" id="hotels-featured">
        <FloatingPalms />
        <div className="container">
          <div className="hp-featured__header">
            <div>
              <h2 className="hp-featured__title">{t.featured.title}</h2>
            </div>
            <div className="hp-featured__sort">
              <label htmlFor="hp-sort">{t.featured.sortLabel}</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} id="hp-sort">
                <option value="rating">{t.featured.sortRating}</option>
                <option value="price-asc">{t.featured.sortPriceAsc}</option>
                <option value="price-desc">{t.featured.sortPriceDesc}</option>
              </select>
            </div>
          </div>
          <div className="hp-featured__layout">
            {/* Sidebar */}
            <aside className="hp-sidebar" id="hotels-sidebar">
              <h3 className="hp-sidebar__title">{t.featured.filtersTitle}</h3>

              <div className="hp-sidebar__group">
                <h4 className="hp-sidebar__label">{t.featured.amenitiesLabel}</h4>
                {[
                  { key: 'pool', label: 'Infinity Pool', icon: <MdPool size={16} /> },
                  { key: 'beachfront', label: 'Beachfront', icon: <MdBeachAccess size={16} /> },
                  { key: 'ac', label: 'Air Conditioning', icon: <MdAcUnit size={16} /> },
                  { key: 'petfriendly', label: 'Pet Friendly', icon: <MdPets size={16} /> },
                  { key: 'restaurant', label: 'Restaurant', icon: <MdRestaurant size={16} /> },
                ].map((a) => (
                  <label
                    key={a.key}
                    className={`hp-sidebar__check ${amenities[a.key] ? 'hp-sidebar__check--active' : ''}`}
                  >
                    <input type="checkbox" checked={amenities[a.key]} onChange={() => toggleAmenity(a.key)} />
                    <span className="hp-sidebar__checkmark">
                      {amenities[a.key] && <FiCheck size={12} />}
                    </span>
                    {a.icon} {a.label}
                  </label>
                ))}
              </div>

              <div className="hp-sidebar__group">
                <h4 className="hp-sidebar__label">{t.featured.priceLabel}</h4>
                <div className="hp-sidebar__range-labels">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => { setPriceRange([100, Number(e.target.value)]); setCurrentPage(1); }}
                  className="hp-sidebar__slider"
                  id="hp-price-slider"
                />
              </div>

              <div className="hp-sidebar__trust">
                <div className="hp-sidebar__trust-badge">
                  <FiShield className="hp-sidebar__trust-icon" />
                  <strong>Verified Direct</strong>
                </div>
                <p>{t.featured.trustText}</p>
              </div>
            </aside>

            {/* Grid */}
            <div className="hp-grid">
              {paginatedHotels.length === 0 ? (
                <div className="hp-grid__empty">
                  <p>{t.featured.emptyText}</p>
                </div>
              ) : (
                <div className="hp-grid__cards">
                  {paginatedHotels.map((hotel, i) => (
                    <motion.article
                      key={hotel.id}
                      className="hp-card"
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      variants={cardVariants}
                      whileHover={{ y: -6 }}
                      id={`hp-card-${hotel.id}`}
                    >
                      <div className="hp-card__image-wrap">
                        <img src={hotel.image} alt={hotel.name} className="hp-card__image" />
                        <div className="hp-card__image-overlay" />
                        <span className={`hp-card__badge hp-card__badge--${hotel.badgeType}`}>
                          {getBadgeIcon(hotel.badgeType)} {hotel.badge}
                        </span>
                        <button
                          className={`hp-card__fav ${favorites.includes(hotel.id) ? 'hp-card__fav--active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleFav(hotel.id); }}
                          aria-label="Toggle Favorite"
                        >
                          <FiHeart size={16} />
                        </button>
                      </div>
                      <div className="hp-card__body">
                        <div className="hp-card__header">
                          <h3 className="hp-card__name">{hotel.name}</h3>
                          <div className="hp-card__rating">
                            <FiStar size={14} /> <span>{hotel.rating}</span>
                          </div>
                        </div>
                        <div className="hp-card__meta">
                          <span className="hp-card__meta-item">
                            <IoBedOutline size={14} /> {hotel.rooms}
                          </span>
                          {hotel.features && hotel.features.map((f, fIdx) => (
                            <span key={fIdx} className="hp-card__meta-item hp-card__meta-item--dot">
                              <FiCheck size={12} style={{ color: 'var(--color-primary)' }} /> {f}
                            </span>
                          ))}
                        </div>
                        <div className="hp-card__footer">
                          <div className="hp-card__price">
                            <span className="hp-card__price-label">{t.featured.priceFrom}</span>
                            <span className="hp-card__price-amount">
                              ${hotel.price}
                              <span> {t.featured.pricePerNight}</span>
                            </span>
                          </div>
                          <button className="hp-card__cta" id={`view-hotel-${hotel.id}`}>
                            {t.featured.viewDetail}
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="hp-pagination">
                  <button
                    className="hp-pagination__btn"
                    disabled={currentPage === 1}
                    onClick={() => { setCurrentPage((p) => p - 1); document.getElementById('hotels-featured')?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    <FiChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`hp-pagination__num ${currentPage === i + 1 ? 'hp-pagination__num--active' : ''}`}
                      onClick={() => { setCurrentPage(i + 1); document.getElementById('hotels-featured')?.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="hp-pagination__btn"
                    disabled={currentPage === totalPages}
                    onClick={() => { setCurrentPage((p) => p + 1); document.getElementById('hotels-featured')?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    <FiChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="hp-featured__cta">
            <Button
              variant="outline"
              size="lg"
              icon={<FiArrowRight />}
              onClick={() => {
                setAmenities({ pool: false, beachfront: false, ac: false, petfriendly: false, restaurant: false });
                setPriceRange([100, 1000]);
                setHotelType('');
                setSearchZone('');
                setCurrentPage(1);
              }}
            >
              {t.featured.viewAll}
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ GUÍA DE ZONAS ═══ */}
      <section className="hp-zones section" id="hotels-zones">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.zonesHeader.label}
            title={t.zonesHeader.title}
            subtitle={t.zonesHeader.subtitle}
          />
          <div className="hp-zones__grid">
            {t.zones.map((z, i) => (
              <motion.div
                key={z.key}
                className="hp-zone-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                id={`zone-${z.key}`}
              >
                <div className="hp-zone-card__icon">{z.icon}</div>
                <h3 className="hp-zone-card__title">{z.title}</h3>
                <p className="hp-zone-card__subtitle">{z.subtitle}</p>
                <div className="hp-zone-card__detail">
                  <div className="hp-zone-card__pro">
                    <strong>{t.zonesHeader.prosLabel}</strong> {z.pros}
                  </div>
                  <div className="hp-zone-card__con">
                    <strong>{t.zonesHeader.consLabel}</strong> {z.cons}
                  </div>
                  <div className="hp-zone-card__ideal">
                    <strong>{t.zonesHeader.idealLabel}</strong> {z.ideal}
                  </div>
                </div>
                <button
                  className="hp-zone-card__cta"
                  onClick={() => {
                    setSearchZone(z.key);
                    setCurrentPage(1);
                    document.getElementById('hotels-featured')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t.zonesHeader.cta} <FiArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="hp-reviews section" id="hotels-reviews">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.reviewsHeader.label}
            title={t.reviewsHeader.title}
            subtitle={t.reviewsHeader.subtitle}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              className="hp-reviews__swiper"
            >
              {t.reviews.map((r, i) => (
                <SwiperSlide key={i}>
                  <div className="hp-review-card" id={`hp-review-${i}`}>
                    <div className="hp-review-card__stars">
                      {Array.from({ length: r.rating }).map((_, si) => (
                        <FiStar key={si} className="hp-review-card__star" />
                      ))}
                    </div>
                    <blockquote className="hp-review-card__quote">
                      "{r.quote}"
                    </blockquote>
                    <div className="hp-review-card__author">
                      <div className="hp-review-card__avatar">
                        {r.name.charAt(0)}
                      </div>
                      <div className="hp-review-card__info">
                        <span className="hp-review-card__name">{r.name}</span>
                        <span className="hp-review-card__detail">
                          {r.location} · {r.property} · {r.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* ═══ INFO ═══ */}
      <section className="hp-info section" id="hotels-info">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.info.label}
            title={t.info.title}
            subtitle={t.info.subtitle}
          />
          <div className="hp-info__grid">
            {t.info.cards.map((card, ci) => (
              <motion.div
                key={ci}
                className="hp-info__card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.45 }}
              >
                <h3>{card.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: card.text.replace(/\n/g, '<br />') }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="hp-faq section" id="hotels-faq">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            title={t.faq.title}
            subtitle={t.faq.subtitle}
          />
          <div className="hp-faq__list">
            {t.faqs.map((faq, i) => (
              <motion.div
                key={i}
                className={`hp-faq__item ${openFaq === i ? 'hp-faq__item--open' : ''}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                id={`hp-faq-${i}`}
              >
                <button
                  className="hp-faq__question"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <span className="hp-faq__icon">
                    {openFaq === i ? <FiMinus /> : <FiPlus />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      className="hp-faq__answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <p className="hp-faq__answer-text">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPLORA MÁS ═══ */}
      <section className="hp-explore section" id="hotels-explore">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.explore.label}
            title={t.explore.title}
            subtitle={t.explore.subtitle}
          />
          <div className="hp-explore__grid">
            {t.explore.links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="hp-explore__link"
                id={`explore-${item.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                <span className="hp-explore__link-icon">{item.icon}</span>
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                </div>
                <FiArrowRight size={16} />
              </a>
            ))}
          </div>
          <p className="hp-explore__count">
            {t.explore.count}
          </p>
        </div>
      </section>
    </div>
  );
}
