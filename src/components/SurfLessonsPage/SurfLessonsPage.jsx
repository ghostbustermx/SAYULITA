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
  FiCalendar, FiSearch, FiStar, FiArrowRight, FiCheck,
  FiShield, FiDollarSign, FiMessageCircle, FiChevronDown,
  FiMapPin, FiClock, FiUsers, FiTag, FiInfo, FiSun
} from 'react-icons/fi';
import {
  MdSurfing, MdBeachAccess, MdDirectionsBoat,
  MdOutlineLocationOn, MdPool
} from 'react-icons/md';
import { GiWhaleTail, GiHorseHead, GiTurtle, GiParachute, GiGlassShot, GiSurfBoard } from 'react-icons/gi';
import { IoPeopleSharp } from 'react-icons/io5';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import heroBg from '../../assets/surf_lessons.png';
import FloatingPalms from '../FloatingPalms/FloatingPalms';
import './SurfLessonsPage.css';

const i18n = {
  ENG: {
    meta: {
      title: 'Surf Lessons in Sayulita, Mexico — Book Direct with Local Schools | No Viator Fees',
      description: 'The best surf lessons in Sayulita: beginner, intermediate, kids, private & group. Book directly with verified local schools — no Viator markup. Breaks explained, prices compared, local since 2000.',
    },
    hero: {
      label: 'SayulitaTravel Surf',
      imgAlt: 'Surf lessons Sayulita',
      title: 'Surf Lessons in Sayulita — Book Direct with Local Schools, ',
      accent: 'No Viator Fees',
      subtitle: 'Sayulita is where most people in Mexico learn to surf. The break is forgiving, the instructors are experienced, and the town makes it easy to go back the next day — and the day after that.',
      subtitle2: 'Every school listed here is verified by our local team. The price you see is what you pay — without the 20–25% Viator or GetYourGuide add on top of the exact same lesson.',
      trust: '8+ verified surf schools and rental operators in Sayulita, Nayarit, Mexico',
    },
    search: {
      title: 'Find Your Surf Lesson in Sayulita — Filter by Level, School, and Date',
      level: 'Level',
      levelBeginner: 'Beginner',
      levelIntermediate: 'Intermediate',
      levelKids: 'Kids',
      type: 'Type',
      typeGroup: 'Group',
      typePrivate: 'Private',
      typeCamp: 'Camp',
      school: 'School',
      date: 'Date',
      btn: 'Search',
      popular: 'Popular right now:',
      tags: ['First-timers', 'Kids lessons', 'La Lancha trip', 'Surf camps', 'Board rental only'],
    },
    breaks: {
      label: 'Know Before You Paddle Out',
      title: "Sayulita's Surf Breaks — Know Where You'll Paddle Out Before You Book",
      subtitle: "Before you pick a school, understand the breaks. Sayulita has three distinct surf spots within reach of the town — and they serve completely different purposes. The break that's perfect for a 7-year-old on their first lesson is not the right break for someone who already surfs and wants to progress. Knowing the difference before you book saves you a frustrating first session.",
      cards: [
        {
          title: 'Sayulita Main Beach — The Best Beginner Surf Break in Mexico',
          desc: 'This is where almost everyone takes their first lesson, and the reason is specific: the main beach has a sand bottom. That matters more than beginners realize. Sand bottoms are forgiving when you fall — and in your first session, you will fall a lot. There are no rocks in the lesson zone, the depth is manageable, and the wave breaks at a pace that gives you time to actually react.',
          bullets: [
            'Sand bottom throughout the lesson zone — no reef, no rocks, no consequences for a bad fall',
            'Consistent, predictable wave size — not dramatic, not flat, reliably in between',
            "Shore break that dissipates before it's dangerous — even falling in the whitewater zone is manageable",
            'Multiple schools operating simultaneously — experienced eyes on the water and a culture of safety built into the break',
          ],
          note: "This is the reason Sayulita has become Mexico's most popular beginner surf destination. Not the vibe, not the tacos — the break itself.",
        },
        {
          title: "Sayulita's North Beach — The Gentlest Wave for Kids and Nervous First-Timers",
          desc: "A short walk north of the main beach, around the headland, is a smaller, quieter bay with a gentler break than the main beach. The wave here is slower, shallower, and lower-consequence. It's where the best instructors take children under 7, adults who are genuinely anxious about water, and anyone who's had a difficult experience in the ocean before.",
          bullets: [
            'Children under 7 who need the calmest possible introduction to the ocean',
            'Adults who are genuinely anxious about water and need more time before adding real wave power',
            "Anyone who's had a difficult experience in the ocean before and needs to rebuild confidence first",
          ],
          tip: 'Ask your school specifically about the north beach if this describes you or your child.',
        },
        {
          title: 'La Lancha, Punta Mita — Where Intermediate Surfers Graduate',
          desc: "Thirty minutes south of Sayulita by car, La Lancha is a completely different experience. Where Sayulita's main beach gives you short, forgiving waves that close out quickly, La Lancha offers longer, cleaner rides — waves with an actual face that give you time to surf, not just stand up and hang on. The shape is consistent, the crowd is smaller, and the scenery is some of the best on the Riviera Nayarit.",
          whoGo: 'Who should go to La Lancha:',
          goItems: [
            "You've had 2–3 lessons and can stand up reliably",
            'You want to work on turning, not just riding whitewater',
            "You're a confident swimmer comfortable paddling in open water",
          ],
          whoStay: 'Who should stay at main beach:',
          stayDesc: "Anyone on their first or second lesson. La Lancha's waves are more powerful. They'll be fun in a week — confusing on day one.",
        },
      ],
      secret: {
        title: 'Secret Breaks and Guided Surf Trips Around Sayulita',
        desc: 'Sayulita is surrounded by coastline most tourists never reach. Some of the best surf operators in town run trips to spots accessible only by road and a short jungle trail — white-sand beaches with consistent waves and almost no one else in the water. These trips combine real surf with the experience of getting somewhere genuinely remote.',
        items: [
          'Depart Sayulita at 9:00–9:30 AM',
          '25–35 minutes by road, then 6–10 minutes on foot through jungle',
          '2.5 hours at the break with board and instructor',
          'Lunch stop on the way back — local fish tacos, not a tourist restaurant',
        ],
        who: 'Who these are for:',
        whoDesc: 'Surfers with at least intermediate level who want quality waves without the Sayulita crowd. Not the right choice for someone still working on their pop-up — the waves at these spots are more demanding than the main beach.',
      },
    },
    lessons: {
      label: 'Types of Surf Lessons',
      title: 'Types of Surf Lessons in Sayulita — Which One Is Right for You?',
      subtitle: "The schools in Sayulita's verified directory offer six distinct lesson types. Here's an honest breakdown of each so you can choose without reading five different school websites.",
      beginner: {
        badge: 'Most Popular',
        title: 'Beginner Surf Lessons — From Zero to Standing Up',
        desc: 'A standard beginner lesson runs approximately two hours. The land session (20–30 minutes) covers ocean dynamics, paddling technique, the pop-up, stance, and water safety. In the water (1.5 hours), your instructor stays with you, positions your board, pushes you at the right moment, and coaches you in real time. The first thirty minutes you start in whitewater, then move into unbroken waves.',
        outcome: 'Realistic outcome for a first lesson:',
        outcomeDesc: 'The majority of complete beginners stand up at least once. Some stand up on the first push. Some take 45 minutes. Both are normal.',
        included: 'Surfboard, rashguard, leash included',
        cta: 'Book a beginner surf lesson',
      },
      intermediate: {
        title: 'Intermediate Surf Lessons — Improve Your Technique',
        desc: "If you can already stand up and ride a wave — even inconsistently — a beginner lesson will be frustrating. Intermediate lessons focus on trim and weight distribution, bottom turn and cutback, wave reading, paddling efficiency, and consistent pop-up under pressure. The best break for intermediate lessons is La Lancha over Sayulita's main beach.",
        items: [
          'Trim and weight distribution on the wave face',
          'Bottom turn and cutback maneuvers',
          'Wave reading and lineup positioning',
          'Paddling efficiency and consistent pop-up',
        ],
        cta: 'Book an intermediate surf lesson',
      },
      kids: {
        title: 'Kids Surf Lessons — Ages 5 and Up',
        desc: "Sayulita is one of the best places in Mexico for children to learn to surf. Gentle breaks, instructors experienced with kids, and a relaxed environment where falling is part of the fun. For children 9 and under, verified schools assign one instructor per two children maximum. North beach for children under 7, main beach for 8 and up.",
        item: '1.5-hour sessions, certified instructors, proper kids\' equipment',
        cta: 'Book kids surf lessons',
      },
      privateVsGroup: {
        title: 'Private vs Group — What the Price Difference Gets You',
        desc: "Group lessons (2–6 per instructor) are the right choice when you're a complete beginner, with friends, or budget matters. Private lessons are worth the upgrade when you want to progress as fast as possible, have a specific technical problem, or are booking for a young child who needs 1:1 attention. The price difference is approximately $300–500 MXN per person.",
        group: 'Group',
        groupPrice: '$1,050–$1,300 MXN',
        groupRatio: '2–6 students per instructor',
        private: 'Private',
        privatePrice: '$1,350–$1,800 MXN',
        privateRatio: '1-on-1 instruction',
      },
      camps: {
        title: 'Surf Camps — Multi-Day Packages With Accommodation',
        desc: "If your trip is built around surfing, a camp is the most efficient way to improve. Packages range from 3-day weekend to 7-day full immersion. Typically includes 2 sessions per day, all equipment, accommodation, guided trip to La Lancha, and video analysis in premium camps. The pop-up that takes 45 minutes on day one becomes automatic by day three.",
        price3: '3-day from $3,950 MXN',
        price5: '5-day from $5,900 MXN',
        price7: '7-day with accommodation from $9,500 MXN',
        cta: 'Browse surf camps',
      },
      rentals: {
        title: 'Surfboard Rentals — For Surfers Who Just Need Equipment',
        desc: 'Foam/softboard: $200–$250 MXN per day. Longboard: $250–$350 MXN per day. Performance shortboard: $300–$400 MXN per day. Weekly rate: most shops discount 25–35% for rentals of 5+ days. Some operators deliver to your rental property — useful if you\'re staying in the hills and don\'t want to carry a 9-foot longboard down the cobblestones.',
        cta: 'Browse surfboard rentals',
      },
    },
    pricing: {
      label: 'Transparent Pricing',
      title: 'How Much Do Surf Lessons Cost in Sayulita?',
      subtitle: 'Less than you think — and significantly less than what Viator charges for the same lesson with the same instructor. Here\'s the verified price range from operators in our directory.',
      group: {
        title: 'Group Surf Lesson',
        price: '$1,050–$1,300 MXN',
        usd: '≈ $55–$70 USD',
        students: '4–6 students per instructor',
        board: 'Board, leash, rashguard included',
        duration: '20 min land, 1.5 hrs water',
        viator: 'Viator price: ~$83 USD — same lesson, same instructor, $13–$28 more',
      },
      private: {
        badge: 'Best Value',
        title: 'Private Surf Lesson',
        price: '$1,350–$1,800 MXN',
        usd: '≈ $70–$95 USD',
        oneOnOne: '1-on-1 instruction',
        focus: 'Full focus on your progression',
        equipment: 'All equipment included',
        note: "Priced below comparable lessons at Los Cabos and Oaxaca's coast — the higher concentration of schools in Sayulita keeps the market competitive.",
      },
      camps: {
        title: 'Surf Camp Packages',
        price: '$3,950–$9,500 MXN',
        usd: '≈ $200–$500 USD',
        day3: '3-day (lessons only): from $3,950 MXN',
        day5: '5-day (lessons only): from $5,900 MXN',
        day7: '7-day with accommodation: from $9,500 MXN',
        note: 'Prices vary based on accommodation type, sessions per day, and La Lancha trip inclusion.',
      },
      rentals: {
        title: 'Surfboard Rental Prices',
        foam: 'Foam / Softboard',
        foamPrice: '$200–$250 MXN / day',
        longboard: 'Longboard',
        longboardPrice: '$250–$350 MXN / day',
        shortboard: 'Performance Shortboard',
        shortboardPrice: '$300–$400 MXN / day',
        weekly: 'Weekly Rate (5+ days)',
        weeklyPrice: '25–35% discount',
        note: 'Some operators deliver boards to your rental property. Useful if you\'re staying in the hills and don\'t want to carry a 9-foot longboard down the cobblestones.',
      },
    },
    expectation: {
      label: 'Your First Lesson',
      title: 'What to Expect in Your First Surf Lesson in Sayulita',
      subtitle: "Nobody tells you this before you show up. Here's exactly what happens.",
      land: {
        title: 'The Land Session — First 20 to 30 Minutes',
        desc: "The lesson starts on the beach, not in the water. Your instructor covers five things in order: how waves form and break, how to paddle without exhausting your arms, the pop-up sequence, your stance on the board, and water safety. Twenty practice pop-ups on dry sand sounds excessive until you try to do it for the first time in moving water. The instructors who spend the most time on land produce the most students who stand up in the first session.",
      },
      water: {
        title: 'In the Water — 1.5 Hours With Your Instructor',
        desc: "Your instructor is in the water with you for the entire session. Not watching from the shore. They position you on the wave, tell you when to paddle, push you at the right moment, and call instructions as you're riding. The first thirty minutes: whitewater belly rides, then standing attempts. The second hour: unbroken waves and the pop-up either happens automatically or tells you what to work on in your next session.",
        end: "By the end: wet, tired, and already thinking about booking another lesson. That's how it goes for almost everyone.",
      },
      included: {
        title: "What's Included and What to Bring",
        header: '✓ Included in every lesson',
        items: [
          'Surfboard — sized for your weight and level',
          'Rashguard — UV protection and board rash prevention',
          'Leash — connects board to your ankle',
          'Instructor in the water with you for the full session',
        ],
        bring: 'Bring these',
        bringItems: [
          'Reef-safe sunscreen SPF 50+ — apply 20 min before',
          'At least 1 liter of water',
          'A dry change of clothes',
          'Sandals or flip-flops',
        ],
        leave: 'Leave at your accommodation',
        leaveItems: [
          'Jewelry of any kind',
          'Your phone (unless in a waterproof case)',
          'Sunglasses without a secure strap',
        ],
      },
    },
    schools: {
      label: 'Verified Local Schools',
      title: 'Best Surf Schools in Sayulita — Verified by Our Local Team',
      subtitle: 'Every school in this directory has been physically reviewed by our Sayulita team. Instructor certifications, equipment condition, safety protocols, and the actual student-to-instructor ratio in the water — not what the school claims on their website.',
      from: 'From ',
      book: 'Book Now',
      cta: 'See all verified surf schools',
    },
    testimonials: {
      label: 'Student Reviews',
      title: 'What Our Surf Students Say',
      items: [
        {
          quote: "Tried to book through Viator and noticed the price was $30 higher than what the school's own site showed. Found them on SayulitaTravel instead and paid the operator's rate. Same instructor, same morning, same lesson — just the actual price.",
          name: 'Kevin M.',
          location: 'Chicago',
          activity: 'Beginner group lesson',
          date: 'January 2025',
          rating: 5,
        },
        {
          quote: "Brought my two kids — 6 and 9 — and specifically requested lessons on the north beach because my youngest is nervous around water. The instructor spent the extra time she needed without making her feel singled out. She stood up on her own by the end. I wouldn't have known to ask for that break without this site.",
          name: 'Laura T.',
          location: 'Vancouver',
          activity: 'Kids surf lessons',
          date: 'March 2025',
          rating: 5,
        },
        {
          quote: "Did the 3-day surf camp after two years of trying to learn on weekends without much real progress. Day one the instructor identified exactly what I was doing wrong on the pop-up — I'd been learning a bad habit nobody had ever corrected. By day three at La Lancha I was making my first real turns. Worth every peso.",
          name: 'James R.',
          location: 'Austin',
          activity: '3-day surf camp',
          date: 'February 2025',
          rating: 5,
        },
        {
          quote: "We booked a private lesson for our daughter's 8th birthday. The instructor was patient, professional, and had her standing up within 30 minutes. The north beach location made all the difference — she felt safe the entire time. We're already planning our return trip.",
          name: 'Sarah & Mike T.',
          location: 'Portland',
          activity: 'Private kids lesson',
          date: 'December 2024',
          rating: 5,
        },
        {
          quote: "I was nervous about surfing as a 45-year-old complete beginner. The instructor put me at ease immediately. The land session was thorough, the water time was fun, and I actually stood up. Not gracefully, but I stood up. That was enough to get me hooked.",
          name: 'David L.',
          location: 'New York',
          activity: 'Beginner group lesson',
          date: 'November 2024',
          rating: 5,
        },
        {
          quote: "The 5-day camp was exactly what I needed. Video analysis in the afternoon showed me exactly what I was doing wrong. By day four I was catching waves without being pushed. The La Lancha trip on the final day was the highlight of my entire Mexico trip.",
          name: 'Emma R.',
          location: 'London',
          activity: '5-day surf camp',
          date: 'February 2025',
          rating: 5,
        },
      ],
    },
    when: {
      label: 'When to Go',
      title: 'When Is the Best Time to Learn to Surf in Sayulita?',
      yearRound: {
        title: 'Year-Round Waves',
        desc: 'Sayulita has waves year-round. The sandbar at the main beach generates rideable waves even when the Pacific swell is minimal. There is no month where the ocean is completely flat — which means there\'s no month where you can\'t take a beginner lesson. Families planning around school calendars don\'t need to factor in surf conditions.',
      },
      summer: {
        title: 'Summer Swells (May–October) — Best for Intermediate/Advanced',
        desc: 'The south swell season delivers the most consistent, powerful waves of the year. The main beach gets bigger; La Lancha and surrounding breaks become genuinely excellent. For intermediate and advanced surfers, this is the season to plan around. Trade-off: afternoon rains, higher humidity, strongest sun.',
      },
      dry: {
        title: 'Dry Season (November–April) — Best for Beginners & Families',
        desc: 'Sunny skies, predictable wind, smaller waves, and comfortable mornings. Ideal for learning. Downside: most crowded season. December and Spring Break fill up fast. If coming between Dec 20–Jan 5 or during Semana Santa — book at least a week in advance.',
      },
      tip: 'Avoiding the crowds — Best hours to surf:',
      tipDesc: '7:00 AM to 10:00 AM is when Sayulita\'s surf is at its best. The wind is light or offshore, the water surface is clean, and there are significantly fewer people. Book the morning slot — most schools have 8:00 or 9:00 AM sessions.',
    },
    faq: {
      title: 'Frequently Asked Questions About Surf Lessons in Sayulita',
      subtitle: 'Everything you need to know, answered by local experts.',
      items: [
        {
          q: 'Do I need any surfing experience to take lessons in Sayulita?',
          a: "None at all. Complete beginners are the majority of students at every school on the main beach. Sayulita's break is specifically well-suited to people who have never been on a board. The instructors are used to starting from zero, the wave is forgiving, and the culture of the town is relaxed enough that nobody makes you feel out of place for being new.",
        },
        {
          q: 'What age can kids start taking surf lessons in Sayulita?',
          a: "Most verified schools accept children from 5 years old. Some go younger on a case-by-case basis with a parent present at the break. For children under 7, the north beach — gentler break, shallower water — is strongly recommended over the main beach. For children 8 and up who are comfortable swimmers, the main beach works well. For any child 9 and under, the instructor-to-student ratio should be no more than 1:2.",
        },
        {
          q: 'Is Sayulita good for intermediate surfers, or only beginners?',
          a: "Both — but with different assets for each. For beginners, Sayulita's main beach is one of the best learning environments in Mexico. For intermediates, the real option is La Lancha, thirty minutes away by car: longer, cleaner waves with a proper face for bottom turns and cutbacks. Most verified schools offer guided intermediate lessons there as their standard intermediate format. For advanced surfers: Sayulita's main beach won't satisfy you. The surrounding coast has genuinely good spots, but accessing the best ones requires a guide.",
        },
        {
          q: 'How many surf lessons do I need to stand up on the board?',
          a: "Most complete beginners stand up at least once during their first lesson at Sayulita's main beach, given reasonable conditions. Realistic progression: 1 lesson — you understand what surfing is and you've stood up at least a few times with instructor assistance. 3 consecutive lessons — the pop-up is becoming muscle memory. 5–7 lessons — you can paddle into unbroken waves independently. If your goal is to go home able to surf on your own, three lessons on consecutive days is the realistic minimum.",
        },
        {
          q: 'What should I wear and bring to a surf lesson in Sayulita?',
          a: "Your school provides: surfboard, leash, rashguard. You bring: reef-safe mineral sunscreen SPF 50+ (applied 20 minutes before), 1–1.5 liters of water, boardshorts or rash shorts if you prefer your own, flip-flops for the walk, and a dry change of clothes for after. Leave at your accommodation: jewelry of any kind, cash in your pockets, your phone unless it's in a waterproof case you'd trust underwater.",
        },
        {
          q: 'Is surfing in Sayulita safe for beginners?',
          a: "Yes. Sayulita's main beach and north beach have some of the safest conditions for learning to surf in Mexico. Both breaks have sand bottoms with no reef in the lesson zone. The wave power is manageable, the shore break dissipates gently, and the water temperature year-round means hypothermia is not a concern. Every school in our directory requires instructors to hold current water safety and first aid certification.",
        },
        {
          q: 'How do I book a surf lesson in Sayulita without paying Viator or GetYourGuide fees?',
          a: "Through SayulitaTravel. Every school in our directory has a direct booking option — you're paying the operator's price without a platform markup on top. The 20–25% Viator charges stays with Viator, not with the instructor or the school. The lesson is the same. The instructor is the same person. The break is the same beach. The price is just what the lesson actually costs.",
        },
        {
          q: 'How much does a surf lesson cost in Sayulita?',
          a: "Group lessons (max 4–6 students per instructor) from $1,050 to $1,300 MXN per person ($55–$70 USD), including board, leash, rashguard, and 2-hour session. Private lessons from $1,350 to $1,800 MXN ($70–$95 USD). Surf camp packages: 3-day from $3,950 MXN, 5-day from $5,900 MXN, 7-day with accommodation from $9,500 MXN. Board rentals: $200–$400 MXN per day depending on board type.",
        },
      ],
    },
    explore: {
      label: 'Your Best Local Guide Online',
      title: 'Explore More Activities in Sayulita',
      subtitle: 'Surfing is the reason many people first come to Sayulita. These are the reasons they keep coming back.',
      links: [
        { strong: 'Whale Watching in Sayulita', desc: 'November to March — humpbacks closer than you\'ve ever seen', href: '#whales' },
        { strong: 'Tour to Islas Marietas', desc: 'Protected islands 30 min by panga — dolphins, sea turtles, hidden beach', href: '#marietas' },
        { strong: 'Horseback Riding', desc: 'Jungle trails with Pacific views you didn\'t expect', href: '#horses' },
        { strong: 'Yoga & Wellness', desc: 'Drop-in classes to week-long retreats', href: '#yoga' },
        { strong: 'All Tours & Activities', desc: 'Full directory of verified local operators', href: '/tours' },
      ],
      footer: '8+ verified surf schools and rental operators in Sayulita, Nayarit, Mexico',
    },
  },
  ESP: {
    meta: {
      title: 'Clases de Surf en Sayulita, México — Reserva Directo con Escuelas Locales | Sin Comisiones Viator',
      description: 'Las mejores clases de surf en Sayulita: principiantes, intermedios, niños, privadas y grupales. Reserva directo con escuelas locales verificadas — sin markup de Viator. Explicación de olas, precios comparados, locales desde el 2000.',
    },
    hero: {
      label: 'SayulitaTravel Surf',
      imgAlt: 'Clases de surf Sayulita',
      title: 'Clases de Surf en Sayulita — Reserva Directo con Escuelas Locales, ',
      accent: 'Sin Comisiones Viator',
      subtitle: 'Sayulita es donde la mayoría de la gente en México aprende a surfear. La ola es indulgente, los instructores tienen experiencia, y el pueblo facilita volver al día siguiente — y al siguiente.',
      subtitle2: 'Cada escuela listada aquí está verificada por nuestro equipo local. El precio que ves es lo que pagas — sin el 20–25% que Viator o GetYourGuide añaden a la misma clase.',
      trust: '8+ escuelas de surf y renta de equipos verificadas en Sayulita, Nayarit, México',
    },
    search: {
      title: 'Encuentra tu Clase de Surf en Sayulita — Filtra por Nivel, Escuela y Fecha',
      level: 'Nivel',
      levelBeginner: 'Principiante',
      levelIntermediate: 'Intermedio',
      levelKids: 'Niños',
      type: 'Tipo',
      typeGroup: 'Grupal',
      typePrivate: 'Privada',
      typeCamp: 'Campamento',
      school: 'Escuela',
      date: 'Fecha',
      btn: 'Buscar',
      popular: 'Popular ahora:',
      tags: ['Primera vez', 'Clases niños', 'Viaje La Lancha', 'Campamentos', 'Solo renta de equipo'],
    },
    breaks: {
      label: 'Conoce Antes de Remar',
      title: 'Las Olas de Sayulita — Sepa Dónde Remará Antes de Reservar',
      subtitle: 'Antes de elegir escuela, entiende las olas. Sayulita tiene tres zonas de surf distintas cerca del pueblo — y cada una sirve un propósito diferente. La ola perfecta para un niño de 7 años en su primera clase no es la adecuada para alguien que ya surfea y quiere progresar. Saber la diferencia antes de reservar te ahorra una sesión frustrante.',
      cards: [
        {
          title: 'Playa Principal de Sayulita — La Mejor Ola para Principiantes en México',
          desc: 'Aquí es donde casi todos toman su primera clase, y la razón es específica: la playa principal tiene fondo de arena. Eso importa más de lo que los principiantes creen. Los fondos de arena perdonan cuando caes — y en tu primera sesión, caerás mucho. No hay rocas en la zona de clase, la profundidad es manejable, y la ola rompe a un ritmo que te da tiempo para reaccionar.',
          bullets: [
            'Fondo de arena en toda la zona de clase — sin arrecife, sin rocas, sin consecuencias por una mala caída',
            'Tamaño de ola consistente y predecible — ni dramática, ni plana, confiablemente intermedia',
            'La orilla disipa antes de ser peligrosa — incluso caer en la espuma es manejable',
            'Múltiples escuelas operando simultáneamente — ojos experimentados en el agua y cultura de seguridad',
          ],
          note: 'Esta es la razón por la que Sayulita se ha convertido en el destino más popular de México para principiantes. No es el ambiente, no son los tacos — es la ola misma.',
        },
        {
          title: 'Playa Norte de Sayulita — La Ola más Suave para Niños y Principiantes Nerviosos',
          desc: 'A poca distancia al norte de la playa principal, rodeando el promontorio, hay una bahía más pequeña y tranquila con una ola más suave. La ola aquí es más lenta, menos profunda y de menor consecuencia. Es donde los mejores instructores llevan a niños menores de 7 años, adultos ansiosos sobre el agua, y cualquiera que haya tenido una mala experiencia en el océano.',
          bullets: [
            'Niños menores de 7 años que necesitan la introducción más tranquila al océano',
            'Adultos que están genuinamente ansiosos sobre el agua y necesitan más tiempo',
            'Cualquiera que haya tenido una mala experiencia en el océano y necesite recuperar confianza',
          ],
          tip: 'Pide a tu escuela específicamente la playa norte si esto te describe a ti o a tu hijo.',
        },
        {
          title: 'La Lancha, Punta Mita — Donde los Intermedios se Gradúan',
          desc: 'A treinta minutos al sur de Sayulita en auto, La Lancha es una experiencia completamente diferente. Mientras la playa principal de Sayulita da olas cortas e indulgentes que cierran rápido, La Lancha ofrece recorridos más largos y limpios — olas con una cara real que te dan tiempo para surfear, no solo pararte y aguantar. La forma es consistente, hay menos gente, y el paisaje es de los mejores de la Riviera Nayarit.',
          whoGo: 'Quién debería ir a La Lancha:',
          goItems: [
            'Has tenido 2–3 clases y te paras consistentemente',
            'Quieres trabajar en giros, no solo remar espuma',
            'Eres un nadador seguro y cómodo remando en aguas abiertas',
          ],
          whoStay: 'Quién debería quedarse en la playa principal:',
          stayDesc: 'Cualquiera en su primera o segunda clase. Las olas de La Lancha son más potentes. Serán divertidas en una semana — confusas el primer día.',
        },
      ],
      secret: {
        title: 'Olas Secretas y Viajes Guiados de Surf Alrededor de Sayulita',
        desc: 'Sayulita está rodeada de costa que la mayoría de turistas nunca alcanza. Los mejores operadores de surf del pueblo organizan viajes a spots accesibles solo por camino y una corta caminata por la jungla — playas de arena blanca con olas consistentes y casi nadie en el agua. Estos viajes combinan surf real con la experiencia de llegar a algún lugar genuinamente remoto.',
        items: [
          'Salida de Sayulita a las 9:00–9:30 AM',
          '25–35 minutos en auto, luego 6–10 minutos a pie por la jungla',
          '2.5 horas en la ola con tabla e instructor',
          'Parada para comer al regreso — tacos de pescado locales, no restaurante turístico',
        ],
        who: 'Para quiénes son:',
        whoDesc: 'Surfistas con nivel intermedio que quieren olas de calidad sin la multitud de Sayulita. No es la opción correcta para alguien que todavía está trabajando en su remada — las olas en estos spots son más exigentes que en la playa principal.',
      },
    },
    lessons: {
      label: 'Tipos de Clases de Surf',
      title: 'Tipos de Clases de Surf en Sayulita — ¿Cuál es la Adecuada para Ti?',
      subtitle: 'Las escuelas en el directorio verificado de Sayulita ofrecen seis tipos distintos de clases. Aquí tienes un desglose honesto de cada una para que puedas elegir sin leer cinco sitios web diferentes.',
      beginner: {
        badge: 'Más Popular',
        title: 'Clases de Surf para Principiantes — De Cero a Pararte',
        desc: 'Una clase estándar para principiantes dura aproximadamente dos horas. La sesión en tierra (20–30 minutos) cubre dinámica oceánica, técnica de remada, el pop-up, postura y seguridad. En el agua (1.5 horas), tu instructor se queda contigo, posiciona tu tabla, te empuja en el momento justo y te guía en tiempo real. Los primeros treinta minutos empiezas en espuma, luego pasas a olas sin romper.',
        outcome: 'Resultado realista para una primera clase:',
        outcomeDesc: 'La mayoría de los principiantes se paran al menos una vez. Algunos se paran en el primer empujón. Otros tardan 45 minutos. Ambos son normales.',
        included: 'Tabla de surf, rashguard, leash incluidos',
        cta: 'Reservar clase de principiante',
      },
      intermediate: {
        title: 'Clases de Surf Intermedio — Mejora tu Técnica',
        desc: 'Si ya puedes pararte y surfear una ola — aunque sea inconsistentemente — una clase de principiante será frustrante. Las clases intermedias se enfocan en trim y distribución de peso, bottom turn y cutback, lectura de olas, eficiencia de remada y pop-up consistente bajo presión. La mejor ola para clases intermedias es La Lancha sobre la playa principal de Sayulita.',
        items: [
          'Trim y distribución de peso en la cara de la ola',
          'Maniobras de bottom turn y cutback',
          'Lectura de olas y posicionamiento',
          'Eficiencia de remada y pop-up consistente',
        ],
        cta: 'Reservar clase de surf intermedio',
      },
      kids: {
        title: 'Clases de Surf para Niños — Desde 5 Años',
        desc: 'Sayulita es uno de los mejores lugares en México para que los niños aprendan a surfear. Olas suaves, instructores con experiencia en niños y un ambiente relajado donde caerse es parte de la diversión. Para niños de 9 años o menos, las escuelas verificadas asignan un instructor por máximo dos niños. Playa norte para menores de 7, playa principal para 8 años o más.',
        item: 'Sesiones de 1.5 horas, instructores certificados, equipo adecuado para niños',
        cta: 'Reservar clases de surf para niños',
      },
      privateVsGroup: {
        title: 'Privada vs Grupal — Lo que la Diferencia de Precio te Ofrece',
        desc: 'Las clases grupales (2–6 por instructor) son la opción correcta cuando eres principiante, vienes con amigos o el presupuesto importa. Las clases privadas valen la pena cuando quieres progresar lo más rápido posible, tienes un problema técnico específico o reservas para un niño pequeño que necesita atención 1:1. La diferencia de precio es de aproximadamente $300–500 MXN por persona.',
        group: 'Grupal',
        groupPrice: '$1,050–$1,300 MXN',
        groupRatio: '2–6 estudiantes por instructor',
        private: 'Privada',
        privatePrice: '$1,350–$1,800 MXN',
        privateRatio: 'Instrucción 1-a-1',
      },
      camps: {
        title: 'Campamentos de Surf — Paquetes de Varios Días con Alojamiento',
        desc: 'Si tu viaje está construido alrededor del surf, un campamento es la forma más eficiente de mejorar. Los paquetes van desde fin de semana de 3 días hasta inmersión total de 7 días. Típicamente incluye 2 sesiones por día, todo el equipo, alojamiento, viaje guiado a La Lancha y análisis de video en campamentos premium.',
        price3: '3 días desde $3,950 MXN',
        price5: '5 días desde $5,900 MXN',
        price7: '7 días con alojamiento desde $9,500 MXN',
        cta: 'Explorar campamentos',
      },
      rentals: {
        title: 'Renta de Tablas de Surf — Para Surfistas que Solo Necesitan Equipo',
        desc: 'Tabla blanda: $200–$250 MXN por día. Longboard: $250–$350 MXN por día. Shortboard de rendimiento: $300–$400 MXN por día. Tarifa semanal: la mayoría de las tiendas descuentan 25–35% para rentas de 5+ días. Algunos operadores entregan en tu propiedad de renta — útil si te hospedas en las colinas.',
        cta: 'Explorar renta de tablas',
      },
    },
    pricing: {
      label: 'Precios Transparentes',
      title: '¿Cuánto Cuestan las Clases de Surf en Sayulita?',
      subtitle: 'Menos de lo que piensas — y significativamente menos de lo que Viator cobra por la misma clase con el mismo instructor. Aquí están los precios verificados de los operadores en nuestro directorio.',
      group: {
        title: 'Clase Grupal de Surf',
        price: '$1,050–$1,300 MXN',
        usd: '≈ $55–$70 USD',
        students: '4–6 estudiantes por instructor',
        board: 'Tabla, leash, rashguard incluidos',
        duration: '20 min tierra, 1.5 hrs agua',
        viator: 'Precio Viator: ~$83 USD — misma clase, mismo instructor, $13–$28 más caro',
      },
      private: {
        badge: 'Mejor Valor',
        title: 'Clase Privada de Surf',
        price: '$1,350–$1,800 MXN',
        usd: '≈ $70–$95 USD',
        oneOnOne: 'Instrucción 1-a-1',
        focus: 'Enfoque total en tu progresión',
        equipment: 'Todo el equipo incluido',
        note: 'Precio por debajo de clases comparables en Los Cabos y la costa de Oaxaca — la alta concentración de escuelas en Sayulita mantiene el mercado competitivo.',
      },
      camps: {
        title: 'Paquetes de Campamento',
        price: '$3,950–$9,500 MXN',
        usd: '≈ $200–$500 USD',
        day3: '3 días (solo clases): desde $3,950 MXN',
        day5: '5 días (solo clases): desde $5,900 MXN',
        day7: '7 días con alojamiento: desde $9,500 MXN',
        note: 'Los precios varían según tipo de alojamiento, sesiones por día e inclusión del viaje a La Lancha.',
      },
      rentals: {
        title: 'Precios de Renta de Tablas',
        foam: 'Tabla Blanda',
        foamPrice: '$200–$250 MXN / día',
        longboard: 'Longboard',
        longboardPrice: '$250–$350 MXN / día',
        shortboard: 'Shortboard de Rendimiento',
        shortboardPrice: '$300–$400 MXN / día',
        weekly: 'Tarifa Semanal (5+ días)',
        weeklyPrice: '25–35% descuento',
        note: 'Algunos operadores entregan tablas en tu propiedad de renta. Útil si te hospedas en las colinas.',
      },
    },
    expectation: {
      label: 'Tu Primera Clase',
      title: 'Qué Esperar en tu Primera Clase de Surf en Sayulita',
      subtitle: 'Nadie te dice esto antes de llegar. Aquí está exactamente lo que sucede.',
      land: {
        title: 'La Sesión en Tierra — Primeros 20 a 30 Minutos',
        desc: 'La clase comienza en la playa, no en el agua. Tu instructor cubre cinco cosas en orden: cómo se forman y rompen las olas, cómo remar sin agotar los brazos, la secuencia del pop-up, tu postura en la tabla y seguridad en el agua. Veinte pop-ups de práctica en arena seca suena excesivo hasta que lo intentas por primera vez en agua en movimiento. Los instructores que más tiempo pasan en tierra producen más estudiantes que se paran en la primera sesión.',
      },
      water: {
        title: 'En el Agua — 1.5 Horas con tu Instructor',
        desc: 'Tu instructor está en el agua contigo durante toda la sesión. No mirando desde la orilla. Te posiciona en la ola, te dice cuándo remar, te empuja en el momento justo y te da instrucciones mientras surfeas. Los primeros treinta minutos: deslizamientos en espuma, luego intentos de pararte. La segunda hora: olas sin romper y el pop-up sucede automáticamente o te dice en qué trabajar en tu próxima sesión.',
        end: 'Al final: mojado, cansado y ya pensando en reservar otra clase. Así le pasa a casi todos.',
      },
      included: {
        title: 'Qué Está Incluido y Qué Traer',
        header: '✓ Incluido en cada clase',
        items: [
          'Tabla de surf — ajustada a tu peso y nivel',
          'Rashguard — protección UV y prevención de rozaduras',
          'Leash — conecta la tabla a tu tobillo',
          'Instructor en el agua contigo durante toda la sesión',
        ],
        bring: 'Trae esto',
        bringItems: [
          'Protector solar mineral SPF 50+ — aplicar 20 min antes',
          'Al menos 1 litro de agua',
          'Ropa seca para cambiarte',
          'Sandalias o chanclas',
        ],
        leave: 'Deja en tu alojamiento',
        leaveItems: [
          'Joyas de cualquier tipo',
          'Tu teléfono (a menos que esté en funda impermeable)',
          'Lentes de sol sin correa segura',
        ],
      },
    },
    schools: {
      label: 'Escuelas Locales Verificadas',
      title: 'Mejores Escuelas de Surf en Sayulita — Verificadas por Nuestro Equipo Local',
      subtitle: 'Cada escuela en este directorio ha sido revisada físicamente por nuestro equipo en Sayulita. Certificaciones de instructores, condición del equipo, protocolos de seguridad y la proporción real de estudiantes por instructor en el agua.',
      from: 'Desde ',
      book: 'Reservar Ahora',
      cta: 'Ver todas las escuelas verificadas',
    },
    testimonials: {
      label: 'Reseñas de Estudiantes',
      title: 'Lo Que Dicen Nuestros Estudiantes de Surf',
      items: [
        {
          quote: 'Intenté reservar por Viator y noté que el precio era $30 más alto que el sitio web de la escuela. Los encontré en SayulitaTravel y pagué la tarifa del operador. Mismo instructor, misma mañana, misma clase — solo el precio real.',
          name: 'Kevin M.',
          location: 'Chicago',
          activity: 'Clase grupal principiante',
          date: 'Enero 2025',
          rating: 5,
        },
        {
          quote: 'Traje a mis dos hijos — de 6 y 9 años — y pedí específicamente clases en la playa norte porque mi pequeña es nerviosa en el agua. El instructor dedicó el tiempo extra que ella necesitaba sin hacerla sentir señalada. Logró pararse sola al final. No habría sabido pedir esa playa sin este sitio.',
          name: 'Laura T.',
          location: 'Vancouver',
          activity: 'Clases de surf para niños',
          date: 'Marzo 2025',
          rating: 5,
        },
        {
          quote: 'Hice el campamento de 3 días después de dos años intentando aprender los fines de semana sin mucho progreso. El primer día el instructor identificó exactamente lo que estaba haciendo mal en el pop-up — había aprendido un mal hábito que nadie me había corregido. Para el tercer día en La Lancha estaba haciendo mis primeros giros de verdad. Valió cada peso.',
          name: 'James R.',
          location: 'Austin',
          activity: 'Campamento de surf 3 días',
          date: 'Febrero 2025',
          rating: 5,
        },
        {
          quote: 'Reservamos una clase privada para el cumpleaños número 8 de nuestra hija. El instructor fue paciente, profesional y logró que se parara en menos de 30 minutos. La ubicación en la playa norte marcó toda la diferencia — se sintió segura todo el tiempo. Ya estamos planeando nuestro regreso.',
          name: 'Sarah & Mike T.',
          location: 'Portland',
          activity: 'Clase privada para niños',
          date: 'Diciembre 2024',
          rating: 5,
        },
        {
          quote: 'Estaba nervioso por surfear siendo un principiante completo de 45 años. El instructor me tranquilizó de inmediato. La sesión en tierra fue exhaustiva, el tiempo en el agua fue divertido, y de verdad me paré. No con elegancia, pero me paré. Eso fue suficiente para engancharme.',
          name: 'David L.',
          location: 'New York',
          activity: 'Clase grupal principiante',
          date: 'Noviembre 2024',
          rating: 5,
        },
        {
          quote: 'El campamento de 5 días fue exactamente lo que necesitaba. El análisis de video por la tarde me mostró exactamente lo que estaba haciendo mal. Para el cuarto día ya estaba atrapando olas sin que me empujaran. El viaje a La Lancha el último día fue lo mejor de todo mi viaje a México.',
          name: 'Emma R.',
          location: 'Londres',
          activity: 'Campamento de surf 5 días',
          date: 'Febrero 2025',
          rating: 5,
        },
      ],
    },
    when: {
      label: 'Cuándo Ir',
      title: '¿Cuál es el Mejor Momento para Aprender Surf en Sayulita?',
      yearRound: {
        title: 'Olas Todo el Año',
        desc: 'Sayulita tiene olas todo el año. El banco de arena en la playa principal genera olas surfables incluso cuando el oleaje del Pacífico es mínimo. No hay mes en que el océano esté completamente plano — lo que significa que no hay mes en que no puedas tomar una clase de principiante.',
      },
      summer: {
        title: 'Oleaje de Verano (Mayo–Octubre) — Mejor para Intermedios/Avanzados',
        desc: 'La temporada de oleaje del sur trae las olas más consistentes y potentes del año. La playa principal se vuelve más grande; La Lancha y las olas circundantes se vuelven genuinamente excelentes. Para surfistas intermedios y avanzados, esta es la temporada para planificar.',
      },
      dry: {
        title: 'Temporada Seca (Noviembre–Abril) — Mejor para Principiantes y Familias',
        desc: 'Cielos despejados, viento predecible, olas más pequeñas y mañanas cómodas. Ideal para aprender. Desventaja: temporada más concurrida. Diciembre y Spring Break se llenan rápido. Si vienes entre el 20 de diciembre y el 5 de enero o durante Semana Santa — reserva con al menos una semana de anticipación.',
      },
      tip: 'Evitando las multitudes — Mejores horas para surfear:',
      tipDesc: '7:00 AM a 10:00 AM es cuando el surf en Sayulita está en su mejor momento. El viento es ligero, la superficie del agua está limpia y hay significativamente menos gente. Reserva el turno matutino — la mayoría de las escuelas tienen sesiones a las 8:00 o 9:00 AM.',
    },
    faq: {
      title: 'Preguntas Frecuentes Sobre Clases de Surf en Sayulita',
      subtitle: 'Todo lo que necesitas saber, respondido por expertos locales.',
      items: [
        {
          q: '¿Necesito experiencia en surf para tomar clases en Sayulita?',
          a: 'Para nada. Los principiantes completos son la mayoría de los estudiantes en cada escuela de la playa principal. La ola de Sayulita está específicamente diseñada para personas que nunca han estado en una tabla. Los instructores están acostumbrados a empezar desde cero, la ola es indulgente y la cultura del pueblo es relajada.',
        },
        {
          q: '¿A qué edad pueden los niños empezar clases de surf en Sayulita?',
          a: 'La mayoría de las escuelas verificadas aceptan niños desde los 5 años. Algunas aceptan menores caso por caso con un padre presente. Para niños menores de 7 años, la playa norte — ola más suave, agua menos profunda — es fuertemente recomendada sobre la playa principal.',
        },
        {
          q: '¿Sayulita es buena para surfistas intermedios o solo para principiantes?',
          a: 'Ambos — pero con diferentes ventajas para cada uno. Para principiantes, la playa principal de Sayulita es uno de los mejores entornos de aprendizaje en México. Para intermedios, la opción real es La Lancha, a treinta minutos en auto: olas más largas y limpias con una cara adecuada para giros.',
        },
        {
          q: '¿Cuántas clases de surf necesito para pararme en la tabla?',
          a: 'La mayoría de los principiantes se paran al menos una vez durante su primera clase en la playa principal de Sayulita. Progresión realista: 1 clase — entiendes qué es surfear y te has parado al menos unas veces. 3 clases consecutivas — el pop-up se vuelve memoria muscular. 5–7 clases — puedes remar y atrapar olas independientemente.',
        },
        {
          q: '¿Qué debo usar y traer a una clase de surf en Sayulita?',
          a: 'Tu escuela proporciona: tabla de surf, leash, rashguard. Tú traes: protector solar mineral SPF 50+, 1–1.5 litros de agua, sandalias y ropa seca para después. Deja en tu alojamiento: joyas, efectivo en los bolsillos, tu teléfono a menos que esté en una funda impermeable.',
        },
        {
          q: '¿Es seguro surfear en Sayulita para principiantes?',
          a: 'Sí. La playa principal y la playa norte de Sayulita tienen algunas de las condiciones más seguras para aprender surf en México. Ambas tienen fondo de arena sin arrecife en la zona de clase. La potencia de la ola es manejable y la temperatura del agua durante todo el año significa que la hipotermia no es una preocupación.',
        },
        {
          q: '¿Cómo reservo una clase de surf sin pagar comisiones de Viator o GetYourGuide?',
          a: 'A través de SayulitaTravel. Cada escuela en nuestro directorio tiene una opción de reserva directa — estás pagando el precio del operador sin markup de plataforma. El 20–25% que Viator cobra se queda con Viator, no con el instructor ni la escuela. La clase es la misma. El instructor es la misma persona. La ola es la misma playa.',
        },
        {
          q: '¿Cuánto cuesta una clase de surf en Sayulita?',
          a: 'Clases grupales (máx. 4–6 estudiantes por instructor) desde $1,050 hasta $1,300 MXN por persona ($55–$70 USD), incluyendo tabla, leash, rashguard y sesión de 2 horas. Clases privadas desde $1,350 hasta $1,800 MXN ($70–$95 USD). Paquetes de campamento: 3 días desde $3,950 MXN, 5 días desde $5,900 MXN, 7 días con alojamiento desde $9,500 MXN.',
        },
      ],
    },
    explore: {
      label: 'Tu Mejor Guía Local Online',
      title: 'Explora Más Actividades en Sayulita',
      subtitle: 'El surf es la razón por la que muchos vienen a Sayulita. Estas son las razones por las que siguen regresando.',
      links: [
        { strong: 'Avistamiento de Ballenas', desc: 'Noviembre a marzo — ballenas jorobadas más cerca que nunca', href: '#whales' },
        { strong: 'Tour a Islas Marietas', desc: 'Islas protegidas a 30 min en panga — delfines, tortugas, playa escondida', href: '#marietas' },
        { strong: 'Paseos a Caballo', desc: 'Senderos en la jungla con vistas al Pacífico', href: '#horses' },
        { strong: 'Yoga y Bienestar', desc: 'Clases sueltas a retiros de una semana', href: '#yoga' },
        { strong: 'Todos los Tours y Actividades', desc: 'Directorio completo de operadores locales verificados', href: '/tours' },
      ],
      footer: '8+ escuelas de surf y renta de equipos verificadas en Sayulita, Nayarit, México',
    },
  },
};

const schoolImages = {
  school1: heroBg,
};

const schools = [
  {
    id: 1,
    name: 'Sayulita Surf Camp',
    levels: 'All Levels',
    priceFrom: '$1,050 MXN',
    types: ['Group', 'Private', 'Camp', 'Trips'],
    rating: 4.9,
    image: heroBg.src,
    badge: 'Verified',
  },
  {
    id: 2,
    name: 'North Beach Surf School',
    levels: 'Beginner · Kids',
    priceFrom: '$1,050 MXN',
    types: ['Group', 'Private', 'Kids'],
    rating: 4.8,
    image: heroBg.src,
    badge: 'Top Rated',
  },
  {
    id: 3,
    name: 'La Lancha Surf Adventures',
    levels: 'Intermediate · Advanced',
    priceFrom: '$1,500 MXN',
    types: ['Private', 'Trips', 'Camp'],
    rating: 4.9,
    image: heroBg.src,
    badge: 'Popular',
  },
  {
    id: 4,
    name: 'Punta Mita Surf Guides',
    levels: 'Intermediate · Advanced',
    priceFrom: '$1,800 MXN',
    types: ['Private', 'Trips'],
    rating: 4.7,
    image: heroBg.src,
    badge: 'Expert',
  },
  {
    id: 5,
    name: 'Kids Surf Sayulita',
    levels: 'Kids · Beginner',
    priceFrom: '$1,050 MXN',
    types: ['Group', 'Private', 'Kids'],
    rating: 4.9,
    image: heroBg.src,
    badge: 'Family',
  },
  {
    id: 6,
    name: 'Sayulita Board Rentals',
    levels: 'All Levels',
    priceFrom: '$200 MXN',
    types: ['Board Rental'],
    rating: 4.6,
    image: heroBg.src,
    badge: 'Equipment',
  },
];

export default function SurfLessonsPage({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  const faqItems = t.faq.items;

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
  const [searchLevel, setSearchLevel] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchSchool, setSearchSchool] = useState('');
  const [searchDate, setSearchDate] = useState(null);
  const [searchPriceMin, setSearchPriceMin] = useState('');
  const [searchPriceMax, setSearchPriceMax] = useState('');

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      if (searchLevel && !school.levels.toLowerCase().includes(searchLevel.toLowerCase())) return false;
      if (searchType && !school.types.some((t) => t.toLowerCase().includes(searchType.toLowerCase()))) return false;
      if (searchSchool && !school.name.toLowerCase().includes(searchSchool.toLowerCase())) return false;
      return true;
    });
  }, [searchLevel, searchType, searchSchool]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="sl-page">
      {/* ═══ HERO ═══ */}
      <section className="sl-hero section" id="surf-hero">
        <div className="sl-hero__bg">
          <img
        src={heroBg.src}
        alt={t.hero.imgAlt}
        className="sl-hero__bg-img"
        width={1376}
        height={768}
        fetchPriority="high"
      />
          <div className="sl-hero__overlay" />
        </div>
        <div className="container">
          <motion.div
            className="sl-hero__content"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="sl-hero__label">{t.hero.label}</span>
            <h1 className="sl-hero__title">
              {t.hero.title}
              <span className="sl-hero__accent">{t.hero.accent}</span>
            </h1>
            <p className="sl-hero__subtitle">{t.hero.subtitle}</p>
            <p className="sl-hero__subtitle2">{t.hero.subtitle2}</p>
            <div className="sl-hero__trust">
              <FiShield size={18} />
              <span>{t.hero.trust}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SEARCH / FILTERS ═══ */}
      <section className="sl-search section" id="surf-search">
        <FloatingPalms />
        <div className="container">
          <SectionHeader title={t.search.title} />
          <motion.div
            className="sl-search__bar"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="sl-search__field">
              <div className="sl-search__icon"><MdSurfing size={18} /></div>
              <select
                className="sl-search__select"
                value={searchLevel}
                onChange={(e) => setSearchLevel(e.target.value)}
                aria-label={t.search.level}
              >
                <option value="">{t.search.level}</option>
                <option value="beginner">{t.search.levelBeginner}</option>
                <option value="intermediate">{t.search.levelIntermediate}</option>
                <option value="kids">{t.search.levelKids}</option>
              </select>
            </div>
            <div className="sl-search__divider" />
            <div className="sl-search__field">
              <div className="sl-search__icon"><FiUsers size={18} /></div>
              <select
                className="sl-search__select"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                aria-label={t.search.type}
              >
                <option value="">{t.search.type}</option>
                <option value="group">{t.search.typeGroup}</option>
                <option value="private">{t.search.typePrivate}</option>
                <option value="camp">{t.search.typeCamp}</option>
              </select>
            </div>
            <div className="sl-search__divider" />
            <div className="sl-search__field">
              <div className="sl-search__icon"><FiMapPin size={18} /></div>
              <select
                className="sl-search__select"
                value={searchSchool}
                onChange={(e) => setSearchSchool(e.target.value)}
                aria-label={t.search.school}
              >
                <option value="">{t.search.school}</option>
                {schools.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="sl-search__divider" />
            <div className="sl-search__field">
              <div className="sl-search__icon"><FiCalendar size={18} /></div>
              <DatePicker
                selected={searchDate}
                onChange={(date) => setSearchDate(date)}
                placeholderText={t.search.date}
                dateFormat="dd MMM"
                minDate={new Date()}
              />
            </div>
            <button className="sl-search__btn" id="sl-search-submit">
              <FiSearch size={18} /> {t.search.btn}
            </button>
          </motion.div>
          <div className="sl-search__tags">
            <span className="sl-search__tags-label">{t.search.popular}</span>
            {t.search.tags.map((tag) => (
              <button key={tag} className="sl-search__tag">{tag}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SURF BREAKS ═══ */}
      <section className="section sl-breaks" id="surf-breaks">
        <FloatingPalms />
        <div className="container">
          <SectionHeader
            label={t.breaks.label}
            title={t.breaks.title}
            subtitle={t.breaks.subtitle}
          />
          <div className="sl-breaks__grid">
            {t.breaks.cards.map((card, ci) => (
              <motion.div
                key={ci}
                className="sl-breaks__card"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="sl-breaks__card-header">
                  <div className="sl-breaks__icon">
                    {ci === 0 ? <MdBeachAccess size={28} /> : ci === 1 ? <MdSurfing size={28} /> : <GiSurfBoard size={28} />}
                  </div>
                  <h3>{card.title}</h3>
                </div>
                <p className="sl-breaks__desc">{card.desc}</p>
                <ul className="sl-breaks__bullets">
                  {card.bullets?.map((b, bi) => (
                    <li key={bi}><FiCheck size={14} className="sl-breaks__check" /><span>{b}</span></li>
                  ))}
                </ul>
                {card.note && (
                  <div className="sl-breaks__note">
                    <FiInfo size={14} />
                    <span>{card.note}</span>
                  </div>
                )}
                {card.tip && (
                  <div className="sl-breaks__tip">
                    <FiStar size={14} />
                    <span>{card.tip}</span>
                  </div>
                )}
                {card.whoGo && (
                  <div className="sl-breaks__who">
                    <div className="sl-breaks__who-col">
                      <h4>{card.whoGo}</h4>
                      <ul className="sl-breaks__bullets">
                        {card.goItems.map((g, gi) => (
                          <li key={gi}><FiCheck size={14} className="sl-breaks__check" /><span>{g}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="sl-breaks__who-col">
                      <h4>{card.whoStay}</h4>
                      <p>{card.stayDesc}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="sl-breaks__card sl-breaks__card--secret"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="sl-breaks__card-header">
              <div className="sl-breaks__icon"><GiParachute size={28} /></div>
              <h3>{t.breaks.secret.title}</h3>
            </div>
            <p className="sl-breaks__desc">{t.breaks.secret.desc}</p>
            <ul className="sl-breaks__bullets">
              {t.breaks.secret.items.map((item, ii) => (
                <li key={ii}><FiCheck size={14} className="sl-breaks__check" /><span>{item}</span></li>
              ))}
            </ul>
            <h4>{t.breaks.secret.who}</h4>
            <p>{t.breaks.secret.whoDesc}</p>
          </motion.div>
        </div>
      </section>

      {/* ═══ LESSON TYPES ═══ */}
      <section className="section sl-types" id="surf-types">
        <FloatingPalms />
        <div className="container">
          <SectionHeader label={t.lessons.label} title={t.lessons.title} subtitle={t.lessons.subtitle} />
          <motion.div className="sl-types__grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div className="sl-types__card" variants={itemVariants}>
              <span className="sl-types__badge">{t.lessons.beginner.badge}</span>
              <h3>{t.lessons.beginner.title}</h3>
              <p>{t.lessons.beginner.desc}</p>
              <p><strong>{t.lessons.beginner.outcome}</strong> {t.lessons.beginner.outcomeDesc}</p>
              <p><FiCheck size={14} /> {t.lessons.beginner.included}</p>
              <Button variant="primary">{t.lessons.beginner.cta}</Button>
            </motion.div>
            <motion.div className="sl-types__card" variants={itemVariants}>
              <h3>{t.lessons.intermediate.title}</h3>
              <p>{t.lessons.intermediate.desc}</p>
              <ul>{t.lessons.intermediate.items.map((item, i) => <li key={i}><FiCheck size={14} /> {item}</li>)}</ul>
              <Button variant="primary">{t.lessons.intermediate.cta}</Button>
            </motion.div>
            <motion.div className="sl-types__card" variants={itemVariants}>
              <h3>{t.lessons.kids.title}</h3>
              <p>{t.lessons.kids.desc}</p>
              <p><FiCheck size={14} /> {t.lessons.kids.item}</p>
              <Button variant="primary">{t.lessons.kids.cta}</Button>
            </motion.div>
            <motion.div className="sl-types__card" variants={itemVariants}>
              <h3>{t.lessons.privateVsGroup.title}</h3>
              <p>{t.lessons.privateVsGroup.desc}</p>
              <div className="sl-types__split">
                <div className="sl-types__split-col">
                  <h4>{t.lessons.privateVsGroup.group}</h4>
                  <p className="sl-types__price">{t.lessons.privateVsGroup.groupPrice}</p>
                  <p>{t.lessons.privateVsGroup.groupRatio}</p>
                </div>
                <div className="sl-types__split-col">
                  <h4>{t.lessons.privateVsGroup.private}</h4>
                  <p className="sl-types__price">{t.lessons.privateVsGroup.privatePrice}</p>
                  <p>{t.lessons.privateVsGroup.privateRatio}</p>
                </div>
              </div>
            </motion.div>
            <motion.div className="sl-types__card" variants={itemVariants}>
              <h3>{t.lessons.camps.title}</h3>
              <p>{t.lessons.camps.desc}</p>
              <ul>
                <li><FiCheck size={14} /> {t.lessons.camps.price3}</li>
                <li><FiCheck size={14} /> {t.lessons.camps.price5}</li>
                <li><FiCheck size={14} /> {t.lessons.camps.price7}</li>
              </ul>
              <Button variant="primary">{t.lessons.camps.cta}</Button>
            </motion.div>
            <motion.div className="sl-types__card" variants={itemVariants}>
              <h3>{t.lessons.rentals.title}</h3>
              <p>{t.lessons.rentals.desc}</p>
              <Button variant="primary">{t.lessons.rentals.cta}</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="section sl-pricing" id="surf-pricing">
        <div className="container">
          <SectionHeader label={t.pricing.label} title={t.pricing.title} subtitle={t.pricing.subtitle} />
          <div className="sl-pricing__grid">
            <div className="sl-pricing__card">
              <h3>{t.pricing.group.title}</h3>
              <p className="sl-pricing__price">{t.pricing.group.price}</p>
              <p className="sl-pricing__usd">{t.pricing.group.usd}</p>
              <ul>
                <li>{t.pricing.group.students}</li>
                <li>{t.pricing.group.board}</li>
                <li>{t.pricing.group.duration}</li>
              </ul>
              <p className="sl-pricing__viator">{t.pricing.group.viator}</p>
            </div>
            <div className="sl-pricing__card sl-pricing__card--featured">
              <span className="sl-pricing__badge">{t.pricing.private.badge}</span>
              <h3>{t.pricing.private.title}</h3>
              <p className="sl-pricing__price">{t.pricing.private.price}</p>
              <p className="sl-pricing__usd">{t.pricing.private.usd}</p>
              <ul>
                <li>{t.pricing.private.oneOnOne}</li>
                <li>{t.pricing.private.focus}</li>
                <li>{t.pricing.private.equipment}</li>
              </ul>
              <p className="sl-pricing__note">{t.pricing.private.note}</p>
            </div>
            <div className="sl-pricing__card">
              <h3>{t.pricing.camps.title}</h3>
              <p className="sl-pricing__price">{t.pricing.camps.price}</p>
              <p className="sl-pricing__usd">{t.pricing.camps.usd}</p>
              <ul>
                <li>{t.pricing.camps.day3}</li>
                <li>{t.pricing.camps.day5}</li>
                <li>{t.pricing.camps.day7}</li>
              </ul>
              <p className="sl-pricing__note">{t.pricing.camps.note}</p>
            </div>
          </div>

          <div className="sl-pricing__rentals">
            <h3>{t.pricing.rentals.title}</h3>
            <div className="sl-pricing__rentals-grid">
              <div><span className="sl-pricing__rental-label">{t.pricing.rentals.foam}</span><span>{t.pricing.rentals.foamPrice}</span></div>
              <div><span className="sl-pricing__rental-label">{t.pricing.rentals.longboard}</span><span>{t.pricing.rentals.longboardPrice}</span></div>
              <div><span className="sl-pricing__rental-label">{t.pricing.rentals.shortboard}</span><span>{t.pricing.rentals.shortboardPrice}</span></div>
              <div><span className="sl-pricing__rental-label">{t.pricing.rentals.weekly}</span><span>{t.pricing.rentals.weeklyPrice}</span></div>
            </div>
            <p className="sl-pricing__rentals-note">{t.pricing.rentals.note}</p>
          </div>
        </div>
      </section>

      {/* ═══ WHAT TO EXPECT ═══ */}
      <section className="section sl-expect" id="surf-expect">
        <FloatingPalms />
        <div className="container">
          <SectionHeader label={t.expectation.label} title={t.expectation.title} subtitle={t.expectation.subtitle} />
          <div className="sl-expect__steps">
            <motion.div className="sl-expect__step" variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="sl-expect__step-num">1</div>
              <h3>{t.expectation.land.title}</h3>
              <p>{t.expectation.land.desc}</p>
            </motion.div>
            <motion.div className="sl-expect__step" variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="sl-expect__step-num">2</div>
              <h3>{t.expectation.water.title}</h3>
              <p>{t.expectation.water.desc}</p>
              <p className="sl-expect__end">{t.expectation.water.end}</p>
            </motion.div>
          </div>
          <motion.div className="sl-expect__included" variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3>{t.expectation.included.title}</h3>
            <div className="sl-expect__cols">
              <div>
                <h4>{t.expectation.included.header}</h4>
                <ul>{t.expectation.included.items.map((item, i) => <li key={i}><FiCheck size={14} /> {item}</li>)}</ul>
              </div>
              <div>
                <h4>{t.expectation.included.bring}</h4>
                <ul>{t.expectation.included.bringItems.map((item, i) => <li key={i}><FiCheck size={14} /> {item}</li>)}</ul>
              </div>
              <div>
                <h4>{t.expectation.included.leave}</h4>
                <ul>{t.expectation.included.leaveItems.map((item, i) => <li key={i}><FiCheck size={14} /> {item}</li>)}</ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SCHOOLS GRID ═══ */}
      <section className="section sl-schools" id="surf-schools">
        <div className="container">
          <SectionHeader label={t.schools.label} title={t.schools.title} subtitle={t.schools.subtitle} />
          <motion.div className="sl-schools__grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {filteredSchools.map((school) => (
              <motion.div key={school.id} className="sl-schools__card" variants={itemVariants}>
                <div className="sl-schools__img-wrap">
                  <img src={school.image} alt={school.name} className="sl-schools__img" />
                  <span className="sl-schools__badge">{school.badge}</span>
                </div>
                <div className="sl-schools__body">
                  <h3 className="sl-schools__name">{school.name}</h3>
                  <p className="sl-schools__level">{school.levels}</p>
                  <div className="sl-schools__rating">
                    <FiStar size={14} /> {school.rating}
                  </div>
                  <div className="sl-schools__types">
                    {school.types.map((type, ti) => (
                      <span key={ti} className="sl-schools__type-tag">{type}</span>
                    ))}
                  </div>
                  <div className="sl-schools__footer">
                    <p className="sl-schools__price">{t.schools.from}{school.priceFrom}</p>
                    <Button variant="primary" className="sl-schools__btn">{t.schools.book}</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Button variant="outline">{t.schools.cta}</Button>
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="section sl-testimonials" id="surf-testimonials">
        <FloatingPalms />
        <div className="container">
          <SectionHeader label={t.testimonials.label} title={t.testimonials.title} />
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="sl-testimonials__swiper"
          >
            {t.testimonials.items.map((r, i) => (
              <SwiperSlide key={i}>
                <div className="sl-testimonial-card">
                  <div className="sl-testimonial-card__stars">
                    {Array.from({ length: r.rating }).map((_, si) => (
                      <FiStar key={si} size={16} />
                    ))}
                  </div>
                  <blockquote className="sl-testimonial-card__quote">"{r.quote}"</blockquote>
                  <div className="sl-testimonial-card__author">
                    <div className="sl-testimonial-card__avatar">{r.name.charAt(0)}</div>
                    <div className="sl-testimonial-card__info">
                      <span className="sl-testimonial-card__name">{r.name}</span>
                      <span className="sl-testimonial-card__detail">{r.activity} · {r.date} · {r.location}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ═══ BEST TIME ═══ */}
      <section className="section sl-when" id="surf-when">
        <div className="container">
          <SectionHeader label={t.when.label} title={t.when.title} />
          <motion.div className="sl-when__grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div className="sl-when__card" variants={itemVariants}>
              <h3>{t.when.yearRound.title}</h3>
              <p>{t.when.yearRound.desc}</p>
            </motion.div>
            <motion.div className="sl-when__card" variants={itemVariants}>
              <h3>{t.when.summer.title}</h3>
              <p>{t.when.summer.desc}</p>
            </motion.div>
            <motion.div className="sl-when__card" variants={itemVariants}>
              <h3>{t.when.dry.title}</h3>
              <p>{t.when.dry.desc}</p>
            </motion.div>
          </motion.div>
          <div className="sl-when__tip">
            <strong>{t.when.tip}</strong>
            <p>{t.when.tipDesc}</p>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section sl-faq" id="surf-faq">
        <FloatingPalms />
        <div className="container">
          <SectionHeader title={t.faq.title} subtitle={t.faq.subtitle} />
          <div className="sl-faq__list">
            {faqItems.map((faq, i) => (
              <div key={i} className={`sl-faq__item ${openFaq === i ? 'sl-faq__item--open' : ''}`}>
                <button className="sl-faq__question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span>{faq.q}</span>
                  <FiChevronDown className="sl-faq__icon" size={20} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      className="sl-faq__answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPLORE MORE ═══ */}
      <section className="section sl-explore" id="surf-explore">
        <div className="container">
          <SectionHeader label={t.explore.label} title={t.explore.title} subtitle={t.explore.subtitle} />
          <div className="sl-explore__grid">
            {t.explore.links.map((link, i) => (
              <a key={i} href={link.href} className="sl-explore__link">
                <div className="sl-explore__link-content">
                  <strong>{link.strong}</strong>
                  <span>{link.desc}</span>
                </div>
                <FiArrowRight size={16} />
              </a>
            ))}
          </div>
          <p className="sl-explore__footer">{t.explore.footer}</p>
        </div>
      </section>
    </div>
  );
}
