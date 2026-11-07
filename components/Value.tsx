"use client";

import ScrollReveal from "./ScrollReveal";
import { SectionHeading, SectionFooter } from "./PageElements";
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
  const es = lang === "es";
  return (
    <section id="value" aria-labelledby="value-title">
      <div className="container">
        <SectionHeading id="value-title" eyebrow={txt.tag} description={txt.sub}>
          {es ? <>Velocidad sin<br /><em>sacrificar calidad.</em></> : <>Speed without<br /><em>compromising quality.</em></>}
        </SectionHeading>
        <div className="network-space" aria-hidden="true" />
        <div className="value-grid">
          {txt.cards.map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <article className="value-card">
                <span className="card-index">0{i + 1} / <span className="brand-name">Folil Labs</span></span>
                <div className="value-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{svgs[i]}</svg></div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <SectionFooter number="01" label={es ? "Desde la raíz" : "From the root"} href="#process" link={es ? "Nuestro proceso" : "Our process"} />
      </div>
    </section>
  );
}
