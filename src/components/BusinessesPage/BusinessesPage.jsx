import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiSearch, FiGrid, FiList, FiMap, FiMessageSquare, FiStar,
  FiCoffee, FiShoppingBag, FiHeart, FiCamera, FiMusic, FiVideo,
  FiBriefcase, FiHome, FiShield, FiStar as FiStarOutline, FiCheck
} from 'react-icons/fi';
import { 
  MdOutlineRestaurantMenu, MdOutlineLiquor, MdOutlineBeachAccess, MdOutlineDeliveryDining,
  MdOutlineStorefront, MdOutlineLocalCafe, MdOutlineLocalGroceryStore,
  MdOutlinePalette, MdOutlineCheckroom, MdOutlineMenuBook,
  MdOutlineSpa, MdOutlineFitnessCenter, MdOutlineFaceRetouchingNatural,
  MdOutlineEvent, MdOutlineFestival, MdOutlineRestaurant,
  MdOutlineSailing, MdOutlineScubaDiving, MdOutlinePhishing, MdOutlineGolfCourse,
  MdOutlineDirectionsCar, MdOutlinePlumbing, MdOutlineConstruction,
  MdOutlineHouseSiding, MdOutlineChildCare, MdOutlineMedicalServices, MdOutlinePets,
  MdOutlineLaptopMac, MdOutlineWaterDrop
} from 'react-icons/md';
import { 
  GiTacos, GiChefToque, GiWineBottle, GiWhaleTail, GiSurfBoard
} from 'react-icons/gi';
import { FaHorseHead, FaRing } from 'react-icons/fa';
import { BiLeaf } from 'react-icons/bi';

import './BusinessesPage.css';

import imgCatering from '../../assets/businesses/catering.png';
import imgFishing from '../../assets/businesses/fishing.png';
import imgGolfCarts from '../../assets/businesses/golf-carts.png';
import imgRealEstate from '../../assets/businesses/real-estate.png';
import imgRestaurants from '../../assets/businesses/restaurants.png';
import imgSurfing from '../../assets/businesses/surfing.png';
import imgTours from '../../assets/businesses/tours.png';
import imgTransportation from '../../assets/businesses/transportation.png';
import imgWedding from '../../assets/businesses/wedding.png';
import imgDailyPick from '../../assets/businesses/daily-pick.png';
import imgBg from '../../assets/sayulita.webp';

const i18n = {
  ENG: {
    searchPlaceholder: "Search Sayulita Businesses",
    searchBtn: "Search",
    tabs: [
      { id: 'categories', label: 'Browse Categories', icon: <FiGrid /> },
      { id: 'az', label: 'Browse A-Z', icon: <FiList /> },
      { id: 'map', label: 'View Business Map', icon: <FiMap /> },
    ],
    popularTitle: "Popular Categories",
    popularCategories: [
      { name: "Catering/Private Chef", img: imgCatering.src },
      { name: "Fishing Trips", img: imgFishing.src },
      { name: "Golf Carts", img: imgGolfCarts.src },
      { name: "Real Estate", img: imgRealEstate.src },
      { name: "Restaurants", img: imgRestaurants.src },
      { name: "Surfing", img: imgSurfing.src },
      { name: "Tours", img: imgTours.src },
      { name: "Transportation", img: imgTransportation.src },
      { name: "Wedding Services", img: imgWedding.src }
    ],
    dailyPick: {
      tag: "DAILY BUSINESS PICK",
      date: "MAY 30",
      name: "Hotel Amor Boutique",
      reviews: "22 reviews",
      img: imgDailyPick.src
    },
    leaveReview: {
      title: "LEAVE A BUSINESS REVIEW",
      subtitle: "Gracias!"
    },
    sections: [
      {
        id: 'eat-drink',
        title: "EAT & DRINK",
        icon: <GiTacos />,
        desc: "Enjoy Sayulita. From beachfront seafood dishes to cozy little coffee shops and regional tequila tastings, find the top spots to eat and have a good time.",
        links: [
          { label: "Bars & Nightlife", icon: <MdOutlineLiquor /> },
          { label: "Beachfront Dining", icon: <MdOutlineBeachAccess /> },
          { label: "Catering & Private Chefs", icon: <GiChefToque /> },
          { label: "Food Specialties", icon: <MdOutlineStorefront /> },
          { label: "Restaurants", icon: <MdOutlineRestaurantMenu /> },
          { label: "Restaurants (Delivery)", icon: <MdOutlineDeliveryDining /> },
          { label: "Smoothies", icon: <FiCoffee /> },
          { label: "Beach Bars & Day Passes", icon: <MdOutlineBeachAccess /> },
          { label: "Cafes, Bakeries & Desserts", icon: <MdOutlineLocalCafe /> },
          { label: "Fine Dining", icon: <MdOutlineRestaurant /> },
          { label: "Groceries", icon: <MdOutlineLocalGroceryStore /> },
          { label: "Restaurants (Food Trucks)", icon: <MdOutlineStorefront /> },
          { label: "Restaurants (Vegetarian/Vegan)", icon: <BiLeaf /> },
          { label: "Wine, Spirits & Cigars", icon: <GiWineBottle /> }
        ]
      },
      {
        id: 'shopping',
        title: "SHOPPING & ART",
        icon: <FiShoppingBag />,
        desc: "Shop at Sayulita's boutiques and artisan markets. Discover handmade jewelry, colorful artwork, and special souvenirs from this magical place.",
        links: [
          { label: "Art Galleries & Classes", icon: <MdOutlinePalette /> },
          { label: "Clothing Boutiques", icon: <MdOutlineCheckroom /> },
          { label: "Organic Products", icon: <BiLeaf /> },
          { label: "Bookstores", icon: <MdOutlineMenuBook /> },
          { label: "Jewelry", icon: <FiStarOutline /> },
          { label: "Shopping", icon: <FiShoppingBag /> }
        ]
      },
      {
        id: 'wellness',
        title: "WELLNESS & BEAUTY",
        icon: <MdOutlineSpa />,
        desc: "Revitalize both body and mind. From massage therapies and wellness centers to yoga classes and skincare.",
        links: [
          { label: "Hair & Beauty", icon: <MdOutlineFaceRetouchingNatural /> },
          { label: "Massage & Spa", icon: <MdOutlineSpa />, href: '/sayulita-massage' },
          { label: "Spas", icon: <MdOutlineSpa /> },
          { label: "Health & Wellness", icon: <FiHeart /> },
          { label: "Medical Esthetics & Skincare", icon: <MdOutlineFaceRetouchingNatural /> },
          { label: "Yoga & Fitness", icon: <MdOutlineFitnessCenter /> }
        ]
      },
      {
        id: 'weddings',
        title: "WEDDINGS & EVENTS",
        icon: <FaRing />,
        desc: "Planning the wedding of your dreams or a unique getaway? Get in touch with event experts, flower designers, and musical artists in Sayulita.",
        links: [
          { label: "Events/Retreats/Weddings", icon: <MdOutlineEvent /> },
          { label: "Music & Entertainment", icon: <FiMusic /> },
          { label: "Retreats & Workshops", icon: <MdOutlineFestival /> },
          { label: "Wedding & Event Planners", icon: <MdOutlineEvent /> },
          { label: "Florists", icon: <BiLeaf /> },
          { label: "Photography", icon: <FiCamera /> },
          { label: "Video Services", icon: <FiVideo /> },
          { label: "Wedding Services", icon: <FaRing /> }
        ]
      },
      {
        id: 'activities',
        title: "ACTIVITIES & ADVENTURES",
        icon: <GiSurfBoard />,
        desc: "Get outside and have fun. Whether it's riding the well-known waves or discovering paths in the jungle, there's an adventure for every person.",
        links: [
          { label: "Surfing", icon: <GiSurfBoard /> },
          { label: "Tours & Adventures", icon: <FiMap /> },
          { label: "Whale Watching", icon: <GiWhaleTail /> },
          { label: "Golf", icon: <MdOutlineGolfCourse /> },
          { label: "Sailing", icon: <MdOutlineSailing /> },
          { label: "Fishing", icon: <MdOutlinePhishing /> },
          { label: "Stand Up Paddle", icon: <GiSurfBoard /> },
          { label: "Culinary/Cooking Classes", icon: <GiChefToque /> },
          { label: "Pickleball", icon: <FiStarOutline /> },
          { label: "Diving", icon: <MdOutlineScubaDiving /> },
          { label: "Equestrian Club", icon: <FaHorseHead /> },
          { label: "Yoga & Fitness", icon: <MdOutlineFitnessCenter /> },
          { label: "Golf Cart Rentals", icon: <MdOutlineDirectionsCar /> },
          { label: "Horses", icon: <FaHorseHead /> }
        ]
      },
      {
        id: 'home-services',
        title: "HOME, SERVICES & PRACTICAL",
        icon: <FiHome />,
        desc: "Locate reliable services in your area - ranging from home repairs and insurance policies to storage options.",
        links: [
          { label: "Concierge/Vacation Planner", icon: <MdOutlineEvent /> },
          { label: "Delivery Services", icon: <MdOutlineDeliveryDining /> },
          { label: "Legal & Insurance", icon: <FiBriefcase /> },
          { label: "Real Estate", icon: <MdOutlineHouseSiding /> },
          { label: "Taxi & Transportation", icon: <MdOutlineDirectionsCar /> },
          { label: "Water Services & Solutions", icon: <MdOutlineWaterDrop /> },
          { label: "Construction & Design", icon: <MdOutlineConstruction /> },
          { label: "Home & Garden", icon: <MdOutlinePlumbing /> },
          { label: "Property Management", icon: <FiHome /> },
          { label: "Special Services", icon: <FiStarOutline /> },
          { label: "Video Services", icon: <FiVideo /> }
        ]
      },
      {
        id: 'family',
        title: "FAMILY & OTHER SERVICES",
        icon: <MdOutlineChildCare />,
        desc: "Traveling with children or animals? Need medical assistance or a place to work? Sayulita provides services for the whole family.",
        links: [
          { label: "Baby Equipment", icon: <MdOutlineChildCare /> },
          { label: "Co-Working & Office Spaces", icon: <MdOutlineLaptopMac /> },
          { label: "Insurance", icon: <FiShield /> },
          { label: "Photography", icon: <FiCamera /> },
          { label: "Childcare & Kid Services", icon: <MdOutlineChildCare /> },
          { label: "Doctors & Physio", icon: <MdOutlineMedicalServices /> },
          { label: "Pet Services", icon: <MdOutlinePets /> }
        ]
      }
    ],
  },
  ESP: {
    searchPlaceholder: "Buscar Negocios en Sayulita",
    searchBtn: "Buscar",
    tabs: [
      { id: 'categories', label: 'Ver Categorías', icon: <FiGrid /> },
      { id: 'az', label: 'Ver A-Z', icon: <FiList /> },
      { id: 'map', label: 'Mapa de Negocios', icon: <FiMap /> },
    ],
    popularTitle: "Categorías Populares",
    popularCategories: [
      { name: "Catering/Chef Privado", img: imgCatering.src },
      { name: "Viajes de Pesca", img: imgFishing.src },
      { name: "Carritos de Golf", img: imgGolfCarts.src },
      { name: "Bienes Raíces", img: imgRealEstate.src },
      { name: "Restaurantes", img: imgRestaurants.src },
      { name: "Surf", img: imgSurfing.src },
      { name: "Tours", img: imgTours.src },
      { name: "Transporte", img: imgTransportation.src },
      { name: "Servicios de Boda", img: imgWedding.src }
    ],
    dailyPick: {
      tag: "SELECCIÓN DIARIA",
      date: "30 MAYO",
      name: "Hotel Amor Boutique",
      reviews: "22 reseñas",
      img: imgDailyPick.src
    },
    leaveReview: {
      title: "DEJA UNA RESEÑA",
      subtitle: "¡Gracias!"
    },
    sections: [
      {
        id: 'eat-drink',
        title: "COMER & BEBER",
        icon: <GiTacos />,
        desc: "Disfruta de Sayulita. Desde platos de pescado junto a la playa hasta pequeñas cafeterías y degustaciones de tequila regional, encuentra los lugares más destacados para comer y pasar un buen rato.",
        links: [
          { label: "Bares & Vida Nocturna", icon: <MdOutlineLiquor /> },
          { label: "Cenas Frente al Mar", icon: <MdOutlineBeachAccess /> },
          { label: "Catering & Chefs Privados", icon: <GiChefToque /> },
          { label: "Especialidades Alimenticias", icon: <MdOutlineStorefront /> },
          { label: "Restaurantes", icon: <MdOutlineRestaurantMenu /> },
          { label: "Restaurantes (A Domicilio)", icon: <MdOutlineDeliveryDining /> },
          { label: "Licuados y Smoothies", icon: <FiCoffee /> },
          { label: "Clubes de Playa", icon: <MdOutlineBeachAccess /> },
          { label: "Cafeterías y Postres", icon: <MdOutlineLocalCafe /> },
          { label: "Alta Cocina", icon: <MdOutlineRestaurant /> },
          { label: "Supermercados", icon: <MdOutlineLocalGroceryStore /> },
          { label: "Food Trucks", icon: <MdOutlineStorefront /> },
          { label: "Opciones Veganas/Vegetarianas", icon: <BiLeaf /> },
          { label: "Vino, Licores & Puros", icon: <GiWineBottle /> }
        ]
      },
      {
        id: 'shopping',
        title: "COMPRAS & ARTE",
        icon: <FiShoppingBag />,
        desc: "Adquiere productos en las tiendas y mercados de artesanos de Sayulita. Descubre joyas elaboradas a mano, obras de arte coloridas y souvenirs especiales de este lugar mágico.",
        links: [
          { label: "Galerías de Arte & Clases", icon: <MdOutlinePalette /> },
          { label: "Boutiques de Ropa", icon: <MdOutlineCheckroom /> },
          { label: "Productos Orgánicos", icon: <BiLeaf /> },
          { label: "Librerías", icon: <MdOutlineMenuBook /> },
          { label: "Joyería", icon: <FiStarOutline /> },
          { label: "Compras Generales", icon: <FiShoppingBag /> }
        ]
      },
      {
        id: 'wellness',
        title: "BIENESTAR & BELLEZA",
        icon: <MdOutlineSpa />,
        desc: "Revitaliza tanto el cuerpo como la mente. Desde terapias de masaje y centros de bienestar hasta clases de yoga y cuidados para la piel.",
        links: [
          { label: "Cabello & Belleza", icon: <MdOutlineFaceRetouchingNatural /> },
          { label: "Masajes & Spa", icon: <MdOutlineSpa />, href: '/sayulita-massage' },
          { label: "Spas", icon: <MdOutlineSpa /> },
          { label: "Salud & Bienestar", icon: <FiHeart /> },
          { label: "Estética Médica", icon: <MdOutlineFaceRetouchingNatural /> },
          { label: "Yoga & Fitness", icon: <MdOutlineFitnessCenter /> }
        ]
      },
      {
        id: 'weddings',
        title: "BODAS & EVENTOS",
        icon: <FaRing />,
        desc: "¿Organizando la boda que siempre has deseado o una escapada única? Ponte en contacto con expertos en eventos, diseñadores de flores y artistas musicales en Sayulita.",
        links: [
          { label: "Eventos/Retiros/Bodas", icon: <MdOutlineEvent /> },
          { label: "Música & Entretenimiento", icon: <FiMusic /> },
          { label: "Retiros & Talleres", icon: <MdOutlineFestival /> },
          { label: "Planificadores de Eventos", icon: <MdOutlineEvent /> },
          { label: "Floristas", icon: <BiLeaf /> },
          { label: "Fotografía", icon: <FiCamera /> },
          { label: "Servicios de Video", icon: <FiVideo /> },
          { label: "Servicios de Boda", icon: <FaRing /> }
        ]
      },
      {
        id: 'activities',
        title: "ACTIVIDADES & AVENTURA",
        icon: <GiSurfBoard />,
        desc: "Sal a divertirte afuera. Ya sea montando las conocidas olas o descubriendo caminos en la jungla, hay una aventura para cada persona.",
        links: [
          { label: "Surf", icon: <GiSurfBoard /> },
          { label: "Tours & Aventuras", icon: <FiMap /> },
          { label: "Avistamiento de Ballenas", icon: <GiWhaleTail /> },
          { label: "Golf", icon: <MdOutlineGolfCourse /> },
          { label: "Veleo", icon: <MdOutlineSailing /> },
          { label: "Pesca", icon: <MdOutlinePhishing /> },
          { label: "Stand Up Paddle", icon: <GiSurfBoard /> },
          { label: "Clases de Cocina", icon: <GiChefToque /> },
          { label: "Pickleball", icon: <FiStarOutline /> },
          { label: "Buceo", icon: <MdOutlineScubaDiving /> },
          { label: "Club Ecuestre", icon: <FaHorseHead /> },
          { label: "Yoga & Fitness", icon: <MdOutlineFitnessCenter /> },
          { label: "Renta de Carritos de Golf", icon: <MdOutlineDirectionsCar /> },
          { label: "Caballos", icon: <FaHorseHead /> }
        ]
      },
      {
        id: 'home-services',
        title: "HOGAR & SERVICIOS",
        icon: <FiHome />,
        desc: "Localiza servicios de confianza en tu área - abarcando desde reparaciones en el hogar y pólizas de seguro hasta opciones para el almacenamiento.",
        links: [
          { label: "Concierge/Planeador Vacacional", icon: <MdOutlineEvent /> },
          { label: "Servicios de Entrega", icon: <MdOutlineDeliveryDining /> },
          { label: "Legal & Seguros", icon: <FiBriefcase /> },
          { label: "Bienes Raíces", icon: <MdOutlineHouseSiding /> },
          { label: "Taxis & Transporte", icon: <MdOutlineDirectionsCar /> },
          { label: "Servicios de Agua", icon: <MdOutlineWaterDrop /> },
          { label: "Construcción & Diseño", icon: <MdOutlineConstruction /> },
          { label: "Hogar & Jardín", icon: <MdOutlinePlumbing /> },
          { label: "Administración de Propiedades", icon: <FiHome /> },
          { label: "Servicios Especiales", icon: <FiStarOutline /> },
          { label: "Servicios de Video", icon: <FiVideo /> }
        ]
      },
      {
        id: 'family',
        title: "FAMILIA & OTROS SERVICIOS",
        icon: <MdOutlineChildCare />,
        desc: "¿Estás viajando con niños o animales? ¿Requieres asistencia médica o un lugar para trabajar? Sayulita brinda servicios para toda la familia.",
        links: [
          { label: "Equipamiento para Bebés", icon: <MdOutlineChildCare /> },
          { label: "Co-Working & Oficinas", icon: <MdOutlineLaptopMac /> },
          { label: "Seguros", icon: <FiShield /> },
          { label: "Fotografía", icon: <FiCamera /> },
          { label: "Cuidado de Niños", icon: <MdOutlineChildCare /> },
          { label: "Doctores & Fisioterapia", icon: <MdOutlineMedicalServices /> },
          { label: "Servicios para Mascotas", icon: <MdOutlinePets /> }
        ]
      }
    ],
  }
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function BusinessesPage({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  const [activeTab, setActiveTab] = useState('categories');

  const sectionOrder = [
    'activities',
    'wellness',
    'eat-drink',
    'weddings',
    'shopping',
    'home-services',
    'family'
  ];

  const orderedSections = [...t.sections].sort((a, b) => 
    sectionOrder.indexOf(a.id) - sectionOrder.indexOf(b.id)
  );

  const wellnessLinks = useMemo(() => {
    const section = t.sections.find(s => s.id === 'wellness');
    return section ? shuffleArray(section.links) : [];
  }, [language]);

  const eatDrinkLinks = useMemo(() => {
    const section = t.sections.find(s => s.id === 'eat-drink');
    return section ? shuffleArray(section.links) : [];
  }, [language]);

  const weddingsLinks = useMemo(() => {
    const section = t.sections.find(s => s.id === 'weddings');
    return section ? shuffleArray(section.links) : [];
  }, [language]);

  const shoppingLinks = useMemo(() => {
    const section = t.sections.find(s => s.id === 'shopping');
    return section ? shuffleArray(section.links) : [];
  }, [language]);

  const homeServicesLinks = useMemo(() => {
    const section = t.sections.find(s => s.id === 'home-services');
    return section ? shuffleArray(section.links) : [];
  }, [language]);

  const familyLinks = useMemo(() => {
    const section = t.sections.find(s => s.id === 'family');
    return section ? shuffleArray(section.links) : [];
  }, [language]);

  return (
    <div className="businesses-page">
      {/* Top Banner & Search Hero */}
      <section className="bp-search-hero">
        {/* Background Image */}
        <div className="bp-search-hero__bg">
          <img
        src={imgBg.src}
        alt="Sayulita background"
        className="bp-search-hero__bg-img"
        width={1200}
        height={800}
        fetchPriority="high"
      />
          <div className="bp-search-hero__overlay"></div>
        </div>

        <div className="container bp-search-hero__content">
          <div className="bp-search-hero__inner">
            <div className="bp-search-hero__bar">
              <FiSearch size={20} color="var(--color-outline)" />
              <input 
                type="text" 
                className="bp-search-hero__input" 
                placeholder={t.searchPlaceholder}
              />
              <button className="bp-search-hero__btn">
                <FiSearch size={18} />
                {t.searchBtn}
              </button>
            </div>
          </div>

          {/* Hero Cards Row: Daily Pick + Review Banner */}
          <div className="bp-search-hero__cards-row">
            {/* Daily Pick */}
            <motion.div 
              className="bp-daily-pick"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="bp-daily-pick__img-wrap">
                <div className="bp-daily-pick__badge">
                  <span className="bp-daily-pick__badge-tag bp-daily-pick__badge-tag--pick">{t.dailyPick.tag}</span>
                  <span className="bp-daily-pick__badge-tag bp-daily-pick__badge-tag--new">{t.dailyPick.date}</span>
                </div>
                <img src={t.dailyPick.img} alt={t.dailyPick.name} className="bp-daily-pick__img" />
              </div>
              <div className="bp-daily-pick__info">
                <h4 className="bp-daily-pick__name">{t.dailyPick.name}</h4>
                <div className="bp-daily-pick__stars">
                  {[...Array(5)].map((_, i) => <FiStar key={i} className="bp-daily-pick__star" size={14} />)}
                  <span className="bp-daily-pick__reviews">{t.dailyPick.reviews}</span>
                </div>
              </div>
            </motion.div>

            {/* Review Banner */}
            <motion.div 
              className="bp-review-banner"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="bp-review-banner__stars">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="bp-review-banner__star" size={16} />)}
              </div>
              <h3 className="bp-review-banner__title">{t.leaveReview.title}</h3>
              <div className="bp-review-banner__stars">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="bp-review-banner__star" size={16} />)}
              </div>
              <p className="bp-review-banner__subtitle">{t.leaveReview.subtitle}</p>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bp-tabs">
          {t.tabs.map(tab => (
            <button 
              key={tab.id}
              className={`bp-tabs__item ${activeTab === tab.id ? 'bp-tabs__item--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="bp-tabs__icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bp-popular">
        <div className="container">
          <h2 className="bp-popular__title">{t.popularTitle}</h2>
          
          {/* 9 Grid Images */}
          <div className="bp-popular__grid">
            {t.popularCategories.map((cat, idx) => (
              <motion.div 
                key={cat.name}
                className="bp-popular__card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <img src={cat.img} alt={cat.name} className="bp-popular__card-img" />
                <div className="bp-popular__card-overlay"></div>
                <h3 className="bp-popular__card-label">{cat.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <div className="bp-categories">
        {orderedSections.map((section) => (
          <section key={section.id} className="bp-category-section">
            <div className="container">
              <div className="bp-category__inner">
                {/* Section Header */}
                <motion.div 
                  className="bp-category__header"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bp-category__title-row">
                    <div className="bp-category__icon">{section.icon}</div>
                    <h2 className="bp-category__title">{section.title}</h2>
                  </div>
                  <p className="bp-category__desc">{section.desc}</p>
                </motion.div>

                {/* Section Links */}
                <motion.div 
                  className="bp-category__links"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {(section.id === 'wellness' ? wellnessLinks : section.id === 'eat-drink' ? eatDrinkLinks : section.id === 'weddings' ? weddingsLinks : section.id === 'shopping' ? shoppingLinks : section.id === 'home-services' ? homeServicesLinks : section.id === 'family' ? familyLinks : section.links).map((link) => {
                    const linkContent = (
                      <>
                        <span className="bp-category__link-icon">{link.icon}</span>
                        {link.label}
                      </>
                    );

                    if (link.href) {
                      return (
                        <Link key={link.label} href={link.href} className="bp-category__link">
                          {linkContent}
                        </Link>
                      );
                    }

                    return (
                      <a key={link.label} href="#businesses" className="bp-category__link">
                        {linkContent}
                      </a>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
