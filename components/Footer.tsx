"use client";

import { useLang } from "@/contexts/LanguageContext";

const t = (lang: string) => ({
  waitlist: lang==="es"?"Lista de espera":"Waitlist",
  email: "contacto@folil.com",
});

export default function Footer() {
  const { lang } = useLang();
  const txt = t(lang);
  return (
    <footer>
      <a href="#" className="footer-logo">
        <img src="/logos/logo-white-on-black.png" alt="Folil Labs" className="footer-logo-img" />
        folil labs
      </a>
      <p>&copy; 2025 Folil Labs · Santiago, Chile · PUC</p>
      <div className="footer-links">
        <a href="mailto:contacto@folil.com">{txt.email}</a>
        <a href="https://www.linkedin.com/in/patricio-acevedo-flores-63300b30b" target="_blank" rel="noopener">LinkedIn Patricio</a>
        <a href="https://www.linkedin.com/in/%C3%A1lvaro-navarrete-257a1423a/" target="_blank" rel="noopener">LinkedIn Alvaro</a>
        <a href="#waitlist">{txt.waitlist}</a>
      </div>
      <style jsx>{`
        footer { text-align: center; padding: 3rem clamp(1.5rem,5vw,4rem) 2.5rem; border-top: 1px solid var(--border); background: var(--surface); }
        .footer-logo { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-display); font-size: 0.95rem; font-weight: 600; color: var(--text); text-decoration: none; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
        .footer-logo-img { width: 36px; height: 36px; object-fit: contain; }
        p { font-size: 0.78rem; color: var(--muted); margin-bottom: 1.25rem; }
        .footer-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.25rem; }
        .footer-links a { font-size: 0.8rem; color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--text); }
      `}</style>
    </footer>
  );
}
