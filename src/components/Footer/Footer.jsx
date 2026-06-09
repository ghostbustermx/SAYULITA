import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter, FiX } from 'react-icons/fi';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import './Footer.css';

const i18n = {
  ENG: {
    company: "Company",
    about: "About Us",
    disclaimer: "Disclaimer and User Policy",
    careers: "Careers",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    quickLinks: "Quick Links",
    vacationRentals: "Vacation Rentals",
    realEstate: "Real Estate",
    activities: "Activities & Tours",
    transportation: "Transportation",
    blog: "Sayulita Blog",
    followUs: "Follow Us",
    shareText: "Share your Sayulita moments with",
    shareTag: "#SayulitaTravel",
    newsletter: "Newsletter Signup",
    newsletterText: "Get the latest Sayulita news, rental deals, and local tips delivered to your inbox.",
    emailPlaceholder: "Email Address",
    subscribe: "Subscribe",
    copyright: "All rights reserved.",
    meta: "650+ verified vacation rentals in Sayulita, Mexico"
  },
  ESP: {
    company: "Compañía",
    about: "Nosotros",
    disclaimer: "Disclaimer y Política de Usuario",
    careers: "Carreras",
    terms: "Términos y Condiciones",
    privacy: "Política de Privacidad",
    quickLinks: "Enlaces Rápidos",
    vacationRentals: "Rentas Vacacionales",
    realEstate: "Bienes Raíces",
    activities: "Actividades y Tours",
    transportation: "Transporte",
    blog: "Blog de Sayulita",
    followUs: "Síguenos",
    shareText: "Comparte tus momentos en Sayulita con",
    shareTag: "#SayulitaTravel",
    newsletter: "Boletín Informativo",
    newsletterText: "Recibe las últimas noticias de Sayulita, ofertas de rentas y consejos locales en tu bandeja de entrada.",
    emailPlaceholder: "Correo Electrónico",
    subscribe: "Suscribirse",
    copyright: "Todos los derechos reservados.",
    meta: "Más de 650 rentas vacacionales verificadas en Sayulita, México"
  }
};

export default function Footer({ language = 'ENG' }) {
  const t = i18n[language] || i18n.ENG;
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__col">
            <h4 className="footer__title">{t.company}</h4>
            <ul className="footer__links">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setShowDisclaimer(true); }}>{t.disclaimer}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setShowTerms(true); }}>{t.terms}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setShowPrivacy(true); }}>{t.privacy}</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__title">{t.quickLinks}</h4>
            <ul className="footer__links">
              <li><Link href="/rentals/houses">{t.vacationRentals}</Link></li>
              <li><Link href="/real-estate">{t.realEstate}</Link></li>
              <li><Link href="/tours">{t.activities}</Link></li>
              <li><a href="https://sayulitatransportation.com/" target="_blank" rel="noopener noreferrer">{t.transportation}</a></li>
              <li><a href="#blog">{t.blog}</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__title">{t.followUs}</h4>
            <div className="footer__socials">
              <a href="#facebook" className="footer__social-link" aria-label="Facebook">
                <FiFacebook size={24} />
              </a>
              <a href="#instagram" className="footer__social-link" aria-label="Instagram">
                <FiInstagram size={24} />
              </a>
              <a href="#twitter" className="footer__social-link" aria-label="Twitter">
                <FiTwitter size={24} />
              </a>
            </div>
            <p className="footer__text mt-4">
              {t.shareText}<br/>
              <strong>{t.shareTag}</strong>
            </p>
          </div>

          <div className="footer__col footer__col--newsletter">
            <h4 className="footer__title">{t.newsletter}</h4>
            <p className="footer__text">{t.newsletterText}</p>
            <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t.emailPlaceholder} 
                className="footer__input"
                required
              />
              <Button variant="primary" type="submit" className="footer__submit">
                {t.subscribe}
              </Button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <Link href="/" className="footer__logo">
            <Logo className="footer__logo-svg" />
          </Link>
          <p className="footer__copyright">
            © {new Date().getFullYear()} SayulitaTravel. {t.copyright} 
            <span className="footer__meta">{t.meta}</span>
          </p>
        </div>
      </div>
      <AnimatePresence>
        {showDisclaimer && (
          <motion.div
            className="footer-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDisclaimer(false)}
          >
            <motion.div
              className="footer-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="footer-modal__close" onClick={() => setShowDisclaimer(false)}>
                <FiX size={24} />
              </button>
              <div className="footer-modal__content">
                {language === 'ENG' ? (
                  <>
                    <h2>Disclaimer and User Policy</h2>
                    <p><em>Last updated: May 2026</em></p>
                    <h3>1. No Warranty</h3>
                    <p>SayulitaTravel provides the platform on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, regarding the operation or availability of the platform.</p>
                    <h3>2. Third-Party Content</h3>
                    <p>Listings, reviews, and other content posted by users are the sole responsibility of the respective users. SayulitaTravel does not endorse, verify, or guarantee the accuracy of any third-party content.</p>
                    <h3>3. User Responsibility</h3>
                    <p>Users are solely responsible for their interactions with other users, including but not limited to booking arrangements, payments, and dispute resolution. SayulitaTravel is not a party to any agreement between users.</p>
                    <h3>4. Platform Availability</h3>
                    <p>We strive to maintain platform availability but do not guarantee uninterrupted access. SayulitaTravel reserves the right to modify, suspend, or discontinue any aspect of the platform at any time.</p>
                    <h3>5. Privacy & Data</h3>
                    <p>Your use of the platform is subject to our Privacy Policy. We recommend reviewing it to understand our data practices.</p>
                    <h3>6. Contact</h3>
                    <p>For questions regarding this disclaimer, contact us at info@sayulitatravel.com.</p>
                  </>
                ) : (
                  <>
                    <h2>Disclaimer y Política de Usuario</h2>
                    <p><em>Última actualización: Mayo 2026</em></p>
                    <h3>1. Sin Garantía</h3>
                    <p>SayulitaTravel proporciona la plataforma "tal cual" y "según disponibilidad". No hacemos representaciones ni garantías de ningún tipo, expresas o implícitas, sobre la operación o disponibilidad de la plataforma.</p>
                    <h3>2. Contenido de Terceros</h3>
                    <p>Los listados, reseñas y otro contenido publicado por los usuarios son responsabilidad exclusiva de los respectivos usuarios. SayulitaTravel no respalda, verifica ni garantiza la precisión de ningún contenido de terceros.</p>
                    <h3>3. Responsabilidad del Usuario</h3>
                    <p>Los usuarios son únicamente responsables de sus interacciones con otros usuarios, incluyendo acuerdos de reserva, pagos y resolución de disputas. SayulitaTravel no es parte de ningún acuerdo entre usuarios.</p>
                    <h3>4. Disponibilidad de la Plataforma</h3>
                    <p>Nos esforzamos por mantener la disponibilidad de la plataforma pero no garantizamos acceso ininterrumpido. SayulitaTravel se reserva el derecho de modificar, suspender o descontinuar cualquier aspecto de la plataforma en cualquier momento.</p>
                    <h3>5. Privacidad y Datos</h3>
                    <p>Tu uso de la plataforma está sujeto a nuestra Política de Privacidad. Recomendamos revisarla para entender nuestras prácticas de datos.</p>
                    <h3>6. Contacto</h3>
                    <p>Si tienes preguntas sobre este disclaimer, contáctanos en info@sayulitatravel.com.</p>
                  </>
                )}
              </div>
              <button className="footer-modal__close-bottom" onClick={() => setShowDisclaimer(false)}>
                {language === 'ENG' ? 'Close' : 'Cerrar'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showTerms && (
          <motion.div
            className="footer-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTerms(false)}
          >
            <motion.div
              className="footer-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="footer-modal__close" onClick={() => setShowTerms(false)}>
                <FiX size={24} />
              </button>
              <div className="footer-modal__content">
                {language === 'ENG' ? (
                  <>
                    <h2>Terms & Conditions</h2>
                    <p><em>Last updated: May 2026</em></p>
                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing or using SayulitaTravel, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our platform.</p>
                    <h3>2. Listings & Accuracy</h3>
                    <p>Advertisers are responsible for the accuracy of their listings, including descriptions, pricing, availability, and photos. SayulitaTravel is not liable for any discrepancies or misrepresentations.</p>
                    <h3>3. User Conduct</h3>
                    <p>You agree to use the platform lawfully and not to engage in any activity that disrupts or harms the platform, its users, or its operation.</p>
                    <h3>4. Payments & Fees</h3>
                    <p>Listing fees are charged annually and are non-refundable except as outlined in our Results Guarantee. SayulitaTravel does not process payments between guests and advertisers.</p>
                    <h3>5. Intellectual Property</h3>
                    <p>All content on SayulitaTravel, including logos, design, and text, is the property of SayulitaTravel and may not be used without permission.</p>
                    <h3>6. Limitation of Liability</h3>
                    <p>SayulitaTravel is not liable for any direct, indirect, or consequential damages arising from your use of the platform or interactions with other users.</p>
                    <h3>7. Changes to Terms</h3>
                    <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
                    <h3>8. Contact</h3>
                    <p>For questions about these terms, contact us at info@sayulitatravel.com.</p>
                  </>
                ) : (
                  <>
                    <h2>Términos y Condiciones</h2>
                    <p><em>Última actualización: Mayo 2026</em></p>
                    <h3>1. Aceptación de Términos</h3>
                    <p>Al acceder o utilizar SayulitaTravel, aceptas estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo, por favor no utilices nuestra plataforma.</p>
                    <h3>2. Listados y Precisión</h3>
                    <p>Los anunciantes son responsables de la precisión de sus listados, incluyendo descripciones, precios, disponibilidad y fotos. SayulitaTravel no es responsable por discrepancias o tergiversaciones.</p>
                    <h3>3. Conducta del Usuario</h3>
                    <p>Aceptas utilizar la plataforma de manera legal y no participar en ninguna actividad que interrumpa o dañe la plataforma, sus usuarios o su operación.</p>
                    <h3>4. Pagos y Tarifas</h3>
                    <p>Las tarifas de listado se cobran anualmente y no son reembolsables excepto según lo establecido en nuestra Garantía de Resultados. SayulitaTravel no procesa pagos entre huéspedes y anunciantes.</p>
                    <h3>5. Propiedad Intelectual</h3>
                    <p>Todo el contenido en SayulitaTravel, incluyendo logotipos, diseño y texto, es propiedad de SayulitaTravel y no puede ser utilizado sin permiso.</p>
                    <h3>6. Limitación de Responsabilidad</h3>
                    <p>SayulitaTravel no es responsable por daños directos, indirectos o consecuentes que surjan del uso de la plataforma o interacciones con otros usuarios.</p>
                    <h3>7. Cambios a los Términos</h3>
                    <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuo de la plataforma después de los cambios constituye la aceptación de los nuevos términos.</p>
                    <h3>8. Contacto</h3>
                    <p>Si tienes preguntas sobre estos términos, contáctanos en info@sayulitatravel.com.</p>
                  </>
                )}
              </div>
              <button className="footer-modal__close-bottom" onClick={() => setShowTerms(false)}>
                {language === 'ENG' ? 'Close' : 'Cerrar'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            className="footer-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPrivacy(false)}
          >
            <motion.div
              className="footer-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="footer-modal__close" onClick={() => setShowPrivacy(false)}>
                <FiX size={24} />
              </button>
              <div className="footer-modal__content">
                {language === 'ENG' ? (
                  <>
                    <h2>Privacy Policy</h2>
                    <p><em>Last updated: May 2026</em></p>
                    <h3>1. Information We Collect</h3>
                    <p>When you use SayulitaTravel, we may collect personal information you provide directly, such as your name, email address, phone number, and property details when you create a listing or contact us through our forms.</p>
                    <h3>2. How We Use Your Information</h3>
                    <p>We use the information we collect to operate, maintain, and improve our platform, to communicate with you about your listings or inquiries, to send marketing communications (with your consent), and to comply with legal obligations.</p>
                    <h3>3. Sharing of Information</h3>
                    <p>We do not sell your personal information. We may share information with service providers who help us operate our platform, with law enforcement when required by law, or with your consent.</p>
                    <h3>4. Data Security</h3>
                    <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
                    <h3>5. Your Rights</h3>
                    <p>Depending on your location, you may have rights regarding your personal information, including the right to access, correct, or delete your data. Contact us at info@sayulitatravel.com to exercise these rights.</p>
                    <h3>6. Cookies</h3>
                    <p>We use cookies and similar tracking technologies to improve your experience on our platform. You can control cookie preferences through your browser settings.</p>
                    <h3>7. Contact Us</h3>
                    <p>If you have questions about this Privacy Policy, please contact us at info@sayulitatravel.com.</p>
                  </>
                ) : (
                  <>
                    <h2>Política de Privacidad</h2>
                    <p><em>Última actualización: Mayo 2026</em></p>
                    <h3>1. Información que Recopilamos</h3>
                    <p>Cuando utilizas SayulitaTravel, podemos recopilar información personal que proporcionas directamente, como tu nombre, correo electrónico, número telefónico y detalles de la propiedad al crear un listado o contactarnos a través de nuestros formularios.</p>
                    <h3>2. Cómo Usamos tu Información</h3>
                    <p>Usamos la información recopilada para operar, mantener y mejorar nuestra plataforma, comunicarnos contigo sobre tus listados o consultas, enviar comunicaciones de marketing (con tu consentimiento) y cumplir con obligaciones legales.</p>
                    <h3>3. Compartir Información</h3>
                    <p>No vendemos tu información personal. Podemos compartir información con proveedores de servicios que nos ayudan a operar la plataforma, con autoridades cuando sea requerido por ley, o con tu consentimiento.</p>
                    <h3>4. Seguridad de Datos</h3>
                    <p>Implementamos medidas de seguridad razonables para proteger tu información personal. Sin embargo, ningún método de transmisión por Internet es 100% seguro.</p>
                    <h3>5. Tus Derechos</h3>
                    <p>Dependiendo de tu ubicación, puedes tener derechos sobre tu información personal, incluyendo el derecho a acceder, corregir o eliminar tus datos. Contáctanos en info@sayulitatravel.com para ejercer estos derechos.</p>
                    <h3>6. Cookies</h3>
                    <p>Utilizamos cookies y tecnologías de rastreo similares para mejorar tu experiencia en nuestra plataforma. Puedes controlar las preferencias de cookies a través de la configuración de tu navegador.</p>
                    <h3>7. Contacto</h3>
                    <p>Si tienes preguntas sobre esta Política de Privacidad, contáctanos en info@sayulitatravel.com.</p>
                  </>
                )}
              </div>
              <button className="footer-modal__close-bottom" onClick={() => setShowPrivacy(false)}>
                {language === 'ENG' ? 'Close' : 'Cerrar'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
