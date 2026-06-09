import { useState, useEffect, useRef, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiMenu, FiX, FiChevronDown, FiGlobe } from 'react-icons/fi';
import Logo from '../ui/Logo';
import './Navbar.css';

const i18n = {
  ENG: {
    annZeroFees: "ZERO FEES!",
    annBestPrices: "BEST PRICES GUARANTEED!",
    annLocal: "LOCAL SINCE 1998",
    advertiseBtn: "Advertise with us",
    mobileLangTitle: "Language",
    navLinks: [
      { label: 'Rentals', href: '#rentals', hasDropdown: true, dropdownItems: [
        { label: 'Houses for rent', href: '/rentals/houses' },
        { label: 'Hotels', href: '/rentals/hotels' }
      ]},
      { label: 'Real Estate', href: '/real-estate', hasDropdown: true, dropdownItems: [
        { label: 'For Sale', href: '/real-estate' },
        { label: 'Agents', href: '/real-estate' }
      ]},
      { label: 'Businesses', href: '/businesses', hasDropdown: false },
      { label: 'Activities', href: '#activities', hasDropdown: true, dropdownItems: [
        { label: 'Surf Lessons', href: '/surf-lessons' },
        { label: 'Tours & Trips', href: '/tours' }
      ]},
      { label: 'Plan Your Trip', href: '#planning-guide', hasDropdown: true, dropdownItems: [
        { label: 'Best Time to Visit Sayulita', href: '/#planning-guide' },
        { label: 'How to Get Here', href: '/#planning-guide' },
        { label: 'Safety Guide', href: '/#planning-guide' }
      ]},
    ]
  },
  ESP: {
    annZeroFees: "¡SIN COMISIONES!",
    annBestPrices: "¡MEJORES PRECIOS GARANTIZADOS!",
    annLocal: "LOCAL DESDE 1998",
    advertiseBtn: "Anúnciate con nosotros",
    mobileLangTitle: "Idioma",
    navLinks: [
      { label: 'Rentas', href: '#rentals', hasDropdown: true, dropdownItems: [
        { label: 'Casas en renta', href: '/rentals/houses' },
        { label: 'Hoteles', href: '/rentals/hotels' }
      ]},
      { label: 'Bienes Raíces', href: '/real-estate', hasDropdown: true, dropdownItems: [
        { label: 'En Venta', href: '/real-estate' },
        { label: 'Agentes', href: '/real-estate' }
      ]},
      { label: 'Negocios', href: '/businesses', hasDropdown: false },
      { label: 'Actividades', href: '#activities', hasDropdown: true, dropdownItems: [
        { label: 'Clases de Surf', href: '/surf-lessons' },
        { label: 'Tours y Viajes', href: '/tours' }
      ]},
      { label: 'Planifica tu Viaje', href: '#planning-guide', hasDropdown: true, dropdownItems: [
        { label: 'Mejor Época para Visitar Sayulita', href: '/#planning-guide' },
        { label: 'Cómo Llegar', href: '/#planning-guide' },
        { label: 'Guía de Seguridad', href: '/#planning-guide' }
      ]},
    ]
  }
};

const languageOptions = [
  { code: 'ENG', label: 'English', flag: '🇺🇸' },
  { code: 'ESP', label: 'Español', flag: '🇲🇽' },
];

function MobileSubmenu({ link, setMobileOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mobile-menu__submenu-container">
      <button
        className="mobile-menu__link mobile-menu__link--parent"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{link.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'inline-flex' }}
        >
          <FiChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="mobile-menu__submenu-items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
              {link.dropdownItems.map((item) => {
              const isBestTime = item.label === 'Best Time to Visit Sayulita' || item.label === 'Mejor Época para Visitar Sayulita';
              const isGettingHere = item.label === 'How to Get Here' || item.label === 'Cómo Llegar';
              const isSafety = item.label === 'Safety Guide' || item.label === 'Guía de Seguridad';
              const tab = isBestTime ? 'best-time' : isGettingHere ? 'getting-here' : isSafety ? 'safety' : null;
              return (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="mobile-menu__submenu-item"
                    onClick={() => {
                      setMobileOpen(false);
                      if (tab) sessionStorage.setItem('planningTab', tab);
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="mobile-menu__submenu-item"
                    onClick={() => {
                      setMobileOpen(false);
                      if (tab) sessionStorage.setItem('planningTab', tab);
                    }}
                  >
                    {item.label}
                  </a>
                )
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar({ language = 'ENG', setLanguage }) {
  const t = i18n[language] || i18n.ENG;
  const navLinks = t.navLinks;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const langRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  /* Close language dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    if (langOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langOpen]);

  const currentLang = languageOptions.find((l) => l.code === language) || languageOptions[0];

  return (
    <>
    <header className="header-wrapper">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-bar__marquee">
          {[1, 2].map((block) => (
            <div key={block} className="announcement-bar__inner" aria-hidden={block === 2 ? "true" : undefined}>
              {[...Array(4)].map((_, i) => (
                <Fragment key={i}>
                  <span><span className="announcement-bar__check">✓</span> {t.annZeroFees}</span>
                  <span><span className="announcement-bar__check">✓</span> {t.annBestPrices}</span>
                  <span><span className="announcement-bar__check">✓</span> {t.annLocal}</span>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar__inner container">
          {/* Logo */}
          <Link href="/" className="navbar__logo" id="nav-logo">
            <Logo className="navbar__logo-svg" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="navbar__links">
            {navLinks.map((link) => (
              <div 
                key={link.label} 
                className="navbar__link-container"
              >
                {link.href.startsWith('#') ? (
                  <a href={link.href} className="navbar__link" id={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}>
                    {link.label}
                    {link.hasDropdown && <FiChevronDown size={14} />}
                  </a>
                ) : (
                  <Link href={link.href} className="navbar__link" id={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}>
                    {link.label}
                    {link.hasDropdown && <FiChevronDown size={14} />}
                  </Link>
                )}
                {link.hasDropdown && (
                  <div className="navbar__dropdown">
                    {link.dropdownItems.map((item) => {
                      const isBestTime = item.label === 'Best Time to Visit Sayulita' || item.label === 'Mejor Época para Visitar Sayulita';
                      const isGettingHere = item.label === 'How to Get Here' || item.label === 'Cómo Llegar';
                      const isSafety = item.label === 'Safety Guide' || item.label === 'Guía de Seguridad';
                      const tab = isBestTime ? 'best-time' : isGettingHere ? 'getting-here' : isSafety ? 'safety' : null;
                      return (
                        item.href.startsWith('/') ? (
                          <Link 
                            key={item.label} 
                            href={item.href} 
                            className="navbar__dropdown-item"
                            onClick={tab ? () => sessionStorage.setItem('planningTab', tab) : undefined}
                            id={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <a 
                            key={item.label} 
                            href={item.href} 
                            className="navbar__dropdown-item"
                            onClick={tab ? () => sessionStorage.setItem('planningTab', tab) : undefined}
                            id={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                          >
                            {item.label}
                          </a>
                        )
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="navbar__actions">
            <Link href="/advertise" className="navbar__advertise-btn" id="nav-advertise">
              {t.advertiseBtn}
            </Link>

            {/* Language Selector */}
            <div className="lang-selector" ref={langRef} id="lang-selector">
              <button
                className={`lang-selector__btn ${langOpen ? 'lang-selector__btn--active' : ''}`}
                onClick={() => setLangOpen(!langOpen)}
                aria-expanded={langOpen}
                aria-label="Select language"
                id="lang-selector-btn"
              >
                <FiGlobe size={15} className="lang-selector__globe" />
                <span className="lang-selector__code">{currentLang.code}</span>
                <motion.span
                  className="lang-selector__chevron"
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown size={13} />
                </motion.span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    className="lang-selector__dropdown"
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {languageOptions.map((opt) => (
                      <button
                        key={opt.code}
                        className={`lang-selector__option ${
                          language === opt.code ? 'lang-selector__option--active' : ''
                        }`}
                        onClick={() => {
                          if (setLanguage) setLanguage(opt.code);
                          setLangOpen(false);
                        }}
                        id={`lang-option-${opt.code.toLowerCase()}`}
                      >
                        <span className="lang-selector__option-flag">{opt.flag}</span>
                        <span className="lang-selector__option-label">{opt.label}</span>
                        <span className="lang-selector__option-code">{opt.code}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="navbar__hamburger"
              id="nav-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

    </header>
      {mounted && createPortal(
        <MobileMenu
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          navLinks={navLinks}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />,
        document.body
      )}
    </>
  );
}

function MobileMenu({ mobileOpen, setMobileOpen, navLinks, language, setLanguage, t }) {
  return (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div 
          key="backdrop"
          className="mobile-menu-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileOpen(false)}
        />
      )}
      {mobileOpen && (
        <motion.div
          key="menu"
          className="mobile-menu"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            className="mobile-menu__close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
          <div className="mobile-menu__links">
            {navLinks.map((link) => (
              <div key={link.label} className="mobile-menu__link-group">
                {link.hasDropdown ? (
                  <MobileSubmenu link={link} setMobileOpen={setMobileOpen} />
                ) : (
                  link.href.startsWith('/') ? (
                    <Link
                      href={link.href}
                      className="mobile-menu__link"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="mobile-menu__link"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>
            ))}

            {/* Mobile Language Selector */}
            <div className="mobile-menu__lang-selector">
              <span className="mobile-menu__lang-title">
                <FiGlobe size={16} /> {t.mobileLangTitle}
              </span>
              <div className="mobile-menu__lang-options">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    className={`mobile-menu__lang-btn ${
                      language === opt.code ? 'mobile-menu__lang-btn--active' : ''
                    }`}
                    onClick={() => {
                      if (setLanguage) setLanguage(opt.code);
                    }}
                  >
                    <span>{opt.flag}</span>
                    <span>{opt.code}</span>
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/advertise"
              className="mobile-menu__advertise-btn"
              onClick={() => setMobileOpen(false)}
            >
              {t.advertiseBtn}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
