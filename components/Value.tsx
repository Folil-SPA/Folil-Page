"use client";

import ScrollReveal from "./ScrollReveal";

const cards = [
  {
    svg: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
    title: "Velocidad extrema",
    desc: "Nuestra forma de trabajar es ágil por diseño: ciclos cortos, entregas tempranas y ajuste continuo. Sin burocracia ni procesos pesados.",
  },
  {
    svg: (<><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></>),
    title: "Nativos en IA",
    desc: "No adaptamos tecnología antigua. Construimos desde cero con IA en el centro de cada decisión de arquitectura.",
  },
  {
    svg: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
    title: "Costo reducido",
    desc: "Sin estructura de consultora ni margen de intermediarios. Trabajamos directamente contigo, lo que se traduce en precios reales para proyectos reales.",
  },
];

export default function Value() {
  return (
    <section id="value">
      <div className="container">
        <ScrollReveal><span className="section-tag">Propuesta de valor</span></ScrollReveal>
        <ScrollReveal delay={80}><h2>Velocidad sin<br />sacrificar calidad</h2></ScrollReveal>
        <ScrollReveal delay={160}>
          <p className="section-sub">Ingeniería rigurosa con agilidad real. Nada de metodologías pesadas — solo resultados.</p>
        </ScrollReveal>
        <div className="value-grid">
          {cards.map((item, i) => (
            <ScrollReveal key={i} type="fade-up" delay={200 + i * 150}>
              <div className="value-card">
                <div className="value-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{item.svg}</svg>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <style jsx>{`
        #value { background: var(--surface); }
        .value-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .value-card {
          background: #0f0f0f;
          padding: clamp(1.5rem, 3vw, 2.5rem);
          position: relative;
          height: 100%;
          transition: all 0.35s ease;
        }
        .value-card::after {
          content: '';
          position: absolute; top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle at 30% 30%, rgba(232, 144, 60, 0.12) 0%, transparent 50%);
          opacity: 0; transition: opacity 0.35s ease; pointer-events: none;
        }
        .value-card:hover::after { opacity: 1; }
        .value-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        .value-icon {
          width: 48px; height: 48px;
          background: var(--accent-dim);
          border: 1px solid rgba(232, 144, 60, 0.18);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
          box-shadow: 0 0 24px rgba(232, 144, 60, 0.08);
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }
        .value-card:hover .value-icon {
          transform: scale(1.08);
          box-shadow: 0 0 32px rgba(232, 144, 60, 0.15);
        }
        h3 { font-family: var(--font-display); font-size: 1.05rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
        p { font-size: 0.875rem; color: var(--muted); line-height: 1.7; }
        @media (max-width: 768px) { .value-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
