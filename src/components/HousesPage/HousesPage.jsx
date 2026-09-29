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
  MdPool, MdBeachAccess, MdAcUnit, MdPets,
  MdOutlineHotel
} from 'react-icons/md';
import { IoBedOutline } from 'react-icons/io5';
import { BsHouseDoor } from 'react-icons/bs';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import heroBg from '../../assets/houses_for_rent.png';

import hotelBoutique from '../../assets/hotel-boutique.png';
import hotelBeachfront from '../../assets/hotel-beachfront.png';
import hotelPool from '../../assets/hotel-pool.png';
import hostelBudget from '../../assets/hostel-budget.png';
import hotelAmor from '../../assets/hotel-amor.png';
import hotelSayulinda from '../../assets/hotel-sayulinda.png';
import villaEmma from '../../assets/villa-emma.png';
import villaRosetta from '../../assets/villa-rosetta.png';
import casaAmigos from '../../assets/casa-amigos.png';

import FloatingPalms from '../FloatingPalms/FloatingPalms';
import './HousesPage.css';

/* ═══════════════════════════════════════════
   BILINGUAL DATA
   ═══════════════════════════════════════════ */

const i18n = {
  ENG: {
    meta: {
      title: "Houses for Rent in Sayulita, Nayarit — Direct Owner Prices | No Airbnb Commissions",
      description: "Over 650 verified houses for rent in Sayulita, Nayarit: beachfront, with pool, family-friendly, and monthly rentals. Book directly with owners and skip Airbnb service fees.",
    },
    hero: {
      label: 'SayulitaTravel Rentals',
      title: 'Houses for Rent in Sayulita —',
      accent: 'Direct Owner Prices, No Airbnb Fees',
      subtitle1: 'Over 650 verified houses in Sayulita, Nayarit.',
      subtitle2: 'The price you see is the price you pay — without the hefty service fee that Airbnb adds at checkout.',
      trust: 'You book directly with the owner. We make it possible from our platform.',
    },
    search: {
      sectionTitle: 'Search your House in Sayulita — Dates, Bedrooms & Property Type',
      arrive: 'Arrive',
      depart: 'Depart',
      bedroomsLabel: 'Bedrooms',
      bedrooms: ['1+ Bedrooms', '2+ Bedrooms', '3+ Bedrooms', '4+ Bedrooms', '5+ Bedrooms'],
      typeLabel: 'Property Type',
      typeBeachfront: 'Beachfront',
      typePool: 'Villa with pool',
      typeBoutique: 'Boutique Villa',
      typeBudget: 'Budget Stays',
      btnSearch: 'Search',
      tagsLabel: 'Popular Filters:',
      tags: [
        { label: 'Beachfront', type: 'beachfront' },
        { label: 'With private pool', type: 'pool' },
        { label: 'Family-friendly', type: 'family' },
        { label: 'For groups', type: 'group' },
        { label: 'Monthly rent', type: 'budget' },
        { label: 'Pet friendly', type: 'pool' },
      ],
    },
    types: {
      label: 'Property Categories',
      title: 'Houses for Rent in Sayulita by Property Type',
      subtitle: "Sayulita is not an all-inclusive resort. It's a town with cobblestone streets, palm trees, surfing, and houses with local history. What you rent here isn't a numbered room in a hallway — it's a home with a kitchen, outdoor space, and the feeling that for a few days, that place is yours.",
      cta: 'View',
      idealLabel: 'Ideal for:',
    },
    why: {
      introLabel: 'Direct Booking Advantage',
      introTitle: 'Why Rent Here Instead of Airbnb or Vrbo?',
      introText: 'Fair question. Here is the honest answer without any filler. Airbnb has a decent inventory in Sayulita — over 300 properties listed. But they have a major problem that appears right before confirming your booking: the platform service fee.',
      tableTitle: 'Direct Price Comparison (7-Night Family Stay)',
      tableHeaders: ['Fee Details', 'Airbnb / Vrbo', 'SayulitaTravel (Direct)'],
      tableRows: [
        ['Rental Rate ($4,000 MXN / night)', '$28,000 MXN', '$28,000 MXN'],
        ['Platform Service Fee (12% - 20%)', '+$5,600 MXN', '$0 MXN'],
        ['Total Price Paid', '$33,600 MXN', '$28,000 MXN'],
      ],
      tableNote: 'That difference covers an entire extra night of accommodation, two full days of dining out for the whole family, or a couple of private surf lessons on the beach.',
      cards: [
        {
          icon: 'dollar',
          title: "No Service Fees: The Owner's Price is the Final Price",
          text: "We do not charge any percentage commission on your booking. Our model is different: owners pay a simple annual subscription to list their homes. You see the price the owner set — with nothing added on top. No hidden platform service fees or inflated end-of-stay check-out costs.",
        },
        {
          icon: 'shield',
          title: 'Physically Verified Properties in Sayulita',
          text: "The most common fear of vacation renting is arriving to find a house that looks completely different from the photos. We eliminate this risk. Every property on SayulitaTravel is physically visited by our local team before listing. We verify actual WiFi speeds and ensure that pools, A/C, and appliances work as promised.",
        },
        {
          icon: 'message',
          title: 'Direct Contact with the Owner Before Booking',
          text: "Airbnb blocks all phone and email exchange until you pay. On SayulitaTravel, you get direct communication from the very first message. Talk with the owner over email or WhatsApp to confirm fiber-optic stability, verify kitchen gear, request late check-in, or arrange chef services before committing a single dollar.",
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
      priceLabel: 'PRICE PER NIGHT',
      trustText: 'Book directly with owners and avoid platform service fees.',
      emptyText: 'No houses match your current filters. Try adjusting your criteria.',
      priceFrom: 'From',
      pricePerNight: '/ night',
      viewDetail: 'View Detail',
      viewAll: 'See all 650+ rentals in Sayulita',
    },
    pricing: {
      label: 'Honest Cost Breakdown',
      title: 'How Much Does It Cost to Rent a House in Sayulita?',
      subtitle: 'The rates depend on three clean factors: property type, number of bedrooms, and season. Here is an honest, local guide with realistic price ranges.',
      cards: [
        {
          title: 'Budget Homes ($1,500 – $3,500 MXN / night)',
          text: 'Simple, authentic, and well-located homes. Perfect for couples or small families who want to spend their budget on local tacos and surf lessons rather than premium rooms.\n\n<strong>What to expect:</strong> 1 to 3 bedrooms, fully functional kitchen, located 5–15 mins walk to the beach, with shared or no pool.',
        },
        {
          title: 'Mid-Range Homes ($3,500 – $7,000 MXN / night)',
          text: 'Our broadest and most popular category. Great for active families and groups of friends.\n\n<strong>What to expect:</strong> 3 to 4 bedrooms (sleeps 6–10), private pool, air conditioning in all bedrooms, fiber-optic WiFi, fully equipped kitchen, outdoor grill area, and periodic housekeeping services.',
        },
        {
          title: 'Luxury Villas ($7,000+ MXN / night)',
          text: "Premium villas that compete with Riviera Maya's high-end vacational rentals — but with a much more private vibe and no corporate tourist crowds.\n\n<strong>What to expect:</strong> Beachfront or hilltop panoramic views, chef-ready kitchen, 4 to 8+ en-suite rooms, daily maid service, private pool, and local concierge.",
        },
      ],
    },
    included: {
      label: 'Inclusions & Add-Ons',
      title: 'What is Included in a Sayulita House Rental?',
      subtitle: 'Know what is standard and what is optional before booking so your expectations are set right.',
      standardTitle: 'Standard Inclusions',
      optionalTitle: 'Optional Services (Extra Charge)',
      standard: [
        { title: 'Fully Equipped Kitchen', desc: 'Stove, oven, fridge, blender, coffeemaker, pots, pans, and full dinnerware set.' },
        { title: 'Verified WiFi Connection', desc: 'Included in all listings. Fiber-optic speeds are specified on properties where measured.' },
        { title: 'Air Conditioning', desc: 'In all bedrooms as a minimum. Premium homes include central A/C in shared areas.' },
        { title: 'Linens & Towels', desc: 'Provided for the confirmed number of guests, with changes linked to cleaning frequency.' },
      ],
      optional: [
        { title: 'Airport Transfers', desc: 'Comfortable private PVR airport transfers can be pre-arranged directly by your host.' },
        { title: 'Pre-Arrival Grocery Stocking', desc: 'Owners can purchase your grocery list and stock your fridge before your flight lands.' },
        { title: 'Personal On-Site Chef', desc: 'Hire a private local cook to prepare family dinners, fresh seafood, or local breakfasts.' },
        { title: 'Golf Cart Rentals', desc: 'Highly popular in Sayulita. Owners can direct you to trusted local cart renters.' },
      ],
    },
    zonesHeader: {
      label: 'Location Selection Guide',
      title: 'Where to Stay in Sayulita? Zone Guide for Houses',
      subtitle: 'Sayulita is small, but your neighborhood selection entirely changes the vibe, noise levels, and walking requirements of your vacation.',
      prosLabel: '✓ Pros:',
      consLabel: '✗ Cons:',
      idealLabel: 'Ideal traveler:',
      cta: 'View homes in this zone',
    },
    reviewsHeader: {
      label: 'Verified Guest Reviews',
      title: 'What Guest Travelers Say',
      subtitle: 'Discover what your traveler guests could be reviewing about your property when booking direct and avoiding fees with our platform.',
    },
    booking: {
      label: 'Easy Booking Process',
      title: 'How to Book Your House in Sayulita — Step-by-Step',
      subtitle: "We outline the process because we know that booking direct can generate questions. Here is how we verify everything.",
      steps: [
        { step: '1', title: 'Search & Filter', desc: 'Use our search fields or sidebar filters to find homes matching your specific dates, bed count, and features.' },
        { step: '2', title: 'Contact Directly', desc: 'Open the listing details and write directly to the owner using the secure email form or their verified WhatsApp number.' },
        { step: '3', title: 'Confirm Details', desc: 'The owner confirms calendar availability, breaks down the base price (no platform commission), and sends booking conditions.' },
        { step: '4', title: 'Secure Payment', desc: 'Make your deposit securely directly with the owner as agreed between the two of you.' },
        { step: '5', title: 'Get Directions', desc: 'Receive a direct confirmation email containing the exact address, keylock codes, and direct contacts for the local manager.' },
        { step: '6', title: 'Arrive & Surf', desc: 'Walk into your fully prepared home. If you ever need help, both the owner and our local team in Sayulita are accessible.' },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions About Sayulita House Rentals',
      subtitle: 'Get honest, direct answers from seasoned local neighbors.',
    },
    explore: {
      label: 'Your Best Local Guide Online',
      title: 'Explore Sayulita — Beyond Rentals',
      subtitle: 'SayulitaTravel isn\'t just a rental site. Together we\'ll make it the most comprehensive source about Sayulita on the web, created by those who live here.',
      count: '650+ verified rental houses in Sayulita, Nayarit, México',
      links: [
        { label: 'Hotels in Sayulita', desc: 'Boutique hotels & hostals', href: '/rentals/hotels', icon: '🏨' },
        { label: 'Restaurants & Bars', desc: '300+ verified spots', href: '/businesses', icon: '🍽️' },
        { label: 'Things to Do', desc: 'Surf, yoga, tours & more', href: '/tours', icon: '🏄' },
        { label: 'How to Get Here', desc: 'Airport transfer guides PVR', href: 'https://sayulitatransportation.com/', icon: '✈️' },
        { label: 'Real Estate in Sayulita', desc: 'Buy a home in paradise', href: '/real-estate', icon: '🏡' },
      ],
    },
    houses: [
      { id: 1, name: 'Villa Emma', rooms: '4 Bedrooms', features: ['Private Pool'], badge: 'Beachfront' },
      { id: 2, name: 'Villa Rosetta', rooms: '3 Bedrooms', features: ['North Side'], badge: 'Popular' },
      { id: 3, name: 'AzulPitaya Beach House', rooms: '1-2 Rooms', features: ['Breakfast Inc.'], badge: 'Boutique' },
      { id: 4, name: 'Casa Amigos', rooms: '5 Bedrooms', features: ['Sleeps 12'], badge: 'Jungle View' },
      { id: 5, name: 'Casa La Paloma', rooms: '4 Bedrooms', features: ['Ocean Views', 'Private Palapa'], badge: 'Beachfront' },
      { id: 6, name: 'Villa Mar Norte', rooms: '3 Bedrooms', features: ['Rooftop Terrace', 'Quiet Area'], badge: 'Popular' },
      { id: 7, name: 'Casa Bonita', rooms: '5 Bedrooms', features: ['Ocean View', 'Sleeps 14'], badge: 'Jungle View' },
      { id: 8, name: 'Casa del Sol', rooms: '2 Bedrooms', features: ['Town Center', 'Fully Equipped'], badge: 'Budget' },
    ],
    houseTypes: [
      {
        key: 'beachfront',
        title: 'Beachfront Homes in Sayulita',
        subtitle: 'The most sought-after. The first to fill up.',
        desc: "Sayulita protects its coastline — there are no massive constructions or 200-room high-rise beach hotels. Access is scarce by design, which makes landing one of these properties a highly distinct experience.",
        bullets: [
          'Access the beach in under 60 seconds from your own terrace',
          'Hear the Pacific Ocean crashing from your bed — without paying extra for it',
          'Stunning ocean views from the master bedrooms in most properties',
          'Large outdoor terraces or palapas with direct views of the entire bay',
          'The ability to check the surf when you wake up and decide if you head out',
        ],
        price: 'Price guide: from $4,500 to $18,000 MXN per night, depending on size and season.',
        ideal: 'couples, surfers and families who want immediate sand access and direct views.',
      },
      {
        key: 'pool',
        title: 'Villas with Private Pool in Sayulita',
        subtitle: 'A private pool changes the rhythm of your vacation',
        desc: 'No waking up early to reserve lounge chairs. No schedules. No rules. Villas with pools in Sayulita are typically 3 to 6-bedroom properties designed for groups and families who want their own private sanctuary.',
        bullets: [
          'Saltwater pools in some properties — gentler on the skin, no chemical chlorine smell',
          'Spacious outdoor areas with palapa kitchens and comfortable shade zones',
          'Absolute privacy: no sharing pool decks with other guests in the building',
          'Some include daily housekeeping service or a private chef available by request',
        ],
        price: 'Price guide: from $3,500 to $10,000+ MXN per night.',
        ideal: 'families with kids, groups of friends, family reunions, and active summer getaways.',
      },
      {
        key: 'family',
        title: 'Family Homes in Sayulita — 3 or More Bedrooms',
        subtitle: 'Sayulita works better for families than almost any beach town',
        desc: "The main beach has a gentle wave perfect for kids to learn surfing. The town is highly walkable. There is a turtle sanctuary, weekly street markets, and enough great food to keep everyone happy.",
        bullets: [
          'Fully equipped kitchen — cooking meals makes a huge difference in the family budget',
          'Gated entries or perimeter walls — peace of mind for parents while kids play outside',
          'Comfortable bedroom configurations to avoid crowding',
          'Proximity to the quieter north side beach — gentler and less crowded than the main beach',
          'Cribs, high chairs, and extra beds available in many properties (please request ahead)',
        ],
        price: 'Price guide: from $3,000 to $7,500 MXN per night.',
        ideal: 'multigenerational families, groups with small kids, and weekly stays.',
      },
      {
        key: 'group',
        title: 'Group Homes in Sayulita — For 8, 10 or More People',
        subtitle: 'Sayulita excels at group travel experiences',
        desc: 'Tacos never run out, bars keep moving, the surf accommodates all levels, and renting a large house is significantly cheaper per person than multiple hotel rooms. Group properties are designed for smooth shared living.',
        bullets: [
          'En-suite bedrooms — every couple or subgroup gets their own private bathroom',
          'Outdoor palapa kitchen and dining areas — group meals are a core part of the trip',
          'Pools large enough that nobody has to wait their turn to jump in',
          'Event permissions if you are celebrating a small wedding or birthday (confirm first)',
        ],
        price: 'Typical capacity: from 8 to 30 people, depending on the property.',
        ideal: 'bachelor/bachelorette parties, company retreats, extended family milestones.',
      },
    ],
    zones: [
      {
        title: 'Town Center', key: 'center', subtitle: 'In the middle of all the action',
        pros: 'Everything is walkable. Main beach is 2-3 min walk, plaza is next door.',
        cons: 'Nightlife music keeps streets lively until midnight or later in high season. Bring earplugs.',
        ideal: 'Friend groups, active couples, short stays maximizing every single hour.',
        icon: '🏘️',
      },
      {
        title: 'Beachfront', key: 'beach', subtitle: 'The ocean as your backyard',
        pros: 'Wake up to wave sounds. Surf before breakfast. Immediate soft sand access.',
        cons: 'Highest prices in the inventory, requires booking months in advance.',
        ideal: 'Special trips, beachfront lovers, groups splitting costs for a premium location.',
        icon: '🏖️',
      },
      {
        title: 'North Hill', key: 'north', subtitle: 'Panoramic ocean views & absolute quiet',
        pros: 'Perfect silence, panoramic bay views, residential feel.',
        cons: '10-15 minute walk to center (uphill on the way back). Golf cart recommended.',
        ideal: 'Peace seekers, repeat Sayulita visitors, families seeking residential quiet.',
        icon: '⛰️',
      },
    ],
    reviews: [
      {
        quote: "I compared the price of our rental on Airbnb and SayulitaTravel. Same house, same dates. Airbnb was over $6,400 MXN more expensive due to service fees. We booked here. We aren't searching anywhere else.",
        name: 'Adriana G.', location: 'Mexico City', property: 'Casa La Paloma', date: 'Easter 2025', rating: 5,
      },
      {
        quote: "Being able to text the owner on WhatsApp before booking was huge. They confirmed fiber-optic speeds, that they had a capsule coffee maker, and how to receive mail. That chat convinced me more than any text description.",
        name: 'Santiago R.', location: 'Guadalajara', property: 'Villa Mar Norte', date: 'February 2025', rating: 5,
      },
      {
        quote: "We are a family of 6 with young kids. The house had a crib, high chair, and a secure perimeter wall that gave us peace of mind. The owner even recommended a trusted local babysitter. Airbnb doesn't do that.",
        name: 'Claudia & Ernesto V.', location: 'Monterrey', property: 'Casa Bonita', date: 'December 2024', rating: 5,
      },
    ],
    faqs: [
      {
        q: 'How do I book a house in Sayulita without paying Airbnb commission?',
        a: "Simply use the search engine on this page, choose the property you like, contact the owner directly, and confirm your booking through our platform on SayulitaTravel.\nThere is no platform service fee from our end. The price set by the owner is what you pay, plus standard local taxes (VAT and lodging tax, they are not exclusive to direct booking).",
      },
      {
        q: 'How much deposit is required to reserve a house in Sayulita?',
        a: 'The standard policy for most properties is:\n• 50% of the total at the time of booking to reserve dates\n• 50% remaining balance 30 days prior to arrival\nIf you book less than 30 days before arrival, 100% is due upon confirmation. Some premium properties or peak holiday bookings (Christmas, Easter) may require 100% upfront.',
      },
      {
        q: 'Do rental houses in Sayulita allow pets?',
        a: 'Many do. Use the "Pet Friendly" filter in the sidebar to display only pet-friendly properties. Most owners who allow pets ask for a small refundable pet deposit (typically equivalent to one night) returned at check-out if there are no damages. If you travel with a large breed or multiple pets, contact the owner first.',
      },
      {
        q: 'Are there monthly rentals available in Sayulita?',
        a: 'Yes, monthly stays are growing rapidly. Monthly rates are significantly lower than daily rates multiplied by 30 (typical savings are 30% to 45%). They include fiber-optic WiFi, full kitchens, and more check-in/out flexibility. The best season for low prices and high availability is May to October.',
      },
      {
        q: 'When should I book my house for high season?',
        a: 'Depends on dates:\n• Dec 20 to Jan 5 & Easter: book 3 to 4 months in advance minimum (best beachfront villas book by August).\n• Feb to Apr (Spring Break): 6 to 10 weeks ahead is reasonable.\n• May to Oct (Low Season): 2 to 4 weeks is generally sufficient. Lots of choices and lowest prices.',
      },
      {
        q: 'Do the houses include WiFi and air conditioning?',
        a: 'Yes, the vast majority do. We verify both before listing. We specify fiber-optic speeds on listings where owners measured it. For remote work, ask the owner directly before booking. A/C is always in bedrooms at a minimum; mid-to-high-end properties have it in common areas too.',
      },
      {
        q: 'Is it safe to pay for a rental house in Sayulita online?',
        a: 'Yes — SayulitaTravel does not charge customers for rentals, receive commissions, referral fees, or other compensation from Service Providers listed on the Platform. We are solely an intermediary platform that connects Users with property owners, experience providers, and local businesses. The owner sets the price. You pay the owner directly. We don\'t add anything on top.',
      },
    ],
  },
  ESP: {
    meta: {
      title: 'Casas en Renta en Sayulita, Nayarit — Precio Directo del Dueño | Sin Comisión de Airbnb',
      description: 'Más de 650 casas en renta en Sayulita, Nayarit: frente al mar, con alberca, familiares y mensuales. Reserva directo con los dueños y evita las comisiones de Airbnb.',
    },
    hero: {
      label: 'SayulitaTravel Rentas',
      title: 'Casas en Renta en Sayulita —',
      accent: 'Precio Directo del Dueño, Sin Comisión de Airbnb',
      subtitle1: 'Más de 650 casas verificadas en Sayulita, Nayarit.',
      subtitle2: 'El precio que ves es el precio que pagas — sin la comisión que Airbnb añade al checkout.',
      trust: 'Reservas directo con el dueño. Nosotros lo hacemos posible desde nuestra plataforma.',
    },
    search: {
      sectionTitle: 'Busca tu casa en Sayulita — Fechas, Recámaras y Tipo de propiedad',
      arrive: 'Llegada',
      depart: 'Salida',
      bedroomsLabel: 'Recámaras',
      bedrooms: ['1+ Recámaras', '2+ Recámaras', '3+ Recámaras', '4+ Recámaras', '5+ Recámaras'],
      typeLabel: 'Tipo de propiedad',
      typeBeachfront: 'Frente al mar',
      typePool: 'Villa con alberca',
      typeBoutique: 'Villa boutique',
      typeBudget: 'Económica',
      btnSearch: 'Buscar',
      tagsLabel: 'Filtros populares:',
      tags: [
        { label: 'Frente al mar', type: 'beachfront' },
        { label: 'Con alberca privada', type: 'pool' },
        { label: 'Para familias', type: 'family' },
        { label: 'Para grupos', type: 'group' },
        { label: 'Renta mensual', type: 'budget' },
        { label: 'Pet friendly', type: 'pool' },
      ],
    },
    types: {
      label: 'Categorías de Propiedades',
      title: 'Casas en Renta en Sayulita por Tipo de Propiedad',
      subtitle: 'Sayulita no es un resort todo incluido. Es un pueblo con calles empedradas, palmeras, surf y casas con historia local. Lo que rentas aquí no es un cuarto numerado en un pasillo — es una casa con cocina, espacio al aire libre y la sensación de que por unos días, ese lugar es tuyo.',
      cta: 'Ver',
      idealLabel: 'Ideal para:',
    },
    why: {
      introLabel: 'Ventaja de Reserva Directa',
      introTitle: '¿Por qué rentar aquí en vez de Airbnb o Vrbo?',
      introText: 'Pregunta justa. Aquí va la respuesta honesta sin relleno. Airbnb tiene un inventario decente en Sayulita — más de 300 propiedades listadas. Pero tienen un problema mayor que aparece justo antes de confirmar tu reserva: la comisión de servicio de la plataforma.',
      tableTitle: 'Comparación de Precios Directos (Estancia Familiar de 7 Noches)',
      tableHeaders: ['Detalle del Cargo', 'Airbnb / Vrbo', 'SayulitaTravel (Directo)'],
      tableRows: [
        ['Tarifa de Renta ($4,000 MXN / noche)', '$28,000 MXN', '$28,000 MXN'],
        ['Comisión de Servicio (12% - 20%)', '+$5,600 MXN', '$0 MXN'],
        ['Precio Total Pagado', '$33,600 MXN', '$28,000 MXN'],
      ],
      tableNote: 'Esa diferencia cubre una noche extra de hospedaje, dos días completos de comer fuera con toda la familia, o un par de clases privadas de surf en la playa.',
      cards: [
        {
          icon: 'dollar',
          title: 'Sin Comisión de Servicio: El Precio del Dueño es el Precio Final',
          text: 'No cobramos ningún porcentaje de comisión en tu reserva. Nuestro modelo es diferente: los dueños pagan una suscripción anual para listar sus casas. Tú ves el precio que el dueño estableció — sin nada añadido encima. Sin comisiones ocultas ni costos inflados al checkout.',
        },
        {
          icon: 'shield',
          title: 'Propiedades Verificadas Físicamente en Sayulita',
          text: 'El miedo más común de rentar vacaciones es llegar y encontrar una casa que no se parece en nada a las fotos. Nosotros eliminamos ese riesgo. Cada propiedad en SayulitaTravel es visitada físicamente por nuestro equipo local antes de publicarla. Verificamos velocidades reales de WiFi y nos aseguramos de que albercas, A/C y electrodomésticos funcionen como prometen.',
        },
        {
          icon: 'message',
          title: 'Contacto Directo con el Dueño Antes de Reservar',
          text: 'Airbnb bloquea todo intercambio de teléfono y email hasta que pagas. En SayulitaTravel, tienes comunicación directa desde el primer mensaje. Habla con el dueño por email o WhatsApp para confirmar la estabilidad de la fibra óptica, verificar el equipo de cocina, solicitar check-in tardío o contratar un chef privado antes de comprometer un solo peso.',
        },
      ],
    },
    featured: {
      title: "Lo Mejor y Más Selecto de Sayulita",
      sortLabel: 'Ordenar por:',
      sortRating: 'Mayor Valoración',
      sortPriceAsc: 'Precio: Menor → Mayor',
      sortPriceDesc: 'Precio: Mayor → Menor',
      filtersTitle: 'Filtros',
      amenitiesLabel: 'AMENIDADES',
      priceLabel: 'PRECIO POR NOCHE',
      trustText: 'Reserva directo con los dueños y evita las comisiones de servicio de plataformas.',
      emptyText: 'Ninguna casa coincide con los filtros elegidos. Intenta modificar tus criterios.',
      priceFrom: 'Desde',
      pricePerNight: '/ noche',
      viewDetail: 'Ver Detalle',
      viewAll: 'Ver las 650+ rentas en Sayulita',
    },
    pricing: {
      label: 'Desglose Honesto de Costos',
      title: '¿Cuánto Cuesta Rentar una Casa en Sayulita?',
      subtitle: 'Las tarifas dependen de tres factores claros: tipo de propiedad, número de recámaras y temporada. Aquí va una guía honesta y local con rangos de precio realistas.',
      cards: [
        {
          title: 'Casas Económicas ($1,500 – $3,500 MXN / noche)',
          text: 'Casas sencillas, auténticas y bien ubicadas. Perfectas para parejas o familias pequeñas que quieren gastar su presupuesto en tacos locales y clases de surf en vez de habitaciones premium.\n\n<strong>Qué esperar:</strong> 1 a 3 recámaras, cocina completamente funcional, ubicada a 5–15 min caminando de la playa, con alberca compartida o sin alberca.',
        },
        {
          title: 'Casas de Rango Medio ($3,500 – $7,000 MXN / noche)',
          text: 'Nuestra categoría más amplia y popular. Excelente para familias activas y grupos de amigos.\n\n<strong>Qué esperar:</strong> 3 a 4 recámaras (capacidad 6–10), alberca privada, aire acondicionado en todas las recámaras, WiFi de fibra óptica, cocina equipada, área de asador al aire libre y servicio periódico de limpieza.',
        },
        {
          title: 'Villas de Lujo ($7,000+ MXN / noche)',
          text: 'Villas premium que compiten con las rentas vacacionales de alta gama de la Riviera Maya — pero con un ambiente mucho más privado y sin las multitudes corporativas de turistas.\n\n<strong>Qué esperar:</strong> Vistas panorámicas frente al mar o en la colina, cocina lista para chef, 4 a 8+ recámaras con baño, servicio diario de limpieza, alberca privada y conserje local.',
        },
      ],
    },
    included: {
      label: 'Inclusiones y Extras',
      title: '¿Qué Incluye una Renta de Casa en Sayulita?',
      subtitle: 'Conoce lo que es estándar y lo que es opcional antes de reservar para que tus expectativas estén bien definidas.',
      standardTitle: 'Inclusiones Estándar',
      optionalTitle: 'Servicios Opcionales (Costo Extra)',
      standard: [
        { title: 'Cocina Completamente Equipada', desc: 'Estufa, horno, refrigerador, licuadora, cafetera, ollas, sartenes y juego completo de vajilla.' },
        { title: 'Conexión WiFi Verificada', desc: 'Incluida en todos los listados. Velocidades de fibra óptica especificadas en propiedades donde se midió.' },
        { title: 'Aire Acondicionado', desc: 'En todas las recámaras como mínimo. Las casas premium incluyen A/C central en áreas compartidas.' },
        { title: 'Sábanas y Toallas', desc: 'Proporcionadas para el número confirmado de huéspedes, con cambios vinculados a la frecuencia de limpieza.' },
      ],
      optional: [
        { title: 'Traslados al Aeropuerto', desc: 'Traslados privados cómodos desde el aeropuerto PVR pueden ser pre-arreglados directamente con tu anfitrión.' },
        { title: 'Abastecimiento de Despensa', desc: 'Los dueños pueden comprar tu lista de despensa y surtir tu refrigerador antes de que aterrice tu vuelo.' },
        { title: 'Chef Personal en Sitio', desc: 'Contrata un cocinero local privado para preparar cenas familiares, mariscos frescos o desayunos locales.' },
        { title: 'Renta de Carrito de Golf', desc: 'Muy popular en Sayulita. Los dueños pueden dirigirte a rentadores locales de confianza.' },
      ],
    },
    zonesHeader: {
      label: 'Guía de Selección de Ubicación',
      title: '¿Dónde Hospedarse en Sayulita? Guía de Zonas para Casas',
      subtitle: 'Sayulita es pequeño, pero la selección de tu vecindario cambia completamente el ambiente, los niveles de ruido y los requerimientos de caminata de tus vacaciones.',
      prosLabel: '✓ Ventajas:',
      consLabel: '✗ Desventajas:',
      idealLabel: 'Viajero ideal:',
      cta: 'Ver casas en esta zona',
    },
    reviewsHeader: {
      label: 'Reseñas Verificadas de Huéspedes',
      title: 'Lo Que Dicen los Viajeros Huéspedes',
      subtitle: 'Descubre lo que tus viajeros huéspedes podrían estar reseñando de tu propiedad al reservar directo y evitando comisiones con nuestra plataforma.',
    },
    booking: {
      label: 'Proceso de Reserva Fácil',
      title: 'Cómo Reservar tu Casa en Sayulita — Paso a Paso',
      subtitle: 'Describimos el proceso porque sabemos que reservar directo puede generar preguntas. Así es como verificamos todo.',
      steps: [
        { step: '1', title: 'Buscar y Filtrar', desc: 'Usa nuestros campos de búsqueda o los filtros del sidebar para encontrar casas que coincidan con tus fechas, número de camas y características específicas.' },
        { step: '2', title: 'Contactar Directamente', desc: 'Abre los detalles del listado y escribe directamente al dueño usando el formulario de email seguro o su número de WhatsApp verificado.' },
        { step: '3', title: 'Confirmar Detalles', desc: 'El dueño confirma disponibilidad en calendario, desglosa el precio base (sin comisión de plataforma) y envía las condiciones de reserva.' },
        { step: '4', title: 'Pago Seguro', desc: 'Realiza tu depósito de forma segura directo con el dueño a según como hallan acordado entre ustedes dos.' },
        { step: '5', title: 'Recibir Indicaciones', desc: 'Recibe un email de confirmación directa con la dirección exacta, códigos de cerradura y contactos directos del administrador local.' },
        { step: '6', title: 'Llegar y Surfear', desc: 'Entra a tu casa completamente preparada. Si necesitas ayuda, tanto el dueño como nuestro equipo local en Sayulita están accesibles.' },
      ],
    },
    faq: {
      title: 'Preguntas Frecuentes Sobre Casas en Renta en Sayulita',
      subtitle: 'Respuestas honestas y directas de vecinos locales con experiencia.',
    },
    explore: {
      label: 'Tu Mejor Guía Local Online',
      title: 'Explora Sayulita — Más Allá de las Rentas',
      subtitle: 'Sayulita Travel no es únicamente un sitio de alquileres. Colaboraremos para convertirlo en la fuente más exhaustiva sobre Sayulita en la web, creado por quienes residen aquí.',
      count: '650+ casas en renta verificadas en Sayulita, Nayarit, México',
      links: [
        { label: 'Hoteles en Sayulita', desc: 'Hoteles boutique y hostales', href: '/rentals/hotels', icon: '🏨' },
        { label: 'Restaurantes y Bares', desc: '300+ lugares verificados', href: '/businesses', icon: '🍽️' },
        { label: 'Qué Hacer', desc: 'Surf, yoga, tours y más', href: '/tours', icon: '🏄' },
        { label: 'Cómo Llegar', desc: 'Guías de traslado del aeropuerto PVR', href: 'https://sayulitatransportation.com/', icon: '✈️' },
        { label: 'Bienes Raíces en Sayulita', desc: 'Compra una casa en el paraíso', href: '/real-estate', icon: '🏡' },
      ],
    },
    houses: [
      { id: 1, name: 'Villa Emma', rooms: '4 Recámaras', features: ['Alberca Privada'], badge: 'Frente al Mar' },
      { id: 2, name: 'Villa Rosetta', rooms: '3 Recámaras', features: ['Zona Norte'], badge: 'Popular' },
      { id: 3, name: 'AzulPitaya Beach House', rooms: '1-2 Habitaciones', features: ['Desayuno Inc.'], badge: 'Boutique' },
      { id: 4, name: 'Casa Amigos', rooms: '5 Recámaras', features: ['Capacidad 12'], badge: 'Vista Selva' },
      { id: 5, name: 'Casa La Paloma', rooms: '4 Recámaras', features: ['Vista al Mar', 'Palapa Privada'], badge: 'Frente al Mar' },
      { id: 6, name: 'Villa Mar Norte', rooms: '3 Recámaras', features: ['Terraza en Azotea', 'Zona Tranquila'], badge: 'Popular' },
      { id: 7, name: 'Casa Bonita', rooms: '5 Recámaras', features: ['Vista al Mar', 'Capacidad 14'], badge: 'Vista Selva' },
      { id: 8, name: 'Casa del Sol', rooms: '2 Recámaras', features: ['Centro del Pueblo', 'Completamente Equipada'], badge: 'Económica' },
    ],
    houseTypes: [
      {
        key: 'beachfront',
        title: 'Casas Frente al Mar en Sayulita',
        subtitle: 'Las más buscadas. Las primeras en llenarse.',
        desc: 'Sayulita protege su línea de costa — no hay construcciones masivas ni hoteles de 200 habitaciones frente a la playa. El acceso es escaso por diseño, lo que hace que conseguir una de estas propiedades sea una experiencia altamente distinguida.',
        bullets: [
          'Accede a la playa en menos de 60 segundos desde tu propia terraza',
          'Escucha el océano Pacífico romper desde tu cama — sin pagar extra por ello',
          'Vistas impresionantes al mar desde las recámaras principales en la mayoría de propiedades',
          'Grandes terrazas al aire libre o palapas con vista directa a toda la bahía',
          'La posibilidad de revisar el oleaje cuando despiertes y decidir si sales a surfear',
        ],
        price: 'Guía de precios: desde $4,500 hasta $18,000 MXN por noche, según tamaño y temporada.',
        ideal: 'parejas, surfistas y familias que quieren acceso inmediato a la arena y vistas directas.',
      },
      {
        key: 'pool',
        title: 'Villas con Alberca Privada en Sayulita',
        subtitle: 'Una alberca privada cambia el ritmo de tus vacaciones',
        desc: 'No levantarte temprano a reservar camastros. Sin horarios. Sin reglas. Las villas con alberca en Sayulita son típicamente propiedades de 3 a 6 recámaras diseñadas para grupos y familias que quieren su propio santuario privado.',
        bullets: [
          'Albercas de agua salada en algunas propiedades — más suaves para la piel, sin olor a cloro químico',
          'Amplias áreas al aire libre con cocinas de palapa y zonas de sombra cómodas',
          'Privacidad absoluta: no compartir la alberca con otros huéspedes del edificio',
          'Algunas incluyen servicio diario de limpieza o chef privado disponible bajo solicitud',
        ],
        price: 'Guía de precios: desde $3,500 hasta $10,000+ MXN por noche.',
        ideal: 'familias con niños, grupos de amigos, reuniones familiares y escapadas activas de verano.',
      },
      {
        key: 'family',
        title: 'Casas Familiares en Sayulita — 3 o Más Recámaras',
        subtitle: 'Sayulita funciona mejor para familias que casi cualquier pueblo de playa',
        desc: 'La playa principal tiene una ola suave perfecta para que los niños aprendan a surfear. El pueblo es muy caminable. Hay un santuario de tortugas, mercados callejeros semanales y suficiente buena comida para mantener a todos contentos.',
        bullets: [
          'Cocina completamente equipada — cocinar en casa hace una gran diferencia en el presupuesto familiar',
          'Entradas con portón o muros perimetrales — tranquilidad para los padres mientras los niños juegan afuera',
          'Configuraciones cómodas de recámaras para evitar hacinamiento',
          'Proximidad a la playa norte más tranquila — más suave y menos concurrida que la playa principal',
          'Cunas, sillas altas y camas extras disponibles en muchas propiedades (solicitar con anticipación)',
        ],
        price: 'Guía de precios: desde $3,000 hasta $7,500 MXN por noche.',
        ideal: 'familias multigeneracionales, grupos con niños pequeños y estancias semanales.',
      },
      {
        key: 'group',
        title: 'Casas para Grupos en Sayulita — Para 8, 10 o Más Personas',
        subtitle: 'Sayulita sobresale en experiencias de viaje grupal',
        desc: 'Los tacos nunca se acaban, los bares siguen abiertos, el surf acomoda todos los niveles, y rentar una casa grande es significativamente más barato por persona que múltiples cuartos de hotel. Las propiedades grupales están diseñadas para una convivencia compartida fluida.',
        bullets: [
          'Recámaras con baño propio — cada pareja o subgrupo tiene su propio baño privado',
          'Cocina y comedor al aire libre con palapa — las comidas grupales son parte esencial del viaje',
          'Albercas lo suficientemente grandes para que nadie tenga que esperar turno para lanzarse',
          'Permisos para eventos si celebras una boda pequeña o cumpleaños (confirmar primero)',
        ],
        price: 'Capacidad típica: de 8 a 30 personas, dependiendo de la propiedad.',
        ideal: 'despedidas de soltero/a, retiros corporativos, celebraciones familiares.',
      },
    ],
    zones: [
      {
        title: 'Centro del Pueblo', key: 'center', subtitle: 'En medio de toda la acción',
        pros: 'Todo es caminable. La playa principal está a 2-3 min, la plaza está al lado.',
        cons: 'La música nocturna mantiene las calles animadas hasta la medianoche o más en temporada alta. Lleva tapones.',
        ideal: 'Grupos de amigos, parejas activas, estancias cortas maximizando cada hora.',
        icon: '🏘️',
      },
      {
        title: 'Frente al Mar', key: 'beach', subtitle: 'El océano como tu patio trasero',
        pros: 'Despierta con el sonido de las olas. Surfea antes del desayuno. Acceso inmediato a la arena.',
        cons: 'Los precios más altos del inventario, requiere reservar con meses de anticipación.',
        ideal: 'Viajes especiales, amantes del frente de playa, grupos dividiendo costos para una ubicación premium.',
        icon: '🏖️',
      },
      {
        title: 'Colina Norte', key: 'north', subtitle: 'Vistas panorámicas al océano y silencio absoluto',
        pros: 'Silencio perfecto, vistas panorámicas de la bahía, ambiente residencial.',
        cons: 'Caminata de 10-15 minutos al centro (cuesta arriba de regreso). Se recomienda carrito de golf.',
        ideal: 'Buscadores de paz, visitantes recurrentes de Sayulita, familias buscando tranquilidad residencial.',
        icon: '⛰️',
      },
    ],
    reviews: [
      {
        quote: 'Comparé el precio de nuestra renta en Airbnb y SayulitaTravel. Misma casa, mismas fechas. Airbnb era más de $6,400 MXN más caro por las comisiones de servicio. Reservamos aquí. Ya no buscamos en otro lado.',
        name: 'Adriana G.', location: 'Ciudad de México', property: 'Casa La Paloma', date: 'Semana Santa 2025', rating: 5,
      },
      {
        quote: 'Poder enviar mensaje al dueño por WhatsApp antes de reservar fue enorme. Confirmaron velocidades de fibra óptica, que tenían cafetera de cápsulas y cómo recibir correo. Esa conversación me convenció más que cualquier descripción de texto.',
        name: 'Santiago R.', location: 'Guadalajara', property: 'Villa Mar Norte', date: 'Febrero 2025', rating: 5,
      },
      {
        quote: 'Somos una familia de 6 con niños pequeños. La casa tenía cuna, silla alta y un muro perimetral seguro que nos dio tranquilidad. El dueño incluso nos recomendó una niñera local de confianza. Airbnb no hace eso.',
        name: 'Claudia y Ernesto V.', location: 'Monterrey', property: 'Casa Bonita', date: 'Diciembre 2024', rating: 5,
      },
    ],
    faqs: [
      {
        q: '¿Cómo reservo una casa en Sayulita sin pagar comisión de Airbnb?',
        a: 'Simplemente usa el buscador de esta página, elige la propiedad que te gusta, contacta al dueño directamente y confirma tu reserva a través de nuestra plataforma en SayulitaTravel.\nNo hay comisión de servicio de plataforma de nuestra parte. El precio que establece el dueño es lo que pagas, más los impuestos locales estándar (IVA e impuesto de hospedaje, no son exclusivos de la reserva directa).',
      },
      {
        q: '¿Cuánto depósito se requiere para reservar una casa en Sayulita?',
        a: 'La política estándar para la mayoría de propiedades es:\n• 50% del total al momento de la reserva para asegurar fechas\n• 50% del saldo restante 30 días antes de la llegada\nSi reservas menos de 30 días antes de la llegada, el 100% se cobra al confirmar. Algunas propiedades premium o reservas en temporada alta (Navidad, Semana Santa) pueden requerir el 100% por adelantado.',
      },
      {
        q: '¿Las casas en renta en Sayulita permiten mascotas?',
        a: 'Muchas sí. Usa el filtro "Pet Friendly" en el sidebar para mostrar solo propiedades que aceptan mascotas. La mayoría de los dueños que permiten mascotas piden un depósito reembolsable pequeño (típicamente equivalente a una noche) que se devuelve al checkout si no hay daños. Si viajas con una raza grande o múltiples mascotas, contacta al dueño primero.',
      },
      {
        q: '¿Hay rentas mensuales disponibles en Sayulita?',
        a: 'Sí, las estancias mensuales están creciendo rápidamente. Las tarifas mensuales son significativamente más bajas que las tarifas diarias multiplicadas por 30 (ahorros típicos del 30% al 45%). Incluyen WiFi de fibra óptica, cocinas completas y más flexibilidad de check-in/check-out. La mejor temporada para precios bajos y alta disponibilidad es de mayo a octubre.',
      },
      {
        q: '¿Cuándo debo reservar mi casa para temporada alta?',
        a: 'Depende de las fechas:\n• 20 Dic a 5 Ene y Semana Santa: reserva con 3 a 4 meses de anticipación mínimo (las mejores villas frente al mar se reservan desde agosto).\n• Feb a Abr (Spring Break): 6 a 10 semanas antes es razonable.\n• May a Oct (Temporada Baja): 2 a 4 semanas generalmente es suficiente. Muchas opciones y los precios más bajos.',
      },
      {
        q: '¿Las casas incluyen WiFi y aire acondicionado?',
        a: 'Sí, la gran mayoría sí. Verificamos ambos antes de publicar. Especificamos velocidades de fibra óptica en listados donde los dueños lo midieron. Para trabajo remoto, pregunta directamente al dueño antes de reservar. El A/C siempre está en las recámaras como mínimo; las propiedades de gama media-alta lo tienen en áreas comunes también.',
      },
      {
        q: '¿Es seguro pagar por una casa en renta en Sayulita en línea?',
        a: 'Sí — Sayulita Travel no cobra a los clientes por renta, no recibe comisiones, ni honorarios por referencia u otra compensación de los Proveedores de Servicios listados en la Plataforma, somos únicamente una plataforma intermediaria que conecta a los Usuarios con propietarios de inmuebles, proveedores de experiencias y negocios locales. El dueño fija el precio. Tú pagas el precio directo al dueño. Nosotros no agregamos nada adicional.',
      },
    ],
  },
};

/* Base house data (language-independent) */
const baseHouses = [
  { id: 1, image: villaEmma.src, price: 600, rating: 4.9, type: 'beachfront', zone: 'beach', badgeType: 'beachfront', amenities: ['beachfront', 'pool', 'ac'] },
  { id: 2, image: villaRosetta.src, price: 495, rating: 4.8, type: 'boutique', zone: 'north', badgeType: 'popular', amenities: ['pool', 'ac', 'petfriendly'] },
  { id: 3, image: hotelBeachfront.src, price: 115, rating: 4.7, type: 'beachfront', zone: 'beach', badgeType: 'boutique', amenities: ['beachfront', 'pool', 'ac', 'restaurant'] },
  { id: 4, image: casaAmigos.src, price: 750, rating: 5.0, type: 'pool', zone: 'center', badgeType: 'jungle-view', amenities: ['pool', 'ac', 'petfriendly'] },
  { id: 5, image: hotelAmor.src, price: 480, rating: 4.9, type: 'beachfront', zone: 'beach', badgeType: 'beachfront', amenities: ['beachfront', 'pool', 'ac'] },
  { id: 6, image: hotelSayulinda.src, price: 320, rating: 4.8, type: 'boutique', zone: 'north', badgeType: 'popular', amenities: ['pool', 'ac'] },
  { id: 7, image: hotelPool.src, price: 850, rating: 4.9, type: 'pool', zone: 'north', badgeType: 'jungle-view', amenities: ['pool', 'ac', 'petfriendly'] },
  { id: 8, image: hostelBudget.src, price: 180, rating: 4.6, type: 'budget', zone: 'center', badgeType: 'jungle-view', amenities: ['ac', 'petfriendly'] },
];

const houseTypeImages = {
  beachfront: hotelBeachfront.src,
  pool: hotelPool.src,
  family: hotelBoutique.src,
  group: hostelBudget.src,
};

const houseTypeIcons = {
  beachfront: <MdBeachAccess size={28} />,
  pool: <MdPool size={28} />,
  family: <BsHouseDoor size={28} />,
  group: <IoBedOutline size={28} />,
};

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */

export default function HousesPage({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;

  const allHouses = useMemo(() =>
    baseHouses.map((base) => {
      const langData = t.houses.find((h) => h.id === base.id) || {};
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

  /* Search state */
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bedrooms, setBedrooms] = useState('');
  const [propertyType, setPropertyType] = useState('');

  /* Filters */
  const [amenities, setAmenities] = useState({
    pool: false,
    beachfront: true,
    ac: false,
    petfriendly: false,
  });
  const [priceRange, setPriceRange] = useState([100, 2500]);
  const [sortBy, setSortBy] = useState('rating');

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  /* Favorites */
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

  const filteredHouses = useMemo(() => {
    let list = [...allHouses];
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
    if (propertyType) {
      list = list.filter((h) => h.type === propertyType);
    }
    if (bedrooms) {
      const bCount = parseInt(bedrooms, 10);
      list = list.filter((h) => {
        const hBeds = parseInt(h.rooms.split(' ')[0], 10);
        return hBeds >= bCount;
      });
    }
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [amenities, priceRange, sortBy, propertyType, bedrooms, allHouses]);

  const totalPages = Math.max(1, Math.ceil(filteredHouses.length / perPage));
  const paginatedHouses = filteredHouses.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div className="houses-page">
      {/* ═══ HERO ═══ */}
      <section className="hop-hero section" id="houses-hero">
        <FloatingPalms />
        <div className="hop-hero__bg">
          <img
        src={heroBg.src}
        alt="Sayulita Houses"
        className="hop-hero__bg-img"
        width={1376}
        height={768}
        fetchPriority="high"
      />
          <div className="hop-hero__overlay" />
        </div>
        <div className="container">
          <motion.div
            className="hop-hero__content"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hop-hero__label">{t.hero.label}</span>
            <h1 className="hop-hero__title">
              {t.hero.title}{' '}
              <span className="hop-hero__accent">{t.hero.accent}</span>
            </h1>
            <p className="hop-hero__subtitle">
              {t.hero.subtitle1}<br />
              {t.hero.subtitle2}
            </p>
            <div className="hop-hero__trust">
              <FiShield size={18} />
              <span>{t.hero.trust}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ BUSCADOR ═══ */}
      <section className="hop-search section" id="houses-search">
        <FloatingPalms />
        <div className="container">
          <SectionHeader title={t.search.sectionTitle} />
          <motion.div
            className="hop-search__bar"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="hop-search__field hop-search__field--dates">
              <div className="hop-search__icon"><FiCalendar size={18} /></div>
              <div className="hop-search__date-range">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart startDate={startDate} endDate={endDate}
                  placeholderText={t.search.arrive}
                  dateFormat="dd MMM" minDate={new Date()} id="hop-search-arrive"
                />
                <span className="hop-search__date-sep">–</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd startDate={startDate} endDate={endDate}
                  minDate={startDate || new Date()}
                  placeholderText={t.search.depart}
                  dateFormat="dd MMM" id="hop-search-depart"
                />
              </div>
            </div>
            <div className="hop-search__divider" />
            <div className="hop-search__field">
              <div className="hop-search__icon"><IoBedOutline size={18} /></div>
              <select
                className="hop-search__select"
                value={bedrooms}
                onChange={(e) => { setBedrooms(e.target.value); setCurrentPage(1); }}
                id="hop-search-beds"
                aria-label={t.search.bedroomsLabel}
              >
                <option value="">{t.search.bedroomsLabel}</option>
                {t.search.bedrooms.map((label, idx) => (
                  <option key={idx} value={idx + 1}>{label}</option>
                ))}
              </select>
            </div>
            <div className="hop-search__divider" />
            <div className="hop-search__field">
              <div className="hop-search__icon"><BsHouseDoor size={18} /></div>
              <select
                className="hop-search__select"
                value={propertyType}
                onChange={(e) => { setPropertyType(e.target.value); setCurrentPage(1); }}
                id="hop-search-type"
                aria-label={t.search.typeLabel}
              >
                <option value="">{t.search.typeLabel}</option>
                <option value="beachfront">{t.search.typeBeachfront}</option>
                <option value="pool">{t.search.typePool}</option>
                <option value="boutique">{t.search.typeBoutique}</option>
                <option value="budget">{t.search.typeBudget}</option>
              </select>
            </div>
            <button
              className="hop-search__btn"
              id="hop-search-submit"
              onClick={() => { document.getElementById('houses-featured')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <FiSearch size={18} /> <span>{t.search.btnSearch}</span>
            </button>
          </motion.div>
          <div className="hop-search__tags">
            <span className="hop-search__tags-label">{t.search.tagsLabel}</span>
            {t.search.tags.map((tag, idx) => (
              <button
                key={idx}
                className="hop-search__tag"
                onClick={() => {
                  if (tag.type === 'family' || tag.type === 'group') {
                    setBedrooms(tag.type === 'family' ? '3' : '5');
                  } else {
                    setPropertyType(tag.type);
                  }
                  setCurrentPage(1);
                  document.getElementById('houses-featured')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIPOS DE PROPIEDAD ═══ */}
      <section className="hop-types section" id="houses-types">
        <FloatingPalms />
        <div className="container">
          <SectionHeader label={t.types.label} title={t.types.title} subtitle={t.types.subtitle} />
          <div className="hop-types__grid">
            {t.houseTypes.map((ht, i) => (
              <motion.div
                key={ht.key} className="hop-type-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                id={`house-type-${ht.key}`}
              >
                <div className="hop-type-card__image-wrap">
                  <img src={houseTypeImages[ht.key]} alt={ht.title} className="hop-type-card__image" />
                  <div className="hop-type-card__image-overlay" />
                  <div className="hop-type-card__icon">{houseTypeIcons[ht.key]}</div>
                </div>
                <div className="hop-type-card__body">
                  <h3 className="hop-type-card__title">{ht.title}</h3>
                  <p className="hop-type-card__subtitle">{ht.subtitle}</p>
                  <p className="hop-type-card__desc">{ht.desc}</p>
                  <ul className="hop-type-card__bullets">
                    {ht.bullets.map((b, bi) => (<li key={bi}><FiCheck size={14} /> {b}</li>))}
                  </ul>
                  <div className="hop-type-card__footer">
                    <span className="hop-type-card__price">{ht.price}</span>
                    <span className="hop-type-card__ideal">
                      <strong>{t.types.idealLabel}</strong> {ht.ideal}
                    </span>
                  </div>
                  <button
                    className="hop-type-card__cta"
                    onClick={() => {
                      setPropertyType(ht.key);
                      setCurrentPage(1);
                      document.getElementById('houses-featured')?.scrollIntoView({ behavior: 'smooth' });
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

      {/* ═══ POR QUÉ RENTAR AQUÍ ═══ */}
      <section className="hop-why section" id="houses-why-book">
        <FloatingPalms />
        <div className="container">
          <div className="hop-why__intro">
            <span className="hop-hero__label">{t.why.introLabel}</span>
            <h2 className="hop-why__intro-title">{t.why.introTitle}</h2>
            <p className="hop-why__intro-p">{t.why.introText}</p>
          </div>
          <div className="hop-why__table">
            <h3 className="hop-why__table-title">{t.why.tableTitle}</h3>
            <div className="hop-why__table-grid">
              {t.why.tableHeaders.map((h, i) => (
                <span key={i} className="hop-why__table-header">{h}</span>
              ))}
            </div>
            {t.why.tableRows.map((row, ri) => (
              <div key={ri} className={`hop-why__table-row ${ri === 1 ? 'hop-why__table-row--highlight' : ''} ${ri === 2 ? 'hop-why__table-row--total' : ''}`}>
                {row.map((cell, ci) => (<span key={ci}>{cell}</span>))}
              </div>
            ))}
            <p className="hop-why__table-note">{t.why.tableNote}</p>
          </div>
          <div className="hop-why__grid">
            {t.why.cards.map((card, ci) => (
              <motion.div
                key={ci} className="hop-why__card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.45 }}
              >
                <div className="hop-why__card-icon">{getWhyIcon(card.icon)}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GRID DE TARJETAS ═══ */}
      <section className="hop-featured section" id="houses-featured">
        <FloatingPalms />
        <div className="container">
          <div className="hop-featured__header">
            <div><h2 className="hop-featured__title">{t.featured.title}</h2></div>
            <div className="hop-featured__sort">
              <label htmlFor="hop-sort">{t.featured.sortLabel}</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} id="hop-sort">
                <option value="rating">{t.featured.sortRating}</option>
                <option value="price-asc">{t.featured.sortPriceAsc}</option>
                <option value="price-desc">{t.featured.sortPriceDesc}</option>
              </select>
            </div>
          </div>
          <div className="hop-featured__layout">
            {/* Sidebar */}
            <aside className="hop-sidebar" id="houses-sidebar">
              <h3 className="hop-sidebar__title">{t.featured.filtersTitle}</h3>
              <div className="hop-sidebar__group">
                <h4 className="hop-sidebar__label">{t.featured.amenitiesLabel}</h4>
                {[
                  { key: 'pool', label: 'Infinity Pool', icon: <MdPool size={16} /> },
                  { key: 'beachfront', label: 'Beachfront', icon: <MdBeachAccess size={16} /> },
                  { key: 'ac', label: 'Air Conditioning', icon: <MdAcUnit size={16} /> },
                  { key: 'petfriendly', label: 'Pet Friendly', icon: <MdPets size={16} /> },
                ].map((a) => (
                  <label key={a.key} className={`hop-sidebar__check ${amenities[a.key] ? 'hop-sidebar__check--active' : ''}`}>
                    <input type="checkbox" checked={amenities[a.key]} onChange={() => toggleAmenity(a.key)} />
                    <span className="hop-sidebar__checkmark">{amenities[a.key] && <FiCheck size={12} />}</span>
                    {a.icon} {a.label}
                  </label>
                ))}
              </div>
              <div className="hop-sidebar__group">
                <h4 className="hop-sidebar__label">{t.featured.priceLabel}</h4>
                <div className="hop-sidebar__range-labels">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
                <input
                  type="range" min="100" max="2500" step="100"
                  value={priceRange[1]}
                  onChange={(e) => { setPriceRange([100, Number(e.target.value)]); setCurrentPage(1); }}
                  className="hop-sidebar__slider" id="hop-price-slider"
                />
              </div>
              <div className="hop-sidebar__trust">
                <div className="hop-sidebar__trust-badge">
                  <FiShield className="hop-sidebar__trust-icon" />
                  <strong>Verified Direct</strong>
                </div>
                <p>{t.featured.trustText}</p>
              </div>
            </aside>

            {/* Grid */}
            <div className="hop-grid">
              {paginatedHouses.length === 0 ? (
                <div className="hop-grid__empty"><p>{t.featured.emptyText}</p></div>
              ) : (
                <div className="hop-grid__cards">
                  {paginatedHouses.map((house, i) => (
                    <motion.article
                      key={house.id} className="hop-card"
                      custom={i} initial="hidden" whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      variants={cardVariants} whileHover={{ y: -6 }}
                      id={`hop-card-${house.id}`}
                    >
                      <div className="hop-card__image-wrap">
                        <img src={house.image} alt={house.name} className="hop-card__image" />
                        <div className="hop-card__image-overlay" />
                        <span className={`hop-card__badge hop-card__badge--${house.badgeType}`}>
                          {getBadgeIcon(house.badgeType)} {house.badge}
                        </span>
                        <button
                          className={`hop-card__fav ${favorites.includes(house.id) ? 'hop-card__fav--active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleFav(house.id); }}
                          aria-label="Toggle Favorite"
                        >
                          <FiHeart size={16} />
                        </button>
                      </div>
                      <div className="hop-card__body">
                        <div className="hop-card__header">
                          <h3 className="hop-card__name">{house.name}</h3>
                          <div className="hop-card__rating"><FiStar size={14} /> <span>{house.rating}</span></div>
                        </div>
                        <div className="hop-card__meta">
                          <span className="hop-card__meta-item"><IoBedOutline size={14} /> {house.rooms}</span>
                          {house.features && house.features.map((f, fIdx) => (
                            <span key={fIdx} className="hop-card__meta-item hop-card__meta-item--dot">
                              <FiCheck size={12} style={{ color: 'var(--color-primary)' }} /> {f}
                            </span>
                          ))}
                        </div>
                        <div className="hop-card__footer">
                          <div className="hop-card__price">
                            <span className="hop-card__price-label">{t.featured.priceFrom}</span>
                            <span className="hop-card__price-amount">${house.price}<span> {t.featured.pricePerNight}</span></span>
                          </div>
                          <button className="hop-card__cta" id={`view-house-${house.id}`}>{t.featured.viewDetail}</button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
              {totalPages > 1 && (
                <div className="hop-pagination">
                  <button className="hop-pagination__btn" disabled={currentPage === 1}
                    onClick={() => { setCurrentPage((p) => p - 1); document.getElementById('houses-featured')?.scrollIntoView({ behavior: 'smooth' }); }}>
                    <FiChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i + 1}
                      className={`hop-pagination__num ${currentPage === i + 1 ? 'hop-pagination__num--active' : ''}`}
                      onClick={() => { setCurrentPage(i + 1); document.getElementById('houses-featured')?.scrollIntoView({ behavior: 'smooth' }); }}>
                      {i + 1}
                    </button>
                  ))}
                  <button className="hop-pagination__btn" disabled={currentPage === totalPages}
                    onClick={() => { setCurrentPage((p) => p + 1); document.getElementById('houses-featured')?.scrollIntoView({ behavior: 'smooth' }); }}>
                    <FiChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="hop-featured__cta">
            <Button variant="outline" size="lg" icon={<FiArrowRight />}
              onClick={() => {
                setAmenities({ pool: false, beachfront: false, ac: false, petfriendly: false });
                setPriceRange([100, 2500]); setPropertyType(''); setBedrooms(''); setCurrentPage(1);
              }}
            >
              {t.featured.viewAll}
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ GUÍA DE PRECIOS ═══ */}
      <section className="hop-why section" id="houses-pricing-guide">
        <FloatingPalms />
        <div className="container">
          <SectionHeader label={t.pricing.label} title={t.pricing.title} subtitle={t.pricing.subtitle} />
          <div className="hop-why__grid">
            {t.pricing.cards.map((card, ci) => (
              <div key={ci} className="hop-why__card">
                <h3>{card.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: card.text.replace(/\n/g, '<br />') }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUÉ INCLUYE ═══ */}
      <section className="hop-included section" id="houses-included">
        <FloatingPalms />
        <div className="container">
          <SectionHeader label={t.included.label} title={t.included.title} subtitle={t.included.subtitle} />
          <div className="hop-included__grid">
            <div className="hop-included__card">
              <h3 className="hop-included__card-title">
                <FiCheck size={20} style={{ color: 'var(--color-tertiary)' }} />
                {t.included.standardTitle}
              </h3>
              <div className="hop-included__list">
                {t.included.standard.map((item, ii) => (
                  <div key={ii} className="hop-included__item hop-included__item--yes">
                    <FiCheck size={16} />
                    <div className="hop-included__item-content">
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hop-included__card">
              <h3 className="hop-included__card-title">
                <FiPlus size={20} style={{ color: 'var(--color-primary)' }} />
                {t.included.optionalTitle}
              </h3>
              <div className="hop-included__list">
                {t.included.optional.map((item, ii) => (
                  <div key={ii} className="hop-included__item">
                    <FiArrowRight size={16} style={{ color: 'var(--color-primary)' }} />
                    <div className="hop-included__item-content">
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GUÍA DE VECINDARIOS ═══ */}
      <section className="hop-zones section" id="houses-zones">
        <FloatingPalms />
        <div className="container">
          <SectionHeader label={t.zonesHeader.label} title={t.zonesHeader.title} subtitle={t.zonesHeader.subtitle} />
          <div className="hop-zones__grid">
            {t.zones.map((z, i) => (
              <motion.div key={z.key} className="hop-zone-card"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.45 }}
                id={`zone-${z.key}`}>
                <div className="hop-zone-card__icon">{z.icon}</div>
                <h3 className="hop-zone-card__title">{z.title}</h3>
                <p className="hop-zone-card__subtitle">{z.subtitle}</p>
                <div className="hop-zone-card__detail">
                  <div className="hop-zone-card__pro"><strong>{t.zonesHeader.prosLabel}</strong> {z.pros}</div>
                  <div className="hop-zone-card__con"><strong>{t.zonesHeader.consLabel}</strong> {z.cons}</div>
                  <div className="hop-zone-card__ideal"><strong>{t.zonesHeader.idealLabel}</strong> {z.ideal}</div>
                </div>
                <button className="hop-zone-card__cta" onClick={() => {
                  setPropertyType(z.key === 'beach' ? 'beachfront' : '');
                  setCurrentPage(1);
                  document.getElementById('houses-featured')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  {t.zonesHeader.cta} <FiArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="hop-reviews section" id="houses-reviews">
        <FloatingPalms />
        <div className="container">
          <SectionHeader label={t.reviewsHeader.label} title={t.reviewsHeader.title} subtitle={t.reviewsHeader.subtitle} />
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24} slidesPerView={1} navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              className="hop-reviews__swiper"
            >
              {t.reviews.map((r, i) => (
                <SwiperSlide key={i}>
                  <div className="hop-review-card" id={`hop-review-${i}`}>
                    <div className="hop-review-card__stars">
                      {Array.from({ length: r.rating }).map((_, si) => (
                        <FiStar key={si} className="hop-review-card__star" />
                      ))}
                    </div>
                    <blockquote className="hop-review-card__quote">"{r.quote}"</blockquote>
                    <div className="hop-review-card__author">
                      <div className="hop-review-card__avatar">{r.name.charAt(0)}</div>
                      <div className="hop-review-card__info">
                        <span className="hop-review-card__name">{r.name}</span>
                        <span className="hop-review-card__detail">{r.location} · {r.property} · {r.date}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* ═══ CÓMO RESERVAR ═══ */}
      <section className="hop-booking section" id="houses-booking-steps">
        <FloatingPalms />
        <div className="container">
          <SectionHeader label={t.booking.label} title={t.booking.title} subtitle={t.booking.subtitle} />
          <div className="hop-booking__grid">
            {t.booking.steps.map((step, si) => (
              <div key={si} className="hop-booking-card">
                <span className="hop-booking-card__step">{step.step}</span>
                <h3 className="hop-booking-card__title">{step.title}</h3>
                <p className="hop-booking-card__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="hop-faq section" id="houses-faq">
        <FloatingPalms />
        <div className="container">
          <SectionHeader title={t.faq.title} subtitle={t.faq.subtitle} />
          <div className="hop-faq__list">
            {t.faqs.map((faq, i) => (
              <motion.div key={i}
                className={`hop-faq__item ${openFaq === i ? 'hop-faq__item--open' : ''}`}
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}
                id={`hop-faq-${i}`}>
                <button className="hop-faq__question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                  <span>{faq.q}</span>
                  <span className="hop-faq__icon">{openFaq === i ? <FiMinus /> : <FiPlus />}</span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div className="hop-faq__answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}>
                      <p className="hop-faq__answer-text">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPLORA MÁS ═══ */}
      <section className="hop-explore section" id="houses-explore">
        <FloatingPalms />
        <div className="container">
          <SectionHeader label={t.explore.label} title={t.explore.title} subtitle={t.explore.subtitle} />
          <div className="hop-explore__grid">
            {t.explore.links.map((item) => (
              <a key={item.label} href={item.href} className="hop-explore__link"
                {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                id={`explore-${item.label.toLowerCase().replace(/\s/g, '-')}`}>
                <span className="hop-explore__link-icon">{item.icon}</span>
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                </div>
                <FiArrowRight size={16} />
              </a>
            ))}
          </div>
          <p className="hop-explore__count">{t.explore.count}</p>
        </div>
      </section>
    </div>
  );
}
