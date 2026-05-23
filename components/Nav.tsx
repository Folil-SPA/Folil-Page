"use client";

import { useState, useEffect } from "react";

const translations: Record<string, Record<string, string>> = {
  es: {
    whatWeDo: "¿Qué hacemos?",
    process: "Proceso",
    projects: "Proyectos",
    team: "Equipo",
    waitlist: "Lista de espera",
    services: "Servicios",
    industries: "Industrias",
  },
  en: {
    whatWeDo: "What we do",
    process: "Process",
    projects: "Projects",
    team: "Team",
    waitlist: "Join waitlist",
    services: "Services",
    industries: "Industries",
  },
};

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"es" | "en">("es");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 40);
      setProgress(total > 0 ? (y / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setLanguage = (l: "es" | "en") => {
    setLang(l);
    document.documentElement.setAttribute("data-lang", l);
    document.querySelectorAll("[data-es][data-en]").forEach((el) => {
      const txt = el.getAttribute(`data-${l}`);
      if (txt !== null) el.innerHTML = txt;
    });
  };

  const t = translations[lang];

  return (
    <>
      <nav id="main-nav" className={scrolled ? "scrolled" : ""}>
        <a href="#" className="logo">
          <svg
            className="logo-mark"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            width="24"
            height="24"
          >
            <path
              d="M16 25V11"
              stroke="#e8903c"
              strokeWidth="2.1"
              strokeLinecap="round"
            />
            <path
              d="M16 18c-4.4-1.4-6.8-4.2-7.2-8.2M16 18c4.4-1.4 6.8-4.2 7.2-8.2M16 23c-4.2-1-7-3.2-8.4-6.8M16 23c4.2-1 7-3.2 8.4-6.8"
              stroke="#7fb069"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
            <circle cx="16" cy="8" r="2.1" fill="#e8903c" />
            <circle cx="8.6" cy="9.4" r="1.8" fill="#7fb069" />
            <circle cx="23.4" cy="9.4" r="1.8" fill="#7fb069" />
            <path
              d="M11.8 25.4c1.9-1.3 3.3-2.5 4.2-3.7.9 1.2 2.3 2.4 4.2 3.7"
              stroke="#e8903c"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          folil<span className="labs">labs</span>
        </a>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#value">{t.whatWeDo}</a></li>
            <li><a href="#process">{t.process}</a></li>
            <li><a href="#projects">{t.projects}</a></li>
            <li><a href="#team">{t.team}</a></li>
          </ul>
          <div className="lang-toggle">
            <button className={lang === "es" ? "active" : ""} onClick={() => setLanguage("es")}>ES</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
          </div>
          <a href="#waitlist" className="btn-cta">{t.waitlist}</a>
          <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#value" onClick={() => setMenuOpen(false)}>{t.whatWeDo}</a>
        <a href="#process" onClick={() => setMenuOpen(false)}>{t.process}</a>
        <a href="#projects" onClick={() => setMenuOpen(false)}>{t.projects}</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>{t.services}</a>
        <a href="#usecases" onClick={() => setMenuOpen(false)}>{t.industries}</a>
        <a href="#team" onClick={() => setMenuOpen(false)}>{t.team}</a>
        <a href="#waitlist" onClick={() => setMenuOpen(false)} style={{ color: "var(--accent)" }}>{t.waitlist}</a>
      </div>

      <div id="scroll-progress" style={{ width: `${progress}%` }} />

      <style jsx>{`
        #scroll-progress {
          position: fixed;
          top: 64px;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
          z-index: 99;
          width: 0%;
          transition: none;
          box-shadow: 0 0 8px var(--accent-glow);
        }
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(1.5rem, 5vw, 4rem);
          height: 64px;
          background: rgba(10, 10, 7, 0.55);
          backdrop-filter: blur(40px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: background 0.4s;
        }
        nav.scrolled { background: rgba(10, 10, 7, 0.85); }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          text-decoration: none;
          color: var(--text);
          z-index: 101;
        }
        .labs { font-weight: 300; color: var(--muted); }
        .nav-right { display: flex; align-items: center; gap: 1.5rem; }
        .nav-links {
          display: flex;
          list-style: none;
          gap: 1.75rem;
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 500;
        }
        .nav-links a {
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--text); }
        .lang-toggle {
          display: flex;
          background: var(--surface2);
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .lang-toggle button {
          padding: 0.3rem 0.6rem;
          background: none;
          border: none;
          color: var(--muted);
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .lang-toggle button.active { background: var(--accent); color: #000; }
        .btn-cta {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1.2rem;
          background: var(--text);
          color: #000;
          border-radius: 8px;
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          line-height: 1;
        }
        .btn-cta:hover { opacity: 0.88; transform: translateY(-1px); }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 101;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--text);
          transition: all 0.3s;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
        .mobile-menu {
          display: none;
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 10, 7, 0.96);
          backdrop-filter: blur(32px);
          z-index: 99;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          font-family: var(--font-display);
          font-size: 1.25rem;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          color: var(--text);
          text-decoration: none;
          font-weight: 500;
          letter-spacing: -0.02em;
          transition: color 0.2s;
        }
        .mobile-menu a:hover { color: var(--accent); }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .lang-toggle { display: none; }
          .btn-cta { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>
    </>
  );
}
