import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMapPin, FiShield, FiUsers, FiChevronRight } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import FloatingPalms from '../FloatingPalms/FloatingPalms';
import './PlanningGuide.css';

const guides = [
  { id: 'best-time', icon: <FiSun /> },
  { id: 'getting-here', icon: <FiMapPin /> },
  { id: 'safety', icon: <FiShield /> },
  { id: 'who-is-it-for', icon: <FiUsers /> },
];

const i18n = {
  ENG: {
    label: "Practical Guide",
    title: "Planning Your Sayulita Vacation",
    subtitle: "A few things worth knowing before you book.",
    guides: [
      {
        title: 'Best Time to Visit Sayulita, Mexico',
        content: (
          <>
            <p>High season runs from <strong>mid-November through April</strong> — dry, sunny, and busy. Prices peak in December and around Spring Break.</p>
            <p>The shoulder months (<strong>May and November</strong>) are a sweet spot: the beaches are quieter, prices drop 20–40%, and the water is warm. Summer (June–September) brings afternoon rains and lush green hills — Sayulita in low season has a completely different, more local feel.</p>
            <p><strong>Bottom line:</strong> if you want guaranteed sun and don't mind crowds, book November–April. If you want value and a slower pace, May or October are ideal.</p>
          </>
        ),
      },
      {
        title: 'How to Get to Sayulita from Puerto Vallarta Airport',
        content: (
          <>
            <p>Sayulita is <strong>45 minutes north of Puerto Vallarta airport</strong> — easy to reach, a world apart.</p>
            <ul>
              <li><strong>Private transfer</strong> — most convenient, 45–50 min, book in advance through local operators listed here</li>
              <li><strong>Public bus</strong> — cheapest option, frequent departures from the Walmart bus stop near PVR, approx. 1.5 hrs</li>
              <li><strong>Shared shuttle</strong> — middle ground, usually arranged through your rental host</li>
              <li><strong>Rental car</strong> — easy drive north on Highway 200, free parking at most properties</li>
            </ul>
          </>
        ),
      },
      {
        title: 'Is Sayulita Safe for Tourists?',
        content: (
          <>
            <p>The honest answer: <strong>yes</strong>, for the vast majority of visitors, Sayulita is a safe and relaxed destination.</p>
            <p>It's a small town with a strong expat and local community that depends on tourism. Petty theft happens — don't leave valuables on the beach or in an unlocked car. But violent crime affecting tourists is extremely rare and well below the levels of most Mexican resort cities.</p>
            <p>Standard precautions apply: use registered taxis, don't flash expensive equipment, and follow local advice about which beaches to visit after dark.</p>
          </>
        ),
      },
      {
        title: 'Sayulita for Families, Couples & Groups — Who Is It For?',
        content: (
          <>
            <p><strong>Families with kids:</strong> Sayulita's main beach has a gentle wave perfect for beginner surfers aged 5 and up. The town is walkable, the food is excellent, and the turtle rescue camp is something children remember for years.</p>
            <p><strong>Couples:</strong> The north-side villas have ocean views and sunset terraces that are genuinely hard to beat. Sayulita isn't Cancun — it's quiet enough to actually relax, lively enough that you don't have to cook every night.</p>
            <p><strong>Groups of friends:</strong> Big villas, multiple surf breaks, the best fish tacos in the Riviera Nayarit, and bars that close when the last person leaves.</p>
            <p><strong>Digital nomads:</strong> Reliable internet, a coworking community, monthly rental rates that make sense, and a surf session available whenever your calendar is clear.</p>
          </>
        ),
      },
    ],
  },
  ESP: {
    label: "Guía Práctica",
    title: "Planifica tus Vacaciones en Sayulita",
    subtitle: "Algunas cosas que vale la pena saber antes de reservar.",
    guides: [
      {
        title: 'Mejor Época para Visitar Sayulita, México',
        content: (
          <>
            <p>La temporada alta va de <strong>mediados de noviembre a abril</strong> — clima seco, soleado y concurrido. Los precios alcanzan su punto máximo en diciembre y durante las vacaciones de primavera.</p>
            <p>Los meses intermedios (<strong>mayo y noviembre</strong>) son el punto ideal: las playas están más tranquilas, los precios bajan 20–40% y el agua está cálida. El verano (junio–septiembre) trae lluvias por la tarde y colinas verdes y frondosas — Sayulita en temporada baja tiene un ambiente completamente diferente, más local.</p>
            <p><strong>En resumen:</strong> si quieres sol garantizado y no te importan las multitudes, reserva de noviembre a abril. Si buscas valor y un ritmo más tranquilo, mayo u octubre son ideales.</p>
          </>
        ),
      },
      {
        title: 'Cómo Llegar a Sayulita desde el Aeropuerto de Puerto Vallarta',
        content: (
          <>
            <p>Sayulita está a <strong>45 minutos al norte del aeropuerto de Puerto Vallarta</strong> — fácil de llegar, un mundo aparte.</p>
            <ul>
              <li><strong>Traslado privado</strong> — más conveniente, 45–50 min, reserva anticipada con operadores locales que se listan aquí</li>
              <li><strong>Autobús público</strong> — opción más económica, salidas frecuentes desde la parada del Walmart cerca de PVR, aprox. 1.5 hrs</li>
              <li><strong>Shuttle compartido</strong> — punto medio, usualmente se coordina con el anfitrión de tu renta</li>
              <li><strong>Auto rentado</strong> — manejo fácil hacia el norte por la Carretera 200, estacionamiento gratis en la mayoría de las propiedades</li>
            </ul>
          </>
        ),
      },
      {
        title: '¿Es Sayulita Seguro para los Turistas?',
        content: (
          <>
            <p>La respuesta honesta: <strong>sí</strong>, para la gran mayoría de los visitantes, Sayulita es un destino seguro y relajado.</p>
            <p>Es un pueblo pequeño con una fuerte comunidad de expatriados y locales que dependen del turismo. Los robos menores ocurren — no dejes objetos de valor en la playa o en un auto sin cerrar. Pero los delitos violentos que afectan a turistas son extremadamente raros y están muy por debajo de los niveles de la mayoría de las ciudades turísticas mexicanas.</p>
            <p>Aplica las precauciones estándar: usa taxis registrados, no exhibas equipo costoso y sigue los consejos locales sobre qué playas visitar después del anochecer.</p>
          </>
        ),
      },
      {
        title: 'Sayulita para Familias, Parejas y Grupos — ¿Para Quién Es?',
        content: (
          <>
            <p><strong>Familias con niños:</strong> La playa principal de Sayulita tiene una ola suave perfecta para surfistas principiantes desde los 5 años. El pueblo es caminable, la comida es excelente y el campamento de rescate de tortugas es algo que los niños recuerdan por años.</p>
            <p><strong>Parejas:</strong> Las villas del lado norte tienen vistas al océano y terrazas al atardecer que son realmente difíciles de superar. Sayulita no es Cancún — es lo suficientemente tranquilo para relajarse, y lo suficientemente animado para no tener que cocinar todas las noches.</p>
            <p><strong>Grupos de amigos:</strong> Villas grandes, múltiples spots de surf, los mejores tacos de pescado de Riviera Nayarit y bares que cierran cuando se va la última persona.</p>
            <p><strong>Nómadas digitales:</strong> Internet confiable, una comunidad de coworking, tarifas de renta mensual que tienen sentido y una sesión de surf disponible cuando tu calendario esté despejado.</p>
          </>
        ),
      },
    ],
  },
};

export default function PlanningGuide({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  const [activeId, setActiveId] = useState('best-time');

  useEffect(() => {
    const tab = sessionStorage.getItem('planningTab');
    if (tab) {
      setActiveId(tab);
      sessionStorage.removeItem('planningTab');
    }
    if (window.location.hash === '#planning-guide') {
      setTimeout(() => {
        document.getElementById('planning-guide')?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  }, []);

  return (
    <section className="planning-guide section" id="planning-guide">
      <FloatingPalms />
      <div className="container">
        <SectionHeader
          label={t.label}
          title={t.title}
          subtitle={t.subtitle}
        />

        <div className="planning-guide__layout">
          {/* Tab navigation */}
          <div className="planning-guide__tabs">
            {guides.map((guide, i) => (
              <button
                key={guide.id}
                className={`planning-guide__tab ${activeId === guide.id ? 'planning-guide__tab--active' : ''}`}
                onClick={() => setActiveId(guide.id)}
                id={`guide-tab-${guide.id}`}
              >
                <span className="planning-guide__tab-icon">{guide.icon}</span>
                <span className="planning-guide__tab-text">{t.guides[i].title}</span>
                <FiChevronRight className="planning-guide__tab-arrow" />
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="planning-guide__content">
            <AnimatePresence mode="wait">
              {guides.map((guide, i) =>
                activeId === guide.id ? (
                  <motion.div
                    key={guide.id}
                    className="planning-guide__panel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    id={`guide-panel-${guide.id}`}
                  >
                    <h3 className="planning-guide__panel-title">{t.guides[i].title}</h3>
                    <div className="planning-guide__panel-body">
                      {t.guides[i].content}
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
