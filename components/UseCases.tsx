"use client";

import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/contexts/LanguageContext";

const t = (l: string) => ({
  tag: l==="es"?"Industrias":"Industries",
  h2: l==="es"?<>Dónde sembramos<br/>las raíces</>:<>Where we plant<br/>the roots</>,
  sub: l==="es"?"Queremos trabajar con empresas que quieran moverse primero, sin importar la industria.":"We want to work with companies that want to move first, regardless of industry.",
  cases: [
    { svg: <g><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></g>, label:"Tech" },
    { svg: <g><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></g>, label: l==="es"?"Banca":"Banking" },
    { svg: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>, label: l==="es"?"Salud":"Health" },
    { svg: <g><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></g>, label: l==="es"?"Educación":"Education" },
    { svg: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, label: l==="es"?"Legal":"Legal" },
  ],
});

export default function UseCases() {
  const { lang } = useLang();
  const txt = t(lang);
  return (
    <section id="usecases">
      <div className="usecases-glow"/>
      <div className="container">
        <ScrollReveal><span className="section-tag">{txt.tag}</span></ScrollReveal>
        <ScrollReveal delay={80}><h2>{txt.h2}</h2></ScrollReveal>
        <ScrollReveal delay={160}><p className="section-sub">{txt.sub}</p></ScrollReveal>
        <div className="cases-grid">
          {txt.cases.map((c,i)=>(
            <ScrollReveal key={c.label} delay={200+i*80}>
              <div className="case-chip">
                <div className="case-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">{c.svg}</svg></div>
                <span>{c.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <style jsx>{`
        #usecases { position: relative; overflow: hidden; }
        .usecases-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(232,144,60,0.05) 0%, transparent 60%); pointer-events: none; }
        .cases-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
        .case-chip { display: flex; align-items: center; gap: 0.75rem; padding: 1.1rem 1.75rem; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; font-family: var(--font-display); font-size: 0.95rem; font-weight: 500; letter-spacing: -0.01em; transition: all 0.3s ease; }
        .case-chip:hover { border-color: var(--accent); box-shadow: 0 0 32px rgba(232,144,60,0.15); transform: translateY(-2px); }
        .case-icon { width: 40px; height: 40px; background: var(--accent-dim); border: 1px solid rgba(232,144,60,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent); }
        @media (max-width: 480px) { .case-chip { padding: 0.9rem 1.25rem; font-size: 0.85rem; } }
      `}</style>
    </section>
  );
}
