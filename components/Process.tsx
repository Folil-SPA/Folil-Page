"use client";

import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/contexts/LanguageContext";

const t = (l: string) => ({
  tag: l==="es"?"Cómo trabajamos":"How we work",
  h2: l==="es"?<>De la raíz al producto,<br/>en tres pasos</>:<>From root to product,<br/>in three steps</>,
  steps: [
    { num:"01", phase: l==="es"?"Diagnóstico":"Diagnosis", time: l==="es"?"~1–2 semanas":"~1–2 weeks", title: l==="es"?"Entendemos tu contexto":"We understand your context", desc: l==="es"?"Mapeamos tu negocio, datos y el problema real. Definimos el alcance del MVP con criterios claros de éxito y ROI medible.":"We map your business, data, and the real problem. We define the MVP scope with clear success criteria and measurable ROI." },
    { num:"02", phase: l==="es"?"Diseño & Build":"Design & Build", time: l==="es"?"~4–8 semanas":"~4–8 weeks", title: l==="es"?"Construimos con precisión":"We build with precision", desc: l==="es"?"Ciclos cortos de feedback, demos semanales. Usamos los mejores modelos y herramientas IA disponibles en el mercado.":"Short feedback cycles, weekly demos. We use the best AI models and tools available on the market." },
    { num:"03", phase: l==="es"?"Deploy & Escala":"Deploy & Scale", time: l==="es"?"~2–4 semanas":"~2–4 weeks", title: l==="es"?"Lanzamos y transferimos":"We launch and transfer", desc: l==="es"?"Desplegamos la solución y te acompañamos en los primeros pasos. El objetivo es que quede en tus manos y puedas seguir construyendo sobre ella.":"We deploy the solution and support you in the first steps. The goal is for it to be in your hands so you can keep building on it." },
  ],
});

export default function Process() {
  const { lang } = useLang();
  const txt = t(lang);
  return (
    <section id="process">
      <div className="process-bg"/>
      <div className="container">
        <ScrollReveal><span className="section-tag">{txt.tag}</span></ScrollReveal>
        <ScrollReveal delay={80}><h2>{txt.h2}</h2></ScrollReveal>
        <div className="process-steps">
          <div className="process-line"/>
          {txt.steps.map((s, i) => (
            <ScrollReveal key={s.num} type="slide-left" delay={200 + i * 120}>
              <div className="step">
                <div className="step-marker"><span className="step-dot"/><span className="step-num">{s.num}</span></div>
                <div className="step-body">
                  <div className="step-phase">{s.phase} <span className="step-time">{s.time}</span></div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <style jsx>{`
        #process { position: relative; overflow: hidden; background: var(--surface); }
        .process-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 50%, rgba(232,144,60,0.04) 0%, transparent 60%); pointer-events: none; }
        .process-steps { position: relative; max-width: 680px; }
        .process-line { position: absolute; left: 19px; top: 12px; bottom: 12px; width: 2px; background: linear-gradient(180deg, var(--accent), var(--accent2)); opacity: 0.25; }
        .step { display: flex; gap: 1.5rem; padding: 1.5rem 0; }
        .step-marker { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; flex-shrink: 0; }
        .step-dot { width: 12px; height: 12px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 16px var(--accent-glow); margin-top: 4px; }
        .step-num { font-family: var(--font-display); font-size: 2rem; font-weight: 700; letter-spacing: -0.04em; color: var(--muted); line-height: 1; }
        .step-phase { font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); font-family: var(--font-display); font-weight: 600; margin-bottom: 0.25rem; }
        .step-time { color: var(--muted); font-weight: 400; letter-spacing: 0.05em; margin-left: 0.35rem; text-transform: none; }
        h3 { font-family: var(--font-display); font-size: 1.15rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.35rem; }
        p { font-size: 0.875rem; color: var(--muted); line-height: 1.7; }
      `}</style>
    </section>
  );
}
