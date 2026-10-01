import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DateField from '../ui/DateField';
import {
  FiCalendar, FiSearch, FiStar, FiArrowRight, FiCheck,
  FiShield, FiDollarSign, FiMessageCircle, FiChevronDown,
  FiMapPin, FiClock, FiUsers, FiTag
} from 'react-icons/fi';
import {
  MdPool, MdBeachAccess, MdAcUnit, MdPets, MdRestaurant,
  MdOutlineHotel, MdOutlineLocationOn, MdSurfing,
  MdDirectionsBoat, MdOutlineSetMeal
} from 'react-icons/md';
import { IoBedOutline } from 'react-icons/io5';
import {
  BsHouseDoor, BsWater, BsTree, BsCupHot, BsBicycle,
  BsCalendarCheck
} from 'react-icons/bs';
import { GiWhaleTail, GiHorseHead, GiTurtle, GiParachute, GiGlassShot } from 'react-icons/gi';
import LazySwiper from '../ui/LazySwiper';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import heroBg from '../../assets/tours.webp';
import FloatingPalms from '../FloatingPalms/FloatingPalms';
import './ToursPage.css';

const i18n = {
  ESP: {
    meta: {
      title: 'Tours en Sayulita — Surf, Ballenas, Marietas y Más | SayulitaTravel',
      description: 'Los mejores tours y actividades en Sayulita: surf, avistamiento de ballenas, Islas Marietas, pesca, caballos, yoga y más. Reserva directo con el operador local sin comisión de Viator. Verificados desde 2000.',
    },
    hero: {
      label: 'SayulitaTravel Tours',
      title: 'Tours en Sayulita — Reserva Directo con el Operador Local,',
      accent: 'Sin Comisión de Viator',
      subtitle1: 'Sayulita tiene algo para cada tipo de viajero: olas para aprender a surfear, ballenas jorobadas en invierno, islas protegidas a 30 minutos en panga, selva para explorar a caballo y bienestar para quien necesita desconectar de verdad.',
      subtitle2: 'Todo con operadores locales que llevan años en el pueblo — y sin el 20–25% que Viator o GetYourGuide añaden al precio real.',
      trust: '50+ operadores de tours y actividades verificados en Sayulita, Nayarit, México',
    },
    search: {
      sectionTitle: 'Busca tu Tour o Actividad en Sayulita',
      categoryLabel: 'Categoría',
      dateLabel: 'Fecha',
      durationLabel: 'Duración',
      travelerLabel: 'Tipo de viajero',
      btnSearch: 'Buscar',
      tagsLabel: 'Populares hoy:',
      tags: [
        { label: 'Surf', icon: 'surf' },
        { label: 'Ballenas', icon: 'whale' },
        { label: 'Islas Marietas', icon: 'boat' },
        { label: 'Tortugas', icon: 'turtle' },
        { label: 'Caballos', icon: 'horse' },
        { label: 'Tequila Tour', icon: 'tequila' },
        { label: 'ATV', icon: 'atv' },
      ],
    },
    catalogTitle: 'Tours y Actividades en Sayulita por Tipo',
    catalogSubtitle: 'Sayulita no es un parque temático con un catálogo fijo de excursiones. Es un pueblo donde cada operador lleva años haciendo lo que hace — y se nota. Aquí las categorías con más demanda del inventario.',
    categories: [
      {
        key: 'surf',
        title: 'Clases de Surf en Sayulita — Para Principiantes y Nivel Intermedio',
        subtitle: 'Aprende a surfear en uno de los mejores spots de México',
        desc: 'Sayulita es uno de los mejores lugares de México para aprender a surfear. No lo decimos nosotros — lo dice el hecho de que tenga dos breaks con condiciones completamente distintas: la playa principal, más activa, y la playa norte, con ola suave e ideal para quien entra al agua por primera vez.',
        bullets: [
          'Clases individuales y grupales — máximo 4–6 alumnos por instructor en las grupales',
          'Todo el equipo incluido: tabla, traje (si el agua está fría), encerado',
          'Instrucción en español e inglés — todos los instructores son bilingües',
          'Clases para niños desde 5 años — los mejores instructores tienen experiencia con grupos infantiles',
          'Surf trips a breaks avanzados para quien ya tiene nivel y quiere salir del pueblo',
        ],
        duration: '1.5 a 2 horas por sesión',
        price: 'Desde $700 MXN por persona en clase grupal. Individual desde $1,200 MXN.',
        ideal: 'principiantes, nivel intermedio, niños desde 5 años, familias',
        note: 'Si reservas con el operador local directamente, el mismo instructor tiene disponibilidad para darte una segunda sesión ese mismo día o al día siguiente, ajustar el horario según las mareas y recomendarte el break correcto según tu nivel real. Eso no existe en una plataforma global.',
        icon: 'surf',
      },
      {
        key: 'whales',
        title: 'Avistamiento de Ballenas en Sayulita — Temporada Noviembre a Marzo',
        subtitle: 'Ballenas jorobadas a pocos metros de la costa',
        desc: 'Entre noviembre y marzo, las ballenas jorobadas llegan a Bahía de Banderas para aparearse y dar a luz. Sayulita tiene algo que Puerto Vallarta no tiene: en temporada alta, es posible verlas breaching desde la propia orilla, sin subir a un barco.',
        bullets: [
          'Lanzamiento en surf desde la playa — los barcos se lanzan directamente al rompiente de Sayulita',
          'Grupos pequeños: máximo 6–12 personas. No barcazas turísticas de 40 pasajeros',
          'Guías-investigadores: algunos operadores trabajan con biólogos marinos',
          'Duración: entre 2.5 y 3.5 horas en el agua',
          'Mejor mes: enero y febrero, cuando la concentración de ballenas es máxima',
        ],
        duration: '2.5 a 3.5 horas',
        price: 'Desde $1,600 MXN por persona en tour compartido. Tour privado familiar desde $10,000 MXN.',
        ideal: 'parejas, familias, amantes de la naturaleza, fotógrafos',
        note: 'La temporada se acaba. Los fines de semana de enero y febrero se reservan semanas antes. Si tienes fechas fijas, reserva con anticipación.',
        icon: 'whale',
      },
      {
        key: 'marietas',
        title: 'Tour a las Islas Marietas desde Sayulita',
        subtitle: 'El archipiélago volcánico a 30 minutos en panga',
        desc: 'Las Islas Marietas son un archipiélago volcánico protegido — zona de reserva de biósfera con acceso controlado. La famosa Playa del Amor (Playa Escondida), oculta dentro de una cueva formada por un cráter, es uno de los lugares más fotografiados de México. Las Marietas están más cerca de Sayulita que del Malecón de Puerto Vallarta.',
        bullets: [
          'Transporte en panga con salida desde la playa de Sayulita',
          'Guía bilingüe certificado para el área de reserva',
          'Equipo de snorkeling incluido',
          'Tiempo libre en la Playa del Amor (según permisos del día)',
          'Snorkeling en aguas con peces tropicales, mantarrayas y vida marina variada',
        ],
        duration: '4 a 5 horas en total',
        price: 'Desde $1,200 MXN por persona en tour compartido.',
        ideal: 'parejas, familias con niños mayores, viajeros activos, amantes del snorkel',
        note: 'El acceso a la Playa del Amor dentro de la cueva requiere permiso especial que tiene cupo diario limitado. No todos los tours garantizan la entrada — pregunta al operador antes de reservar si el permiso está incluido.',
        icon: 'boat',
      },
      {
        key: 'fishing',
        title: 'Pesca Deportiva en Sayulita — Mahi-mahi, Pez Vela y Marlin',
        subtitle: 'La bahía de Banderas, uno de los mejores caladeros del Pacífico',
        desc: 'La bahía de Banderas es uno de los mejores caladeros del Pacífico mexicano. Desde Sayulita salen pangas y yates de pesca con capitanes que conocen exactamente dónde encontrar mahi-mahi, atún, pez vela y marlin según la temporada.',
        bullets: [
          'Media jornada (4 horas): ideal para quien quiere pescar pero no tiene el día completo',
          'Jornada completa (7–8 horas): para ir a aguas más profundas. Pez vela, marlin y atún',
          'Combinación pesca + snorkeling para grupos mixtos',
          'Equipo de pesca completo, carnada, capitán y marinero a bordo',
          'El capitán limpia el pescado al volver — muchos restaurantes lo cocinan ese mismo día',
        ],
        duration: '4 a 8 horas',
        price: 'Media jornada desde $3,500 MXN por panga (hasta 4 personas). Completa desde $5,500 MXN.',
        ideal: 'grupos de amigos, pescadores experimentados y principiantes, familias',
        icon: 'fishing',
      },
      {
        key: 'horses',
        title: 'Tours a Caballo por la Selva y la Playa de Sayulita',
        subtitle: 'Explora la selva tropical a caballo',
        desc: 'La selva que rodea Sayulita cambia completamente tu perspectiva del pueblo — y la mejor forma de explorarla sin esfuerzo físico intenso es a caballo. Los recorridos guiados combinan senderos entre vegetación tropical, miradores con vista al mar y desembocadura en alguna de las playas secretas del área.',
        bullets: [
          'Recorridos de 1.5 a 3 horas según el circuito',
          'Caballos mansos para principiantes, caballos con más carácter para quien tiene experiencia',
          'Grupos pequeños: máximo 8–10 personas por guía',
          'Aptos para niños desde 7 años (algunos operadores desde 5 con supervisión directa)',
          'Paradas fotográficas en miradores sobre la bahía',
        ],
        duration: '1.5 a 3 horas',
        price: 'Desde $900 MXN por persona.',
        ideal: 'familias, parejas, principiantes, niños desde 7 años',
        note: 'Ve por la mañana temprano. El calor de mediodía no es agradable para los caballos ni para ti — y la luz de las primeras horas es la mejor para fotos.',
        icon: 'horse',
      },
      {
        key: 'yoga',
        title: 'Yoga, Meditación y Retiros de Bienestar en Sayulita',
        subtitle: 'Desconecta de verdad en el paraíso',
        desc: 'Sayulita tiene una escena de bienestar desproporcionalmente buena para el tamaño del pueblo. Hay clases de yoga todas las mañanas en estudios al aire libre, retiros de fin de semana con alojamiento incluido, y maestros que llevan décadas aquí.',
        bullets: [
          'Clases sueltas de yoga: sesiones matutinas y al atardecer. Desde $200 MXN por clase',
          'Retiros de fin de semana: 2 noches con alojamiento, tres sesiones diarias de yoga. Desde $4,500 MXN',
          'Retiros de una semana: programas completos con actividades complementarias',
          'Masajes y terapias: shiatsu, tailandés, sueco, hot stones. Desde $800 MXN la hora',
          'Clases de meditación y breathwork para quienes buscan algo más allá del yoga físico',
        ],
        duration: 'Desde 1 hora por clase hasta 7 días en retiro',
        price: 'Clases desde $200 MXN. Retiros desde $4,500 MXN.',
        ideal: 'viajeros solos, parejas, nómadas digitales, quienes buscan bienestar',
        icon: 'yoga',
      },
      {
        key: 'tequila',
        title: 'Tour de Tequila, Raicilla y Mezcal en Sayulita',
        subtitle: 'La experiencia de destilería artesanal más auténtica',
        desc: 'Este tour es uno de los más comentados y menos replicables de la Riviera Nayarit. Visitas una destilería de agave en funcionamiento en las afueras de Sayulita — sin aditivos, sin producción industrial, con el proceso artesanal que lleva generaciones en la familia.',
        bullets: [
          'Recorrido guiado por el proceso completo: cultivo del agave, cocción, fermentación y destilación',
          'Cata comentada de tequila, raicilla y mezcal de producción propia con maridaje de botanas locales',
          'Comida farm-to-table en la finca después de la cata',
          'Transporte desde Sayulita y vuelta incluido',
          'La raicilla es el destilado de agave propio de Nayarit — no lo encontrarás en tours estándar de Jalisco',
        ],
        duration: '4 a 5 horas',
        price: 'Desde $1,400 MXN por persona con transporte y comida incluidos.',
        ideal: 'parejas, grupos de amigos, amantes de la gastronomía, quienes buscan algo único',
        icon: 'tequila',
      },
      {
        key: 'adventure',
        title: 'ATV, Zipline y Aventura en la Selva de Sayulita',
        subtitle: 'Adrenalina entre días de playa',
        desc: 'Para quien necesita adrenalina entre días de playa, Sayulita tiene selva y sierra accesibles desde el pueblo en menos de 20 minutos.',
        bullets: [
          'Tours en ATV: recorridos de 2 a 3 horas por caminos de sierra con vistas al mar',
          'Tirolesa (zipline): líneas sobre la copa de los árboles con plataformas a distintas alturas',
          'Senderismo guiado: rutas de 2 a 4 horas por la selva con guías expertos',
          'Cuatrimoto + playa secreta: la combinación favorita, ATV hasta la playa, snorkeling, vuelta',
          'Conductores desde 18 años; algunos permiten desde 16 con adulto a bordo',
        ],
        duration: '2 a 4 horas',
        price: 'ATV desde $1,100 MXN por persona. Zipline desde $800 MXN.',
        ideal: 'grupos de amigos, parejas aventureras, viajeros activos, despedidas',
        icon: 'atv',
      },
      {
        key: 'turtles',
        title: 'Rescate de Tortugas en Sayulita — La Experiencia Favorita de las Familias',
        subtitle: 'Una experiencia que los niños recuerdan de por vida',
        desc: 'Entre julio y noviembre, las tortugas marinas llegan a desovar a las playas de Sayulita. El campamento tortugero local trabaja cada noche para proteger los nidos y liberar las crías cuando están listas. Ver a cien crías correr hacia el Pacífico de noche es algo que los niños recuerdan de por vida.',
        bullets: [
          'Salidas nocturnas: generalmente entre las 9 PM y las 11 PM según actividad del nido',
          'Grupos pequeños, guiados por personal del campamento tortugero',
          'Aptas para niños desde los 4 años con adulto',
          'Duración: entre 1.5 y 2.5 horas dependiendo de la actividad del nido ese día',
          'No todos los días hay liberación disponible — confirma disponibilidad con el operador',
        ],
        duration: '1.5 a 2.5 horas',
        price: 'Desde $400 MXN por persona con donativo al campamento incluido.',
        ideal: 'familias con niños, amantes de la naturaleza, viajeros conscientes',
        note: 'Esta actividad no se puede garantizar con semanas de antelación porque depende del ciclo de los nidos. La forma de reservar es contactar al operador ese mismo día por la tarde.',
        icon: 'turtle',
      },
    ],
    why: {
      label: 'Ahorra dinero, viaja inteligente',
      title: '¿Por qué reservar directo con operadores locales de Sayulita?',
      subtitle: 'La respuesta corta: porque pagas menos y obtienes más. Viator y GetYourGuide añaden entre un 20% y un 25% al precio del operador local. Ese dinero no llega al guía — se queda en la plataforma.',
      cards: [
        {
          icon: 'dollar',
          title: 'Sin Comisión de Viator — El Precio del Operador Local',
          text: 'Clase de surf a $800 MXN con el operador → $960–$1,000 MXN en Viator. Tour de ballenas a $1,600 MXN → $1,920–$2,000 MXN en Viator. Para una familia de cuatro que hace dos actividades en una semana, la diferencia puede superar los $3,000–$5,000 MXN. Suficiente para una noche más de alojamiento.',
        },
        {
          icon: 'shield',
          title: 'Operadores Verificados por Nuestro Equipo en Sayulita',
          text: 'Cada operador listado ha sido evaluado por nuestro equipo local. Verificamos licencias y permisos vigentes, equipamiento de seguridad, historial de operación y capacidad real. Los operadores anónimos de Viator con tres reseñas de hace dos años no pasan esta verificación.',
        },
        {
          icon: 'message',
          title: 'Contacto Directo con el Guía Antes de Reservar',
          text: 'Antes de pagar, puedes hablar con el operador. Pregunta si el tour es apto para tu hijo de 6 años, qué pasa si hay mal clima, si pueden ajustar el horario, qué incluye el equipo de snorkeling. Esa conversación no existe en Viator — solo formularios y políticas de cancelación en letra pequeña.',
        },
      ],
    },
    pvGuide: {
      label: 'Tour a Sayulita desde Puerto Vallarta',
      title: 'Tour a Sayulita desde Puerto Vallarta — Guía Completa para el Día',
      subtitle: 'Sayulita está a 45 minutos al norte del aeropuerto de Puerto Vallarta. Es la excursión de un día más popular de la Riviera Nayarit — y la que mejor relación calidad/experiencia tiene en toda la zona.',
      howTitle: '¿Cómo llegar a Sayulita desde el aeropuerto de Puerto Vallarta?',
      options: [
        { title: 'Transfer privado', desc: 'Puerta a puerta en 40–50 minutos. Entre $600 y $900 MXN el trayecto completo.', icon: 'car' },
        { title: 'Autobús público', desc: 'Desde la parada cerca del Walmart frente al aeropuerto. Trayecto de 1h 15min a 1h 45min. Menos de $100 MXN.', icon: 'bus' },
        { title: 'Taxi colectivo (combi)', desc: 'Punto intermedio. Sale de las afueras del aeropuerto cuando se llena.', icon: 'van' },
        { title: 'Auto rentado', desc: 'Trayecto por la carretera 200 hacia el norte. Sencillo y sin peajes.', icon: 'car' },
      ],
      guidedTitle: 'Tour Guiado de un Día a Sayulita y San Pancho desde Puerto Vallarta',
      guidedDesc: 'Si prefieres ir con guía y transporte organizado, los tours de día completo desde Puerto Vallarta son la opción sin complicaciones logísticas.',
      guidedIncludes: [
        'Recogida en hotel en Puerto Vallarta o en el Malecón',
        'Parada opcional en tianguis local en la carretera 200',
        'Visita a San Pancho (San Francisco): pueblo tranquilo a 5 km al norte de Sayulita',
        'Llegada a Sayulita: tiempo libre para explorar el centro, mercado y playa',
        'Almuerzo en restaurante local (incluido en tours premium)',
        'Regreso a Puerto Vallarta al final de la tarde',
      ],
      guidedNote: 'El tour grupal tiene itinerario fijo. El tour privado te permite ajustar los tiempos y añadir surf, caballos o snorkeling. Para grupos de 4+, el precio por cabeza del tour privado se acerca al grupal.',
      guidedPrice: 'Tours grupales desde $800 MXN por persona. Tours privados desde $3,500 MXN para hasta 4 personas.',
      itineraryTitle: 'Itinerario Recomendado: Sayulita + Actividad + San Pancho',
      itinerary: [
        { time: '9:00 AM', text: 'Llegada a San Pancho. 45 minutos para caminar las calles, ver la plaza y la iglesia.' },
        { time: '10:00 AM', text: 'Llegada a Sayulita. Check-in con el operador de surf o la actividad reservada.' },
        { time: '10:15 AM – 12:00 PM', text: 'Clase de surf, paseo a caballo o snorkeling. La mañana es el mejor momento para actividades acuáticas.' },
        { time: '12:30 PM', text: 'Almuerzo en el centro de Sayulita. Tacos, ceviche o sopa de mariscos.' },
        { time: '2:00 – 4:30 PM', text: 'Tarde libre: playa, mercado de artesanías, tiendas del centro.' },
        { time: '5:00 PM', text: 'Salida de regreso a Puerto Vallarta. Llegas antes de las 6:30 PM.' },
      ],
    },
    reviews: [
      {
        quote: 'Reservé la clase de surf directamente con la escuela a través de SayulitaTravel. Mismo operador que en Viator, $200 MXN menos por persona. Para nuestra familia de cuatro, ahorramos $800 MXN. El instructor fue increíble — los dos niños se levantaron en la primera hora.',
        name: 'Daniela M.',
        location: 'Monterrey',
        activity: 'Clase de surf',
        date: 'Enero 2025',
        rating: 5,
      },
      {
        quote: 'El tour de ballenas desde Sayulita no tiene nada que ver con los tours masivos del Malecón de PVR. Salimos en panga directamente desde la playa, éramos 8 personas y el guía era investigador de cetáceos. En dos horas vimos cuatro ballenas jorobadas a menos de 30 metros.',
        name: 'Chris y Laura P.',
        location: 'Toronto',
        activity: 'Tour de ballenas',
        date: 'Febrero 2025',
        rating: 5,
      },
      {
        quote: 'Vine de día desde Puerto Vallarta sin reservar nada. El equipo de SayulitaTravel me orientó desde el teléfono — me recomendaron el operador de caballos correcto para mis hijos pequeños y me dieron el contacto directo. En 20 minutos tenía todo organizado.',
        name: 'Roberto A.',
        location: 'Ciudad de México',
        activity: 'Tour a caballo',
        date: 'Marzo 2025',
        rating: 5,
      },
    ],
    travelerGuide: {
      label: 'Guía por tipo de viajero',
      title: 'Guía de Tours en Sayulita por Tipo de Viajero',
      subtitle: 'No todos buscan lo mismo en Sayulita. Aquí las combinaciones que mejor funcionan según con quién viajes.',
      types: [
        {
          key: 'families',
          title: 'Tours y Actividades para Familias con Niños en Sayulita',
          icon: 'families',
          desc: 'Sayulita funciona especialmente bien con niños — el pueblo es pequeño y caminable, la playa norte tiene ola suave, y las actividades están diseñadas para hacerlos participar.',
          bullets: [
            'Rescate de tortugas (julio–noviembre): la favorita de los niños. Apto desde 4 años.',
            'Clase de surf: instructores con experiencia real con niños. Desde 5 años.',
            'Snorkeling en Los Muertos Beach: peces tropicales a un metro de profundidad.',
            'Paseo a caballo: grupos pequeños, caballos mansos. Desde 7 años.',
          ],
          avoid: 'Evita con niños pequeños: ATV (no para menores de 16–18) y tour a las Marietas (largo para niños de menos de 6 años si el agua está movida).',
        },
        {
          key: 'couples',
          title: 'Las Mejores Actividades para Parejas en Sayulita',
          icon: 'couples',
          desc: 'Sayulita tiene un ritmo que funciona especialmente bien para parejas.',
          bullets: [
            'Avistamiento de ballenas al amanecer + desayuno en la terraza',
            'Tour de destilería con cata privada de raicilla y mezcal',
            'Clase de surf para los dos + tarde en la playa norte',
            'Excursión a las Marietas en temporada: snorkeling, Playa del Amor, delfines',
          ],
        },
        {
          key: 'groups',
          title: 'Sayulita para Grupos — Actividades y Tours para 10 o Más Personas',
          icon: 'groups',
          desc: 'Los grupos tienen opciones que los viajeros individuales no tienen.',
          bullets: [
            'Charter privado de pesca: barco completo desde $8,000 MXN para hasta 8 personas',
            'Tour de ATV en caravana: hasta 15 vehículos en grupo',
            'Clases de surf colectivas: capacidad para grupos de hasta 20 personas',
            'Tour a las Marietas en barco privado para 10–15 personas',
          ],
          note: 'Para coordinar grupos grandes, escríbenos antes de llegar. Hacemos esto regularmente para bodas, retreats y grupos corporativos.',
        },
      ],
    },
    seasons: {
      label: 'Calendario de temporadas',
      title: 'Cuándo Hacer Cada Tour — Calendario de Temporadas en Sayulita',
      subtitle: 'Algunas de las mejores actividades de Sayulita tienen temporada. Saber cuándo ir cambia completamente lo que puedes hacer.',
      items: [
        {
          title: 'Avistamiento de Ballenas (Noviembre a Marzo)',
          icon: 'whale',
          months: [
            { name: 'Noviembre', desc: 'Primeras ballenas. Avistamientos menos frecuentes, ambiente exclusivo.' },
            { name: 'Diciembre–Enero', desc: 'Concentración aumenta rápidamente. Los fines de semana de enero son los más demandados.' },
            { name: 'Febrero', desc: 'El pico absoluto. En días buenos se cuentan decenas desde la orilla.' },
            { name: 'Marzo', desc: 'Migración de regreso. Avistamientos frecuentes en la primera mitad del mes.' },
          ],
          tip: 'Si puedes elegir, ve en enero o principios de febrero.',
        },
        {
          title: 'Rescate de Tortugas (Julio a Noviembre)',
          icon: 'turtle',
          months: [
            { name: 'Julio–Agosto', desc: 'Inicio de temporada. Nidos nuevos, crías que tardarán semanas en salir.' },
            { name: 'Septiembre–Octubre', desc: 'Pico de liberaciones. Probabilidad máxima de coincidir con una salida nocturna.' },
            { name: 'Noviembre', desc: 'Final de temporada. Liberaciones menos frecuentes.' },
          ],
          tip: 'Confirma disponibilidad el mismo día por la tarde. El campamento comunica si habrá liberación esa noche.',
        },
        {
          title: 'Surf en Sayulita — Todo el Año',
          icon: 'surf',
          months: [
            { name: 'Mayo–Octubre', desc: 'Olas más consistentes y grandes para nivel intermedio y avanzado. Mejor época del año.' },
            { name: 'Noviembre–Abril', desc: 'Olas más pequeñas y regulares, perfectas para principiantes. Tiempo soleado.' },
          ],
          tip: 'Para aprender: cualquier época funciona. Para mejorar nivel: ve de mayo a octubre.',
        },
      ],
    },
    faq: {
      title: 'Preguntas Frecuentes sobre Tours en Sayulita y Desde Puerto Vallarta',
      subtitle: 'Todo lo que necesitas saber, respondido por expertos locales.',
    },
    faqs: [
      {
        q: '¿Cuánto cuesta una clase de surf en Sayulita?',
        a: 'Clases grupales (máximo 4–6 alumnos por instructor) desde $700 MXN por persona, incluyen tabla, equipo y sesión de 1.5 a 2 horas. Clases individuales desde $1,200 MXN. Reservando directamente con el operador a través de SayulitaTravel pagas el precio del operador — la misma clase en Viator cuesta entre $840 y $900 MXN.',
      },
      {
        q: '¿Cuál es el mejor tour de un día desde Puerto Vallarta a Sayulita?',
        a: 'Si quieres solo conocer el pueblo, un tour grupal con transporte y guía cubre lo básico por $800–$1,000 MXN. Si quieres hacer surf, caballos o snorkeling, el tour privado vale la diferencia de precio — puedes ajustar los tiempos.',
      },
      {
        q: '¿Es Sayulita bueno para el surf siendo principiante total?',
        a: 'Sí — uno de los mejores en México para empezar. La playa norte tiene una ola suave que rompe con consistencia y en aguas poco profundas. En una sesión de 2 horas con buen instructor, la gran mayoría de principiantes se pone de pie en la tabla al menos una vez.',
      },
      {
        q: '¿Cuándo es la temporada de avistamiento de ballenas en Sayulita?',
        a: 'De noviembre a marzo, con el pico en enero y febrero. Los tours salen directamente desde la playa de Sayulita. El tamaño de los grupos es significativamente más pequeño que los tours del Malecón de PVR.',
      },
      {
        q: '¿Se puede ir a las Islas Marietas desde Sayulita sin pasar por Puerto Vallarta?',
        a: 'Sí — y es incluso más conveniente. Las Marietas están más cerca de Sayulita que del Malecón. El trayecto en panga toma entre 25 y 35 minutos desde la playa de Sayulita. Confirma con el operador si el permiso de acceso a la Playa del Amor está incluido.',
      },
      {
        q: '¿Cuánto cuesta un tour privado a Sayulita desde Puerto Vallarta?',
        a: 'Transfer privado ida y vuelta: entre $1,200 y $1,800 MXN para hasta 4 personas. Tour privado guiado de día completo desde $3,500 MXN para hasta 4 personas. Dividido entre 4, el precio por persona es similar al grupal.',
      },
      {
        q: '¿Qué actividades están disponibles para niños pequeños en Sayulita?',
        a: 'Desde 4 años: rescate de tortugas, snorkeling básico. Desde 5 años: clases de surf en playa norte, paseo a caballo con adulto. Desde 7 años: paseo a caballo independiente, tour a las Marietas (consultar condiciones del mar). Todos los operadores verificados especifican la edad mínima.',
      },
    ],
    explore: {
      label: 'Tu Mejor Guía Local Online',
      title: 'Explora Sayulita — Tu Guía Local',
      subtitle: 'Las actividades son una parte de Sayulita. El resto lo encontrarás aquí.',
      count: '50+ operadores de tours y actividades verificados en Sayulita, Nayarit, México',
      links: [
        { label: 'Casas en renta en Sayulita', desc: 'Privacidad y espacio propio', href: '/rentals/houses', icon: '🏠' },
        { label: 'Hoteles en Sayulita', desc: 'Servicio con recepción diaria', href: '/rentals/hotels', icon: '🏨' },
        { label: 'Restaurantes y bares', desc: '300+ opciones verificadas', href: '/businesses', icon: '🍽️' },
        { label: 'Cómo llegar a Sayulita', desc: 'Desde el aeropuerto de PVR', href: 'https://sayulitatransportation.com/', icon: '✈️' },
        { label: 'Anunciar tu negocio', desc: 'Llega a 2,000 visitantes diarios', href: '/advertise?openModal=true', icon: '📢' },
      ],
    },
  },
  ENG: {
    meta: {
      title: 'Tours in Sayulita — Surf, Whales, Marietas & More | SayulitaTravel',
      description: 'The best tours and activities in Sayulita: surf, whale watching, Marietas Islands, fishing, horseback, yoga and more. Book direct with local operators, no Viator commission. Verified since 2000.',
    },
    hero: {
      label: 'SayulitaTravel Tours',
      title: 'Tours in Sayulita — Book Direct with Local Operators,',
      accent: 'No Viator Commission',
      subtitle1: 'Sayulita has something for every type of traveler: waves to learn surfing, humpback whales in winter, protected islands 30 minutes away by panga, jungle to explore on horseback, and wellness for those who truly need to disconnect.',
      subtitle2: 'All with local operators who have been in town for years — without the 20–25% that Viator or GetYourGuide add to the real price.',
      trust: '50+ verified tour operators in Sayulita, Nayarit, Mexico',
    },
    search: {
      sectionTitle: 'Find Your Tour or Activity in Sayulita',
      categoryLabel: 'Category',
      dateLabel: 'Date',
      durationLabel: 'Duration',
      travelerLabel: 'Traveler type',
      btnSearch: 'Search',
      tagsLabel: 'Popular today:',
      tags: [
        { label: 'Surf', icon: 'surf' },
        { label: 'Whales', icon: 'whale' },
        { label: 'Marietas Islands', icon: 'boat' },
        { label: 'Turtles', icon: 'turtle' },
        { label: 'Horseback', icon: 'horse' },
        { label: 'Tequila Tour', icon: 'tequila' },
        { label: 'ATV', icon: 'atv' },
      ],
    },
    catalogTitle: 'Tours & Activities in Sayulita by Type',
    catalogSubtitle: 'Sayulita is not a theme park with a fixed catalog of excursions. It\'s a town where each operator has been doing what they do for years — and it shows. Here are the most in-demand categories from our inventory.',
    categories: [
      {
        key: 'surf',
        title: 'Surf Lessons in Sayulita — For Beginners & Intermediate',
        subtitle: 'Learn to surf at one of Mexico\'s best spots',
        desc: 'Sayulita is one of the best places in Mexico to learn surfing. It has two breaks with completely different conditions: the main beach, more active, and the north beach, with gentle waves ideal for first-timers.',
        bullets: [
          'Private and group lessons — max 4–6 students per instructor for groups',
          'All equipment included: board, wetsuit (if needed), wax',
          'Instruction in Spanish and English — all instructors are bilingual',
          'Kids\' lessons from age 5 — top instructors have experience with children',
          'Surf trips to advanced breaks for those with experience',
        ],
        duration: '1.5 to 2 hours per session',
        price: 'From $700 MXN per person group lesson. Private from $1,200 MXN.',
        ideal: 'beginners, intermediate, kids from 5 years, families',
        note: 'When you book directly with the local operator, the same instructor can give you a second session the same day, adjust the schedule for tides, and recommend the right break for your level.',
        icon: 'surf',
      },
      {
        key: 'whales',
        title: 'Whale Watching in Sayulita — Season November to March',
        subtitle: 'Humpback whales just meters from shore',
        desc: 'From November to March, humpback whales arrive in Bahía de Banderas to mate and give birth. In peak season, you can see them breaching from the shore itself, without getting on a boat.',
        bullets: [
          'Launch through the surf directly from Sayulita beach',
          'Small groups: max 6–12 people. No 40-passenger tourist barges',
          'Guide-researchers: some operators work with marine biologists',
          'Duration: 2.5 to 3.5 hours on the water',
          'Best months: January and February for maximum whale concentration',
        ],
        duration: '2.5 to 3.5 hours',
        price: 'From $1,600 MXN per person shared tour. Private family tour from $10,000 MXN.',
        ideal: 'couples, families, nature lovers, photographers',
        note: 'January and February weekends book weeks in advance. If you have fixed dates, book ahead.',
        icon: 'whale',
      },
      {
        key: 'marietas',
        title: 'Marietas Islands Tour from Sayulita',
        subtitle: 'The volcanic archipelago 30 minutes by panga',
        desc: 'The Marietas Islands are a protected volcanic archipelago — a biosphere reserve with controlled access. The famous Playa del Amor (Hidden Beach), hidden inside a crater-formed cave, is one of the most photographed spots in Mexico.',
        bullets: [
          'Panga transportation departing from Sayulita beach',
          'Certified bilingual guide for the reserve area',
          'Snorkeling equipment included',
          'Free time at Playa del Amor (permits permitting)',
          'Snorkeling with tropical fish, stingrays, and varied marine life',
        ],
        duration: '4 to 5 hours total',
        price: 'From $1,200 MXN per person shared tour.',
        ideal: 'couples, families with older kids, active travelers, snorkel lovers',
        note: 'Access to Playa del Amor inside the cave requires a special permit with limited daily capacity. Ask the operator before booking if the permit is included.',
        icon: 'boat',
      },
      {
        key: 'fishing',
        title: 'Sport Fishing in Sayulita — Mahi-mahi, Sailfish & Marlin',
        subtitle: 'Bahía de Banderas, one of the best fishing grounds in the Pacific',
        desc: 'Bahía de Banderas is one of the best fishing grounds in the Mexican Pacific. From Sayulita, fishing pangas and yachts depart with captains who know exactly where to find mahi-mahi, tuna, sailfish, and marlin by season.',
        bullets: [
          'Half-day (4 hours): ideal for a quick fishing experience near the coast',
          'Full-day (7–8 hours): head to deeper waters for sailfish, marlin, and tuna',
          'Fishing + snorkeling combo for mixed groups',
          'Full fishing gear, bait, captain and crew included',
          'Captain cleans your catch — many local restaurants cook it that same day',
        ],
        duration: '4 to 8 hours',
        price: 'Half-day from $3,500 MXN per panga (up to 4 people). Full-day from $5,500 MXN.',
        ideal: 'friend groups, experienced and beginner anglers, families',
        icon: 'fishing',
      },
      {
        key: 'horses',
        title: 'Horseback Tours Through the Jungle & Beach of Sayulita',
        subtitle: 'Explore the tropical jungle on horseback',
        desc: 'The jungle surrounding Sayulita completely changes your perspective of the town — and the best way to explore it without intense physical effort is on horseback.',
        bullets: [
          '1.5 to 3 hour rides depending on the circuit',
          'Gentle horses for beginners, spirited horses for experienced riders',
          'Small groups: max 8–10 people per guide',
          'Suitable for kids from 7 years (some operators from 5 with direct supervision)',
          'Photo stops at viewpoints overlooking the bay',
        ],
        duration: '1.5 to 3 hours',
        price: 'From $900 MXN per person.',
        ideal: 'families, couples, beginners, kids from 7 years',
        note: 'Go early in the morning. Midday heat is not pleasant for the horses or you, and early morning light is best for photos.',
        icon: 'horse',
      },
      {
        key: 'yoga',
        title: 'Yoga, Meditation & Wellness Retreats in Sayulita',
        subtitle: 'Truly disconnect in paradise',
        desc: 'Sayulita has a disproportionately good wellness scene for a town its size. Morning yoga classes in open-air studios, weekend retreats with accommodation, and teachers who have been here for decades.',
        bullets: [
          'Drop-in yoga classes: morning and sunset sessions. From $200 MXN per class',
          'Weekend retreats: 2 nights accommodation, 3 daily yoga sessions. From $4,500 MXN',
          'Week-long retreats: complete programs with complementary activities',
          'Massages & therapies: shiatsu, Thai, Swedish, hot stones. From $800 MXN per hour',
          'Meditation & breathwork classes for those seeking beyond physical yoga',
        ],
        duration: 'From 1 hour per class to 7-day retreats',
        price: 'Classes from $200 MXN. Retreats from $4,500 MXN.',
        ideal: 'solo travelers, couples, digital nomads, wellness seekers',
        icon: 'yoga',
      },
      {
        key: 'tequila',
        title: 'Tequila, Raicilla & Mezcal Tour in Sayulita',
        subtitle: 'The most authentic artisanal distillery experience',
        desc: 'This tour is one of the most talked-about and least replicable in Riviera Nayarit. Visit a working agave distillery on the outskirts of Sayulita — no additives, no industrial production, generations-old family craft.',
        bullets: [
          'Guided tour of the complete agave process: cultivation, earth-oven cooking, fermentation, copper still distillation',
          'Guided tasting of tequila, raicilla, and mezcal with local snack pairing',
          'Farm-to-table meal at the finca after the tasting',
          'Round-trip transport from Sayulita included',
          'Raicilla is Nayarit\'s own agave distillate — you won\'t find it in Jalisco standard tours',
        ],
        duration: '4 to 5 hours',
        price: 'From $1,400 MXN per person with transport and meal included.',
        ideal: 'couples, friend groups, foodies, those seeking something unique',
        icon: 'tequila',
      },
      {
        key: 'adventure',
        title: 'ATV, Zipline & Jungle Adventure in Sayulita',
        subtitle: 'Adrenaline between beach days',
        desc: 'For those who need adrenaline between beach days, Sayulita has jungle and mountain accessible from town in under 20 minutes.',
        bullets: [
          'ATV tours: 2 to 3 hour rides through mountain trails with ocean views',
          'Zipline: lines through the tree canopy with platforms at various heights',
          'Guided hiking: 2 to 4 hour jungle trails with expert guides',
          'ATV + secret beach combo: ride to the beach, snorkel, return',
          'Drivers from 18 years; some operators allow 16+ with adult on board',
        ],
        duration: '2 to 4 hours',
        price: 'ATV from $1,100 MXN per person. Zipline from $800 MXN.',
        ideal: 'friend groups, adventurous couples, active travelers, bachelor parties',
        icon: 'atv',
      },
      {
        key: 'turtles',
        title: 'Turtle Rescue in Sayulita — The Family Favorite Experience',
        subtitle: 'A memory kids will cherish for life',
        desc: 'From July to November, sea turtles arrive to nest on Sayulita\'s beaches. The local turtle camp works every night to protect the nests and release the hatchlings when they\'re ready.',
        bullets: [
          'Night tours: generally between 9 PM and 11 PM depending on nest activity',
          'Small groups guided by turtle camp staff',
          'Suitable for kids from 4 years with an adult',
          'Duration: 1.5 to 2.5 hours depending on nest activity',
          'Not available every day — confirm availability with the operator',
        ],
        duration: '1.5 to 2.5 hours',
        price: 'From $400 MXN per person including donation to the turtle camp.',
        ideal: 'families with kids, nature lovers, conscious travelers',
        note: 'This activity cannot be guaranteed weeks in advance as it depends on the nest cycle. Contact the operator the same afternoon to book.',
        icon: 'turtle',
      },
    ],
    why: {
      label: 'Save money, travel smart',
      title: 'Why Book Direct with Local Sayulita Operators?',
      subtitle: 'The short answer: you pay less and get more. Viator and GetYourGuide add 20–25% to the local operator\'s price. That money doesn\'t go to the guide — it stays with the platform.',
      cards: [
        {
          icon: 'dollar',
          title: 'No Viator Commission — The Local Operator\'s Price',
          text: 'Surf lesson at $800 MXN with the operator → $960–$1,000 MXN on Viator. Whale tour at $1,600 MXN → $1,920–$2,000 MXN on Viator. For a family of four doing two activities in a week, the difference can exceed $3,000–$5,000 MXN.',
        },
        {
          icon: 'shield',
          title: 'Operators Verified by Our Local Team',
          text: 'Every listed operator has been vetted by our local team. We verify valid licenses and permits, safety equipment, operating history, and real capacity. Anonymous Viator operators with three reviews from two years ago don\'t pass this screening.',
        },
        {
          icon: 'message',
          title: 'Direct Contact with the Guide Before Booking',
          text: 'Before paying, you can talk to the operator. Ask if the tour is suitable for your 6-year-old, what happens in bad weather, if they can adjust the schedule, what snorkel gear is included. That conversation doesn\'t exist on Viator — only booking forms and fine-print cancellation policies.',
        },
      ],
    },
    pvGuide: {
      label: 'Day Trip from Puerto Vallarta',
      title: 'Sayulita Day Trip from Puerto Vallarta — Complete Guide',
      subtitle: 'Sayulita is 45 minutes north of Puerto Vallarta airport. It\'s the most popular day trip on the Riviera Nayarit — and the best value experience in the entire area.',
      howTitle: 'How to Get to Sayulita from Puerto Vallarta Airport?',
      options: [
        { title: 'Private Transfer', desc: 'Door-to-door in 40–50 minutes. Between $600 and $900 MXN for the full trip.', icon: 'car' },
        { title: 'Public Bus', desc: 'From the stop near Walmart opposite the airport. 1h 15min to 1h 45min. Under $100 MXN.', icon: 'bus' },
        { title: 'Shared Van (Combi)', desc: 'Mid-range option. Departs from outside the airport when full.', icon: 'van' },
        { title: 'Rental Car', desc: 'Drive north on Highway 200. Simple and no tolls.', icon: 'car' },
      ],
      guidedTitle: 'Guided Day Tour to Sayulita & San Pancho from Puerto Vallarta',
      guidedDesc: 'If you prefer to go with a guide and organized transport, full-day tours from Puerto Vallarta are the hassle-free option.',
      guidedIncludes: [
        'Hotel pickup in Puerto Vallarta or Malecón',
        'Optional stop at local market on Highway 200',
        'Visit to San Pancho (San Francisco): quiet town 5 km north of Sayulita',
        'Arrival in Sayulita: free time to explore the center, market, and beach',
        'Lunch at a local restaurant (included in premium tours)',
        'Return to Puerto Vallarta in the late afternoon',
      ],
      guidedNote: 'Group tours have a fixed itinerary. Private tours let you adjust timing and add surf, horseback, or snorkeling. For groups of 4+, the per-person cost gets close to the group tour price.',
      guidedPrice: 'Group tours from $800 MXN per person. Private tours from $3,500 MXN for up to 4 people.',
      itineraryTitle: 'Recommended Itinerary: Sayulita + Activity + San Pancho',
      itinerary: [
        { time: '9:00 AM', text: 'Arrive in San Pancho. 45 minutes to walk the streets, see the plaza and church.' },
        { time: '10:00 AM', text: 'Arrive in Sayulita. Check in with your surf operator or reserved activity.' },
        { time: '10:15 AM – 12:00 PM', text: 'Surf lesson, horseback ride, or snorkeling. Morning is best for water activities.' },
        { time: '12:30 PM', text: 'Lunch in Sayulita center. Tacos, ceviche, or seafood soup.' },
        { time: '2:00 – 4:30 PM', text: 'Free afternoon: beach, craft market, boutique shopping.' },
        { time: '5:00 PM', text: 'Depart for Puerto Vallarta. Arrive before 6:30 PM.' },
      ],
    },
    reviews: [
      {
        quote: 'I booked the surf lesson directly with the school through SayulitaTravel. Same operator as Viator, $200 MXN less per person. For our family of four, we saved $800 MXN. The instructor was incredible — both kids were standing up within the first hour.',
        name: 'Daniela M.',
        location: 'Monterrey',
        activity: 'Surf Lesson',
        date: 'January 2025',
        rating: 5,
      },
      {
        quote: 'The whale tour from Sayulita is nothing like the massive tours from the PVR Malecón. We launched directly from the beach in a panga, there were 8 of us, and the guide was a cetacean researcher. In two hours we saw four humpback whales within 30 meters.',
        name: 'Chris & Laura P.',
        location: 'Toronto',
        activity: 'Whale Tour',
        date: 'February 2025',
        rating: 5,
      },
      {
        quote: 'I came for the day from Puerto Vallarta without booking anything. The SayulitaTravel team guided me by phone — recommended the right horse operator for my young kids and gave me the direct contact. Within 20 minutes I had everything organized.',
        name: 'Roberto A.',
        location: 'Mexico City',
        activity: 'Horseback Tour',
        date: 'March 2025',
        rating: 5,
      },
    ],
    travelerGuide: {
      label: 'Guide by traveler type',
      title: 'Tours in Sayulita Guide by Traveler Type',
      subtitle: 'Not everyone looks for the same thing in Sayulita. Here are the best combinations based on who you\'re traveling with.',
      types: [
        {
          key: 'families',
          title: 'Tours & Activities for Families with Kids in Sayulita',
          icon: 'families',
          desc: 'Sayulita works especially well with kids — the town is small and walkable, North Beach has gentle waves, and activities are designed to get them involved.',
          bullets: [
            'Turtle rescue (July–November): the kids\' favorite. Suitable from 4 years.',
            'Surf lesson: instructors with real experience with kids. From 5 years.',
            'Snorkeling at Los Muertos Beach: tropical fish a meter deep.',
            'Horseback ride: small groups, gentle horses. From 7 years.',
          ],
          avoid: 'Avoid with young kids: ATV (not for under 16–18) and Marietas tour (long for under 6 if water is rough).',
        },
        {
          key: 'couples',
          title: 'Best Activities for Couples in Sayulita',
          icon: 'couples',
          desc: 'Sayulita has a rhythm that works especially well for couples.',
          bullets: [
            'Whale watching at sunrise + terrace breakfast afterward',
            'Private distillery tour with raicilla and mezcal tasting',
            'Surf lesson for two + afternoon on North Beach',
            'Marietas excursion in season: snorkeling, Hidden Beach, dolphins',
          ],
        },
        {
          key: 'groups',
          title: 'Sayulita for Groups — Tours for 10+ People',
          icon: 'groups',
          desc: 'Groups have options that individual travelers don\'t.',
          bullets: [
            'Private fishing charter: full boat from $8,000 MXN for up to 8 people',
            'ATV caravan tour: up to 15 vehicles in a group',
            'Group surf lessons: capacity for up to 20 people with multiple instructors',
            'Private Marietas boat tour for 10–15 people',
          ],
          note: 'To coordinate large groups, write us before you arrive. We do this regularly for weddings, retreats, and corporate groups.',
        },
      ],
    },
    seasons: {
      label: 'Season calendar',
      title: 'When to Do Each Tour — Sayulita Season Calendar',
      subtitle: 'Some of Sayulita\'s best activities are seasonal. Knowing when to go completely changes what you can do.',
      items: [
        {
          title: 'Whale Watching (November to March)',
          icon: 'whale',
          months: [
            { name: 'November', desc: 'First whales arrive. Less frequent sightings, exclusive atmosphere.' },
            { name: 'December–January', desc: 'Concentration increases rapidly. January weekends are the most in-demand.' },
            { name: 'February', desc: 'Absolute peak. On good days, dozens visible from shore.' },
            { name: 'March', desc: 'Migration back. Frequent sightings in the first half of the month.' },
          ],
          tip: 'If you can choose, go in January or early February.',
        },
        {
          title: 'Turtle Rescue (July to November)',
          icon: 'turtle',
          months: [
            { name: 'July–August', desc: 'Season start. New nests, hatchlings weeks away.' },
            { name: 'September–October', desc: 'Peak releases. Maximum chance of a nighttime hatchling walk.' },
            { name: 'November', desc: 'Season end. Fewer releases.' },
          ],
          tip: 'Check availability the same afternoon. The camp communicates if there will be a release that night.',
        },
        {
          title: 'Surfing in Sayulita — Year-Round',
          icon: 'surf',
          months: [
            { name: 'May–October', desc: 'Most consistent and largest waves for intermediate and advanced. Best time of year.' },
            { name: 'November–April', desc: 'Smaller, regular waves perfect for beginners. Sunny weather.' },
          ],
          tip: 'To learn: any season works. To improve: go May to October.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions About Tours in Sayulita & From Puerto Vallarta',
      subtitle: 'Everything you need to know, answered by local experts.',
    },
    faqs: [
      {
        q: 'How much does a surf lesson cost in Sayulita?',
        a: 'Group lessons (max 4–6 students per instructor) from $700 MXN per person, including board, gear, and 1.5–2 hour session. Private lessons from $1,200 MXN. Booking directly through SayulitaTravel gets you the operator price — the same lesson on Viator costs $840–$900 MXN.',
      },
      {
        q: 'What is the best day trip from Puerto Vallarta to Sayulita?',
        a: 'If you just want to see the town, a group tour with transport and guide covers the basics for $800–$1,000 MXN. If you want to do surf, horses, or snorkeling, the private tour is worth the price difference — you can adjust the timing.',
      },
      {
        q: 'Is Sayulita good for surfing as a complete beginner?',
        a: 'Yes — one of the best in Mexico to start. North Beach has gentle, consistent waves in shallow water. In a 2-hour session with a good instructor, the vast majority of beginners stand up on the board at least once.',
      },
      {
        q: 'When is whale watching season in Sayulita?',
        a: 'November to March, peaking in January and February. Tours depart directly from Sayulita beach. Group sizes are significantly smaller than PVR Malecón tours.',
      },
      {
        q: 'Can you go to the Marietas Islands from Sayulita without going through Puerto Vallarta?',
        a: 'Yes — and it\'s even more convenient. The Marietas are closer to Sayulita than to the Malecón. The panga ride takes 25–35 minutes from Sayulita beach. Confirm with the operator if the Playa del Amor access permit is included.',
      },
      {
        q: 'How much does a private tour to Sayulita from Puerto Vallarta cost?',
        a: 'Private round-trip transfer: between $1,200 and $1,800 MXN for up to 4 people. Private guided full-day tour from $3,500 MXN for up to 4 people. Split among 4, the per-person price is similar to group tours.',
      },
      {
        q: 'What activities are available for young children in Sayulita?',
        a: 'From 4 years: turtle rescue, basic snorkeling. From 5 years: surf lessons on North Beach, horseback with adult. From 7 years: independent horseback, Marietas tour (check sea conditions). All verified operators specify minimum age requirements.',
      },
    ],
    explore: {
      label: 'Your Best Local Guide Online',
      title: 'Explore Sayulita — Your Local Guide',
      subtitle: 'Activities are one part of Sayulita. You\'ll find the rest here.',
      count: '50+ verified tour operators in Sayulita, Nayarit, Mexico',
      links: [
        { label: 'Houses for Rent in Sayulita', desc: 'Privacy and your own space', href: '/rentals/houses', icon: '🏠' },
        { label: 'Hotels in Sayulita', desc: 'Daily reception service', href: '/rentals/hotels', icon: '🏨' },
        { label: 'Restaurants & Bars', desc: '300+ verified options', href: '/businesses', icon: '🍽️' },
        { label: 'How to Get to Sayulita', desc: 'From PVR airport', href: 'https://sayulitatransportation.com/', icon: '✈️' },
        { label: 'Advertise Your Business', desc: 'Reach 2,000 daily visitors', href: '/advertise?openModal=true', icon: '📢' },
      ],
    },
  },
};

const categoryIcons = {
  surf: <MdSurfing size={28} />,
  whale: <GiWhaleTail size={28} />,
  boat: <MdDirectionsBoat size={28} />,
  fishing: <MdOutlineSetMeal size={28} />,
  horse: <GiHorseHead size={28} />,
  yoga: <BsCupHot size={28} />,
  tequila: <GiGlassShot size={28} />,
  atv: <GiParachute size={28} />,
  turtle: <GiTurtle size={28} />,
};

const seasonIcons = {
  whale: <GiWhaleTail size={24} />,
  turtle: <GiTurtle size={24} />,
  surf: <MdSurfing size={24} />,
};

export default function ToursPage({ language = 'ESP' }) {
  const t = i18n[language] || i18n.ESP;

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

  const [openFaq, setOpenFaq] = useState(0);
  const [searchDate, setSearchDate] = useState(null);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchDuration, setSearchDuration] = useState('');
  const [searchTraveler, setSearchTraveler] = useState('');

  const getWhyIcon = (iconKey) => {
    if (iconKey === 'dollar') return <FiDollarSign size={24} />;
    if (iconKey === 'shield') return <FiShield size={24} />;
    if (iconKey === 'message') return <FiMessageCircle size={24} />;
    return null;
  };

  const getCategoryIcon = (iconKey) => {
    return categoryIcons[iconKey] || <MdSurfing size={28} />;
  };

  const getTravelerIcon = (key) => {
    if (key === 'families') return <FiUsers size={28} />;
    if (key === 'couples') return <FiStar size={28} />;
    if (key === 'groups') return <FiUsers size={28} />;
    return <FiUsers size={28} />;
  };

  return (
    <div className="tours-page">
      {/* ═══ HERO ═══ */}
      <section className="tp-hero section" id="tours-hero">
        <div className="tp-hero__bg">
          <img
        src={heroBg.src}
        alt="Sayulita Tours"
        className="tp-hero__bg-img"
        width={1024}
        height={820}
        fetchPriority="high"
      />
          <div className="tp-hero__overlay" />
        </div>
        <div className="container">
          <motion.div
            className="tp-hero__content"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="tp-hero__label">{t.hero.label}</span>
            <h1 className="tp-hero__title">
              {t.hero.title}{' '}
              <span className="tp-hero__accent">{t.hero.accent}</span>
            </h1>
            <p className="tp-hero__subtitle">
              {t.hero.subtitle1}<br />
              {t.hero.subtitle2}
            </p>
            <div className="tp-hero__trust">
              <FiShield size={18} />
              <span>{t.hero.trust}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SEARCH ═══ */}
      <section className="tp-search section" id="tours-search">
        <FloatingPalms />
        <div className="container">
          <SectionHeader title={t.search.sectionTitle} />
          <motion.div
            className="tp-search__bar"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="tp-search__field">
              <div className="tp-search__icon"><FiCalendar size={18} /></div>
              <DateField
                selected={searchDate}
                onChange={(date) => setSearchDate(date)}
                placeholderText={t.search.dateLabel}
                dateFormat="dd MMM"
                minDate={new Date()}
              />
            </div>
            <div className="tp-search__divider" />
            <div className="tp-search__field">
              <div className="tp-search__icon"><FiTag size={18} /></div>
              <select
                className="tp-search__select"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                aria-label={t.search.categoryLabel}
              >
                <option value="">{t.search.categoryLabel}</option>
                {t.categories.map((cat) => (
                  <option key={cat.key} value={cat.key}>{cat.title.split(' — ')[0]}</option>
                ))}
              </select>
            </div>
            <div className="tp-search__divider" />
            <div className="tp-search__field">
              <div className="tp-search__icon"><FiClock size={18} /></div>
              <select
                className="tp-search__select"
                value={searchDuration}
                onChange={(e) => setSearchDuration(e.target.value)}
                aria-label={t.search.durationLabel}
              >
                <option value="">{t.search.durationLabel}</option>
                <option value="1-2">1–2 horas</option>
                <option value="2-4">2–4 horas</option>
                <option value="4-6">4–6 horas</option>
                <option value="6+">6+ horas</option>
              </select>
            </div>
            <div className="tp-search__divider" />
            <div className="tp-search__field">
              <div className="tp-search__icon"><FiUsers size={18} /></div>
              <select
                className="tp-search__select"
                value={searchTraveler}
                onChange={(e) => setSearchTraveler(e.target.value)}
                aria-label={t.search.travelerLabel}
              >
                <option value="">{t.search.travelerLabel}</option>
                <option value="solo">Solo</option>
                <option value="couple">Pareja</option>
                <option value="family">Familia</option>
                <option value="group">Grupo</option>
              </select>
            </div>
            <button className="tp-search__btn" id="tp-search-submit">
              <FiSearch size={18} /> {t.search.btnSearch}
            </button>
          </motion.div>
          <div className="tp-search__tags">
            <span className="tp-search__tags-label">{t.search.tagsLabel}</span>
            {t.search.tags.map((tag) => (
              <button key={tag.label} className="tp-search__tag">
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATALOG TITLE ═══ */}
      <section className="section tp-catalog-header">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={language === 'ESP' ? 'Tours y Actividades' : 'Tours & Activities'}
            title={t.catalogTitle}
            subtitle={t.catalogSubtitle}
          />
        </div>
      </section>

      {/* ═══ CATEGORY CARDS ═══ */}
      <section className="section tp-category-grid">
        <FloatingPalms />
        <div className="container">
          <div className="tp-category__grid">
            {t.categories.map((cat, i) => (
              <motion.div
                key={cat.key}
                className="tp-category__card"
                id={`tour-${cat.key}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <div className="tp-category__card-header">
                  <div className="tp-category__icon">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <h3 className="tp-category__card-title">{cat.title}</h3>
                </div>
                <p className="tp-category__card-subtitle">{cat.subtitle}</p>

                <p className="tp-category__desc">{cat.desc}</p>

                <ul className="tp-category__bullets">
                  {cat.bullets.slice(0, 4).map((b, j) => (
                    <li key={j}>
                      <FiCheck size={14} className="tp-category__check" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="tp-category__meta">
                  <span><FiClock size={14} /> {cat.duration}</span>
                </div>

                <div className="tp-category__card-footer">
                  <div className="tp-category__price">{cat.price}</div>
                  <div className="tp-category__ideal">
                    <strong>{language === 'ESP' ? 'Ideal:' : 'Ideal:'}</strong> {cat.ideal}
                  </div>
                  {cat.note && (
                    <div className="tp-category__note">
                      <FiMessageCircle size={13} />
                      <span>{cat.note}</span>
                    </div>
                  )}
                  <Button variant="primary" size="sm" className="tp-category__cta">
                    {language === 'ESP' ? 'Ver operadores' : 'View operators'} <FiArrowRight size={14} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY BOOK DIRECT ═══ */}
      <section className="section tp-why">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.why.label}
            title={t.why.title}
            subtitle={t.why.subtitle}
          />
          <div className="tp-why__grid">
            {t.why.cards.map((card, i) => (
              <motion.div
                key={i}
                className="tp-why__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="tp-why__card-icon">{getWhyIcon(card.icon)}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DAY TRIP FROM PV GUIDE ═══ */}
      <section className="section tp-pv-guide">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.pvGuide.label}
            title={t.pvGuide.title}
            subtitle={t.pvGuide.subtitle}
          />

          <h3 className="tp-pv-guide__section-title">{t.pvGuide.howTitle}</h3>
          <div className="tp-pv-guide__grid">
            {t.pvGuide.options.map((opt, i) => (
              <div key={i} className="tp-pv-guide__card">
                <h4>{opt.title}</h4>
                <p>{opt.desc}</p>
              </div>
            ))}
          </div>

          <div className="tp-pv-guide__guided">
            <h3 className="tp-pv-guide__section-title">{t.pvGuide.guidedTitle}</h3>
            <p className="tp-pv-guide__guided-desc">{t.pvGuide.guidedDesc}</p>
            <ul className="tp-category__bullets tp-pv-guide__includes">
              {t.pvGuide.guidedIncludes.map((item, i) => (
                <li key={i}>
                  <FiCheck size={16} className="tp-category__check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="tp-pv-guide__note">{t.pvGuide.guidedNote}</p>
            <div className="tp-category__price">{t.pvGuide.guidedPrice}</div>
          </div>

          <h3 className="tp-pv-guide__section-title">{t.pvGuide.itineraryTitle}</h3>
          <div className="tp-pv-guide__itinerary">
            {t.pvGuide.itinerary.map((item, i) => (
              <div key={i} className="tp-pv-guide__itinerary-item">
                <div className="tp-pv-guide__itinerary-time">{item.time}</div>
                <div className="tp-pv-guide__itinerary-dot" />
                <div className="tp-pv-guide__itinerary-text">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section tp-reviews">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={language === 'ESP' ? 'Reseñas de viajeros' : 'Traveler reviews'}
            title={language === 'ESP' ? 'Lo que Dicen Nuestros Viajeros' : 'What Our Travelers Say'}
          />
          <LazySwiper
            className="tp-reviews__swiper"
            slides={t.reviews.map((review, i) => (
              <div className="tp-review-card" key={i}>
                <div className="tp-review-card__stars">
                  {[...Array(review.rating)].map((_, s) => (
                    <FiStar key={s} size={15} className="tp-review-card__star" />
                  ))}
                </div>
                <p className="tp-review-card__quote">"{review.quote}"</p>
                <div className="tp-review-card__author">
                  <div className="tp-review-card__avatar">
                    {review.name.charAt(0)}
                  </div>
                  <div className="tp-review-card__info">
                    <strong className="tp-review-card__name">{review.name}</strong>
                    <span className="tp-review-card__detail">
                      {review.activity} · {review.date} · {review.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          />
        </div>
      </section>

      {/* ═══ TRAVELER GUIDE ═══ */}
      <section className="section tp-traveler-guide">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.travelerGuide.label}
            title={t.travelerGuide.title}
            subtitle={t.travelerGuide.subtitle}
          />
          <div className="tp-traveler-guide__grid">
            {t.travelerGuide.types.map((type) => (
              <motion.div
                key={type.key}
                className="tp-traveler-guide__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="tp-traveler-guide__header">
                  <div className="tp-traveler-guide__icon">
                    {getTravelerIcon(type.key)}
                  </div>
                  <h3>{type.title}</h3>
                </div>
                <p className="tp-traveler-guide__desc">{type.desc}</p>
                <ul className="tp-category__bullets">
                  {type.bullets.map((b, i) => (
                    <li key={i}>
                      <FiCheck size={16} className="tp-category__check" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {type.avoid && (
                  <div className="tp-traveler-guide__avoid">
                    <strong>{language === 'ESP' ? 'Evitar:' : 'Avoid:'}</strong> {type.avoid}
                  </div>
                )}
                {type.note && (
                  <div className="tp-category__note">
                    <FiMessageCircle size={14} />
                    <span>{type.note}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEASONS ═══ */}
      <section className="section tp-seasons">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.seasons.label}
            title={t.seasons.title}
            subtitle={t.seasons.subtitle}
          />
          <div className="tp-seasons__grid">
            {t.seasons.items.map((season) => (
              <motion.div
                key={season.title}
                className="tp-seasons__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="tp-seasons__card-header">
                  <div className="tp-category__icon">
                    {seasonIcons[season.icon] || <BsCalendarCheck size={24} />}
                  </div>
                  <h3>{season.title}</h3>
                </div>
                <div className="tp-seasons__months">
                  {season.months.map((m, i) => (
                    <div key={i} className="tp-seasons__month">
                      <strong>{m.name}:</strong> {m.desc}
                    </div>
                  ))}
                </div>
                <div className="tp-seasons__tip">
                  <FiStar size={14} />
                  <span>{season.tip}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section tp-faq">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            title={t.faq.title}
            subtitle={t.faq.subtitle}
          />
          <div className="tp-faq__list">
            {t.faqs.map((faq, i) => (
              <div
                key={i}
                className={`tp-faq__item ${openFaq === i ? 'tp-faq__item--open' : ''}`}
              >
                <button
                  className="tp-faq__question"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <motion.span
                    className="tp-faq__icon"
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      className="tp-faq__answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <p className="tp-faq__answer-text">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPLORE ═══ */}
      <section className="section tp-explore">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.explore.label}
            title={t.explore.title}
            subtitle={t.explore.subtitle}
          />
          <div className="tp-explore__grid">
            {t.explore.links.map((link, i) => (
              <a key={i} href={link.href} className="tp-explore__link" {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="tp-explore__link-icon">{link.icon}</span>
                <div>
                  <strong>{link.label}</strong>
                  <span>{link.desc}</span>
                </div>
                <FiArrowRight size={16} />
              </a>
            ))}
          </div>
          <p className="tp-explore__count">{t.explore.count}</p>
        </div>
      </section>
    </div>
  );
}
