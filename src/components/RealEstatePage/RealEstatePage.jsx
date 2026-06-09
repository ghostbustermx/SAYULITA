import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  FiSearch, FiStar, FiHeart, FiPlus, FiMinus,
  FiArrowRight, FiCheck,
  FiShield, FiDollarSign, FiMessageCircle, FiHome,
  FiMapPin, FiTrendingUp, FiUsers,
  FiSun, FiCamera, FiCalendar
} from 'react-icons/fi';
import { MdPool, MdBeachAccess, MdAcUnit, MdPets, MdOutlineLocationOn } from 'react-icons/md';
import { IoBedOutline } from 'react-icons/io5';
import { BiBuildings, BiLandscape, BiWater } from 'react-icons/bi';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import heroBg from '../../assets/real_state.png';
import FloatingPalms from '../FloatingPalms/FloatingPalms';
import './RealEstatePage.css';

const i18n = {
  ENG: {
    meta: {
      title: 'Houses for Sale in Sayulita, Nayarit — 170+ Verified Properties | SayulitaTravel',
      description: 'Houses, villas, condos and land for sale in Sayulita, Nayarit. Direct contact with seller, price guide, foreign buyer process and fideicomiso explained. Local team since 2000.'
    },
    hero: {
      label: 'Real Estate',
      title: 'Houses for Sale in Sayulita — ',
      accent: '170+ Verified Properties',
      subtitle1: 'Direct contact with the seller or their agent.',
      subtitle2: 'Houses, villas, condos, land and investment properties with active vacation rental income.',
      trust: 'Local team since 2000 — we live here'
    },
    search: {
      sectionTitle: 'Search Properties for Sale in Sayulita',
      type: 'Property Type',
      typeAll: 'All Types',
      typeHouse: 'Houses',
      typeVilla: 'Villas & Luxury',
      typeCondo: 'Condos',
      typeLand: 'Land',
      typeInvestment: 'Investment',
      priceMin: 'Min Price (USD)',
      priceMax: 'Max Price (USD)',
      zone: 'Zone',
      zoneAll: 'All Zones',
      zoneCenter: 'Town Center',
      zoneNorth: 'Gringo Hill / North',
      zoneSouth: 'South Zone',
      zoneGated: 'Gated Communities',
      bedrooms: 'Bedrooms',
      bedAny: 'Any',
      btnSearch: 'Search',
      popularLabel: 'Popular searches:',
      tags: ['Oceanfront', 'Ocean View', 'With Pool', 'Gringo Hill', 'Gated Community', 'Active Rental Income']
    },
    types: {
      label: 'Property Types',
      title: 'Properties for Sale in Sayulita by Type',
      subtitle: 'Sayulita\'s real estate market looks like nowhere else in Mexico. Choose the property type that fits your goal.',
      cta: 'View all listings',
      categories: [
        {
          id: 'houses',
          icon: '<FiHome />',
          title: 'Residential & Family Homes',
          badge: 'Most Searched',
          paragraphs: [
            'Single-family homes are the most sought-after and most representative product in Sayulita\'s market. Architecture blends contemporary design with local materials — wood, volcanic stone, palapa terraces — in properties built for living well, not stacking square meters.',
            'What you\'ll find in this category:'
          ],
          bullets: [
            '2 to 5-bedroom homes in established residential zones',
            'Properties with garden, terrace or outdoor patio',
            'Locations in the center, Gringo Hill, south zone and outskirts',
            'Various construction conditions: turnkey, fixer-upper, and new builds'
          ],
          forWhom: 'Second vacation home, primary residence for those relocating, family base for extended visits, investment with vacation rental potential.'
        },
        {
          id: 'villas',
          icon: '<BiWater />',
          title: 'Luxury Villas & Oceanfront Properties',
          badge: 'Limited Inventory',
          paragraphs: [
            'Oceanfront properties in Sayulita are scarce by design, not by lack of demand. The municipality actively protects its coastline — no massive construction or 200-room beach hotels. What that means for buyers: oceanfront villas are non-replenishing inventory. Those who buy today own something that won\'t be available tomorrow.',
            'What defines the luxury segment in Sayulita:'
          ],
          bullets: [
            'Direct beach access or panoramic Pacific views from master bedrooms',
            'Architect-designed: not standardized resort luxury, but properties with their own identity',
            'Sizes from 200 m² to over 1,000 m² of construction',
            'Vacation rental income between $80k–$150k USD/year for well-managed properties',
            'Buyer waiting lists for the most coveted locations'
          ],
          forWhom: 'High-ticket investor seeking sustained appreciation, buyer wanting the best second-home experience in Mexico, group buyers splitting the cost of a premium villa.'
        },
        {
          id: 'condos',
          icon: '<BiBuildings />',
          title: 'Condos & Apartments for Sale',
          badge: 'Best Entry Price',
          paragraphs: [
            'Sayulita\'s condo supply has grown in recent years with developments that respect the town\'s architecture — none of the massive, anonymous buildings that ruin other Mexican beach destinations.',
            'What makes this category attractive for investors:'
          ],
          bullets: [
            'Lower entry price than single-family homes — from $150,000 USD',
            'Less individual maintenance: common areas are the condo\'s responsibility',
            'Pool, gym and common amenities included in newer developments',
            'High vacation rental occupancy — well-located condos exceed 70% in high season',
            'Higher resale liquidity than a luxury villa'
          ],
          forWhom: 'Investor entering Sayulita\'s market with lower initial capital, buyer who won\'t reside full-time and wants delegated maintenance, those seeking simplified rental management.'
        },
        {
          id: 'land',
          icon: '<BiLandscape />',
          title: 'Land for Sale in Sayulita',
          badge: 'Build to Suit',
          paragraphs: [
            'Buying land in Sayulita is betting on the purest scarcity in the market: buildable soil is finite, and municipal regulations prevent that equation from changing.',
            'What the land market in Sayulita offers today:'
          ],
          bullets: [
            'Lots in Gringo Hill and north zone with ocean views from $200,000 USD',
            'Parcels in the south zone and outskirts at better entry prices with appreciation potential',
            'Lots within private developments (services and infrastructure included)',
            'No design restrictions within municipal parameters'
          ],
          forWhom: 'Buyer who wants to build to their exact specifications, local developer with a specific project, long-term investor betting on land appreciation.'
        },
        {
          id: 'investment',
          icon: '<FiTrendingUp />',
          title: 'Investment Properties with Active Rental Income',
          badge: 'Exclusive Data',
          paragraphs: [
            'This is the category that only SayulitaTravel can offer — and it\'s why many investors choose us over any other channel.',
            'We\'ve been managing vacation rentals in Sayulita for over 20 years. We have real occupancy data, income history and seasonal behavior for hundreds of properties in the local market. When one of these properties goes on sale, the buyer doesn\'t just see photos and price — they see actual performance.',
            'What an investment listing on SayulitaTravel includes:'
          ],
          bullets: [
            'Verified vacation rental income history (last 12–24 months)',
            'Real occupancy rate by season — not theoretical projections',
            'Annual income estimate based on Sayulita market behavior',
            'Information about local management team if buyer won\'t reside here',
            'Comparison with similar properties in the active platform inventory'
          ],
          forWhom: 'Data-driven investor who wants verified numbers, buyer looking for income-generating property from day one.'
        }
      ]
    },
    pricing: {
      label: 'Price Guide',
      title: 'How Much Does a House in Sayulita Cost?',
      subtitle: 'Honest breakdown by segment — from entry-level condos to premium oceanfront villas.',
      segments: [
        {
          range: '$150k – $400k USD',
          sub: 'Entry Level',
          featured: false,
          items: [
            '1-bedroom condos in new developments: 50–90 m², modern finishes, shared amenities',
            'Small homes in south zone or outskirts: 2 bedrooms, garden, 10–20 min walk to beach',
            'Land in non-prime locations: south zone, lots within developments with services',
            'Fixer-upper homes in the center: value-add opportunities'
          ],
          yield: 'Well-located condos generate $20k–$45k USD/year — enough to cover costs and return positive net.',
          profile: 'First-time market entrant, buyer wanting Sayulita presence without full capital commitment, portfolio diversifier.'
        },
        {
          range: '$400k – $900k USD',
          sub: 'Mid-Range',
          featured: true,
          items: [
            '2–4 bedroom homes in Gringo Hill, north zone or center: good views, private pool common',
            'Premium condos in Selva Maaku, Pájaro de Fuego: 2–3 bedrooms, high-end finishes',
            'Homes with active vacation rental history: income-ready properties',
            'Entry-level oceanfront houses: rare availability, high demand, move fast'
          ],
          yield: '$45k–$90k USD/year in well-managed properties with 65%–75% occupancy.',
          profile: 'Family seeking second home in Mexico, investor wanting stable yield and capital growth, expat planning partial retirement in 5–10 years.'
        },
        {
          range: '$900k – $3M+ USD',
          sub: 'Premium',
          featured: false,
          items: [
            'Oceanfront or first-row beach properties: direct beach access or Pacific views from master bedrooms',
            'Architect-designed villas with infinity pools, open courtyards, chef kitchens',
            'Capacity for 8–20 guests: en-suite bedrooms, multiple living areas, outdoor space',
            'Rental income justifying the investment: $100k–$200k USD/year for top villas'
          ],
          yield: 'Top Sayulita villas generate $100k–$200k USD/year in rental income. Shared ownership makes numbers work even at these prices.',
          profile: 'High-ticket investor seeking luxury asset with yield, group buyers splitting cost and use, buyer wanting the best Sayulita has to offer.'
        }
      ]
    },
    why: {
      label: 'Why Invest',
      title: 'Why Buy Property in Sayulita in 2026?',
      subtitle: 'Four concrete reasons — no brochure fluff.',
      cards: [
        {
          icon: 'trending',
          title: 'Sustained Appreciation',
          desc: 'Sayulita\'s real estate has recorded 8%–12% annual appreciation for the past decade. Tourism demand grows yearly, buildable land is finite, and proximity to Puerto Vallarta airport keeps the market liquid.'
        },
        {
          icon: 'dollar',
          title: 'Vacation Rental Income',
          desc: 'Well-managed properties see 65%–85% annual occupancy. Condos: $20k–$45k/yr. Houses: $50k–$90k/yr. Villas: $100k–$200k/yr. These are real figures from our platform\'s 20-year booking history.'
        },
        {
          icon: 'users',
          title: 'Established Expat Community',
          desc: 'Over 20 years of foreign property owners means bilingual lawyers, experienced rental managers, trusted builders, and a network of past buyers who share their experience.'
        },
        {
          icon: 'shield',
          title: 'Protected from Mass Tourism',
          desc: 'Height restrictions, density limits, and community advocacy ensure Sayulita won\'t become Cancún. The town you fell in love with will still be recognizable in ten years.'
        }
      ]
    },
    featured: {
      title: 'Featured Properties for Sale This Week',
      sortLabel: 'Sort by:',
      sortRating: 'Top Rated',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      filtersTitle: 'Filters',
      zoneLabel: 'Zone',
      typeLabel: 'Type',
      priceLabel: 'Price',
      trustText: 'All properties verified by our local team.',
      emptyText: 'No properties match your filters. Try adjusting your criteria.',
      priceFrom: 'From',
      pricePerNight: '',
      viewDetail: 'View Details',
      viewAll: 'View all 170+ properties for sale',
      properties: [
        { id: 1, price: 895000, rating: 4.9, beds: 4, zone: 'north', type: 'house', badgeType: 'premium', sqm: 320, features: ['Pool', 'Ocean View', 'Garden'] },
        { id: 2, price: 425000, rating: 4.8, beds: 3, zone: 'center', type: 'house', badgeType: 'beachfront', sqm: 185, features: ['Beachfront', 'Terrace'] },
        { id: 3, price: 280000, rating: 4.7, beds: 2, zone: 'gated', type: 'condo', badgeType: 'investment', sqm: 90, features: ['Pool', 'Gym', 'Parking'] },
        { id: 4, price: 1500000, rating: 5.0, beds: 6, zone: 'north', type: 'villa', badgeType: 'premium', sqm: 600, features: ['Oceanfront', 'Pool', 'Infinity', 'Staff'] },
        { id: 5, price: 350000, rating: 4.6, beds: 2, zone: 'south', type: 'house', badgeType: null, sqm: 150, features: ['Garden', 'Parking'] },
        { id: 6, price: 220000, rating: 4.5, beds: 1, zone: 'gated', type: 'condo', badgeType: 'investment', sqm: 65, features: ['Pool', 'Furnished'] },
        { id: 7, price: 675000, rating: 4.9, beds: 3, zone: 'north', type: 'house', badgeType: 'premium', sqm: 250, features: ['Pool', 'Ocean View', 'AC'] },
        { id: 8, price: 195000, rating: 4.4, beds: 0, zone: 'south', type: 'land', badgeType: null, sqm: 400, features: ['Ocean View', 'Build Ready'] }
      ]
    },
    zones: {
      label: 'Location Guide',
      title: 'Where to Buy in Sayulita',
      subtitle: 'The zone matters differently for buyers than for tourists. Understand which zone maximizes your specific goal: rental income, residence, appreciation or peace.',
      cta: 'View properties in this zone',
      zonesList: [
        {
          id: 'center',
          title: 'Town Center — Maximum Rental Occupancy',
          pros: 'Highest occupancy rates in the market. Tourists want to be in the heart of Sayulita and will pay a premium for it. Highest resale liquidity.',
          cons: 'In high season, noise and movement are constant past midnight. For permanent or long-stay residents, north or south zones can be more comfortable.',
          ideal: 'Maximize vacation rental income'
        },
        {
          id: 'north',
          title: 'Gringo Hill & North Zone — Views, Privacy & Established Expat Community',
          pros: 'Panoramic bay views from most properties. Quieter, more residential atmosphere. The best views in Sayulita are here. Strongest resale demand in the market.',
          cons: 'Distance to the center means uphill walk back. Many properties include a golf cart or have parking.',
          ideal: 'Quality residence, long-term investment with solid appreciation, high-experience second home'
        },
        {
          id: 'south',
          title: 'South Zone & Outskirts — Best Entry Price, Highest Appreciation Potential',
          pros: 'Best entry price, more space for the same budget, quieter and more local atmosphere.',
          cons: '10–20 minute walk to beach and center. Lower vacation occupancy than central zones.',
          ideal: 'Market entry with limited capital, long-term appreciation-oriented investment'
        },
        {
          id: 'gated',
          title: 'Private Developments & Gated Communities',
          pros: 'Perimeter security, high-quality pools and common areas, maintained infrastructure, private parking. Lowest operational friction for non-resident buyers.',
          cons: 'Less integrated with the town — you buy in Sayulita but don\'t quite live in Sayulita. HOA fees are a fixed cost to consider.',
          ideal: 'Non-resident investor wanting simplified management, buyer prioritizing security and amenities'
        }
      ]
    },
    buyerGuide: {
      label: 'Foreign Buyer Guide',
      title: 'Can Foreigners Buy Property in Sayulita?',
      subtitle: 'The question that blocks most buying decisions — and the one that\'s easiest to resolve when someone explains it clearly.',
      intro: 'The short answer: yes, foreigners can buy in Sayulita. With the right legal structure, you have the same rights as any property owner. The key is understanding how that structure works.',
      cards: [
        {
          title: 'Why the Fideicomiso Exists',
          content: 'Mexico\'s Constitution establishes a "Restricted Zone" covering the first 50 km from the coastline. Sayulita falls within this zone. In this strip, foreigners cannot hold the property title directly in their name.\n\nThe fideicomiso is the legal solution Mexico created to solve exactly that.\n\nA Mexican bank — the trustee — holds the registered title. But you — the beneficiary — have all real rights: use the property, rent it, remodel it, sell it, and inherit it. The bank is not the owner of your house. It is the legal custodian of the title.'
        },
        {
          title: 'Your Rights as a Fideicomiso Owner',
          content: 'To be completely clear: owning property through a fideicomiso in Mexico gives you exactly the same use and enjoyment rights as any owner in the US or Canada.\n\n✓ Live in the property permanently or temporarily\n✓ Rent it by night, week or month — keep 100% of income\n✓ Expand, remodel or renovate\n✓ Sell at any time at any price\n✓ Designate inheritance beneficiaries\n✓ Use as collateral for financing (in certain cases)'
        },
        {
          title: 'Cost Breakdown: No Surprises',
          content: 'One-time costs at purchase:\n• SRE permit (Foreign Affairs): ~$1,000–$1,500 USD\n• Bank trust setup fees: ~$500–$1,000 USD\n• ISAI (acquisition tax): 2%–4% of property value\n• Notary fees: 1%–2%\n\nTotal closing costs: 4%–7% of purchase price. On a $500k property, that\'s $20k–$35k.\n\nAnnual recurring:\n• Bank trust maintenance fee: 0.5%–1% of property value/year'
        }
      ],
      stepsTitle: 'Purchase Process Step by Step',
      steps: [
        { num: 1, title: 'Identify & Offer', desc: 'View the property. Submit a written offer. Signed letter of intent with 5%–10% good-faith deposit (refundable if title issues arise).' },
        { num: 2, title: 'Legal Due Diligence', desc: 'Your lawyer verifies the property is lien-free, tax-paid, and the seller has legitimate title. Never skip this step.' },
        { num: 3, title: 'SRE Permit', desc: 'Your notary requests Foreign Affairs authorization for the fideicomiso. Takes 2–4 weeks.' },
        { num: 4, title: 'Choose Trustee Bank', desc: 'Select the bank (BBVA, Banorte, Scotiabank, HSBC). Your lawyer can recommend based on fees and service.' },
        { num: 5, title: 'Notary Closing', desc: 'Sign the purchase contract, constitute the fideicomiso, pay the price and closing costs. Can be done in person or via legal representative.' },
        { num: 6, title: 'Registration', desc: 'The notary registers the fideicomiso in the Public Property Registry. Total process: 60–90 days from accepted offer.' }
      ]
    },
    testimonials: {
      label: 'Testimonials',
      title: 'What Our Buyers Say',
      subtitle: 'Discover what your real buyers, real properties, real results could be reviewing when buying your property through our platform.',
      reviews: [
        {
          quote: 'I\'d been searching Sayulita on my own for two years — Zillow, Mexican portals, local agencies. Nobody had what I wanted consolidated in one place. When I found SayulitaTravel, I identified the property in three weeks, made an offer in six, and closed in three months. The team explained the fideicomiso without making me feel it was complicated — and they were right, it wasn\'t.',
          name: 'James R.',
          location: 'Chicago',
          property: 'Villa Norte',
          date: 'Closed 2024',
          rating: 5
        },
        {
          quote: 'What convinced me was seeing the real rental income history before buying. It wasn\'t a developer\'s projection — it was actual bookings from the previous year of an identical property. I paid $620,000 and the first year generated $78,000 in rental income. No other beach market in Mexico at this price delivers that.',
          name: 'Sandra & Mark P.',
          location: 'Vancouver',
          property: 'Casa Paloma Norte',
          date: 'Closed 2023',
          rating: 5
        },
        {
          quote: 'I\'m Mexican, not foreign, but I still didn\'t fully understand how Sayulita\'s market worked. Prices seemed high compared to other Pacific coasts. The SayulitaTravel team put it in context: construction restrictions, appreciation history, comparison with Punta Mita. I bought. Two years later, the same property is worth 22% more.',
          name: 'Ernesto V.',
          location: 'Guadalajara',
          property: 'Casa Colina Sur',
          date: 'Closed 2022',
          rating: 5
        },
        {
          quote: 'We were nervous about buying as Canadians. The team walked us through every step — from the initial search to the notary signing. We did everything remotely except the final visit. The fideicomiso was straightforward, and our property has been renting at 78% occupancy since day one.',
          name: 'Lisa & Tom K.',
          location: 'Toronto',
          property: 'Condo Selva Maaku',
          date: 'Closed 2024',
          rating: 5
        },
        {
          quote: 'What sets SayulitaTravel apart is they actually manage rentals. When we bought our villa, they showed us real data from comparable properties they manage. Not a spreadsheet — actual booking calendars. That transparency is why we closed.',
          name: 'Michael B.',
          location: 'San Francisco',
          property: 'Villa Pacifica',
          date: 'Closed 2023',
          rating: 5
        }
      ]
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about buying property in Sayulita.',
      questions: [
        {
          q: 'How much does a house in Sayulita cost?',
          a: 'The range is wide because the market is too:\n• Entry-level condos and properties: $150k–$400k USD\n• Mid-range single-family homes: $400k–$900k USD\n• Premium villas and oceanfront: $900k–$3M+ USD\n\nKey price drivers: zone (center and north are pricier), ocean view (direct Pacific views carry a significant premium), and construction condition.'
        },
        {
          q: 'Can US and Canadian citizens buy in Sayulita?',
          a: 'Yes, with full legal security through the bank trust (fideicomiso). You have all property rights: use, rent, sell and inherit. The bank acts as registered custodian, not owner. The process takes 60–90 days. Our team can connect you with bilingual local lawyers for a free initial consultation.'
        },
        {
          q: 'What taxes and additional costs are paid when buying?',
          a: 'Budget 4%–7% of the purchase price for closing costs:\n• ISAI (acquisition tax): 2%–4% of property value\n• Notary fees: 1%–2%\n• SRE permit and trust setup: ~$1,500–$2,500 USD\n• Registration fees: variable\n\nPlus annual bank trust fee: 0.5%–1% of property value per year.'
        },
        {
          q: 'How long does the purchase process take in Mexico?',
          a: '60–90 days from accepted offer to registered deed, under normal conditions with full due diligence. The SRE permit (2–4 weeks) is typically the longest single step. Legal due diligence and bank selection run concurrently, compressing the total timeline.'
        },
        {
          q: 'How much can you earn renting a property in Sayulita?',
          a: 'Based on real data from our vacation rental inventory:\n• 1–2 bedroom condo: $20k–$45k USD/year\n• 3-bedroom house with pool: $50k–$90k USD/year\n• 4+ bedroom villa in prime zone: $100k–$200k USD/year\n\nOccupancy in well-managed properties ranges from 65%–85%, peaking near 90% in December and Spring Break.'
        },
        {
          q: 'Is it a good time to invest in Sayulita real estate?',
          a: 'The structural case for buying in Sayulita doesn\'t depend on market timing — it depends on three factors that don\'t change:\n\n1. Buildable land is finite. Municipal restrictions prevent inventory from keeping pace with demand.\n2. Tourism demand keeps growing. More visitors = higher occupancy = higher rental income.\n3. The price gap with comparable destinations is closing. Sayulita\'s per-m² price is still below Punta Mita or San Pancho for similar properties.\n\nThe best time to buy in Sayulita was ten years ago. The second best time is now.'
        },
        {
          q: 'Do I need Mexican residency to buy property?',
          a: 'No. Neither temporary nor permanent residency is required to buy property in Mexico as a foreigner. You need a valid passport, a Mexican tax ID (RFC — your notary helps obtain this as part of the process), and the fideicomiso structure since Sayulita is within the restricted coastal zone.'
        }
      ]
    },
    explore: {
      label: 'Explore Sayulita',
      title: 'Your Best Local Guide Online',
      subtitle: 'SayulitaTravel is more than a real estate platform. Together we will make it the most comprehensive resource on Sayulita on the internet — built by people who live here.',
      links: [
        { icon: '<FiHome />', label: 'Houses for Rent', desc: 'Not ready to buy? Experience Sayulita first', href: '/rentals/houses' },
        { icon: '<FiDollarSign />', label: 'Advertise Your Property', desc: 'Reach serious buyers with 2,000 daily visits', href: '/advertise?openModal=true' },
        { icon: '<FiSun />', label: 'Vacation Rentals', desc: 'Already bought? List your property for rent', href: '/advertise?openModal=true' },
        { icon: '<FiCamera />', label: 'Things to Do', desc: 'Explore Sayulita beyond real estate', href: '/tours' },
        { icon: '<FiMapPin />', label: 'How to Get Here', desc: 'From Puerto Vallarta airport, no detours', href: 'https://sayulitatransportation.com/' }
      ],
      ctaTitle: 'Talk to Our Local Real Estate Advisors',
      ctaText: 'We\'ve been in Sayulita for over 20 years — not as an external agency, but as a team that lives here, knows the market from the inside, and has direct relationships with owners, agents and developers.',
      ctaNote: 'We respond within 24 hours. WhatsApp is the fastest channel for urgent inquiries.',
      ctaBtn1: 'Contact the Team',
      ctaBtn2: 'WhatsApp Direct',
      ctaBtn3: 'Schedule Property Visits',
      footer: '· 170+ verified properties for sale in Sayulita, Nayarit, Mexico ·'
    }
  },

  ESP: {
    meta: {
      title: 'Casas en Venta en Sayulita, Nayarit — 170+ Propiedades Verificadas | SayulitaTravel',
      description: 'Casas, villas, condos y terrenos en venta en Sayulita, Nayarit. Contacto directo con el vendedor, guía de precios, proceso para extranjeros y fideicomiso explicado. Equipo local desde 2000.'
    },
    hero: {
      label: 'Bienes Raíces',
      title: 'Casas en Venta en Sayulita — ',
      accent: '170+ Propiedades Verificadas',
      subtitle1: 'Contacto directo con el vendedor o su agente.',
      subtitle2: 'Casas, villas, condos, terrenos e inversiones con renta vacacional activa.',
      trust: 'Equipo local desde 1998 — vivimos aquí'
    },
    search: {
      sectionTitle: 'Busca Propiedades en Venta en Sayulita',
      type: 'Tipo de Propiedad',
      typeAll: 'Todos',
      typeHouse: 'Casas',
      typeVilla: 'Villas de Lujo',
      typeCondo: 'Condominios',
      typeLand: 'Terrenos',
      typeInvestment: 'Inversión',
      priceMin: 'Precio Mín (USD)',
      priceMax: 'Precio Máx (USD)',
      zone: 'Zona',
      zoneAll: 'Todas',
      zoneCenter: 'Centro',
      zoneNorth: 'Gringo Hill / Norte',
      zoneSouth: 'Zona Sur',
      zoneGated: 'Fraccionamientos',
      bedrooms: 'Recámaras',
      bedAny: 'Cualquiera',
      btnSearch: 'Buscar',
      popularLabel: 'Búsquedas populares:',
      tags: ['Frente al mar', 'Vista al mar', 'Con alberca', 'Gringo Hill', 'Gated community', 'Renta activa']
    },
    types: {
      label: 'Tipos de Propiedad',
      title: 'Propiedades en Venta en Sayulita por Tipo',
      subtitle: 'El mercado inmobiliario de Sayulita no se parece a ningún otro en México. Elige el tipo de propiedad que encaja con tu objetivo.',
      cta: 'Ver todas las propiedades',
      categories: [
        {
          id: 'houses', icon: '<FiHome />',
          title: 'Casas Residenciales y Familiares',
          badge: 'Más Buscadas',
          paragraphs: ['Las casas unifamiliares son el producto más buscado y el más representativo del mercado de Sayulita. Arquitectura que mezcla lo contemporáneo con materiales locales — madera, piedra volcánica, terrazas con palapa — en propiedades diseñadas para vivir bien, no para apilar metros cuadrados.', 'Lo que encontrarás en esta categoría:'],
          bullets: ['Casas de 2 a 5 recámaras en zonas residenciales consolidadas', 'Propiedades con jardín, terraza o patio exterior', 'Ubicaciones en el centro, Gringo Hill, zona sur y periferia', 'Estado de construcción variable: llave en mano, a remodelar y de nueva construcción'],
          forWhom: 'Segunda casa de vacaciones, residencia principal para relocalización, base familiar para visitas largas, inversión con potencial de renta vacacional.'
        },
        {
          id: 'villas', icon: '<BiWater />',
          title: 'Villas y Propiedades de Lujo Frente al Mar',
          badge: 'Inventario Limitado',
          paragraphs: ['Las propiedades frente al mar en Sayulita son escasas por diseño, no por falta de demanda. El municipio protege activamente su línea de costa. Lo que eso significa para el comprador: las villas oceanfront son inventario que no se repone.', 'Lo que define al segmento de lujo en Sayulita:'],
          bullets: ['Acceso directo a la playa o vistas panorámicas al Pacífico', 'Arquitectura de autor con identidad propia', 'Tamaños desde 200 m² hasta más de 1,000 m² de construcción', 'Ingresos de renta vacacional entre $80k–$150k USD anuales', 'Lista de espera de compradores para ubicaciones más codiciadas'],
          forWhom: 'Inversor de alto ticket, comprador que busca la mejor experiencia de segunda residencia, grupo de compradores que divide el costo de una villa premium.'
        },
        {
          id: 'condos', icon: '<BiBuildings />',
          title: 'Condominios y Departamentos en Venta',
          badge: 'Mejor Precio de Entrada',
          paragraphs: ['La oferta de condominios en Sayulita ha crecido con desarrollos que respetan la arquitectura del pueblo.', 'Lo que hace atractiva esta categoría para el inversor:'],
          bullets: ['Precio de entrada más bajo desde $150,000 USD', 'Menor mantenimiento individual', 'Alberca, gimnasio y áreas comunes incluidas', 'Alta ocupación de renta vacacional superior al 70%', 'Mayor liquidez en reventa'],
          forWhom: 'Inversor que entra al mercado con capital inicial más bajo, comprador no residente que quiere delegar mantenimiento.'
        },
        {
          id: 'land', icon: '<BiLandscape />',
          title: 'Terrenos en Venta en Sayulita',
          badge: 'Construye a tu Medida',
          paragraphs: ['Comprar un terreno en Sayulita es apostar por la escasez más pura del mercado: el suelo edificable es finito.', 'Lo que el mercado de terrenos ofrece hoy:'],
          bullets: ['Terrenos en Gringo Hill con vistas al océano desde $200,000 USD', 'Parcelas en zona sur con mejor precio de entrada', 'Terrenos en desarrollos privados con servicios incluidos', 'Sin restricción de diseño dentro de parámetros municipales'],
          forWhom: 'Comprador que quiere construir a medida, desarrollador local, inversor de largo plazo.'
        },
        {
          id: 'investment', icon: '<FiTrendingUp />',
          title: 'Propiedades de Inversión con Renta Activa',
          badge: 'Datos Exclusivos',
          paragraphs: ['Esta categoría solo SayulitaTravel puede ofrecerla — y es por lo que muchos inversores nos eligen.', 'Llevamos más de 20 años gestionando vacation rentals. Cuando una propiedad sale a la venta, el comprador no ve solo fotos y precio — ve el rendimiento real.', 'Lo que incluye un listing de inversión:'],
          bullets: ['Historial verificado de ingresos por renta vacacional (12–24 meses)', 'Tasa de ocupación real por temporada', 'Estimación de ingresos anuales basada en el mercado real', 'Información sobre equipo de gestión local disponible', 'Comparativa con propiedades similares en el inventario activo'],
          forWhom: 'Inversor que quiere números verificados, comprador que busca propiedad generadora de ingresos desde el día uno.'
        }
      ]
    },
    pricing: {
      label: 'Guía de Precios',
      title: '¿Cuánto Cuesta una Casa en Sayulita?',
      subtitle: 'Desglose honesto por segmento — desde condos de entrada hasta villas premium frente al mar.',
      segments: [
        {
          range: '$150k – $400k USD', sub: 'Entrada', featured: false,
          items: ['Condos de 1 recámara en desarrollos nuevos: 50–90 m²', 'Casas pequeñas en zona sur: 2 recámaras, jardín', 'Terrenos en ubicaciones no prime desde $120,000 USD', 'Casas a remodelar en el centro'],
          yield: 'Condos bien ubicados generan $20k–$45k USD/año.',
          profile: 'Inversor que entra al mercado por primera vez, comprador con capital limitado.'
        },
        {
          range: '$400k – $900k USD', sub: 'Gama Media', featured: true,
          items: ['Casas de 2 a 4 recámaras en Gringo Hill: buenas vistas, alberca frecuente', 'Condos premium en Selva Maaku, Pájaro de Fuego', 'Casas con historial de renta vacacional activo', 'Casas frente al mar en extremo inferior del segmento'],
          yield: '$45k–$90k USD/año con ocupación del 65%–75%.',
          profile: 'Familia que busca segunda casa, inversor que quiere rendimiento estable, expat que planea retiro parcial.'
        },
        {
          range: '$900k – $3M+ USD', sub: 'Premium', featured: false,
          items: ['Oceanfront o primera línea de mar con acceso directo a la playa', 'Villas con arquitectura de diseño, piscinas de borde infinito', 'Capacidad para 8–20 huéspedes', 'Ingresos de renta que justifican la inversión: $100k–$200k USD/año'],
          yield: 'Las mejores villas generan $100k–$200k USD/año.',
          profile: 'Inversor de alto ticket, grupo de compradores que divide costo y uso.'
        }
      ]
    },
    why: {
      label: 'Por Qué Invertir',
      title: '¿Por Qué Comprar en Sayulita en 2026?',
      subtitle: 'Cuatro razones concretas — sin frases de folleto.',
      cards: [
        { icon: 'trending', title: 'Revalorización Sostenida', desc: 'El mercado inmobiliario de Sayulita ha registrado tasas de plusvalía del 8%–12% anual durante la última década. Demanda turística crece, suelo edificable no crece.' },
        { icon: 'dollar', title: 'Ingresos por Renta Vacacional', desc: 'Ocupación del 65%–85% anual en propiedades bien gestionadas. $20k–$200k USD/año según el tipo de propiedad. Datos reales de nuestro historial de 20 años.' },
        { icon: 'users', title: 'Comunidad Expat Consolidada', desc: 'Más de 20 años de propietarios extranjeros en Sayulita. Abogados bilingües, administradores de renta, constructores de confianza y red de compradores anteriores.' },
        { icon: 'shield', title: 'Protegida del Turismo Masivo', desc: 'Restricciones de altura, densidad y límites comunitarios aseguran que Sayulita no se convertirá en Cancún. El destino que te enamoró seguirá siendo reconocible.' }
      ]
    },
    featured: {
      title: 'Propiedades Destacadas Esta Semana',
      sortLabel: 'Ordenar:',
      sortRating: 'Mejor Calificadas',
      sortPriceAsc: 'Precio: Menor a Mayor',
      sortPriceDesc: 'Precio: Mayor a Menor',
      filtersTitle: 'Filtros',
      zoneLabel: 'Zona',
      typeLabel: 'Tipo',
      priceLabel: 'Precio',
      trustText: 'Todas las propiedades verificadas por nuestro equipo local.',
      emptyText: 'No hay propiedades que coincidan con tus filtros.',
      priceFrom: 'Desde',
      pricePerNight: '',
      viewDetail: 'Ver Detalle',
      viewAll: 'Ver las 170+ propiedades en venta',
      properties: [
        { id: 1, price: 895000, rating: 4.9, beds: 4, zone: 'north', type: 'house', badgeType: 'premium', sqm: 320, features: ['Alberca', 'Vista al Mar', 'Jardín'] },
        { id: 2, price: 425000, rating: 4.8, beds: 3, zone: 'center', type: 'house', badgeType: 'beachfront', sqm: 185, features: ['Frente al Mar', 'Terraza'] },
        { id: 3, price: 280000, rating: 4.7, beds: 2, zone: 'gated', type: 'condo', badgeType: 'investment', sqm: 90, features: ['Alberca', 'Gimnasio', 'Estacionamiento'] },
        { id: 4, price: 1500000, rating: 5.0, beds: 6, zone: 'north', type: 'villa', badgeType: 'premium', sqm: 600, features: ['Oceanfront', 'Alberca', 'Infinity', 'Staff'] },
        { id: 5, price: 350000, rating: 4.6, beds: 2, zone: 'south', type: 'house', badgeType: null, sqm: 150, features: ['Jardín', 'Estacionamiento'] },
        { id: 6, price: 220000, rating: 4.5, beds: 1, zone: 'gated', type: 'condo', badgeType: 'investment', sqm: 65, features: ['Alberca', 'Amueblado'] },
        { id: 7, price: 675000, rating: 4.9, beds: 3, zone: 'north', type: 'house', badgeType: 'premium', sqm: 250, features: ['Alberca', 'Vista al Mar', 'AC'] },
        { id: 8, price: 195000, rating: 4.4, beds: 0, zone: 'south', type: 'land', badgeType: null, sqm: 400, features: ['Vista al Mar', 'Listo para Construir'] }
      ]
    },
    zones: {
      label: 'Guía de Zonas',
      title: '¿Dónde Comprar en Sayulita?',
      subtitle: 'La zona importa de formas distintas para el comprador y para el turista. Entiende qué zona maximiza tu objetivo específico.',
      cta: 'Ver propiedades en esta zona',
      zonesList: [
        { id: 'center', title: 'Centro — Máxima Ocupación de Renta', pros: 'Las tasas de ocupación más altas del mercado. Los turistas quieren estar en el corazón de Sayulita y pagan precio premium.', cons: 'En temporada alta, el ruido es constante hasta pasada la medianoche.', ideal: 'Maximizar ingresos de renta vacacional' },
        { id: 'north', title: 'Gringo Hill y Zona Norte — Vistas, Privacidad y Comunidad Expat', pros: 'Vistas panorámicas de la bahía. Ambiente más tranquilo. Las mejores vistas de Sayulita están aquí.', cons: 'Caminata cuesta arriba al centro. Muchas propiedades incluyen golf cart.', ideal: 'Residencia de calidad, inversión de largo plazo' },
        { id: 'south', title: 'Zona Sur — Mejor Precio de Entrada', pros: 'Mejor precio de entrada, más espacio por el mismo presupuesto, ambiente más tranquilo.', cons: '10–20 minutos caminando de la playa. Menor ocupación vacacional.', ideal: 'Entrada al mercado con capital limitado' },
        { id: 'gated', title: 'Desarrollos Privados y Gated Communities', pros: 'Seguridad perimetral, albercas y áreas comunes de alta calidad, menor fricción operativa.', cons: 'Ambiente menos integrado con el pueblo. Cuotas de mantenimiento fijas.', ideal: 'Inversor no residente que busca gestión simplificada' }
      ]
    },
    buyerGuide: {
      label: 'Guía para Compradores Extranjeros',
      title: '¿Pueden los Extranjeros Comprar Casa en Sayulita?',
      subtitle: 'La pregunta que más bloquea decisiones de compra — y la que más fácil se resuelve cuando alguien te la explica bien.',
      intro: 'La respuesta corta: sí, los extranjeros pueden comprar en Sayulita. Con la estructura legal correcta, tienes los mismos derechos que cualquier propietario. La clave está en entender cómo funciona esa estructura.',
      cards: [
        { title: 'Por Qué Existe el Fideicomiso', content: 'La Constitución mexicana establece una "Zona Restringida" que abarca los primeros 50 km desde la línea de costa. Sayulita está dentro de esa zona. El fideicomiso es la solución legal que México creó para resolver exactamente eso.\n\nUn banco mexicano actúa como titular registral de la propiedad. Pero tú tienes todos los derechos reales: usar, rentar, remodelar, vender y heredar. El banco no es el dueño de tu casa.' },
        { title: 'Derechos del Propietario con Fideicomiso', content: 'Tener una propiedad en fideicomiso te da exactamente los mismos derechos que cualquier propietario en EE.UU. o Canadá.\n\n✓ Vivir en la propiedad permanente o temporalmente\n✓ Rentarla y quedarte el 100% de los ingresos\n✓ Remodelar o reformar\n✓ Venderla en cualquier momento\n✓ Designar beneficiarios para herencia' },
        { title: 'Costos del Fideicomiso', content: 'Costos únicos al comprar:\n• Permiso SRE: ~$1,000–$1,500 USD\n• Constitución del fideicomiso: ~$500–$1,000 USD\n• ISAI: 2%–4% del valor\n• Honorarios notariales: 1%–2%\n\nTotal costos de cierre: 4%–7% del precio de compra.\n\nCosto anual recurrente:\n• Mantenimiento del fideicomiso: 0.5%–1% del valor/año' }
      ],
      stepsTitle: 'Proceso de Compra Paso a Paso',
      steps: [
        { num: 1, title: 'Identificar y Ofertar', desc: 'Visita la propiedad. Presenta una oferta por escrito. Carta de intención con depósito de buena fe del 5%–10%.' },
        { num: 2, title: 'Due Diligence Legal', desc: 'Tu abogado verifica que la propiedad esté libre de gravámenes y que el vendedor tenga título legítimo.' },
        { num: 3, title: 'Permiso SRE', desc: 'El notario solicita la autorización de la Secretaría de Relaciones Exteriores. Tarda 2–4 semanas.' },
        { num: 4, title: 'Banco Fiduciario', desc: 'Eliges el banco (BBVA, Banorte, Scotiabank, HSBC). Tu abogado puede recomendarte.' },
        { num: 5, title: 'Cierre ante Notario', desc: 'Firma del contrato, constitución del fideicomiso, pago del precio y costos de cierre.' },
        { num: 6, title: 'Registro e Inscripción', desc: 'El notario inscribe el fideicomiso en el Registro Público. Proceso total: 60–90 días.' }
      ]
    },
    testimonials: {
      label: 'Testimonios',
      title: 'Lo que Dicen Nuestros Compradores',
      subtitle: 'Descubre lo que tus compradores reales, propiedades reales, resultados reales podrían estar reseñando al comprar tu propiedad a través de nuestra playaforma.',
      reviews: [
        { quote: 'Llevaba dos años buscando en Sayulita por mi cuenta. Cuando encontré SayulitaTravel, en tres semanas había identificado la propiedad. El equipo me explicó el fideicomiso sin hacerme sentir que era complicado — y tenían razón.', name: 'James R.', location: 'Chicago', property: 'Villa Norte', date: '2024', rating: 5 },
        { quote: 'Lo que me convenció fue ver el historial real de ingresos por renta antes de comprar. Pagué $620,000 USD y el primer año de renta recuperé $78,000.', name: 'Sandra y Mark P.', location: 'Vancouver', property: 'Casa Paloma Norte', date: '2023', rating: 5 },
        { quote: 'Soy mexicano, pero no entendía bien el mercado de Sayulita. El equipo me puso en contexto. Compré. Dos años después, la misma propiedad vale un 22% más.', name: 'Ernesto V.', location: 'Guadalajara', property: 'Casa Colina Sur', date: '2022', rating: 5 },
        { quote: 'Estábamos nerviosos comprando como canadienses. El equipo nos guió en cada paso. El fideicomiso fue sencillo y nuestra propiedad ha rentado al 78% de ocupación desde el primer día.', name: 'Lisa y Tom K.', location: 'Toronto', property: 'Condo Selva Maaku', date: '2024', rating: 5 },
        { quote: 'Lo que distingue a SayulitaTravel es que ellos realmente gestionan rentas. Cuando compramos, nos mostraron datos reales de propiedades comparables que ellos administran.', name: 'Michael B.', location: 'San Francisco', property: 'Villa Pacifica', date: '2023', rating: 5 }
      ]
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre comprar propiedad en Sayulita.',
      questions: [
        { q: '¿Cuánto cuesta una casa en Sayulita?', a: '• Entrada: $150k–$400k USD\n• Gama media: $400k–$900k USD\n• Premium: $900k–$3M+ USD\n\nFactores clave: zona, vista al mar y estado de construcción.' },
        { q: '¿Pueden estadounidenses y canadienses comprar en Sayulita?', a: 'Sí, con total seguridad legal mediante el fideicomiso bancario. Tienes todos los derechos de propiedad. El proceso tarda 60–90 días.' },
        { q: '¿Qué impuestos y costos adicionales se pagan?', a: 'Contempla entre el 4% y el 7% del precio de compra en costos de cierre: ISAI 2%–4%, honorarios notariales 1%–2%, permiso SRE $1,500–$2,500 USD.' },
        { q: '¿Cuánto tiempo tarda el proceso de compra?', a: 'Entre 60 y 90 días desde la oferta aceptada hasta la escritura inscrita. El permiso SRE (2–4 semanas) suele ser el paso más largo.' },
        { q: '¿Cuánto se puede ganar rentando una propiedad?', a: 'Condo 1–2 recámaras: $20k–$45k USD/año. Casa 3 recámaras: $50k–$90k USD/año. Villa 4+ recámaras: $100k–$200k USD/año.' },
        { q: '¿Es buen momento para invertir en Sayulita?', a: 'El argumento estructural no depende del momento puntual: el suelo edificable es finito, la demanda turística crece y el diferencial con destinos comparables se cierra. El mejor momento fue hace diez años. El segundo mejor es ahora.' },
        { q: '¿Necesito residencia mexicana para comprar?', a: 'No. No se requiere residencia temporal ni permanente. Necesitas pasaporte vigente, RFC mexicano (que el notario ayuda a tramitar) y la estructura del fideicomiso.' }
      ]
    },
    explore: {
      label: 'Explora Sayulita',
      title: 'Tu Mejor Guía Local Online',
      subtitle: 'Sayulita Travel es mucho más que una plataforma de compraventa. Juntos haremos que sea el recurso más completo de Sayulita en internet — construido por personas que viven aquí.',
      links: [
        { icon: '<FiHome />', label: 'Casas en Renta', desc: 'Conoce el destino primero', href: '/rentals/houses' },
        { icon: '<FiDollarSign />', label: 'Anunciar tu Propiedad', desc: 'Llega a compradores serios', href: '/advertise?openModal=true' },
        { icon: '<FiSun />', label: 'Vacation Rentals', desc: 'Pon tu propiedad en renta', href: '/advertise?openModal=true' },
        { icon: '<FiCamera />', label: 'Qué Hacer', desc: 'Más allá del mercado inmobiliario', href: '/tours' },
        { icon: '<FiMapPin />', label: 'Cómo Llegar', desc: 'Desde el aeropuerto de PVR', href: 'https://sayulitatransportation.com/' }
      ],
      ctaTitle: 'Habla con Nuestros Asesores Inmobiliarios Locales',
      ctaText: 'Llevamos más de 20 años en Sayulita — no como agencia externa, sino como equipo que vive aquí, conoce el mercado y tiene relaciones directas con propietarios y agentes.',
      ctaNote: 'Respondemos en menos de 24 horas. WhatsApp es el canal más rápido.',
      ctaBtn1: 'Contactar al Equipo',
      ctaBtn2: 'WhatsApp Directo',
      ctaBtn3: 'Agendar Visitas',
      footer: '· 170+ propiedades verificadas en venta en Sayulita, Nayarit, México ·'
    }
  }
};

const placeholderColors = ['#e8d5b7', '#d4c4a8', '#f0e6d3', '#c9b99a', '#dfd0b8', '#e3d6c0', '#dac9ae', '#eddcc6'];

const iconMap = {
  'trending': <FiTrendingUp size={24} />,
  'dollar': <FiDollarSign size={24} />,
  'users': <FiUsers size={24} />,
  'shield': <FiShield size={24} />
};

const typeIcons = {
  houses: <FiHome size={20} />,
  villas: <BiWater size={20} />,
  condos: <BiBuildings size={20} />,
  land: <BiLandscape size={20} />,
  investment: <FiTrendingUp size={20} />
};

const zoneLabels = { center: 'Town Center', north: 'Gringo Hill / North', south: 'South Zone', gated: 'Gated Community' };
const typeLabels = { house: 'House', villa: 'Villa', condo: 'Condo', land: 'Land', investment: 'Investment' };
const badgeLabels = { premium: 'Premium', beachfront: 'Beachfront', investment: 'Income Ready' };

function getBadgeIcon(type) {
  if (type === 'premium') return <FiStar size={12} />;
  if (type === 'beachfront') return <MdBeachAccess size={12} />;
  if (type === 'investment') return <FiTrendingUp size={12} />;
  return null;
}

function getZoneImage(id) {
  const gradients = {
    center: 'linear-gradient(135deg, #f9a825 0%, #e69500 100%)',
    north: 'linear-gradient(135deg, #006399 0%, #004d7a 100%)',
    south: 'linear-gradient(135deg, #2c694e 0%, #1e4d38 100%)',
    gated: 'linear-gradient(135deg, #835400 0%, #674100 100%)'
  };
  return gradients[id] || gradients.center;
}

function getZoneIcon(id) {
  switch (id) {
    case 'center': return <FiHome size={48} />;
    case 'north': return <FiSun size={48} />;
    case 'south': return <BiLandscape size={48} />;
    case 'gated': return <FiShield size={48} />;
    default: return <FiMapPin size={48} />;
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function RealEstatePage({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  const [activeType, setActiveType] = useState('houses');
  const [openFaq, setOpenFaq] = useState(-1);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [filterZone, setFilterZone] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterBed, setFilterBed] = useState('any');

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

  const toggleFav = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const sortedProperties = useMemo(() => {
    let list = [...t.featured.properties];
    if (filterZone !== 'all') list = list.filter((p) => p.zone === filterZone);
    if (filterType !== 'all') list = list.filter((p) => p.type === filterType);
    if (filterBed !== 'any') {
      const bedNum = parseInt(filterBed);
      list = filterBed === '3' ? list.filter((p) => p.beds >= 3) : list.filter((p) => p.beds === bedNum);
    }
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [t, sortBy, filterZone, filterType, filterBed]);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="rep-hero section" id="realestate-hero">
        <div className="rep-hero__bg">
          <img src={heroBg.src} alt="Sayulita Real Estate" className="rep-hero__bg-img" />
          <div className="rep-hero__overlay" />
        </div>
        <div className="container">
          <motion.div
            className="rep-hero__content"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="rep-hero__label">{t.hero.label}</span>
            <h1 className="rep-hero__title">
              {t.hero.title}
              <span className="rep-hero__accent">{t.hero.accent}</span>
            </h1>
            <p className="rep-hero__subtitle">
              {t.hero.subtitle1}<br />{t.hero.subtitle2}
            </p>
            <div className="rep-hero__trust">
              <FiShield size={18} />
              <span>{t.hero.trust}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SEARCH / FILTERS ===== */}
      <section className="rep-search section" id="realestate-search">
        <FloatingPalms />
        <div className="container">
          <h2 className="section-header__title" style={{ textAlign: 'center', marginBottom: 24 }}>{t.search.sectionTitle}</h2>
          <div className="rep-search__bar">
            <div className="rep-search__field">
              <label>{t.search.type}</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">{t.search.typeAll}</option>
                <option value="house">{t.search.typeHouse}</option>
                <option value="villa">{t.search.typeVilla}</option>
                <option value="condo">{t.search.typeCondo}</option>
                <option value="land">{t.search.typeLand}</option>
                <option value="investment">{t.search.typeInvestment}</option>
              </select>
            </div>
            <div className="rep-search__field">
              <label>{t.search.zone}</label>
              <select value={filterZone} onChange={(e) => setFilterZone(e.target.value)}>
                <option value="all">{t.search.zoneAll}</option>
                <option value="center">{t.search.zoneCenter}</option>
                <option value="north">{t.search.zoneNorth}</option>
                <option value="south">{t.search.zoneSouth}</option>
                <option value="gated">{t.search.zoneGated}</option>
              </select>
            </div>
            <div className="rep-search__field">
              <label>{t.search.bedrooms}</label>
              <select value={filterBed} onChange={(e) => setFilterBed(e.target.value)}>
                <option value="any">{t.search.bedAny}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </div>
            <div className="rep-search__field">
              <label>{t.search.priceMin}</label>
              <input type="number" placeholder="100,000" />
            </div>
            <div className="rep-search__field">
              <label>{t.search.priceMax}</label>
              <input type="number" placeholder="3,000,000" />
            </div>
            <button className="rep-search__btn">
              <FiSearch size={16} /> {t.search.btnSearch}
            </button>
          </div>
          <div className="rep-search__popular">
            <span className="rep-search__popular-label">{t.search.popularLabel}</span>
            {t.search.tags.map((tag) => (
              <span key={tag} className="rep-search__tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROPERTY TYPES ===== */}
      <section className="rep-types section" id="realestate-types">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.types.label}
            title={t.types.title}
            subtitle={t.types.subtitle}
          />
          <div className="rep-types__tabs">
            {t.types.categories.map((cat) => (
              <button
                key={cat.id}
                className={`rep-types__tab ${activeType === cat.id ? 'rep-types__tab--active' : ''}`}
                onClick={() => setActiveType(cat.id)}
                id={`rep-type-tab-${cat.id}`}
              >
                {typeIcons[cat.id] || null}
                {cat.badge === 'Most Searched' || cat.badge === 'Más Buscadas' ? cat.title.split(' — ')[0] || cat.title : cat.title}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {t.types.categories.filter((c) => c.id === activeType).map((cat) => (
              <motion.div
                key={cat.id}
                className="rep-types__panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                id={`rep-type-panel-${cat.id}`}
              >
                {cat.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <ul>
                  {cat.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <p style={{ fontStyle: 'italic', color: 'var(--color-on-surface-variant)', fontSize: 'var(--fs-body-md)' }}>
                  <strong>{language === 'ENG' ? 'For whom:' : 'Para quién:'}</strong> {cat.forWhom}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ===== PRICE GUIDE ===== */}
      <section className="rep-pricing section" id="realestate-pricing">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.pricing.label}
            title={t.pricing.title}
            subtitle={t.pricing.subtitle}
          />
          <div className="rep-pricing__grid">
            {t.pricing.segments.map((seg, i) => (
              <motion.div
                key={i}
                className={`rep-pricing__card ${seg.featured ? 'rep-pricing__card--featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
              >
                <div className="rep-pricing__range">{seg.range}</div>
                <div className="rep-pricing__sub">{seg.sub}</div>
                <ul className="rep-pricing__list">
                  {seg.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
                <div className="rep-pricing__yield">{seg.yield}</div>
                <div className="rep-pricing__profile">{seg.profile}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY BUY ===== */}
      <section className="rep-why section" id="realestate-why">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.why.label}
            title={t.why.title}
            subtitle={t.why.subtitle}
          />
          <div className="rep-why__grid">
            {t.why.cards.map((card, i) => (
              <motion.div
                key={i}
                className="rep-why__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
              >
                <div className="rep-why__icon">{iconMap[card.icon]}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROPERTIES ===== */}
      <section className="rep-featured section" id="realestate-featured">
        <FloatingPalms />
        <div className="container">
          <SectionHeader title={t.featured.title} />
          <div className="rep-featured__layout">
            <aside className="rep-featured__sidebar">
              <h4>{t.featured.filtersTitle}</h4>
              <div className="rep-featured__sidebar-group">
                <label>{t.featured.zoneLabel}</label>
                <select value={filterZone} onChange={(e) => setFilterZone(e.target.value)}>
                  <option value="all">{t.search.zoneAll}</option>
                  <option value="center">{t.search.zoneCenter}</option>
                  <option value="north">{t.search.zoneNorth}</option>
                  <option value="south">{t.search.zoneSouth}</option>
                  <option value="gated">{t.search.zoneGated}</option>
                </select>
              </div>
              <div className="rep-featured__sidebar-group">
                <label>{t.featured.typeLabel}</label>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="all">{t.search.typeAll}</option>
                  <option value="house">{t.search.typeHouse}</option>
                  <option value="villa">{t.search.typeVilla}</option>
                  <option value="condo">{t.search.typeCondo}</option>
                  <option value="land">{t.search.typeLand}</option>
                  <option value="investment">{t.search.typeInvestment}</option>
                </select>
              </div>
              <div className="rep-featured__sidebar-group">
                <label>{t.featured.priceLabel}</label>
                <select>
                  <option>All Prices</option>
                  <option>$150k – $400k</option>
                  <option>$400k – $900k</option>
                  <option>$900k+</option>
                </select>
              </div>
            </aside>
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 14px',
                    border: '1px solid var(--color-outline-variant)',
                    borderRadius: 'var(--rounded-lg)',
                    fontFamily: 'var(--font-family)',
                    fontSize: 'var(--fs-label-sm)',
                    background: 'var(--color-surface-container-lowest)'
                  }}
                >
                  <option value="rating">{t.featured.sortRating}</option>
                  <option value="price-asc">{t.featured.sortPriceAsc}</option>
                  <option value="price-desc">{t.featured.sortPriceDesc}</option>
                </select>
              </div>
              {sortedProperties.length === 0 ? (
                <div className="rep-featured__empty">{t.featured.emptyText}</div>
              ) : (
                <div className="rep-featured__grid">
                  {sortedProperties.map((item, i) => (
                    <motion.article
                      key={item.id}
                      className="rep-card"
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      variants={cardVariants}
                      whileHover={{ y: -6 }}
                      id={`rep-card-${item.id}`}
                    >
                      <div className="rep-card__image-wrap">
                        <div
                          className="rep-card__image"
                          style={{
                            background: placeholderColors[item.id % placeholderColors.length],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 48,
                            color: 'rgba(131,84,0,0.3)'
                          }}
                        >
                          {item.type === 'land' ? <BiLandscape /> : item.type === 'villa' ? <BiWater /> : item.type === 'condo' ? <BiBuildings /> : <FiHome />}
                        </div>
                        <div className="rep-card__image-overlay" />
                        {item.badgeType && (
                          <span className={`rep-card__badge rep-card__badge--${item.badgeType}`}>
                            {getBadgeIcon(item.badgeType)} {badgeLabels[item.badgeType]}
                          </span>
                        )}
                        <button
                          className={`rep-card__fav ${favorites.includes(item.id) ? 'rep-card__fav--active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleFav(item.id); }}
                        >
                          <FiHeart size={16} />
                        </button>
                      </div>
                      <div className="rep-card__body">
                        <div className="rep-card__header">
                          <h3 className="rep-card__name">{item.sqm} m² {typeLabels[item.type]} — {zoneLabels[item.zone]}</h3>
                          <div className="rep-card__rating">
                            <FiStar size={14} /> <span>{item.rating}</span>
                          </div>
                        </div>
                        <div className="rep-card__meta">
                          {item.beds > 0 && (
                            <span className="rep-card__meta-item"><IoBedOutline size={14} /> {item.beds} {item.beds === 1 ? 'bed' : 'beds'}</span>
                          )}
                          <span className="rep-card__meta-item"><MdOutlineLocationOn size={14} /> {item.sqm} m²</span>
                          {item.features.slice(0, 2).map((f, fIdx) => (
                            <span key={fIdx} className="rep-card__meta-item rep-card__meta-item--dot">
                              <FiCheck size={12} style={{ color: 'var(--color-primary)' }} /> {f}
                            </span>
                          ))}
                        </div>
                        <div className="rep-card__footer">
                          <div className="rep-card__price">
                            <span className="rep-card__price-label">{t.featured.priceFrom}</span>
                            <span className="rep-card__price-amount">${item.price.toLocaleString('en-US')}</span>
                          </div>
                          <button className="rep-card__cta">{t.featured.viewDetail}</button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
              <div className="rep-featured__view-all">
                <Button variant="outline" size="lg" icon={<FiArrowRight size={16} />}>
                  {t.featured.viewAll}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ZONES GUIDE ===== */}
      <section className="rep-zones section" id="realestate-zones">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.zones.label}
            title={t.zones.title}
            subtitle={t.zones.subtitle}
          />
          <div className="rep-zones__grid">
            {t.zones.zonesList.map((zone, i) => (
              <motion.div
                key={zone.id}
                className="rep-zone-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                id={`rep-zone-${zone.id}`}
              >
                <div className="rep-zone-card__image" style={{ background: getZoneImage(zone.id) }}>
                  <div style={{ color: 'rgba(255,255,255,0.25)' }}>{getZoneIcon(zone.id)}</div>
                </div>
                <div className="rep-zone-card__body">
                  <h3>{zone.title}</h3>
                  <div className="rep-zone-card__pros">
                    <strong>{language === 'ENG' ? 'Pros' : 'Pros'}</strong>
                    <span>{zone.pros}</span>
                  </div>
                  <div className="rep-zone-card__cons">
                    <strong>{language === 'ENG' ? 'Cons' : 'Contras'}</strong>
                    <span>{zone.cons}</span>
                  </div>
                  <div className="rep-zone-card__ideal">
                    <strong>{language === 'ENG' ? 'Best for:' : 'Ideal para:'}</strong> {zone.ideal}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOREIGN BUYER GUIDE ===== */}
      <section className="rep-buyer-guide section" id="realestate-buyer-guide">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.buyerGuide.label}
            title={t.buyerGuide.title}
            subtitle={t.buyerGuide.subtitle}
          />
          <p className="rep-buyer-guide__intro">{t.buyerGuide.intro}</p>
          <div className="rep-buyer-guide__grid">
            {t.buyerGuide.cards.map((card, i) => (
              <motion.div
                key={i}
                className="rep-buyer-guide__card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <h3>{card.title}</h3>
                {card.content.split('\n').map((line, li) => (
                  <p key={li}>{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
          <h3 style={{ textAlign: 'center', marginTop: 48, fontSize: 'var(--fs-headline-lg)', color: 'var(--color-on-surface)' }}>
            {t.buyerGuide.stepsTitle}
          </h3>
          <div className="rep-buyer-guide__steps">
            {t.buyerGuide.steps.map((step) => (
              <motion.div
                key={step.num}
                className="rep-buyer-guide__step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (step.num - 1) * 0.08, duration: 0.4 }}
              >
                <div className="rep-buyer-guide__step-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="rep-testimonials section" id="realestate-testimonials">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.testimonials.label}
            title={t.testimonials.title}
            subtitle={t.testimonials.subtitle}
          />
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="rep-testimonials__swiper"
          >
            {t.testimonials.reviews.map((r, i) => (
              <SwiperSlide key={i}>
                <div className="rep-testimonial-card">
                  <div className="rep-testimonial-card__stars">
                    {Array.from({ length: r.rating }).map((_, si) => (
                      <FiStar key={si} size={16} />
                    ))}
                  </div>
                  <blockquote className="rep-testimonial-card__quote">"{r.quote}"</blockquote>
                  <div className="rep-testimonial-card__author">
                    <div className="rep-testimonial-card__avatar">{r.name.charAt(0)}</div>
                    <div className="rep-testimonial-card__info">
                      <span className="rep-testimonial-card__name">{r.name}</span>
                      <span className="rep-testimonial-card__detail">{r.location} · {r.property} · {r.date}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="rep-faq section" id="realestate-faq">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            title={t.faq.title}
            subtitle={t.faq.subtitle}
          />
          <div className="rep-faq__list">
            {t.faq.questions.map((faq, i) => (
              <motion.div
                key={i}
                className={`rep-faq__item ${openFaq === i ? 'rep-faq__item--open' : ''}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                id={`rep-faq-${i}`}
              >
                <button
                  className="rep-faq__question"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span>{faq.q}</span>
                  <span className="rep-faq__icon">
                    {openFaq === i ? <FiMinus /> : <FiPlus />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      className="rep-faq__answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      {faq.a.split('\n').map((line, li) => (
                        <p key={li} className="rep-faq__answer-text">{line}</p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPLORE / CTA ===== */}
      <section className="rep-explore section" id="realestate-explore">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.explore.label}
            title={t.explore.title}
            subtitle={t.explore.subtitle}
          />
          <div className="rep-explore__grid">
            {t.explore.links.map((item) => (
              <a key={item.label} href={item.href} className="rep-explore__link"
                {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="rep-explore__link-icon">
                  {item.label === 'Houses for Rent' || item.label === 'Casas en Renta' ? <FiHome size={20} /> :
                   item.label === 'Advertise Your Property' || item.label === 'Anunciar tu Propiedad' ? <FiDollarSign size={20} /> :
                   item.label === 'Vacation Rentals' ? <FiSun size={20} /> :
                   item.label === 'Things to Do' || item.label === 'Qué Hacer' ? <FiCamera size={20} /> :
                   <FiMapPin size={20} />}
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                </div>
                <FiArrowRight size={16} />
              </a>
            ))}
          </div>
          <div className="rep-explore__cta-banner">
            <h3>{t.explore.ctaTitle}</h3>
            <p>{t.explore.ctaText}</p>
            <p style={{ fontSize: 'var(--fs-label-sm)', opacity: 0.8, marginBottom: 20 }}>{t.explore.ctaNote}</p>
            <div className="rep-explore__cta-buttons">
              <a href="/advertise" className="rep-explore__cta-btn rep-explore__cta-btn--primary">
                <FiMessageCircle size={16} /> {t.explore.ctaBtn1}
              </a>
              <a href="https://wa.me/523221368611" className="rep-explore__cta-btn rep-explore__cta-btn--outline" target="_blank" rel="noopener noreferrer">
                <FiMessageCircle size={16} /> {t.explore.ctaBtn2}
              </a>
              <a href="/advertise" className="rep-explore__cta-btn rep-explore__cta-btn--outline">
                <FiCalendar size={16} /> {t.explore.ctaBtn3}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER TAGLINE ===== */}
      <div className="rep-footer">
        <div className="container">
          <p>{t.explore.footer}</p>
        </div>
      </div>
    </>
  );
}
