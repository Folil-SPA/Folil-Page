"use client";

import { useLang } from "@/contexts/LanguageContext";
import { Arrow } from "./PageElements";

export default function Footer() {
  const { lang } = useLang();
  const es = lang === "es";
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <a href="#hero" className="brand" aria-label={es ? "Folil Labs · Inicio" : "Folil Labs · Home"}><img src="/logos/logo-white.svg" alt="" width="38" height="44" /><span>Folil<span className="brand-labs"> Labs</span></span></a>
            <p className="footer-note">{es ? "Ingeniería e inteligencia artificial. Contigo, desde la raíz." : "Engineering and artificial intelligence. With you, from the root."}</p>
          </div>
          <nav className="footer-links" aria-label={es ? "Contacto y redes" : "Contact and social links"}>
            <a href="mailto:contacto@folillabs.com">Email ↗</a>
            <a href="https://www.linkedin.com/in/patricio-acevedo-flores-63300b30b" target="_blank" rel="noopener noreferrer">LinkedIn / Patricio ↗</a>
            <a href="https://www.linkedin.com/in/%C3%A1lvaro-navarrete-257a1423a/" target="_blank" rel="noopener noreferrer">LinkedIn / Álvaro ↗</a>
          </nav>
        </div>
        <div className="footer-wordmark" aria-hidden="true">Folil<span> Labs</span></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} <span className="brand-name">Folil Labs</span> · Santiago, Chile</span><a href="#hero">{es ? "Volver al inicio" : "Back to top"}<Arrow direction="up" /></a></div>
      </div>
    </footer>
  );
}
