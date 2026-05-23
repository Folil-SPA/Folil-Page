"use client";

import { useState, useEffect } from "react";
import { useLang, Lang } from "@/contexts/LanguageContext";

const t = (lang: Lang) => ({
  whatWeDo: lang === "es" ? "¿Qué hacemos?" : "What we do",
  process: lang === "es" ? "Proceso" : "Process",
  projects: lang === "es" ? "Proyectos" : "Projects",
  team: lang === "es" ? "Equipo" : "Team",
  waitlist: lang === "es" ? "Lista de espera" : "Join waitlist",
  services: lang === "es" ? "Servicios" : "Services",
  industries: lang === "es" ? "Industrias" : "Industries",
});

export default function Nav() {
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (y / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const txt = t(lang);

  return (
    <>
      <nav id="main-nav">
        <a href="#" className="logo">
          <img src="/logos/logo-white-on-black.png" alt="Folil Labs" className="logo-img" />
          folil<span className="labs">labs</span>
        </a>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#value">{txt.whatWeDo}</a></li>
            <li><a href="#process">{txt.process}</a></li>
            <li><a href="#projects">{txt.projects}</a></li>
            <li><a href="#team">{txt.team}</a></li>
          </ul>
          <div className="lang-toggle">
            <button className={lang === "es" ? "active" : ""} onClick={() => setLang("es")}>ES</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <a href="#waitlist" className="btn-cta">{txt.waitlist}</a>
          <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú"><span/><span/><span/></button>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#value" onClick={() => setMenuOpen(false)}>{txt.whatWeDo}</a>
        <a href="#process" onClick={() => setMenuOpen(false)}>{txt.process}</a>
        <a href="#projects" onClick={() => setMenuOpen(false)}>{txt.projects}</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>{txt.services}</a>
        <a href="#usecases" onClick={() => setMenuOpen(false)}>{txt.industries}</a>
        <a href="#team" onClick={() => setMenuOpen(false)}>{txt.team}</a>
        <a href="#waitlist" onClick={() => setMenuOpen(false)} style={{ color: "var(--accent)" }}>{txt.waitlist}</a>
      </div>
      <div id="scroll-progress" style={{ width: `${progress}%` }}/>
      <style jsx>{`
        #scroll-progress { position: fixed; top: 72px; left: 0; height: 2px; background: linear-gradient(90deg, var(--accent), var(--accent2)); z-index: 99; width: 0%; transition: none; box-shadow: 0 0 8px var(--accent-glow); }
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 clamp(1.5rem, 5vw, 4rem); height: 72px; background: #0a0a07; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .logo { display: flex; align-items: center; gap: 10px; font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; letter-spacing: -0.02em; text-decoration: none; color: var(--text); z-index: 101; }
        .logo-img { width: 48px; height: 48px; object-fit: contain; }
        .labs { font-weight: 300; color: var(--muted); }
        .nav-right { display: flex; align-items: center; gap: 1.5rem; }
        .nav-links { display: flex; list-style: none; gap: 1.75rem; font-family: var(--font-display); font-size: 0.875rem; font-weight: 500; }
        .nav-links a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .nav-links a:hover { color: var(--text); }
        .lang-toggle { display: flex; background: var(--surface2); border-radius: 6px; overflow: hidden; border: 1px solid var(--border); }
        .lang-toggle button { padding: 0.3rem 0.6rem; background: none; border: none; color: var(--muted); font-family: var(--font-display); font-size: 0.72rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .lang-toggle button.active { background: var(--accent); color: #000; }
        .btn-cta { display: inline-flex; align-items: center; padding: 0.5rem 1.2rem; background: var(--text); color: #000; border-radius: 8px; font-family: var(--font-display); font-size: 0.82rem; font-weight: 600; text-decoration: none; transition: all 0.2s; line-height: 1; }
        .btn-cta:hover { opacity: 0.88; transform: translateY(-1px); }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; z-index: 101; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: var(--text); transition: all 0.3s; }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4px,4px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }
        .mobile-menu { display: none; position: fixed; top: 72px; left: 0; right: 0; bottom: 0; background: rgba(10,10,7,0.96); backdrop-filter: blur(32px); z-index: 99; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem; font-family: var(--font-display); font-size: 1.25rem; }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { color: var(--text); text-decoration: none; font-weight: 500; letter-spacing: -0.02em; transition: color 0.2s; }
        .mobile-menu a:hover { color: var(--accent); }
        @media (max-width: 768px) { .nav-links,.lang-toggle,.btn-cta { display: none; } .hamburger { display: flex; } }
      `}</style>
    </>
  );
}
