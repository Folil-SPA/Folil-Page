"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, type Lang } from "@/contexts/LanguageContext";
import { Arrow } from "./PageElements";

export default function Nav() {
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const es = lang === "es";
  const links = [
    { href: "#value", label: es ? "Qué hacemos" : "What we do" },
    { href: "#services", label: es ? "Servicios" : "Services" },
    { href: "#process", label: es ? "Proceso" : "Process" },
    { href: "#projects", label: es ? "Proyectos" : "Projects" },
    { href: "#usecases", label: es ? "Industrias" : "Industries" },
    { href: "#team", label: es ? "Equipo" : "Team" },
  ];

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      headerRef.current?.classList.toggle("nav-scrolled", window.scrollY > 24);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const changeLanguage = (next: Lang) => {
    setLang(next);
    document.documentElement.lang = next;
  };

  return (
    <>
      <a className="skip-link" href="#main-content">{es ? "Saltar al contenido" : "Skip to content"}</a>
      <header id="main-nav" className="site-header" ref={headerRef} onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
      }}>
        <a href="#hero" className="brand" aria-label={es ? "Folil Labs · Inicio" : "Folil Labs · Home"} onClick={() => setMenuOpen(false)}>
          <img src="/logos/logo-white.svg" alt="" width="44" height="50" />
          <span>Folil<span className="brand-labs"> Labs</span></span>
        </a>
        <nav className="desktop-nav" aria-label={es ? "Navegación principal" : "Main navigation"}>
          {links.filter(({ href }) => ["#value", "#process", "#projects", "#team"].includes(href)).map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <div className="lang-toggle" role="group" aria-label={es ? "Idioma" : "Language"}>
            <button type="button" lang="es" aria-label="Español" aria-pressed={es} onClick={() => changeLanguage("es")}>ES</button>
            <span aria-hidden="true">/</span>
            <button type="button" lang="en" aria-label="English" aria-pressed={!es} onClick={() => changeLanguage("en")}>EN</button>
          </div>
          <a href="#waitlist" className="btn btn-secondary nav-cta" onClick={() => setMenuOpen(false)}>{es ? "Conversemos" : "Let’s talk"}<Arrow /></a>
          <button ref={menuButtonRef} type="button" className="menu-button" aria-label={menuOpen ? (es ? "Cerrar menú" : "Close menu") : (es ? "Abrir menú" : "Open menu")} aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen(open => !open)}>
            <span className="menu-label">{es ? "Menú" : "Menu"}</span>
            <span className="menu-icon" aria-hidden="true"><span /><span /></span>
          </button>
        </div>
        <div id="site-menu" className="site-menu" hidden={!menuOpen}>
          <nav aria-label={es ? "Todas las secciones" : "All sections"}>
            {links.map(({ href, label }, index) => <a key={href} href={href} onClick={() => setMenuOpen(false)}><span>{label}</span><small>0{index + 1}</small></a>)}
            <a className="menu-contact" href="#waitlist" onClick={() => setMenuOpen(false)}>{es ? "Lista de espera" : "Join the waitlist"}<Arrow /></a>
          </nav>
        </div>
      </header>
      <div className="scroll-progress" aria-hidden="true"><div ref={progressRef} /></div>
    </>
  );
}
