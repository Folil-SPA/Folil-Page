"use client";

import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/contexts/LanguageContext";

const t = (l: string) => ({
  tag: l==="es"?"Propuesta de valor":"Value proposition",
  h2: l==="es"?<>Velocidad sin<br/>sacrificar calidad</>:<>Speed without<br/>sacrificing quality</>,
  sub: l==="es"?"Ingeniería rigurosa con agilidad real. Nada de metodologías pesadas — solo resultados.":"Rigorous engineering with real agility. No heavy methodologies — only results.",
  cards: [
    { title: l==="es"?"Velocidad extrema":"Extreme speed", desc: l==="es"?"Nuestra forma de trabajar es ágil por diseño: ciclos cortos, entregas tempranas y ajuste continuo. Sin burocracia ni procesos pesados.":"We work agile by design: short cycles, early deliveries, and continuous adjustment. No bureaucracy or heavy processes." },
    { title: l==="es"?"Nativos en IA":"AI native", desc: l==="es"?"No adaptamos tecnología antigua. Construimos desde cero con IA en el centro de cada decisión de arquitectura.":"We don't adapt legacy technology. We build from scratch with AI at the core of every architectural decision." },
    { title: l==="es"?"Costo reducido":"Reduced cost", desc: l==="es"?"Sin estructura de consultora ni margen de intermediarios. Trabajamos directamente contigo, lo que se traduce en precios reales para proyectos reales.":"No consulting structure or middleman margins. We work directly with you, which means real pricing for real projects." },
  ],
});

const svgs = [
  <path key="a" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>,
  <g key="b"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></g>,
  <path key="c" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>,
];

export default function Value() {
  const { lang } = useLang();
  const txt = t(lang);
  return (
    <section id="value">
      <div className="value-accent"/>
      <div className="container">
        <ScrollReveal><span className="section-tag">{txt.tag}</span></ScrollReveal>
        <ScrollReveal delay={80}><h2>{txt.h2}</h2></ScrollReveal>
        <ScrollReveal delay={160}><p className="section-sub">{txt.sub}</p></ScrollReveal>
        <div className="value-grid">
          {txt.cards.map((item, i) => (
            <ScrollReveal key={i} type="fade-up" delay={200 + i * 120}>
              <div className="value-card">
                <div className="value-border"/>
                <div className="value-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{svgs[i]}</svg></div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <style jsx>{`
        #value { position: relative; overflow: hidden; }
        .value-accent { position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--accent), transparent); opacity: 0.4; }
        .value-grid { display: flex; gap: 1.5rem; }
        .value-card { flex: 1; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; position: relative; overflow: hidden; transition: all 0.3s ease; }
        .value-card:hover { border-color: rgba(232,144,60,0.25); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        .value-border { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, var(--accent), var(--accent2)); border-radius: 3px 0 0 3px; }
        .value-icon { width: 44px; height: 44px; background: var(--accent-dim); border: 1px solid rgba(232,144,60,0.2); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--accent); margin-bottom: 1.25rem; }
        h3 { font-family: var(--font-display); font-size: 1.05rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.5rem; }
        p { font-size: 0.875rem; color: var(--muted); line-height: 1.7; }
        @media (max-width: 768px) { .value-grid { flex-direction: column; } }
      `}</style>
    </section>
  );
}
